import Carousel from 'react-native-snap-carousel'
import { ImageBackground, Text, View, Image, StyleSheet } from 'react-native'
import React from 'react'


const MyCarousel = (props) => {
    const activities = props.activities

    _renderItem = ({ item, index }) => {
        return (
            <ImageBackground source={{ uri: item.photo }} style={style.slide}>
                <Text>{item.tittle}</Text>
            </ImageBackground>
        );
    }

    return (
        <Carousel
            ref={(c) => { _carousel = c; }}
            data={activities}
            renderItem={_renderItem}
            sliderWidth={500}
            itemWidth={400}
            layout='default'
        />
    );
}

const style = StyleSheet.create({
    slide:{
        width: '100%',
        height: 200
    }
})

export default MyCarousel
