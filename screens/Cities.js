import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, ImageBackground, ActivityIndicator, TextInput, ScrollView } from 'react-native'
import { connect, useSelector } from 'react-redux'
import CityCard from '../components/CityCard'
import citiesActions from '../redux/actions/citiesActions'

const Cities = (props) => {
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        props.getCities()
    }, [])


    return (
        <>
            <ImageBackground style={styles.portada} source={require('../assets/otherImg/portadacities.png')}>
            </ImageBackground>
            <View style={styles.filter}>
                <Text style={styles.tittle}>Cities</Text>
                <TextInput
                    placeholder="Search cities !!"
                    style={styles.input}
                    onChangeText={props.filterCities}
                />
            </View>
            <View style={styles.cities}>
                {
                    props.cities.cities.length === 0
                        ?
                        <ActivityIndicator size="large" color="#0000ff" />
                        :
                        props.cities.cities.map(city => <CityCard city={city} key={city._id} />)
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    portada: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    filter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1d1d1f'
    },
    cities: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
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