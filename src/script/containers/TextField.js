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
    	<View>
    		<Text>{this.props.label} in {this.props.type} system</Text>
			<TextInput
				style={{height: 40}}
				maxLength = {this.props.length}
				onChangeText={(text) => this.changeTextEvent(text)}
				onClick={this.props.handler}
        placeholder = {this.props.type === 'decimal' ? 
                        'Example: 127.0.0.1': 
                        'Example: 11111111.11111111.11111111.00000000'
                      }
				value={this.state.text}
			/>
		</View>
    );
  }
}