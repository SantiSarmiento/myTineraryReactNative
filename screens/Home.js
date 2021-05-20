import React from 'react'
import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

const Home = (props) => {
    console.log(props)
    return (
        <>
            <View style={styles.header}>
                <Icon
                    name='menu'
                    type='material'
                    color='white'
                    onPress={() => props.navigation.toggleDrawer()} />
            </View>
            <ImageBackground style={styles.portada} source={require('../assets/otherImg/portada.png')}>
                <Image style={styles.logo} source={require('../assets/otherImg/logo.png')} />
                <View style={styles.callToAction}>
                    <Text style={styles.infoText}>Great adventures await for you.</Text>
                    <Text style={styles.infoText}>What are you waiting for ?</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('cities')} style={styles.button}>
                        <Text style={styles.callToActionText}>Search Cities !!</Text>
                    </TouchableOpacity>
                </View>
                <View>

                </View>
            </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'black',
        padding: 10
    },
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
    callToActionText:{
        fontSize: 18
    }
})

export default Home