import React from 'react';
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


export default class App extends React.Component {

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
      // <View style={styles.container}>
      //   <Text style={styles.title}>Lets test</Text>
      //   <Text style={styles.title}>This is the 2nd line of React Native code</Text>
      // </View>
      // <Landing/>
      // <Registration/>
      // <Login/>
      <Screens/>
    );
  }
}

