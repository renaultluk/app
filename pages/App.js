import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5'

import SplashScreen from './SplashScreen';
import Login from './Login';
import Signup from './Signup';
import Alerts from './Alerts';
import DeliveryMap from './Map';
import BatchDetails from './BatchDetails';
import Settings from './Settings';
import Sign from './Sign';
import ScanCargo from './ScanCargo';

import colors from '../styles/colors';

const MainStack = createNativeStackNavigator();
const PageTab = createMaterialBottomTabNavigator();

const TabPages = () => {
  return (
    <PageTab.Navigator
      initialRouteName="Alerts"
      activeColor={colors.tabActiveColor}
      barStyle={{ backgroundColor: colors.primaryColor }}
    >
      <PageTab.Screen
        name="Alerts"
        component={Alerts}
        options={{
          tabBarLabel: 'Alerts',
          tabBarIcon: ({ color }) => (
            <Icon name="bell" color={color} size={20} />
          ),
        }}
      />
      {/* <PageTab.Screen
        name="Map"
        component={DeliveryMap}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ color }) => (
            <Icon name="map-marked-alt" color={color} size={20} />
          ),
        }}
      /> */}
      <PageTab.Screen
        name="BatchDetails"
        component={BatchDetails}
        options={{
          tabBarLabel: "Cargo",
          tabBarIcon: ({ color }) => (
            <Icon name="truck-loading" color={color} size={20} />
          )
        }}
      />
    </PageTab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <MainStack.Screen name="SplashScreen" component={SplashScreen} />
        <MainStack.Screen name="Login" component={Login} />
        <MainStack.Screen name="Signup" component={Signup} />
        <MainStack.Screen name="Main" component={TabPages} />
        <MainStack.Screen name="Settings"
          component={Settings} 
          options={{
            headerShown: true,
          }}
        />
        <MainStack.Screen name="Sign"
          component={Sign}
          options={{
            headerShown: true,
          }}
        />
        <MainStack.Screen name="ScanCargo"
          component={ScanCargo}
          options={{
            headerShown: true,
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
