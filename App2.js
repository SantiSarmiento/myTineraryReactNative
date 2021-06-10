import 'react-native-gesture-handler'
import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Drawer from './navigation/Drawer'
import { connect } from 'react-redux'
import Toast from 'react-native-toast-message'
import authorActions from './redux/actions/authorActions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    useFonts,
    Rajdhani_400Regular,
    Rajdhani_500Medium,
    Rajdhani_600SemiBold,
} from '@expo-google-fonts/rajdhani'
import AppLoading from 'expo-app-loading'

const App = (props) => {

    const [fontLoaded] = useFonts({
        Rajdhani_400Regular,
        Rajdhani_500Medium,
        Rajdhani_600SemiBold,
    })

    if (!fontLoaded) {
        return <AppLoading />
    }

    const forzedUser = async () => {
        const token = await AsyncStorage.getItem('token')
        if (!props.user && token) {
            const userData = await AsyncStorage.getItem('userLogged')
            const userLoggedForzed = {
                token: token,
                ...userData
            }
            props.forzedLogin(userLoggedForzed)
        }
    }
    forzedUser()

    return (
        <>
            <NavigationContainer>
                <StatusBar />
                <Drawer />
                <Toast ref={(ref) => Toast.setRef(ref)} />
            </NavigationContainer>
        </>
    )
}

const mapStateToProps = state => {
    return {
        user: state.authorReducer.userLogged
    }
}

const mapDispatchToProps = {
    forzedLogin: authorActions.forzedLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(App)