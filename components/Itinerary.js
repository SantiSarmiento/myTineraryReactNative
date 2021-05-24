import React, { useEffect, useState } from 'react'
import NavBar from "../components/NavBar"
import { StyleSheet, ActivityIndicator, ScrollView, ImageBackground, Text, TouchableOpacity, View, Image } from 'react-native'
import { connect } from 'react-redux'
import itinerariesActions from '../redux/actions/itinerariesActions'
import { Icon } from 'react-native-elements'
import Toast from 'react-native-toast-message'


const Itinerary = (props) => {
    const [display, setDisplay] = useState(false)
    const [flag, setFlag] = useState(false)
    const itineraryId = props.itinerary._id
    const userId = props.user && props.user._id
    const data = { itineraryId, userId }

    const hearth = props.user && props.itinerary.likes.find(like => like.user === props.user._id) ? 'favorite' : 'favorite-border'

    const setLike = async () => {
        if (props.user) {
            if (!flag) {
                setFlag(true)
                if (props.itinerary.likes.find(like => like.user === props.user._id)) {
                    const response = await props.deleteLike(data)
                    if (response) {
                        setFlag(false)
                    }
                } else {
                    const response = await props.putLike(data)
                    if (response) {
                        setFlag(false)
                    }
                }
            }
        } else {
            Toast.show({
                type: 'error',
                text1: 'You must be logged to like a itinerary',
                visibilityTime: 3000,
                autoHide: true,
            })
        }
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.tittle}>{props.itinerary.tittle}</Text>
                <Image source={{ uri: props.itinerary.authorPhoto }} style={styles.authorPhoto} />
                <Text style={styles.name}>{props.itinerary.authorName}</Text>
                <View style={styles.viewRow}>
                    <View style={styles.viewRow}>
                        <Text>{props.itinerary.likes.length}</Text>
                        <Icon
                            name={hearth}
                            type='material'
                            color='red'
                            onPress={() => setLike()}
                        />
                    </View>
                    <View style={styles.viewRow}>
                        <Text>Price: </Text>
                        {
                            [...Array(props.itinerary.price)].map((money, index) =>
                                <Icon
                                    key={index}
                                    name='attach-money'
                                    type='material'
                                    color='green'
                                />)
                        }
                    </View>
                    <Text>Durattion: {props.itinerary.duration} hs</Text>
                </View>
                <TouchableOpacity onPress={() => setDisplay(!display)} style={styles.button}>
                    <Text >{display ? 'View less' : 'View more'}</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#d8e3e7',
        width: '90%',
        marginBottom: 20,
        alignItems: 'center'
    },
    tittle: {
        fontSize: 20,
        marginBottom: 5
    },
    authorPhoto: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginBottom: 5,
    },
    name: {
        fontSize: 15,
        marginBottom: 5
    },
    viewRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        marginHorizontal: 20

    },
    button: {
        backgroundColor: 'white',
        marginBottom: 5,
        borderColor: 'black',
        borderWidth: 1,
        width: 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


const mapDispatchToProps = {
    sendComment: itinerariesActions.sendComment,
    deleteComment: itinerariesActions.deleteComment,
    putLike: itinerariesActions.putLike,
    deleteLike: itinerariesActions.deleteLike
}
export default connect(null, mapDispatchToProps)(Itinerary)