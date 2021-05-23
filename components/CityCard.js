import React from 'react'
import { View, Text, ImageBackground, Image, StyleSheet } from 'react-native'

const CityCard = (props) => {
    console.log(props)
    return (
        <>
            <ImageBackground source={{ uri: props.city.photo }} style={styles.photo}>
                <Text style={styles.text}>{props.city.name}</Text>
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
        fontSize: 20,
        width: '100%',
        textAlign: 'center',
        backgroundColor: 'black',
        color: 'white'
    }
})

export default CityCard