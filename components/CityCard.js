import React from 'react'
import { View, Text, ImageBackground, Image } from 'react-native'

const CityCard = (props) => {
    return (
        <>
            <Text>{props.city.name}</Text>
        </>
    )
}

export default CityCard