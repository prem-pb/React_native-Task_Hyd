import React, { Fragment, useState } from 'react';
import { View, Button, StatusBar, Pressable, Text, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'
import { useSafeAreaInsets, } from 'react-native-safe-area-context';
import { Input, Icon, useDisclose, Actionsheet } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch } from 'react-redux';
import { Appbar } from 'react-native-paper';
import { setIsModal, setIsLoader, setAuthLoader } from '../store/reducerSlicer'
import { CreateUser } from '../Services/Service.Api';
import CustomeModal from '../Components/CustomeModal';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const RegisterScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [value, setValue] = useState({
    name: '',
    email: '',
    gender: '',
    password: ''
  });

  const data = {
    ...value,
    status: 'Inactive'
  }

  const onSubmit = async () => {
    dispatch(setIsLoader(true))
    await CreateUser(data)
      .then((response) => {
        if (response?.code == 422) {
          dispatch(setIsModal({ data: 'email has already been taken', isOpen: true }))
        } else if (response?.code == 201) {
          dispatch(setAuthLoader(true))
          RNSecureStorage.set("isAuth", JSON.stringify({ user: response?.data }), { accessible: ACCESSIBLE.WHEN_UNLOCKED })
            .then((res) => {
              console.log(res);
            }, (err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        dispatch(setIsLoader(false))
      })
  }

  return (
    <Fragment>
      <CustomeModal />
      <Appbar.Header style={{ backgroundColor: '#EBEBFB' }}>
        <View style={{ backgroundColor: '#FFFFFF', marginLeft: 15, borderRadius: 5, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
        </View>
      </Appbar.Header>
      <ScrollView showsVerticalScrollIndicator={false} justifyContent={'center'} style={{ backgroundColor: '#EBEBFB', }}>
        <View style={{
          flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EBEBFB', paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right,
        }}>

          <FocusAwareStatusBar translucent={false} barStyle='dark-content' backgroundColor="#EBEBFB" />

          <View style={{ width: 115, height: 115, backgroundColor: '#F5F5FC', justifyContent: "center", alignItems: 'center', borderRadius: 50 }}>
            <FontAwesome name={'user'} size={50} color={"#000000"} />
          </View>
          <Text style={{ color: '#000000', textTransform: 'uppercase', fontSize: 14, fontFamily: 'OpenSans-SemiBold', paddingTop: 20, paddingBottom: 20 }}>enter your credentials to Register</Text>

          <View style={{ paddingHorizontal: 15, width: '100%' }}>
            <View style={{ marginTop: 10, width: '100%', backgroundColor: '#8ab4f82b', borderRadius: 5 }}>
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

            <View style={{ paddingTop: 10, width: '100%' }}>
              <View style={{ paddingTop: 10, width: '100%' }}>
                <Pressable onPress={() => onSubmit()} style={{ backgroundColor: '#6CCF7F', width: '100%', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 30, marginBottom: 40 }}>
                  <Text style={{ color: '#ffffff', fontSize: 16, fontFamily: 'OpenSans-SemiBold' }}>
                    Register
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
            <Text style={{ color: '#000000', fontSize: 14, fontFamily: 'OpenSans-Regular' }}>Alrady Register Yet?</Text>
            <Pressable onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
              <Text style={{ color: 'blue', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>LOGIN</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>


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

export default RegisterScreen