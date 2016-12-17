import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  Image
} from 'react-native';

class ipcalc extends Component {
  render() {
    return (
		<View>
        <Image source={{uri: 'https://i.chzbgr.com/full/7345954048/h7E2C65F9/'}} />
	      <Text>
	        IP calculator
	      </Text>		
		</View>
    );
  }
}

AppRegistry.registerComponent('ipcalc', () => ipcalc);