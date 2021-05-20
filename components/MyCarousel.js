import Carousel from 'react-native-snap-carousel'
import { ImageBackground, Text, View, Image } from 'react-native'
import React from 'react'


const MyCarousel = () => {

    const cities = [
        { name: "Venice", id: 1, photo: "../assets/cities/venice.png" },
        { name: "Buenos Aires", id: 2, photo: "../assets/cities/buenosaires.png" },
        { name: "Egypt", id: 3, photo: "../assets/cities/egipto.png" },
        { name: "Greece", id: 4, photo: "../assets/cities/grecia.png" },
        { name: "London", id: 5, photo: "../assets/cities/londres.png" },
        { name: "Morocco", id: 6, photo: "../assets/cities/marruecos.png" },
        { name: "Moscow", id: 7, photo: "../assets/cities/moscu.png" },
        { name: "New York", id: 8, photo: "../assets/cities/newyork.png" },
        { name: "Paris", id: 9, photo: "../assets/cities/paris.png" },
        { name: "Rio de Janeiro", id: 10, photo: "../assets/cities/rio.png" },
        { name: "Sydney", id: 11, photo: "../assets/cities/sydney.png" },
        { name: "Tokyo", id: 12, photo: "../assets/cities/tokyo.png" },
    ]



    _renderItem = ({ item, index }) => {
        console.log(item)
/*         const img = require(item.photo) */
        return (
            <View key={item.id}>
{/*                 <Image source={img} style={styles} /> */}
                <Text>{item.name}</Text>
            </View>
        );
    }

    return (
        <Carousel
            ref={(c) => { _carousel = c; }}
            data={cities}
            renderItem={_renderItem}
            sliderWidth={500}
            itemWidth={400}
            layout='default'
        />
    );
}

export default MyCarousel
