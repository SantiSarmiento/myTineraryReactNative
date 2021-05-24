import React from 'react'
import { Text, View, StyleSheet, } from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'

const NavBar = (props) => {
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
        fontSize: 18
    },
    backContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 18,
        marginLeft: 5
    }
})

const mapStateToProps = state => {
    return {
        user: state.authorReducer.userLogged
    }
}

export default connect(mapStateToProps, null)(NavBar)