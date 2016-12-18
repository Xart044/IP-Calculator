import React, { Component } from 'react';
import {View,Text} from 'react-native';

export default class extends Component {
	render() {
		return (
			<View>
				<Text>
					Results:
				</Text>
				<Text>
					IP in decimal system: {this.props.ip.ip_dec}
				</Text>
				<Text>
					IP in binary system: {this.props.ip.ip_bin}
				</Text>
				<Text>
					Mask in decimal system: {this.props.ip.mask_dec}
				</Text>
				<Text>
					Mask in binary system: {this.props.ip.mask_bin}
				</Text>
				<Text>
					Range of hosts: {this.props.ip.mask_length}
				</Text>
			</View>
		);
	}
}
