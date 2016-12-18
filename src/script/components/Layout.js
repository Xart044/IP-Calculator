import React, { Component } from 'react';
import { View, Alert, Button, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TextField from './../containers/TextField';
import Switcher from './../containers/Switcher';

import { ipChangeEvent } from '../actions/ipActions';

const decRegExp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const binRegExp = /\b[01]{8}\.[01]{8}\.[01]{8}\.[01]{8}\b/;

function validateIpDecimal(ipaddress, regExp) {
    if (regExp.test(ipaddress)) {
        return true;
    }
    return false;
}

function DecToBinOuter (ip,mask) {
	let ipArray = ip.split('.'),
		maskArray  = mask.split('.'),
		resultArray = [];
	ipArray = decToBinInner(ipArray);
	resultArray.push(ipArray);
	maskArray = decToBinInner(maskArray);
	resultArray.push(maskArray);

return resultArray;
}

function decToBinInner(array){
	array = array.map((elOut,indOut)=>{
		let parsedElem = parseInt(elOut),
			binElem = parsedElem.toString(2);
		if(binElem.length!==8){
			const lengthDiff = 8 - binElem.length,
				  diffArray = Array(lengthDiff).fill('0');
			let  resultArray = [binElem];
			resultArray = resultArray.concat(diffArray).reverse();
			resultArray = resultArray.join('');
			binElem = resultArray;
		}
		return binElem;
	})
	return array.join('.');
}

function binToDecOuter (ip,mask){
	let ipArray = ip.split('.'),
		maskArray  = mask.split('.'),
		resultArray = [];
	ipArray = binToDecInner(ipArray);
	resultArray.push(ipArray);
	maskArray = binToDecInner(maskArray);
	resultArray.push(maskArray);

return resultArray;
}

function binToDecInner(array){
	array = array.map((elOut,indOut)=>{
		let elArray = elOut.split('');
		elArray = elArray.reverse();
		elArray = elArray.map((elInn,indInn)=>{
			return elInn * Math.pow(2,indInn)
		})
		return elArray.reduce((a,b)=>a+b,0);
	})
	return array.join('.');
}

// function calculateHosts() {

// }

class Layout extends Component {
    state = {
        ip: '',
        mask: ''
    };
    checkValidation(ip, mask, type) {
        if (type === 'decimal') {
            return validateIpDecimal(ip, decRegExp) && validateIpDecimal(mask, decRegExp);
        } else {
            return validateIpDecimal(ip, binRegExp) && validateIpDecimal(mask, binRegExp);
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
            if(type === 'binary'){
            	const [ip_dec, mask_dec] = binToDecOuter(ip,mask);
            	this.props.ipChangeEvent(ip_dec, ip, mask_dec, mask);
            }
            else{
            	const [ip_bin, mask_bin] = DecToBinOuter(ip,mask);
            	this.props.ipChangeEvent(ip, ip_bin, mask, mask_bin);
            }
        }
    }
    ipChangeHandler(newIp) {
        this.setState({
            ip: newIp
        });
        console.log(this.state.ip);
    }
    maskChangeHandler(newMask) {
        this.setState({
            mask: newMask
        });
        console.log(this.state.mask);
    }
    render() {
        return ( 
        	<View>
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
            <Button onPress = { this.calculate.bind(this) }
            title = "Calculate"/>
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
        ipChangeEvent: bindActionCreators(ipChangeEvent, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
