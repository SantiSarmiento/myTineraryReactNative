import React, { useEffect } from 'react'
import { StyleSheet, ActivityIndicator, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import CityCard from '../components/CityCard'
import citiesActions from '../redux/actions/citiesActions'

const CitiesSection = (props) => {
    
    useEffect(() => {
        props.getCities()
    }, [])

    if (props.cities.cities.length === 0) {
        return (
            <ScrollView style={styles.cities}>
                <ActivityIndicator size="large" color="white" />
            </ScrollView>
        )
    }

    return (
        <ScrollView style={styles.cities}>
            {
                props.cities.cities.map(city => <CityCard city={city} key={city._id} goToCity={props.goToCity} />)
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    cities: {
        flex: 4,
        backgroundColor: '#1d1d1f'
    }
})

const mapStateToProps = state => {
    return {
        cities: state.cities
    }
}

const mapDispatchToProps = {
    getCities: citiesActions.getCities
}

export default connect(mapStateToProps, mapDispatchToProps)(CitiesSection)