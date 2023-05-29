import React, { Fragment, useState } from 'react';
import { ActivityIndicator, Modal, View, Button, StatusBar, Pressable, Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setIsModal } from '../store/reducerSlicer'

const CustomeModal = () => {
    const dispatch = useDispatch()
    const { isOpen,
        isData,
        isLoader } = useSelector(state => state?.reducerSlicer)
    const onCloseModal = () => {
        dispatch(setIsModal({ data: null, isOpen: false }))
    }

    return (
        <Fragment>
            <Modal visible={isOpen} transparent>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#0000009e' }}>
                    <StatusBar translucent={false} barStyle='dark-content' backgroundColor="#0000009e" />
                    <View style={{ backgroundColor: '#FFFFFF', width: '85%', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontFamily: 'OpenSans-Bold', marginTop: 25, color: '#000000' }}>
                            App
                        </Text>

                        <Text style={{ fontSize: 16, fontFamily: 'OpenSans-SemiBold', paddingTop: 10, color: '#000000' }}>
                            {isData}
                        </Text>
                        <Pressable onPress={() => onCloseModal()} style={{ backgroundColor: '#6CCF7F', width: '90%', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 30, marginBottom: 40 }}>
                            <Text style={{ color: '#ffffff', fontSize: 16, fontFamily: 'OpenSans-SemiBold' }}>
                                Ok
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Modal visible={isLoader} transparent>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#0000009e' }}>
                    <StatusBar translucent={false} barStyle='dark-content' backgroundColor="#0000009e" />
                    <ActivityIndicator animating={true} size={'large'} color={'#6CCF7F'} />
                </View>
            </Modal>
        </Fragment>
    )
}

export default CustomeModal