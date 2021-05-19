import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native'

const SignIn = () => {
    const [user, setuser] = useState({  email: '', password: '' })


    const readInput = (e, name) => {
        setuser({
            ...user,
            [name]: e
        })
    }

    const senduser = () => {
        console.log(user)
    }


    return (
        <>
            <View style={styles.sigContainer}>
                <Text style={styles.tittle}>Sign In</Text>
                <View style={styles.form}>
                    <TextInput
                        placeholder="MY EMAIL"
                        style={styles.input}
                        onChangeText={(e) => readInput(e, 'email')}
                    />
                    <TextInput
                        placeholder="MY PASSWORD"
                        style={styles.input}
                        onChangeText={(e) => readInput(e, 'password')}
                    />
                </View>
                <TouchableOpacity 
                style={styles.button}
                onPress={senduser}
                >
                    <Text>SIGN IN</Text>
                </TouchableOpacity>
                <Text style={styles.text}>Dont have an account ? <Text style={styles.action}>Sign Up here!</Text></Text>
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

export default SignIn