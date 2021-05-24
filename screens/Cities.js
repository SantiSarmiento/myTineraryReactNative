import React from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'
import citiesActions from '../redux/actions/citiesActions'
import NavBar from '../components/NavBar'
import CitiesSection from '../components/CitiesSection'

const Cities = (props) => {

    const goToCity = (data) => {
        props.navigation.navigate('City', { data })
    }

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
            <CitiesSection goToCity={goToCity} />
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


const mapDispatchToProps = {
    filterCities: citiesActions.filterCities
}

export default connect(null, mapDispatchToProps)(Cities)