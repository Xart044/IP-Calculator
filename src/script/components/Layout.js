import React, { Component } from 'react';
import { View, Alert, Button, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TextField from './../containers/TextField';
import Switcher from './../containers/Switcher';
import ResultComponent from './ResultComponent';

import { ipChangeEvent, getMaskLength } from './../actions/ipActions';
import { decToBinOuter, binToDecOuter } from './../Remote_Functions/transpiler';
import { validateIp, decRegExp, binRegExp } from './../Remote_Functions/validation';

function calculateHosts(mask) {
    const dots = /\./gi,
       	zero = /0/gi,
   		maskLength = mask.replace(dots, '').replace(zero, '').length;
    return Math.pow(2, 32 - maskLength) - 2;
}


class Layout extends Component {
    state = {
        ip: '',
        mask: ''
    };
    checkValidation(ip, mask, type) {
        if (type === 'decimal') {
            return validateIp(ip, decRegExp) && validateIp(mask, decRegExp, ip, true);
        } else {
            return validateIp(ip, binRegExp) && validateIp(mask, binRegExp, ip, true, 'binary');
        }
    }
    calculate() {
        const ip = this.state.ip,
            mask = this.state.mask,
            type = this.props.ip.ip_type;
        let isValid = this.checkValidation(ip, mask, type);
        if (!isValid) {
            Alert.alert(`Invalid Input`, `You have entered an invalid IP or Mask address in ${type} system!`);
        } else {
        	let mask_bin, maskLength, calculatedIp, calculatedMask;
            if(type === 'decimal'){
            	[calculatedIp, calculatedMask] = decToBinOuter(ip,mask);
            	mask_bin = calculatedMask;
            	this.props.ipChangeEvent(ip, calculatedIp, mask, calculatedMask);
            }
            else{
            	mask_bin = mask;
            	[calculatedIp, calculatedMask] = binToDecOuter(ip,mask);
            	this.props.ipChangeEvent(calculatedIp, ip, calculatedMask, mask);
            }
            maskLength = calculateHosts(mask_bin);
            this.props.getMaskLength(maskLength);
        }
    }
    ipChangeHandler(newIp) {
        this.setState({
            ip: newIp
        });
    }
    maskChangeHandler(newMask) {
        this.setState({
            mask: newMask
        });
    }
    render() {
        return ( 
        	<View style={{flex:1,backgroundColor: '#DDF9F1'}}>
	            <Switcher/>
	            <TextField 
		            ChangeHandler = { this.ipChangeHandler.bind(this) }
		            label = "IP address"
		            type = { this.props.ip.ip_type }
		            length = { this.props.ip.ip_type === 'decimal' ? 15 : 35 }
	            /> 
	            <TextField 
	            	ChangeHandler = { this.maskChangeHandler.bind(this) }
		            label = "MASK"
		            type = { this.props.ip.ip_type }
		            length = { this.props.ip.ip_type === 'decimal' ? 15 : 35 }
	            /> 
                <View style = {{ flex:0,flexDirection: 'row',justifyContent: 'center' }}>
                    <View style = {{ width: 200,marginTop:15,marginBottom:15}}>
                         <Button 
                            onPress = { this.calculate.bind(this) }
                            title = "Calculate"
                            color = "#44B498"
                        />   
                    </View>
                </View>
	            <ResultComponent ip = {this.props.ip} />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        ip: state.ip
    }
}


function mapDispatchToProps(dispatch) {
    return {
        ipChangeEvent: bindActionCreators(ipChangeEvent, dispatch),
        getMaskLength: bindActionCreators(getMaskLength, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
