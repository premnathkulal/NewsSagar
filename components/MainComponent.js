import React, { BackHandler } from 'react';
import { Share } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './HomeComponent';
import ChangePaper from './ChangePaperComponent';
import ChangeChannel from './ChangeNewChannel';
import NewsPage from './NewsPageComponent';

const Tab = createMaterialBottomTabNavigator();
const HoemStack = createStackNavigator();
const ChangePaperStack = createStackNavigator();
const CovidStack = createStackNavigator();
const LiveStack = createStackNavigator();

function shareMe() {
  Share.share({
    message: 'http://www.google.com',
    url: 'http://www.google.com',
    title: 'Share this Application'
  }, {
    // Android only:
    dialogTitle: 'Share News Sagar App through ...',
    // iOS only:
    excludedActivityTypes: [
      'com.apple.UIKit.activity.PostToTwitter'
    ]
  })
}

const HomeStackScreen = ({navigation}) => (
    
    <HoemStack.Navigator 
      screenOptions = {{
        headerStyle: {
          backgroundColor: "#009387"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    >
      <HoemStack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          title: "News"
        }}
      />
    </HoemStack.Navigator>
); 

const ChangePaperStackScreen = ({navigation}) => (
    <ChangePaperStack.Navigator 
      screenOptions = {{
        headerStyle: {
          backgroundColor: "#005f87"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    >
      <ChangePaperStack.Screen 
        name="settings" 
        component={ChangePaper} 
        options={{
          title: "Change Paper"
        }}
      />
    </ChangePaperStack.Navigator>
);

const CovidStackScreen = ({navigation}) => (
    <CovidStack.Navigator 
      screenOptions = {{
        headerStyle: {
          backgroundColor: "red"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    >
      <CovidStack.Screen 
        name="COVID-19" 
        component={() => <NewsPage paperUri={"https://www.mygov.in/covid-19"} />} 
        options={{
          title: "COVID-19"
        }}
      />
    </CovidStack.Navigator>
);

const LiveNewsStackScreen = ({navigation}) => (
  <LiveStack.Navigator 
    screenOptions = {{
      headerStyle: {
        backgroundColor: "blue"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}
  >
    <LiveStack.Screen 
      name="Live" 
      component={() => <ChangeChannel />} 
      options={{
        title: "Live"
      }}
    />
  </LiveStack.Navigator>
);

const Main = () => {

  return (
    <NavigationContainer>
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#fff"
        >
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarColor: '#009387',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={ChangePaperStackScreen}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarColor: '#005f87',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="settings" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="COVID-19"
                component={CovidStackScreen}
                options={{
                    tabBarLabel: 'COVID-19',
                    tabBarColor: 'red',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="fire" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Live"
                component={LiveNewsStackScreen}
                options={{
                    tabBarLabel: 'Live News',
                    tabBarColor: 'blue',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="youtube-tv" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Share"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: 'Share',
                    tabBarColor: 'green',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons 
                          name="share-variant" 
                          color={color} size={26}
                        />
                    )
                }}
                listeners={{
                  focus: () => shareMe()
                }}
            />
            <Tab.Screen
                name="Exit"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: 'Exit',
                    tabBarColor: 'tomato',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="exit-to-app" color={color} size={26} />
                    ),
                }}
                listeners={{
                  focus: () => RNExitApp.exitApp()
                }}
            />
        </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Main;

