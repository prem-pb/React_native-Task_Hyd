import React, { Fragment, useEffect, useState } from 'react';
import { View, Pressable, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Input, Icon, useDisclose, Actionsheet } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux';
import { setIsModal, setIsLoader } from '../store/reducerSlicer'
import { updateUser } from '../Services/Service.Api';
import CustomeModal from '../Components/CustomeModal';
import { FocusAwareStatusBar } from '../useFocusedStatusBar/FocusAwareStatusBar'
import AppHeader from '../AppHeader/AppHeader'

const UserUpdate = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigation();
  const { UserData } = useSelector(state => state?.reducerSlicer);
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();
  const [show, setShow] = useState(false);
  const [value, setValue] = useState({
    name: '',
    email: '',
    gender: '',
    password: ''
  });

  const data = {
    ...value,
    status: 'Active'
  }

  const onUpdate = async () => {
    dispatch(setIsLoader(true))
    await updateUser(UserData?.id, data)
      .then((response) => {
        if (response?.code == 422) {
          dispatch(setIsModal({ data: 'email has already been taken', isOpen: true }))
        } else if (response?.code == 200) {
          Navigate?.goBack()
        }
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
    setValue({
      ...value,
      name: UserData?.name,
      email: UserData?.email,
      gender: UserData?.gender,
    })
  }, [])

  return (
    <Fragment>
      <CustomeModal />
      <FocusAwareStatusBar backgroundColor={'#8ab4f8'} />
      <AppHeader style={{ backgroundColor: '#8ab4f8', }}>
        <Pressable onPress={() => Navigate?.goBack()} style={{ width: 35, height: 35, justifyContent: 'center', alignItems: 'center' }}>
          <AntDesign name={'arrowleft'} color={'#FFFFFF'} size={20} />
        </Pressable>
        <View style={{ flexGrow: 1 }} />
        <Text style={{ fontFamily: 'OpenSans-Bold', textAlign: 'center', color: '#FFFFFF', fontSize: 16 }}>Update User</Text>
        <View style={{ flexGrow: 1 }} />
        <View style={{ width: 35, height: 35, justifyContent: 'center', alignItems: 'center' }}>

        </View>
      </AppHeader>

      <View style={{ marginHorizontal: 15, marginTop: 25, borderRadius: 5, backgroundColor: '#FFFFFF' }}>
        <View style={{ paddingHorizontal: 30, width: '100%', paddingTop: 35, paddingBottom: 50 }}>
          <View style={{ marginTop: 10, width: '100%', backgroundColor: '#8ab4f82b', borderRadius: 5, }}>
            <Input keyboardType={'default'} value={value?.name} onChangeText={(Text) => setValue({ ...value, name: Text })} size="md" variant={'unstyled'} placeholder='Name' InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />} />
          </View>
          <View style={{ marginTop: 10, width: '100%', backgroundColor: '#8ab4f82b', borderRadius: 5 }}>
            <Input keyboardType={'email-address'} value={value?.email} onChangeText={(Text) => setValue({ ...value, email: Text })} size="md" variant={'unstyled'} placeholder='Emial' InputLeftElement={<Icon as={<MaterialCommunityIcons name="email-open" />} size={5} ml="2" color="muted.400" />} />
          </View>
          <Pressable onPress={onOpen} style={{ marginTop: 10, width: '100%', backgroundColor: '#8ab4f82b', borderRadius: 5 }}>
            <Input editable={false} value={value?.gender} size="md" variant={'unstyled'} placeholder='Select Gender'
              InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />}
              InputRightElement={<Icon as={<MaterialIcons name="keyboard-arrow-down" />} size={8} ml="2" color="muted.400" />}
            />
          </Pressable>
          <View style={{ marginTop: 10, width: '100%', backgroundColor: '#8ab4f82b', borderRadius: 5 }}>
            <Input value={value?.password} onChangeText={(Text) => setValue({ ...value, password: Text })} size="md" type={show ? "text" : "password"} variant={'unstyled'} placeholder='Password' InputLeftElement={<Icon as={<FontAwesome name="lock" />} size={5} ml="2" color="muted.400" />} InputRightElement={<Pressable onPress={() => setShow(!show)}>
              <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
            </Pressable>} />
          </View>

          <View style={{ paddingTop: 40, width: '100%' }}>
            <TouchableOpacity onPress={() => onUpdate()} style={{ backgroundColor: '#8ab4f8', height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 16, fontFamily: 'OpenSans-SemiBold' }}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item onPress={(Text) => { setValue({ ...value, gender: 'Male' }), onClose() }}>Male</Actionsheet.Item>
          <Actionsheet.Item onPress={(Text) => { setValue({ ...value, gender: 'Female' }), onClose() }}>Female</Actionsheet.Item>
          <Actionsheet.Item onPress={(Text) => { setValue({ ...value, gender: 'Other' }), onClose() }}>Other</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Fragment>
  )
}

export default UserUpdate