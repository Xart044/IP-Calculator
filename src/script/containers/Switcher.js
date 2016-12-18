import React, { Component } from 'react';
import {View,Text,Switch} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {typeChangeEvent} from '../actions/ipActions';

class Switcher extends Component {
	state = {
		switchStatus: false
	};
	switchAction(value){
		const ip_type = this.props.ip.ip_type;
		this.props.typeChangeEvent(ip_type);
		this.setState({
			switchStatus: value
		});
	}
	render() {
		return (
			<View>
				<Text>
					{this.state.switchStatus ? 'binary system' : 'decimal system'}
				</Text>
				<Switch
					onValueChange={this.switchAction.bind(this)}
					style={{marginBottom: 10}}
					value={this.state.switchStatus} 
				/>
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
       	typeChangeEvent: bindActionCreators(typeChangeEvent, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Switcher);


