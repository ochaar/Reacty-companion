import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Research from './SearchLogin';
import Details from './Details';
import { TouchableOpacity, Text, View } from 'react-native';

const Stack = createStackNavigator();
const headerOptions = {
  headerTintColor: '#fff',
  headerStyle: {
    backgroundColor: '#292D39',
  },
  headerTitleStyle: {
    fontWeight: 'bold',
  }
};

function Cursus({navigation, route}) {

  return (
    <View>
    <TouchableOpacity onPress={() => navigation.setParams({
      cursusId:
        route.params.cursusId === true ? false : true})}>
      {
        route.params.cursusId ? <Text style={{color: '#fff', marginRight: 5}}>Old Cursus</Text> :
        <Text style={{color: '#fff', marginRight: 5}}>New Cursus</Text>
      }
    </TouchableOpacity>
    </View>
  )
};

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={headerOptions}>
        <Stack.Screen name='Home' component={Research}  options={() => ({
        title: 'Welcome'
        })}/>
        <Stack.Screen name='Details' component={Details} options={({ route, navigation }) => ({
        title: route.params.userData.login,
        headerRight: () => <Cursus navigation={navigation} route={route}/>
        })}/>
      </Stack.Navigator>
    </NavigationContainer> 
  );
}

export default function App() {
  return <AppNavigator/>
}
