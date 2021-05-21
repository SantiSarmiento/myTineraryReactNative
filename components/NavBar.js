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
                    props.user && <Text style={styles.welcomeMsg}>Welcome {props.user.firstName}</Text>

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
    }
})

const mapStateToProps = state => {
    return {
        user: state.authorReducer.userLogged
    }
}

export default connect(mapStateToProps, null)(NavBar)