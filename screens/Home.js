import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native'
import NavBar from '../components/NavBar'
import { connect } from 'react-redux'
import * as Google from 'expo-google-app-auth'
import Toast from 'react-native-toast-message'
import authorActions from '../redux/actions/authorActions'

const Home = (props) => {

    const SignUpWhitGoogle = async () => {

        const { type, user } = await Google.logInAsync({
            androidClientId: `714215106747-fkvr9mr2kchiqqii2okdubnespb7rngu.apps.googleusercontent.com`
        })
        if (type === "success") {
            const newUser = {
                firstName: user.familyName,
                lastName: user.givenName,
                email: user.email,
                password: 'a' + user.id,
                photoUrl: user.photoUrl,
                googleUser: true
            }
            const response = await props.createUser(newUser)
            if (response) {
                if (!response.success) {
                    Toast.show({
                        type: 'error',
                        text1: response.error,
                        visibilityTime: 3000,
                        autoHide: true,
                    })
                }
            }
        }
        else {
            Toast.show({
                text1: message,
                type: 'error',
                position: 'bottom',
            })
        }
    }

    return (
        <>
            <NavBar props={props} />
            <ImageBackground style={styles.portada} source={require('../assets/otherImg/portada.png')}>
                <Image style={styles.logo} source={require('../assets/otherImg/logo.png')} />
                <View style={styles.callToAction}>
                    <Text style={styles.infoText}>Great adventures await for you.</Text>
                    <Text style={styles.infoText}>What are you waiting for ?</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Cities')} style={styles.button}>
                        <Text style={styles.callToActionText}>Search Cities !!</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.signData}>
                    {
                        !props.user
                        &&
                        <>
                            <TouchableOpacity onPress={() => SignUpWhitGoogle()} style={styles.FacebookStyle} activeOpacity={0.5}>
                                <Image source={{ uri: 'http://tingarciadg.com/wp-content/uploads/2021/06/g-logo.png' }} style={styles.ImageIconStyle}
                                />
                                <View style={styles.SeparatorLine} />

                                <Text style={styles.TextStyle}> Sign Up with Google </Text>

                            </TouchableOpacity>
                            <Text onPress={() => props.navigation.navigate('signup')} style={styles.infoText}>Sign up with form</Text>
                            <Text onPress={() => props.navigation.navigate('signin')} style={styles.infoText}>Sign In</Text>
                        </>
                    }
                </View>
            </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    portada: {
        flex: 10,
        alignItems: 'center',
        justifyContent: 'space-around'

    },
    logo: {
        width: 110,
        height: 110
    },
    infoText: {
        fontSize: 25,
        marginBottom: 10,
        color: 'white',
        fontFamily: 'Rajdhani_500Medium'
    },
    button: {
        marginTop: 5,
        backgroundColor: 'white',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 20
    },
    callToAction: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    callToActionText: {
        fontSize: 18,
        fontFamily: 'Rajdhani_600SemiBold'
    },
    signData: {
        alignItems: 'center'
    },

    FacebookStyle: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: .5,
        borderColor: '#fff',
        height: 50,
        borderRadius: 5,
        margin: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        elevation: 4,
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        width: 200,
        marginBottom: 15,
        marginTop: 15

    },

    ImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',

    },
    TextStyle: {
        color: "gray",
        marginBottom: 4,
        marginRight: 20,
        fontFamily: 'Rajdhani_600SemiBold'
    },

    SeparatorLine: {
        backgroundColor: '#fff',
        width: 1,
        height: 40

    },
})

const mapStateToProps = state => {
    return {
        user: state.authorReducer.userLogged
    }
}
const mapDispatchToProps = {
    createUser: authorActions.createUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)