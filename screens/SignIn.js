import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Image } from 'react-native'
import { connect } from 'react-redux'
import authorActions from '../redux/actions/authorActions'
import NavBar from '../components/NavBar'
import Toast from 'react-native-toast-message'
import * as Google from "expo-google-app-auth"


const SignIn = (props) => {
    const [user, setuser] = useState({ email: '', password: '', googleUser: false })

    useEffect(() => {
        props.navigation.addListener('blur', () => {
            setuser({ email: '', password: '', googleUser: false })

        })
    }, [])

    const readInput = (e, name) => {
        setuser({
            ...user,
            [name]: e
        })
    }

    const SignInWhitGoogle = async () => {

        const { type, user } = await Google.logInAsync({
            androidClientId: `714215106747-fkvr9mr2kchiqqii2okdubnespb7rngu.apps.googleusercontent.com`
        })
        if (type === "success") {
            const userToSignIn = { email: user.email, password: 'a' + user.id, googleUser: true }
            const response = await props.logInUser(userToSignIn)
            if (response) {
                if (response.success) {
                    setuser({ email: '', password: '', googleUser: false })
                    props.navigation.navigate('Home')
                } else {
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
                text1: "try again later",
                type: 'error',
                autoHide: true,
            })
        }
    }

    const senduser = async () => {
        const response = await props.logInUser(user)
        if (response) {
            if (response.success) {
                setuser({ email: '', password: '', googleUser: false })
                props.navigation.navigate('Home')
            } else {
                Toast.show({
                    type: 'error',
                    text1: response.error,
                    visibilityTime: 3000,
                    autoHide: true,
                })
            }
        }
    }


    return (
        <>
            <NavBar props={props} />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.sigContainer}>
                    <Text style={styles.tittle}>Sign In</Text>
                    <View style={styles.form}>
                        <TextInput
                            placeholder="MY EMAIL"
                            style={styles.input}
                            value={user.email}
                            onChangeText={(e) => readInput(e, 'email')}
                        />
                        <TextInput
                            placeholder="MY PASSWORD"
                            style={styles.input}
                            value={user.password}
                            onChangeText={(e) => readInput(e, 'password')}
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={senduser}
                    >
                        <Text style={styles.buttonText}>SIGN IN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => SignInWhitGoogle()} style={styles.FacebookStyle} activeOpacity={0.5}>
                        <Image source={{ uri: 'http://tingarciadg.com/wp-content/uploads/2021/06/g-logo.png' }} style={styles.ImageIconStyle}
                        />
                        <View style={styles.SeparatorLine} />

                        <Text style={styles.TextStyle}> Sign in with Google </Text>

                    </TouchableOpacity>
                    <Text style={styles.text}>Dont have an account ? <Text onPress={() => props.navigation.navigate('signup')} style={styles.action}>Sign Up here!</Text></Text>
                </View>
            </TouchableWithoutFeedback>
        </>
    )
}

const styles = StyleSheet.create({
    sigContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#DDDDDD'
    },
    input: {
        width: '100%',
        backgroundColor: 'white',
        margin: 20,
        padding: 7,
        letterSpacing: 1.5,
        fontFamily: 'Rajdhani_500Medium'
    },
    form: {
        width: '90%',
        alignItems: 'center'
    },
    tittle: {
        fontSize: 30,
        color: 'black',
        fontFamily: 'Rajdhani_500Medium'
    },
    button: {
        borderWidth: 1,
        marginTop: 5,
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 30
    },
    text: {
        marginTop: 20,
        color: 'black',
        fontSize: 17,
        fontFamily: 'Rajdhani_500Medium'
    },
    buttonText: {
        fontFamily: 'Rajdhani_500Medium',
        fontSize: 18
    },
    action: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'blue',
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

const mapDispatchToProps = {
    logInUser: authorActions.logInUser
}

export default connect(null, mapDispatchToProps)(SignIn)