import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import authorActions from '../redux/actions/authorActions'
import NavBar from '../components/NavBar'
import Toast from 'react-native-toast-message'

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
    }
})

const mapDispatchToProps = {
    logInUser: authorActions.logInUser
}

export default connect(null, mapDispatchToProps)(SignIn)