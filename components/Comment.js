import React, { useEffect, useState } from 'react'
import NavBar from "../components/NavBar"
import { StyleSheet, ActivityIndicator, ScrollView, ImageBackground, Text, TouchableOpacity, View, Image, TextInput } from 'react-native'
import { connect } from 'react-redux'
import itinerariesActions from '../redux/actions/itinerariesActions'
import { Icon } from 'react-native-elements'

const Comment = (props) => {
    console.log(props)
    return (
        <View style={styles.commentContainer}>
            <View style={styles.flex}>
                <Image source={{ uri: props.comment.user.photoUrl }} style={styles.photo} />
                <Text style={styles.name}>{props.comment.user.firstName} {props.comment.user.lastName}</Text>
            </View>
            <Text>{props.comment.comment}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    commentContainer: {
        backgroundColor: 'white',
        marginVertical: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 20,
        margin: 5
    },
    photo: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    name: {
        fontSize: 17,
        marginLeft: 10
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    }
})

export default Comment