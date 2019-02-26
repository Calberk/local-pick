import React from 'react';
import LoginScreens from './src/screens/loginScreens'


export default class App extends React.Component {
  render() {
    return (
      // <View style={styles.container}>
      //   <Text style={styles.title}>Lets test</Text>
      //   <Text style={styles.title}>This is the 2nd line of React Native code</Text>
      // </View>
      // <Landing/>
      // <Registration/>
      // <Login/>
      <LoginScreens/>
    );
  }
}

