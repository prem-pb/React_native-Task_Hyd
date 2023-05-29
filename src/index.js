import { SafeAreaProvider, } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { NativeBaseProvider, Box } from "native-base"
import { ActivityIndicator, View, StatusBar } from 'react-native';
import { store } from './store';
import CombineRoute from './CombineRoute';

export const App = () => {


  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NativeBaseProvider>
          <NavigationContainer fallback={
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EBEBFB', }}>
              <StatusBar translucent={false} barStyle={'dark-content'} backgroundColor="#EBEBFB" />
              <ActivityIndicator size={'large'} color={'#F25555'} />
            </View>
          }>
            <CombineRoute />
          </NavigationContainer>
        </NativeBaseProvider>
      </SafeAreaProvider>
    </Provider>
  )
}

export default App