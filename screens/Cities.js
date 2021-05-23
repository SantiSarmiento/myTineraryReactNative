import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, ImageBackground, ActivityIndicator, TextInput, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import CityCard from '../components/CityCard'
import citiesActions from '../redux/actions/citiesActions'
import { Icon } from 'react-native-elements'
import NavBar from '../components/NavBar'

const Cities = (props) => {

    useEffect(() => {
        props.getCities()
    }, [])


    return (
        <>
            <NavBar props={props} />
            <View style={styles.filter}>
                <Text style={styles.tittle}>Cities</Text>
                <TextInput
                    placeholder="Search cities !!"
                    style={styles.input}
                    onChangeText={props.filterCities}
                />
            </View>
            <ScrollView style={styles.cities}>
                {
                    props.cities.cities.length === 0
                        ?
                        <ActivityIndicator size="large" color="#0000ff" />
                        :
                        props.cities.cities.map(city => <CityCard city={city} key={city._id} />)
                }
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    filter: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1d1d1f'
    },
    cities: {
        flex: 4,
        backgroundColor: '#1d1d1f'
    },
    input: {
        width: '80%',
        backgroundColor: 'white',
        margin: 20,
        padding: 7,
        letterSpacing: 1.5,
        borderRadius: 25
    },
    tittle: {
        color: 'white',
        fontSize: 30
    }
})

const mapStateToProps = state => {
    return {
        cities: state.cities
    }
}

const mapDispatchToProps = {
    getCities: citiesActions.getCities,
    filterCities: citiesActions.filterCities
}

export default connect(mapStateToProps, mapDispatchToProps)(Cities)