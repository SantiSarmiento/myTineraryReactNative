import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ToastAndroid } from 'react-native'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import authorActions from '../redux/actions/authorActions'
import NavBar from '../components/NavBar'

const SignIn = (props) => {
    const [user, setuser] = useState({ email: '', password: '', googleUser: false })


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
                ToastAndroid.showWithGravity(
                    response.error,
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER
                )
            }
        }
    }


    return (
        <>
            <NavBar props={props} />
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
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={senduser}
                >
                    <Text>SIGN IN</Text>
                </TouchableOpacity>
                <Text style={styles.text}>Dont have an account ? <Text onPress={() => props.navigation.navigate('signup')} style={styles.action}>Sign Up here!</Text></Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    sigContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#1d1d1f'
    },
    input: {
        width: '100%',
        backgroundColor: 'white',
        margin: 20,
        padding: 7,
        letterSpacing: 1.5
    },
    form: {
        width: '90%',
        alignItems: 'center'
    },
    tittle: {
        fontSize: 30,
        color: 'white'
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
        color: 'white',
        fontSize: 17
    },
    action: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
    }
})

const mapDispatchToProps = {
    logInUser: authorActions.logInUser
}

export default connect(null, mapDispatchToProps)(SignIn)