import React, { Fragment } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { HomeScreen, AccountScreen } from '../AppScreen'

const Tab = createBottomTabNavigator();
const ButtomNavigation = () => {
  return (
    <Fragment>
      <Tab.Navigator
        initialRouteName="HomeScreen"
        // tabBar={() => null}
        screenOptions={{
          tabBarInactiveTintColor: '#67748E',
          tabBarActiveTintColor: '#4646F2',
          // tabBarStyle: { display: isTabHide ? 'flex' : 'none', borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingTop: 10, paddingBottom: 10, height: 65, backgroundColor: '#FFFFFF', },
          tabBarStyle: { borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingTop: 10, paddingBottom: 10, height: 65, backgroundColor: '#FFFFFF', },
          tabBarHideOnKeyboard: true,
          tabBarVisible: true,
          safeAreaInset: {
            bottom: "always"
          },
          headerShown: false,
        }}
      >

        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarLabelStyle: {
              fontFamily: 'OpenSans-Regular', fontSize: 12
            },
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <Octicons name="home" color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{
            tabBarLabelStyle: {
              fontFamily: 'OpenSans-Regular', fontSize: 12
            },
            tabBarLabel: 'User',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user-o" color={color} size={20} />
            ),
          }}
        />

      </Tab.Navigator>
    </Fragment>
  )
}

export default ButtomNavigation