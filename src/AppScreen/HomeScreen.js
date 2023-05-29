import React, { Fragment, useState, useRef, useEffect } from 'react'
import { View, Text, Image, Pressable, TouchableOpacity, FlatList, } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { FocusAwareStatusBar } from '../useFocusedStatusBar/FocusAwareStatusBar'
import AppHeader from '../AppHeader/AppHeader'
import CustomeModal from '../Components/CustomeModal'
import { getUser, } from '../Services'
import { useDispatch } from 'react-redux';
import { Row, Col } from 'react-native-responsive-grid-system'
import { setIsLoader, setUserData } from '../store/reducerSlicer'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation, useRoute } from '@react-navigation/native'

const HomeScreen = () => {
  const Navigate = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [users, setUser] = useState([{ "email": "pb@gmail.com", "gender": "male", "id": 2277398, "name": "Govind biswas", "status": "inactive" }, { "email": "gpb@gmail.com", "gender": "male", "id": 2277382, "name": "Govind biswas", "status": "inactive" }, { "email": "gb@gmail.com", "gender": "male", "id": 2277365, "name": "Govind biswas", "status": "inactive" }, { "email": "aditeya_arhora@abc.com", "gender": "female", "id": 2275987, "name": "Aditeya Arora", "status": "inactive" }, { "email": "aditeya_arora@abc.com", "gender": "female", "id": 2275073, "name": "Aditeya Arora", "status": "inactive" }, { "email": "mandakini_varrier_amb@hoeger.example", "gender": "male", "id": 2272644, "name": "Amb. Mandakini Varrier", "status": "active" }, { "email": "aaratrika_namboothiri@haag-boyer.example", "gender": "female", "id": 2272643, "name": "Aaratrika Namboothiri", "status": "active" }, { "email": "ananta_chopra@powlowski.test", "gender": "male", "id": 2272642, "name": "Ananta Chopra", "status": "inactive" }, { "email": "mrs_saraswati_kapoor@thiel.test", "gender": "male", "id": 2272641, "name": "Mrs. Saraswati Kapoor", "status": "active" }, { "email": "khan_phd_deven@gibson.test", "gender": "male", "id": 2272640, "name": "Deven Khan PhD", "status": "active" }])

  const fetchData = async () => {
    dispatch(setIsLoader(true))

    await getUser()
      .then((res) => {
        setUser(res?.data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        dispatch(setIsLoader(false))
      })
  };

  useEffect(() => {
    fetchData()
  }, [route]);


  useEffect(() => {
    const unsubscribe = Navigate.addListener('focus', () => {
      fetchData()
    });

    return unsubscribe;
  }, [Navigate])

  return (
    <Fragment>
      <CustomeModal />
      <FocusAwareStatusBar backgroundColor={'#8ab4f8'} />
      <AppHeader style={{ backgroundColor: '#8ab4f8', }}>
        <View style={{ flexGrow: 1 }} />
        <Text style={{ fontFamily: 'OpenSans-Bold', textAlign: 'center', color: '#FFFFFF', fontSize: 16 }}>Home</Text>
        <View style={{ flexGrow: 1 }} />
      </AppHeader>

      <FlatList
        data={users} //users
        ItemSeparatorComponent={() => <View style={{ margin: 8 }} />}
        ListEmptyComponent={() => (
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 8, height: 200, backgroundColor: '#FFFFFF', marginHorizontal: 15, borderRadius: 10, }}>
            <Text style={{ fontSize: 16, fontFamily: 'OpenSans-SemiBold', paddingTop: 10, color: '#000000' }}>
              Data not found
            </Text>
          </View>
        )}
        renderItem={({ item, index }) => {
          return (
            <Fragment>
              <Animatable.View animation='slideInUp' delay={300} style={{}}>
                <TouchableOpacity style={{ backgroundColor: '#ffffff', padding: 15, marginHorizontal: 15, borderRadius: 5, marginTop: index === 0 ? 10 : 0, elevation: 3 }}>
                  <Text style={{ color: '#000000', fontSize: 18, fontFamily: 'OpenSans-SemiBold' }}>{item?.id}</Text>
                  <Text style={{ color: '#000000', fontSize: 18, fontFamily: 'OpenSans-SemiBold' }}>{item?.name}</Text>
                  <Text numberOfLines={1} style={{ color: '#000000', fontSize: 16, fontFamily: 'OpenSans-Regular', paddingTop: 2, paddingBottom: 15 }}>{item?.email}</Text>
                  <Text numberOfLines={1} style={{ color: '#000000', fontSize: 16, fontFamily: 'OpenSans-Regular', paddingTop: 2, paddingBottom: 15 }}>{item?.gender}</Text>
                  <View style={{ backgroundColor: item?.status == 'inactive' ? '#f44336' : '#8ab4f8', width: 90, justifyContent: 'center', alignItems: 'center', borderRadius: 5, padding: 5 }}>
                    <Text numberOfLines={1} style={{ color: '#FFFFFF', fontSize: 14, fontFamily: 'OpenSans-SemiBold', textTransform: 'uppercase' }}>{item?.status}</Text>
                  </View>

                  <View style={{ marginTop: 15 }}>
                    <Row>
                      <Col xs={10} sm={10} md={10}>
                        <TouchableOpacity onPress={() => { dispatch(setUserData(item)); Navigate.navigate('UserUpdate') }} style={{ backgroundColor: '#8ab4f8', width: '100%', height: 35, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ color: '#FFFFFF', fontSize: 16, fontFamily: 'OpenSans-SemiBold' }}>
                            Edit
                          </Text>
                        </TouchableOpacity>
                      </Col>
                      <Col xs={2} sm={2} md={2}>
                        <TouchableOpacity onPress={() => { dispatch(setUserData(item)); Navigate.navigate('UserScreen') }} style={{ backgroundColor: '#8ab4f8', width: '100%', height: 35, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                          <AntDesign name={'arrowright'} color={'#FFFFFF'} size={20} />
                        </TouchableOpacity>
                      </Col>
                    </Row>
                  </View>
                </TouchableOpacity>
              </Animatable.View>
            </Fragment>
          )

        }}
        keyExtractor={item => item?.id}
      />


    </Fragment>
  )
}

export default HomeScreen