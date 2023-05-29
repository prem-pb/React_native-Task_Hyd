import React from 'react'
import { View, Text, Modal } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { FocusAwareStatusBar } from '../useFocusedStatusBar/FocusAwareStatusBar'
import { Row, Col } from 'react-native-responsive-grid-system'
import { Button } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { setLogOutModal, setResetAllSates, setAuthLoader } from '../store/reducerSlicer'
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'

export const LogOutFunction = () => {
    const dispatch = useDispatch();
    const { logOutModal } = useSelector(state => state?.reducerSlicer)

    const onLogOut = async () => {
        await RNSecureStorage.remove('isAuth')
        dispatch(setLogOutModal(false))
        dispatch(setResetAllSates(null))
        dispatch(setAuthLoader(true))
    }

    return (
        <Modal visible={logOutModal} transparent={true}>
            <FocusAwareStatusBar backgroundColor={'#00000090'} />
            <View style={{ flex: 1, backgroundColor: '#00000090' }}>
                <View style={{ width: '100%', borderRadius: 10, position: 'absolute', paddingHorizontal: 10, marginBottom: 10, bottom: 0, zIndex: 9999 }}>
                    <Animatable.View animation={'slideInUp'} delay={70} style={{ backgroundColor: '#FFFFFF', width: '100%', elevation: 12, paddingHorizontal: 10, borderRadius: 10 }}>
                        <View style={{ paddingTop: 10 }}>
                            <Text style={{ color: '#000000', fontSize: 22, fontFamily: 'OpenSans-Bold' }}>Native Project</Text>
                        </View>
                        <View style={{ paddingTop: 10 }}>
                            <Text style={{ color: '#000000', fontSize: 20, fontFamily: 'OpenSans-Bold' }}>Log Out ?</Text>
                        </View>
                        <View style={{ paddingTop: 5 }}>
                            <Text style={{ color: 'gray', fontSize: 14, fontFamily: 'OpenSans-SemiBold' }}>Are you sure want to log out ?</Text>
                        </View>

                        <View style={{ marginTop: 50, marginBottom: 20 }}>
                            <Row>
                                <Col xs={5} sm={5} md={5} lg={5}>
                                    <Button
                                        onPress={() => { dispatch(setLogOutModal(false)); }}
                                        mode={'contained'}
                                        buttonColor={'red'}
                                        textColor={'#FFFFFF'}
                                        uppercase={true}
                                        style={{ borderRadius: 8, height: 40, }}
                                        contentStyle={{}}
                                        labelStyle={{ fontFamily: 'OpenSans-Bold', fontSize: 14 }}
                                    >
                                        cancel
                                    </Button>
                                </Col>
                                <Col xs={7} sm={7} md={7} lg={7}>
                                    <Button
                                        onPress={() => onLogOut()}
                                        mode={'contained'}
                                        buttonColor={'#8ab4f8'}
                                        textColor={'#FFFFFF'}
                                        uppercase={true}
                                        style={{ borderRadius: 8, height: 40, }}
                                        contentStyle={{}}
                                        labelStyle={{ fontFamily: 'OpenSans-Bold', fontSize: 14 }}
                                    >
                                        Log out
                                    </Button>
                                </Col>
                            </Row>
                        </View>
                    </Animatable.View>
                </View>
            </View>
        </Modal>
    )
}
