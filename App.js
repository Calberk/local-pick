import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Landing from './components/landing'

export default class App extends React.Component {
  render() {
    return (
      // <View style={styles.container}>
      //   <Text style={styles.title}>Lets test</Text>
      //   <Text style={styles.title}>This is the 2nd line of React Native code</Text>
      // </View>
      <Landing/>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     color: '#fff'
//   }
// });
