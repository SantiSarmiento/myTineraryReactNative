import React from 'react'
import { Text, View, StyleSheet, } from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'
import {
    useFonts,
    Rajdhani_400Regular,
    Rajdhani_500Medium,
    Rajdhani_600SemiBold,

} from '@expo-google-fonts/rajdhani'
import AppLoading from 'expo-app-loading'

const NavBar = (props) => {

    const [fontLoaded] = useFonts({
        Rajdhani_400Regular,
        Rajdhani_500Medium,
        Rajdhani_600SemiBold,
    })

    if (!fontLoaded) {
        return <AppLoading />
    }

    return (
        <>
            <View style={styles.header}>
                <Icon
                    name='menu'
                    type='material'
                    color='white'
                    onPress={() => props.props.navigation.toggleDrawer()} />
                {
                    props.props.route.name === 'City'
                        ?
                        <>
                            <View style={styles.backContainer}>
                                <Icon
                                    name='reply'
                                    type='material'
                                    color='white'
                                    onPress={() => props.props.navigation.navigate('Cities')}
                                />
                                <Text style={styles.text}>Cities</Text>
                            </View>
                        </>
                        :
                        props.props.route.name === 'signin'
                            ?
                            <View style={styles.backContainer}>
                                <Icon
                                    name='reply'
                                    type='material'
                                    color='white'
                                    onPress={() => props.props.navigation.navigate('Home')}
                                />
                                <Text style={styles.text}>Home</Text>
                            </View>
                            :
                            props.props.route.name === 'signup'
                                ?
                                <View style={styles.backContainer}>
                                    <Icon
                                        name='reply'
                                        type='material'
                                        color='white'
                                        onPress={() => props.props.navigation.navigate('Home')}
                                    />
                                    <Text style={styles.text}>Home</Text>
                                </View>
                                :
                                <Text style={styles.welcomeMsg}>{props.props.route.name}</Text>
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: 'black',
        padding: 10,
        flexDirection: 'row'
    },
    welcomeMsg: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Rajdhani_500Medium'
    },
    backContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 20,
        marginLeft: 5,
        fontFamily: 'Rajdhani_500Medium'
    }
})

const mapStateToProps = state => {
    return {
        user: state.authorReducer.userLogged
    }
}

export default connect(mapStateToProps, null)(NavBar)