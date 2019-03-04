import React from 'react';
import Screens from './src/screens/screens';
import {f, database, auth} from './config/config';


export default class App extends React.Component {

  constructor(props)
  {
    super(props);
    // this.registerUser('test@gmail.com', 'fakepass')

    auth.signOut()
    .then(()=> {
      console.log('logged out')
    }).catch((error) => {
      console.log('error', error);
    });

    f.auth().onAuthStateChanged(function(user){
      if(user){
        //logged import
        console.log('user logged in')
      }else {
        //logged out
        console.log('user logged out')
      }
    })
  }

  registerUser = (email, password) => {
    auth.createUserWithEmailAndPassword(email, password)
    .then((userObj) => console.log(email, password, userObj))
    .catch((error) => console.log('error', error));
  };


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

