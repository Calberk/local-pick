import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from './src/store/reducers'
import Screens from './src/screens/screens';
import {Font} from 'expo';
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore)

class App extends Component {

  async componentDidMount(){
    await Font.loadAsync({
      'antonellie': require('./assets/fonts/antonellie.ttf'),
      'openSans' : require('./assets/fonts/openSansRegular.ttf'),
      'openSansB' : require('./assets/fonts/openSansBold.ttf'),
      'openSansI' : require('./assets/fonts/openSansItalic.ttf'),
      'openSansBI' : require('./assets/fonts/openSansBoldItalic.ttf'),
    })
  }

  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <Screens />
      </Provider>
      
    );
  }
}

export default App;

