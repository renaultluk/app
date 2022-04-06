import React from 'react';
import { View, Image } from 'react-native';

import styles from '../styles/pages/SplashScreen';

const SplashScreen = ({ navigation }) => {
    setTimeout(() => navigation.replace("Login", { screen: "Alerts" }), 3000);
  
    return (
    <View style={styles.container}>
        <Image 
          source={require('../assets/images/logo.png')} 
          style={styles.logo}
        />
    </View>
  );
};

export default SplashScreen;