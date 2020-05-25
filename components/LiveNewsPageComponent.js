import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, BackHandler, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import Orientation from "react-native-orientation";

class LiveNewsPage extends Component {
  
  constructor(props) {
    super(props);
    this.WEBVIEW_REF = React.createRef();
  }

  activityIndicatorGif = () => {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = ()=>{
    this.WEBVIEW_REF.current.goBack();
    return true;
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack
    });
  }

  render(){
    Orientation.lockToPortrait();
    return (
        <WebView
            source={{ uri: this.props.channelUri }} 
            ref={this.WEBVIEW_REF}
            onNavigationStateChange={this.onNavigationStateChange.bind(this)}
            renderLoading={() => {
                return this.activityIndicatorGif();
            }}
            startInLoadingState={true}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default LiveNewsPage;