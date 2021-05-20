import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import icons from '@expo/vector-icons/Ionicons'
import React from 'react'
import Cities from '../screens/Cities'
import Home from '../screens/Home'

const bottom = createBottomTabNavigator()

const Bottom = (props) => {
    return (
        <bottom.Navigator>
            <bottom.Screen name="welcome" component={Home} options={{
                title: 'Home!',
            }} />
            <bottom.Screen name="amigos" component={Cities} options={{
                title: 'Cities',
            }}/>
        </bottom.Navigator>
    )
}

export default Bottom