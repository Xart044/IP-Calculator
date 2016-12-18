import React, { Component } from 'react';
import { View, Alert, Button, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TextField from './../containers/TextField';
import Switcher from './../containers/Switcher';
import ResultComponent from './ResultComponent';

import { ipChangeEvent, getMaskLength } from '../actions/ipActions';

const decRegExp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const binRegExp = /\b[01]{8}\.[01]{8}\.[01]{8}\.[01]{8}\b/;

function validateIp(checkingaddress, regExp, ip, mask = false, type = 'decimal') {
	if(mask){
		let maskInBinSystem;
    	if(type === 'decimal'){
    		maskInBinSystem = decToBinOuter(ip, checkingaddress);
    	}
    	maskInBinSystem = maskInBinSystem ? maskInBinSystem : checkingaddress;
    	const isMaskValid = validateMask(maskInBinSystem[1]);
		if(!isMaskValid){
			return false;
		}
    }
    if (regExp.test(checkingaddress)) {
        return true;
    }
    return false;
}

function validateMask(mask){
	let maskString = mask.replace('.', ''),
		isValid = true;
	maskString = maskString.substring(0,maskString.lastIndexOf('1'));
	maskString = maskString.split('').map((el,ind)=>{
		if(el === '0'){
			isValid = false;
		}
	})
	return isValid;
}

function decToBinOuter (ip,mask) {
	console.log(ip,mask)
	let resultArray = [];
	if(ip){
		let ipArray = ip.split('.');
		ipArray = decToBinInner(ipArray);
		resultArray.push(ipArray);
	}
	if(mask){
		let maskArray  = mask.split('.');
		maskArray = decToBinInner(maskArray);
		resultArray.push(maskArray);
	}
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
	const resultArray = [];
	if(ip){
		let ipArray = ip.split('.');
		ipArray = binToDecInner(ipArray);
		resultArray.push(ipArray);
	}
	if(mask){
		let maskArray = mask.split('.');
		maskArray = binToDecInner(maskArray);
		resultArray.push(maskArray);
	}

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
            maskLength = calculateHosts(calculatedMask);
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
	            <Button 
		            onPress = { this.calculate.bind(this) }
		            title = "Calculate"
	            />
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
