import React, { Fragment } from 'react'
import { View, Text, Pressable, ScrollView, ToastAndroid } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { FocusAwareStatusBar } from '../useFocusedStatusBar/FocusAwareStatusBar'
import AppHeader from '../AppHeader/AppHeader'
import { useNavigation } from '@react-navigation/native'
import { getByUser } from '../Services'
import { useState } from 'react'
import { useEffect } from 'react'
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'
import { useDispatch } from 'react-redux'
import { setLogOutModal, setIsLoader } from '../store/reducerSlicer'
import { LogOutFunction } from '../Helper/LogOutFunction'
import { Button } from 'react-native-paper'

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const Navigation = useNavigation();
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const getprofile = async () => {
            dispatch(setIsLoader(true))
            const data = await RNSecureStorage.get('isAuth')
            const ParseData = JSON.parse(data)
            await getByUser(ParseData?.user?.id)
                .then((res) => {
                    console.log(res)
                    setUserProfile(res?.data)
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
        }
        getprofile();
    }, []);


    return (
        <Fragment>
            <FocusAwareStatusBar backgroundColor={'#8ab4f8'} />
            <AppHeader style={{ backgroundColor: '#8ab4f8', }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Pressable onPress={() => Navigation.goBack()} style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <Feather name={'chevron-left'} color={'#FFFFFF'} size={30} />
                    </Pressable>
                    <View style={{ flexGrow: 1 }} />
                    <Text style={{ fontFamily: 'OpenSans-Bold', textAlign: 'center', color: '#FFFFFF', fontSize: 16 }}>Profile</Text>
                    <View style={{ flexGrow: 1 }} />
                    <Pressable style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>

                    </Pressable>
                </View>
            </AppHeader>


            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 15, paddingTop: 20, paddingBottom: 20 }}>
                    <View style={{ height: 140, width: 140, backgroundColor: '#8ab4f8', justifyContent: 'center', alignItems: 'center', borderRadius: 100 }}>
                        <Text style={{ color: '#FFFFFF', fontFamily: 'OpenSans-Bold', fontSize: 30 }}>{userProfile?.name?.split(' ')[0]?.slice(0, 1)}{userProfile?.name?.split(' ')[1]?.slice(0, 1)}</Text>
                    </View>
                    <View style={{ marginTop: 25 }}>
                        <Text style={{ color: '#000000', fontFamily: 'OpenSans-Bold', fontSize: 20, textAlign: 'center' }}>{userProfile?.name}</Text>
                        <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 16, textAlign: 'center', paddingTop: 10 }}>{userProfile?.email}</Text>
                        <Text style={{ color: '#252F40', fontFamily: 'OpenSans-SemiBold', fontSize: 16, textAlign: 'center' }}>{userProfile?.gender}</Text>
                    </View>
                </ScrollView>
            </View>

            <View style={{ margin: 10 }}>
                <View style={{ position: 'absolute', width: '100%', bottom: 10, }}>
                    <Button
                        onPress={() => dispatch(setLogOutModal(true))}
                        mode={'contained'}
                        buttonColor={'#8ab4f8'}
                        textColor={'#FFFFFF'}
                        uppercase={true}
                        style={{ borderRadius: 8, height: 40, }}
                        contentStyle={{}}
                        labelStyle={{ fontFamily: 'OpenSans-Bold', fontSize: 14 }}
                    >Log Out</Button>
                </View>
            </View>

            <LogOutFunction />
        </Fragment>
    )
}

export default ProfileScreen