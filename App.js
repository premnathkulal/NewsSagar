import React, { Component } from 'react';
import Main from './components/MainComponent'
import SplashScreen from 'react-native-splash-screen'

class App extends Component {
  componentDidMount(){
    SplashScreen.hide();
  }
  render(){
    return (
      <Main />
    );
  }
};

export default App;
