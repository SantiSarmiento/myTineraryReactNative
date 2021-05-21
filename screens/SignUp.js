import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ToastAndroid } from 'react-native'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import NavBar from '../components/NavBar'
import authorActions from '../redux/actions/authorActions'

const SignUp = (props) => {
    const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', password: '', photoUrl: '' })
    const [error, setError] = useState({})
    const errorsImput = { firstName: null, lastName: null, email: null, password: null, photoUrl: null, country: null }

    const readInput = (e, name) => {
        setNewUser({
            ...newUser,
            [name]: e
        })
    }

    const sendNewUser = async () => {
        const response = await props.createUser(newUser)
        if (response) {
            console.log(response)
            if (response.error.details) {
                response.error.details.map(error => {
                    errorsImput[error.context.label] = error.message
                    return null
                })
            }
            setError(errorsImput)
        }
    }

    return (
        <>
            <NavBar props={props} />
            <View style={styles.sigContainer}>
                <Text style={styles.tittle}>Sign Up</Text>
                <View style={styles.form}>
                    <TextInput
                        placeholder="MY FIRST NAME"
                        style={styles.input}
                        onChangeText={(e) => readInput(e, 'firstName')}
                    />
                    <TextInput
                        placeholder="MY LAST NAME"
                        style={styles.input}
                        onChangeText={(e) => readInput(e, 'lastName')}
                    />
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
                    <TextInput
                        placeholder="PHOTO LINK"
                        style={styles.input}
                        onChangeText={(e) => readInput(e, 'photoUrl')}
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={sendNewUser}
                >
                    <Text>REGISTER</Text>
                </TouchableOpacity>
                <Text style={styles.text}>Already have an account ? <Text onPress={() => props.navigation.navigate('signin')} style={styles.action}>Sign In here!</Text></Text>
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
        borderWidth: 2,
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
    createUser: authorActions.createUser
}

export default connect(null, mapDispatchToProps)(SignUp)