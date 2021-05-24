import React, { useEffect } from 'react'
import NavBar from "../components/NavBar"
import { StyleSheet, ActivityIndicator, ScrollView, ImageBackground, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import itinerariesActions from '../redux/actions/itinerariesActions'
import Itinerary from '../components/Itinerary'
import ItinerariesContainer from '../components/ItinerariesContainer'


const City = (props) => {
    const city = props.route.params.data

    const itineraryInfo = (data) => {
        props.navigation.navigate('itinerary', { itinerary: data })
    }

    return (
        <>
            <NavBar props={props} />
            <ImageBackground style={styles.photo} source={{ uri: city.photo }} ></ImageBackground>
            <ScrollView style={styles.container}>
                <Text style={styles.text}>Available Itineraries for {city.name}</Text>
                <ItinerariesContainer city={city} itineraryInfo={itineraryInfo} />
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    photo: {
        width: '100%',
        height: 210,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 25,
        width: '100%',
        textAlign: 'center',
        color: 'white',
        margin: 10
    },
    container: {
        backgroundColor: '#1d1d1f'
    },
    nuleCard: {
        width: '100%',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nuleText: {
        fontSize: 28,
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
    }
})

const mapStateToProps = state => {
    return {
        itinerariesList: state.itineraries.itineraries,
    }
}

const mapDispatchToProps = {
    getItineraries: itinerariesActions.getItineraries
}

export default connect(mapStateToProps, mapDispatchToProps)(City)