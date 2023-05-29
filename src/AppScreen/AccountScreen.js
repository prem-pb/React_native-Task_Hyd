import React, { Fragment } from 'react'
import { View, Text, Pressable, BackHandler } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { FocusAwareStatusBar } from '../useFocusedStatusBar/FocusAwareStatusBar'
import AppHeader from '../AppHeader/AppHeader'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setLogOutModal } from '../store/reducerSlicer'
import { LogOutFunction } from '../Helper/LogOutFunction'

const AccountScreen = () => {
    const dispatch = useDispatch();
    const Navigation = useNavigation();

    const data = [
        { id: 1, name: 'My Profile', navigation: () => Navigation.navigate('ProfileScreen'), mainicon: <MaterialIcons size={22} name={'work'} color={'#000000'} />, icon: <Feather size={25} name={'chevron-right'} color={'#000000'} /> },
        { id: 2, name: 'Privacy policy', navigation: () => { }, mainicon: <MaterialIcons size={22} name={'privacy-tip'} color={'#000000'} />, icon: <Feather size={25} name={'chevron-right'} color={'#000000'} /> },
        { id: 3, name: 'About Us', navigation: () => { }, mainicon: <MaterialIcons size={22} name={'info'} color={'#000000'} />, icon: <Feather size={25} name={'chevron-right'} color={'#000000'} /> },
        { id: 4, name: 'Contact Us', navigation: () => { }, mainicon: <MaterialIcons size={22} name={'quick-contacts-mail'} color={'#000000'} />, icon: <Feather size={25} name={'chevron-right'} color={'#000000'} /> },
        { id: 5, name: 'Feedback', navigation: () => { }, mainicon: <MaterialIcons size={22} name={'feedback'} color={'#000000'} />, icon: <Feather size={25} name={'chevron-right'} color={'#000000'} /> },
        { id: 6, name: 'Logout', navigation: () => { dispatch(setLogOutModal(true)); }, mainicon: <MaterialIcons size={22} name={'logout'} color={'#000000'} />, icon: <Feather size={25} name={'chevron-right'} color={'#000000'} /> },
    ];

    return (
        <Fragment>
            <FocusAwareStatusBar backgroundColor={'#8ab4f8'} />
            <AppHeader style={{ backgroundColor: '#8ab4f8', }}>
                <View style={{ flexGrow: 1 }} />
                <Text style={{ fontFamily: 'OpenSans-Bold', textAlign: 'center', color: '#FFFFFF', fontSize: 16 }}>Profile</Text>
                <View style={{ flexGrow: 1 }} />
            </AppHeader>
            <View style={{ flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 15 }}>
                {data.map((value, index) => (
                    <Pressable onPress={value.navigation} key={index} style={{ flexDirection: 'row', marginTop: 13, paddingHorizontal: 15, alignItems: 'center', height: 55, backgroundColor: '#8ab4f82b', borderRadius: 50 }}>
                        {value?.mainicon}
                        <Text style={{ color: '#000000', fontSize: 14, fontFamily: 'OpenSans-Bold', paddingLeft: 10 }}>{value?.name}</Text>
                        <View style={{ flexGrow: 1 }} />
                        {value?.icon}
                    </Pressable>
                ))}
            </View>
            <LogOutFunction />
        </Fragment>
    )
}

export default AccountScreen;
