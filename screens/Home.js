import React from 'react'
import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import NavBar from '../components/NavBar'
import { connect } from 'react-redux'

const Home = (props) => {
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
                            <Text onPress={() => props.navigation.navigate('signup')} style={styles.infoText}>Sign up with email</Text>
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
        color: 'white'
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
        fontSize: 18
    },
    signData: {
        alignItems: 'center'
    }
})

const mapStateToProps = state => {
    return {
        user: state.authorReducer.userLogged
    }
}

export default connect(mapStateToProps, null)(Home)