import React, { Component } from 'react';
import {View,Text,Switch,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {typeChangeEvent,ResetAddress} from '../actions/ipActions';

class Switcher extends Component {
	state = {
		switchStatus: false
	};
	switchAction(value){
		const ip_type = this.props.ip.ip_type;
		this.setState({
			switchStatus: value
		});
		this.props.typeChangeEvent(ip_type);
		this.props.ResetAddress();
	}
	render() {
		return (
			<View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between',alignItems:'center'}}>
				<Text style={styles.header}>
					IP Calculator
				</Text>
				<View style={{flex: 1, flexDirection: 'row', justifyContent:'flex-end'}}>
					<Text style={{fontWeight: 'bold'}}>
						{this.state.switchStatus ? 'binary system' : 'decimal system'}
					</Text>
					<Switch
						onValueChange={this.switchAction.bind(this)}
						style={{marginBottom: 10}}
						value={this.state.switchStatus} 
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	header:{
		marginLeft: 20,
		fontWeight: 'bold',
		fontSize: 25,		
	}
});

function mapStateToProps(state) {
    return {
        ip: state.ip
    }
}

function mapDispatchToProps(dispatch) {
    return {
       	typeChangeEvent: bindActionCreators(typeChangeEvent, dispatch),
       	ResetAddress: bindActionCreators(ResetAddress, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Switcher);


