import 'react-native-gesture-handler';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Card, Icon, Image } from 'react-native-elements';
import { View, ScrollView, StyleSheet, Text, Button, BackHandler, ActivityIndicator } from 'react-native';
import NewsPage from './NewsPageComponent';

class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      paperUri: undefined
    }
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('paperUri');
      this.setState({ paperUri: value });
    } catch(e) {
      // error reading value
    }
  }

  render(){
    this.getData();
    if(this.state.paperUri != undefined ){
      return (
        <NewsPage paperUri={this.state.paperUri} />
      );
    }
    else{
      return(
        <ScrollView>
          <Card title="WELLCOME" titleStyle={{fontSize: 30}} >
              <View style={styles.container}>
                <Image style={styles.image} source={require('./images/welcome_logo.gif')} />
              </View>
              <Text />
              <Text style={{fontSize: 20, alignItems: "center"}}>
                Thanks For Installing News Sagar
              </Text>
              <Text />
              <Button 
                onPress={() => {this.props.navigation.navigate('Settings')}}
                color="#512DA8"
                title="Get Start"
              />
          </Card>
          <Text />
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  },
  image: {
  height: 250,
  width: 250
  }
});

export default HomeScreen;
