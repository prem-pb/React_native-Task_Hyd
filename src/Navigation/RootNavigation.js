import React, { Fragment } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import {
  LoginScreen,
  RegisterScreen
} from '../RootScreen';
import { forSlideAnimate, configAnimate } from './NavigationAnimate';

const Stack = createStackNavigator();
const AppNavigation = () => {
  return (
    <Fragment>
      <Stack.Navigator screenOptions={{ headerShown: false, transitionSpec: { open: configAnimate, close: configAnimate }, cardStyleInterpolator: forSlideAnimate, /* presentation: 'modal', headerShown: false, gestureDirection: 'horizontal', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, gestureEnabled: false, */ }}>
        <Stack.Screen name='LoginScreen' component={LoginScreen} />
        <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
      </Stack.Navigator>
    </Fragment>
  )
}

export default AppNavigation