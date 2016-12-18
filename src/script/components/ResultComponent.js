import React, { Component } from 'react';
import {View,Text,StyleSheet} from 'react-native';

export default class extends Component {
	render() {
		let InformationBlock;
		if(this.props.ip.mask_length !== ''){
			InformationBlock = 
			<View>
				<Text style={styles.textElem}>
					IP in decimal system: {this.props.ip.ip_dec}
				</Text>
				<Text style={styles.textElem}>
					IP in binary system: {this.props.ip.ip_bin}
				</Text>
				<Text style={styles.textElem}>
					Mask in decimal system: {this.props.ip.mask_dec}
				</Text>
				<Text style={styles.textElem}>
					Mask in binary system: {this.props.ip.mask_bin}
				</Text>
				<Text style={styles.textElem}>
					Range of hosts: {this.props.ip.mask_length}
				</Text>
			</View>
		}
		else{
			InformationBlock = <Text style={styles.centeredText}> Please enter values and click Calculate</Text>
		}
		return (
			<View style={{flex: 7}}>
				<Text style={styles.header}>
					Results:
				</Text>
				{InformationBlock}
			</View>
		);
	}
}
const styles = StyleSheet.create({
	bgColor:{
		backgroundColor: '#DDF9F1'
	},
	header: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 30,
	},
	textElem: {
		marginTop: 10,
		marginBottom: 10,
		fontSize: 15, 	
	},
	centeredText: {
		textAlign: 'center',
		marginTop: 10,
		marginBottom: 10,
		fontSize: 15, 	 	
	}
});