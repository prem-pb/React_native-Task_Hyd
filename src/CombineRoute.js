import { Fragment, useEffect, useState } from 'react'
import RNSecureStorage from 'rn-secure-storage'
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AppNavigation from './Navigation/AppNavigation';
import RootNavigation from './Navigation/RootNavigation';
import { setAuthLoader } from './store/reducerSlicer'

const CombineRoute = () => {
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(false);
  const { authLoading } = useSelector(state => state?.reducerSlicer);

  useEffect(() => {
    RNSecureStorage.get("isAuth")
      .then((value) => {
        setIsAuth(true)
      }).catch((err) => {
        setIsAuth(false)
      })
      .finally(() => {
        dispatch(setAuthLoader(false))
      })
  }, [authLoading]);

  if (authLoading) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#EBEBFB' }}>
        <StatusBar translucent={false} barStyle='dark-content' backgroundColor="#EBEBFB" />
        <ActivityIndicator animating={true} size={'large'} color={'#6CCF7F'} />
      </View>
    )
  }

  return (
    <Fragment>
      {isAuth ?
        <AppNavigation />
        :
        <RootNavigation />
      }
    </Fragment>
  )
}

export default CombineRoute