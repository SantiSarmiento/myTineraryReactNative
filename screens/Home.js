import React from 'react'
import { Text, View, StyleSheet, Image, ImageBackground } from 'react-native'
import MyCarousel from '../components/MyCarousel'

const Home = () => {

    return (
        <>
            <ImageBackground style={styles.portada} source={require('../assets/otherImg/portada.png')}>
                <Image style={styles.logo} source={require('../assets/otherImg/logo.png')} />
            </ImageBackground>
            <View style={styles.callToAction}>
                <Text style={styles.infoText}>Great adventures await for you.</Text>
                <Text style={styles.infoText}>What are you waiting for ?</Text>
                <Text style={styles.button}>Search Cities !!</Text>
            </View>
            <View style={styles.carousel}>
                <MyCarousel />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    portada: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 110,
        height: 110
    },
    tittle: {
        fontSize: 30,
    },
    infoText: {
        fontSize: 20,
        marginBottom: 10
    },
    button: {
        borderWidth: 2,
        marginTop: 5,
        padding: 7
    },
    callToAction: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    carousel: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    carouselText: {
        color: '#f8f8ff',
    }
})

export default Home