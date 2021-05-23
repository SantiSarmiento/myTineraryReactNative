import 'react-native-gesture-handler'
import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Drawer from './navigation/Drawer'
import { connect } from 'react-redux'
import Toast from 'react-native-toast-message'


const App = (props) => {
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
        userLogged: state.userLogged
    }
}

export default connect(mapStateToProps, null)(App)