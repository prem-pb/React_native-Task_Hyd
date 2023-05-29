import React, { Fragment, useEffect, useState, } from 'react'
import { View, Text, Image, Modal, Pressable, TouchableOpacity, StatusBar, ToastAndroid, } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FocusAwareStatusBar } from '../useFocusedStatusBar/FocusAwareStatusBar'
import AppHeader from '../AppHeader/AppHeader'
import CustomeModal from '../Components/CustomeModal'
import { deleteUser, } from '../Services'
import { Row, Col } from 'react-native-responsive-grid-system'
import { setIsLoader } from '../store/reducerSlicer'
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux'

const UserScreen = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigation();
  const [userId, setUserId] = useState(null)
  const [isModal, setIsModal] = useState(false)
  const { UserData } = useSelector(state => state?.reducerSlicer);

  const onDelete = async () => {
    dispatch(setIsLoader(true))
    await deleteUser(UserData?.id)
      .then((res) => {
        console.log(res)
        Navigate?.goBack()
      })
      .catch((err) => {
        console.log(err)
        ToastAndroid.showWithGravity(
          'something went wrong, try again',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      })
      .finally(() => {
        dispatch(setIsLoader(false))
      })
  };

  useEffect(() => {
    const getprofile = async () => {
      const data = await RNSecureStorage.get('isAuth')
      const ParseData = JSON.parse(data)
      setUserId(ParseData)
    }
    getprofile();
  }, []);

  return (
    <Fragment>
      <CustomeModal />
      <FocusAwareStatusBar backgroundColor={'#8ab4f8'} />
      <AppHeader style={{ backgroundColor: '#8ab4f8', }}>
        <Pressable onPress={() => Navigate?.goBack()} style={{ width: 35, height: 35, justifyContent: 'center', alignItems: 'center' }}>
          <AntDesign name={'arrowleft'} color={'#FFFFFF'} size={20} />
        </Pressable>
        <View style={{ flexGrow: 1 }} />
        <Text style={{ fontFamily: 'OpenSans-Bold', textAlign: 'center', color: '#FFFFFF', fontSize: 16 }}>User</Text>
        <View style={{ flexGrow: 1 }} />
        <View style={{ width: 35, height: 35, justifyContent: 'center', alignItems: 'center' }}>

        </View>
      </AppHeader>

      <TouchableOpacity style={{ backgroundColor: '#ffffff', padding: 15, marginHorizontal: 15, borderRadius: 5, marginTop: 10, elevation: 3 }}>
        <Text style={{ color: '#000000', fontSize: 18, fontFamily: 'OpenSans-SemiBold' }}>ID: {UserData?.id}</Text>
        <Text style={{ color: '#000000', fontSize: 18, fontFamily: 'OpenSans-SemiBold' }}>Name: {UserData?.name}</Text>
        <Text numberOfLines={1} style={{ color: '#000000', fontSize: 16, fontFamily: 'OpenSans-Regular', paddingTop: 2, paddingBottom: 15 }}>Email: {UserData?.email}</Text>
        <Text numberOfLines={1} style={{ color: '#000000', fontSize: 16, fontFamily: 'OpenSans-Regular', paddingTop: 2, paddingBottom: 15 }}>Gender: {UserData?.gender}</Text>
        <View style={{ backgroundColor: UserData?.status == 'inactive' ? '#f44336' : '#8ab4f8', width: 90, justifyContent: 'center', alignItems: 'center', borderRadius: 5, padding: 5 }}>
          <Text numberOfLines={1} style={{ color: '#FFFFFF', fontSize: 14, fontFamily: 'OpenSans-SemiBold', textTransform: 'uppercase' }}>{UserData?.status}</Text>
        </View>

        <View style={{ marginTop: 15 }}>
          {userId?.user?.id == UserData?.id ? null :
            <Row>
              <Col xs={12} sm={12} md={12}>
                <TouchableOpacity onPress={() => { setIsModal(true) }} style={{ backgroundColor: '#8ab4f8', width: '100%', height: 35, borderRadius: 5, justifyContent: 'center', alignItems: 'center', }}>
                  <Text style={{ color: '#FFFFFF', fontSize: 16, fontFamily: 'OpenSans-SemiBold' }}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </Col>
            </Row>
          }
        </View>
      </TouchableOpacity>

      <Modal visible={isModal} transparent>
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#0000009e' }}>
          <StatusBar translucent={false} barStyle='dark-content' backgroundColor="#0000009e" />
          <View style={{ backgroundColor: '#FFFFFF', width: '85%', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontFamily: 'OpenSans-Bold', marginTop: 25, color: '#000000' }}>
              App
            </Text>

            <Text style={{ fontSize: 16, fontFamily: 'OpenSans-SemiBold', paddingTop: 10, color: '#000000' }}>
              are you sure, you want to delete
            </Text>
            <Pressable onPress={() => { onDelete(); setIsModal(false) }} style={{ backgroundColor: '#6CCF7F', width: '90%', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 30, }}>
              <Text style={{ color: '#ffffff', fontSize: 16, fontFamily: 'OpenSans-SemiBold' }}>
                Yes, Delete
              </Text>
            </Pressable>
            <Pressable onPress={() => { setIsModal(false) }} style={{ backgroundColor: '#f44336', width: '90%', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 40 }}>
              <Text style={{ color: '#ffffff', fontSize: 16, fontFamily: 'OpenSans-SemiBold' }}>
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Fragment>
  )
}

export default UserScreen