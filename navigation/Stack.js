import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import { StyleSheet } from 'react-native'
import Cities from '../screens/Cities'
import Home from '../screens/Home'

const stack = createStackNavigator()

const Stack = () => {
    return(
        <stack.Navigator
        screenOptions={{
            headerShown: false
        }}>
            <stack.Screen name="Home" component={Home} options={{
                title: 'Welcome !'
            }} />
            <stack.Screen name="Cities" component={Cities} options={{
                title: 'Our Cities'
            }} />
        </stack.Navigator>
    )
}

export default Stack