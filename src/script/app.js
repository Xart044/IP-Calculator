import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from './store/store';
import Layout from './components/Layout';

const store = configureStore();

class ipcalc extends Component {
  render() {
  	console.log('started debugging')
    return (
    	<Provider store={store}>
      		<Layout/>
      	</Provider>
    );
  }
}

AppRegistry.registerComponent('ipcalc', () => ipcalc);