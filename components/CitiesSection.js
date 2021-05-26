import React, { useEffect } from 'react'
import { StyleSheet, ActivityIndicator, ScrollView, Text, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import CityCard from '../components/CityCard'
import citiesActions from '../redux/actions/citiesActions'

const CitiesSection = (props) => {

    useEffect(() => {
        props.getCities()
    }, [])

    if (props.cities.copyCities.length === 0) {
        return (
            <ScrollView style={styles.cities}>
                <ActivityIndicator size="large" color="white" />
            </ScrollView>
        )
    }

    return (
        <ScrollView style={styles.cities}>
            {
                props.cities.cities.length !== 0
                    ?
                    props.cities.cities.map(city => <CityCard city={city} key={city._id} goToCity={props.goToCity} />)
                    :
                    <>
                        <ImageBackground source={require('../assets/otherImg/nule.png')} style={styles.nulePhoto} >
                        </ImageBackground>
                        <Text style={styles.text}>The city that you're looking for is not here, Try another one!</Text>
                    </>
            }
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    cities: {
        flex: 4,
        backgroundColor: '#1d1d1f'
    },
    nulePhoto: {
        width: '100%',
        height: 200
    },
    text: {
        color: 'white',
        backgroundColor: 'black',
        width: '100%',
        textAlign: 'center',
        fontFamily: 'Rajdhani_500Medium',
        fontSize: 25
    }
})

const mapStateToProps = state => {
    return {
        cities: state.cities,
        copyCities: state.cities.copyCities
    }
}

const mapDispatchToProps = {
    getCities: citiesActions.getCities
}

export default connect(mapStateToProps, mapDispatchToProps)(CitiesSection)