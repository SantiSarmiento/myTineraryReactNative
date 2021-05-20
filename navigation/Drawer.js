import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer'
import React from 'react'
import Cities from '../screens/Cities'
import Home from '../screens/Home'
import Stack from './Stack'
import { Icon } from 'react-native-elements'
import { View, Text, StyleSheet, Image } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

const drawer = createDrawerNavigator()

function CustomDrawerContent(props) {
    return (
        <View style={styles.drawer}>
            <View style={styles.userHeader}>
                <Image source={require('../assets/otherImg/login.png')} style={styles.userLogo} />
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList
                    {...props}
                    activeBackgroundColor='#6685A4'
                    labelStyle={{ color: 'white' }}
                />
            </DrawerContentScrollView>
            <DrawerItem
                label="Sign Out"
                labelStyle={{ color: 'white' }}
                icon={() => (
                    <Icon
                        name='logout'
                        type='material'
                        color='white'
                    />
                )}
            />
        </View>
    );
}

const Drawer = () => {
    return (
        <>
            <drawer.Navigator
                drawerContent={props => <CustomDrawerContent {...props} />}
            >
                <drawer.Screen name="home" component={Stack} options={{
                    title: 'Home',
                    drawerIcon: () => <Icon
                        name='home'
                        type='material'
                        color='white'
                    />,
                }} />
                <drawer.Screen name="cities" component={Cities} options={{
                    title: 'Cities',
                    drawerIcon: () => <Icon
                        name='public'
                        type='material'
                        color='white'
                    />
                }} />
            </drawer.Navigator>
        </>
    )
}

const styles = StyleSheet.create({
    drawer: {
        flex: 1,
        backgroundColor: '#283541'
    },
    userHeader: {
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 150
    },
    userLogo: {
        width: 60,
        height: 60,
        margin: 10
    }
})

export default Drawer