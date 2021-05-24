import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ToastAndroid } from 'react-native'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import NavBar from '../components/NavBar'
import authorActions from '../redux/actions/authorActions'
import Toast from 'react-native-toast-message'

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
        if (!response.success) {
            if (response.error.details) {
                response.error.details.map(error => {
                    errorsImput[error.context.label] = error.message
                    return null
                })
            } else {
                Toast.show({
                    type: 'error',
                    text1: response.error,
                    visibilityTime: 3000,
                    autoHide: true,
                })
            }
            setError(errorsImput)
        } else {
            setNewUser({ firstName: '', lastName: '', email: '', password: '', photoUrl: '' })
            props.navigation.navigate('Home')
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
                        value={newUser.firstName}
                        onChangeText={(e) => readInput(e, 'firstName')}
                    />
                    {error.firstName ? <Text style={styles.error}>{error.firstName}</Text> : <Text></Text>}
                    <TextInput
                        placeholder="MY LAST NAME"
                        style={styles.input}
                        value={newUser.lastName}
                        onChangeText={(e) => readInput(e, 'lastName')}
                    />
                    {error.lastName ? <Text style={styles.error}>{error.lastName}</Text> : <Text></Text>}
                    <TextInput
                        placeholder="MY EMAIL"
                        style={styles.input}
                        value={newUser.email}
                        onChangeText={(e) => readInput(e, 'email')}
                    />
                    {error.email ? <Text style={styles.error}>{error.email}</Text> : <Text></Text>}
                    <TextInput
                        placeholder="MY PASSWORD"
                        style={styles.input}
                        value={newUser.password}
                        onChangeText={(e) => readInput(e, 'password')}
                        secureTextEntry={true}
                    />
                    {error.password ? <Text style={styles.error}>{error.password}</Text> : <Text></Text>}
                    <TextInput
                        placeholder="PHOTO LINK"
                        style={styles.input}
                        value={newUser.photoUrl}
                        onChangeText={(e) => readInput(e, 'photoUrl')}
                    />
                    {error.photoUrl ? <Text style={styles.error}>{error.photoUrl}</Text> : <Text></Text>}
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
        margin: 13,
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
    },
    error: {
        color: 'red',
        fontSize: 13
    }
})

const mapDispatchToProps = {
    createUser: authorActions.createUser
}

export default connect(null, mapDispatchToProps)(SignUp)