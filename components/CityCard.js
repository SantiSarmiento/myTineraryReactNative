import React from 'react'
import { Text, ImageBackground, StyleSheet } from 'react-native'

const CityCard = (props) => {


    return (
        <>
            <ImageBackground source={{ uri: props.city.photo }} style={styles.photo}>
                <Text onPress={() => props.goToCity(props.city)} style={styles.text}>{props.city.name}</Text>
            </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    photo: {
        width: '100%',
        height: 200,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 5
    },
    text: {
        fontSize: 25,
        width: '100%',
        textAlign: 'center',
        backgroundColor: 'black',
        color: 'white',
        fontFamily: 'Rajdhani_500Medium'
    }
})

export default CityCard