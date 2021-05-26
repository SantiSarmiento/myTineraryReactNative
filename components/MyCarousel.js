import Carousel from 'react-native-snap-carousel'
import { ImageBackground, Text, View, Image, StyleSheet } from 'react-native'
import React from 'react'


const MyCarousel = (props) => {
    const activities = props.activities

    _renderItem = ({ item, index }) => {
        return (
            <ImageBackground source={{ uri: item.photo }} style={styles.slide}>
                <Text style={styles.text}>{item.tittle}</Text>
            </ImageBackground>
        );
    }

    if(!activities){
        return null
    }

    return (
        <Carousel
            ref={(c) => { _carousel = c; }}
            data={activities}
            renderItem={_renderItem}
            sliderWidth={391}
            itemWidth={400}
            layout='default'
        />
    );
}

const styles = StyleSheet.create({
    slide:{
        height: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 25,
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
        width: '100%',
        textAlign: 'center'
    }
})

export default MyCarousel
