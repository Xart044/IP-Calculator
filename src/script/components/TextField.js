import React, { Component } from 'react';
import { AppRegistry, TextInput,Text, View } from 'react-native';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }
  changeTextEvent(text){
    this.setState({text});
    this.props.ChangeHandler(text);
  }
  render() {
    return (
    	<View style={{flex: 1}}>
    		<Text>Write {this.props.label} in {this.props.type} system</Text>
  			<TextInput
  				style={{height: 35}}
  				maxLength = {this.props.length}
  				onChangeText={(text) => this.changeTextEvent(text)}
  				onClick={this.props.handler}
          placeholder = 
          {
            this.props.type === 'decimal' ? 
            'Example: 255.255.255.000': 
            'Example: 11111111.11111111.11111111.00000000'
          }
          placeholderTextColor="#08A379"
  				value={this.state.text}
  			/>
		</View>
    );
  }
}