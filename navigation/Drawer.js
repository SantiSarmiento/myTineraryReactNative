import React, { useState } from 'react'
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer'
import { Icon } from 'react-native-elements'
import { View, Text, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux'

import Cities from '../screens/Cities'
import Home from '../screens/Home'
import SignUp from '../screens/SignUp'
import SignIn from '../screens/SignIn'
import authorActions from '../redux/actions/authorActions'
import City from '../screens/City'

const drawer = createDrawerNavigator()

const CustomDrawerContent = ({ props, user, signOut }) => {



    return (
        <View style={styles.drawer}>
            <View style={styles.userHeader}>
                {user ? <Image source={{ uri: user.photoUrl }} style={styles.userLogged} /> : <Image source={require('../assets/otherImg/login.png')} style={styles.userLogo} />}
                {user && <Text style={styles.userInfo}>{user.firstName} {user.lastName}</Text>}
                {user && <Text style={styles.userInfoEmail}>{user.email}</Text>}
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItem
                    label="Home"
                    icon={() => (
                        <Icon
                            name='home'
                            type='material'
                            color='white'
                        />)}
                    labelStyle={{ color: 'white', fontFamily: 'Rajdhani_500Medium', fontSize: 20 }}
                    onPress={() => props.navigation.navigate('Home')}
                />
                <DrawerItem
                    label="Cities"
                    icon={() => (
                        <Icon
                            name='public'
                            type='material'
                            color='white'
                        />)}
                    labelStyle={{ color: 'white', fontFamily: 'Rajdhani_500Medium', fontSize: 20 }}
                    onPress={() => props.navigation.navigate('Cities')}
                />
            </DrawerContentScrollView>
            {user
                ?
                <DrawerItem
                    onPress={signOut}
                    label="Sign Out"
                    labelStyle={{ color: 'white', fontFamily: 'Rajdhani_500Medium', fontSize: 20 }}
                    icon={() => (
                        <Icon
                            name='logout'
                            type='material'
                            color='white'
                        />
                    )}
                />
                :
                <DrawerItem
                    onPress={() => props.navigation.navigate('signin')}
                    label="Sign In"
                    labelStyle={{ color: 'white', fontFamily: 'Rajdhani_500Medium', fontSize: 20 }}
                    icon={() => (
                        <Icon
                            name='login'
                            type='material'
                            color='white'
                        />
                    )}
                />
            }
        </View>
    );
}

const Drawer = ({ user, signOut }) => {

    return (
        <>
            <drawer.Navigator drawerContent={(props) => CustomDrawerContent({ user, props, signOut })}>
                <drawer.Screen name="Home" component={Home} />
                <drawer.Screen name="Cities" component={Cities} />
                <drawer.Screen name="signup" component={SignUp} />
                <drawer.Screen name="signin" component={SignIn} />
                <drawer.Screen name="City" component={City} />
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
        borderBottomWidth: 0.2,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userLogo: {
        width: 100,
        height: 100,
        margin: 10
    },
    userLogged: {
        width: 100,
        height: 100,
        margin: 10,
        borderRadius: 50
    },
    userInfo: {
        fontSize: 25,
        color: 'white',
        margin: 5,
        fontFamily: 'Rajdhani_500Medium'
    },
    userInfoEmail: {
        fontSize: 18,
        color: 'white',
        margin: 5,
        fontFamily: 'Rajdhani_500Medium'
    },
})

const mapStateToProps = state => {
    return {
        user: state.authorReducer.userLogged
    }
}

const mapDispatchToProps = {
    signOut: authorActions.signOut
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)