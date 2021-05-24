import React, { useEffect } from 'react'
import { StyleSheet, ImageBackground, Text, View } from 'react-native'
import { connect } from 'react-redux'
import itinerariesActions from '../redux/actions/itinerariesActions'
import Itinerary from '../components/Itinerary'


const ItineraresContainer = (props) => {
    const city = props.city

    useEffect(() => {
        props.getItineraries(city._id)
    }, [city])

    return (
        <>
            {
                props.itinerariesList.length === 0
                    ?
                    <>
                        <ImageBackground key={0} source={require('../assets/otherImg/nule2.png')} style={styles.nuleCard}>
                            <Text style={styles.nuleText}>We don't have any itineraries yet, do you want to be the first?</Text>
                        </ImageBackground>
                    </>
                    :
                    <View style={styles.itineraryContainer}>
                        {
                            props.itinerariesList.map(itinerary => <Itinerary key={itinerary._id} itinerary={itinerary} user={props.user} itineraryInfo={props.itineraryInfo} />)
                        }
                    </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    photo: {
        width: '100%',
        height: 250,
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
    },
    itineraryContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})

const mapStateToProps = state => {
    return {
        itinerariesList: state.itineraries.itineraries,
        user: state.authorReducer.userLogged
    }
}

const mapDispatchToProps = {
    getItineraries: itinerariesActions.getItineraries
}

export default connect(mapStateToProps, mapDispatchToProps)(ItineraresContainer)