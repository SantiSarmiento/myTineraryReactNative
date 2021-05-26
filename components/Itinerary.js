import React, { useEffect, useState } from 'react'
import NavBar from "../components/NavBar"
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import itinerariesActions from '../redux/actions/itinerariesActions'
import { Icon } from 'react-native-elements'
import Toast from 'react-native-toast-message'
import Carousel from 'react-native-snap-carousel'
import axios from 'axios'
import MyCarousel from '../components/MyCarousel'
import Comment from '../components/Comment'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Itinerary = (props) => {
    const [display, setDisplay] = useState(false)
    const [flag, setFlag] = useState(false)
    const itineraryId = props.itinerary._id
    const userId = props.user && props.user._id
    const data = { itineraryId, userId }
    const [newComment, setNewComment] = useState('')
    const [activities, setActivities] = useState()
    const hearth = props.user && props.itinerary.likes.find(like => like.user === props.user._id) ? 'favorite' : 'favorite-border'

    useEffect(() => {
        axios.get('https://mytinerarysarmiento.herokuapp.com/api/activities/' + props.itinerary._id)
            .then(response => setActivities(response.data.response.activities))
    }, [])

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

    const disableInput = props.user ? true : false
    const textInput = props.user ? 'Leave a comment' : 'You most be logged to comment'



    const changeView = () => {
        setDisplay(!display)
    }

    const readInput = e => {
        const text = e
        setNewComment(text)
    }

    const sendMessage = async () => {
        if (props.user) {

            if (newComment.trim() !== '') {
                const data = {
                    message: newComment,
                    id: props.itinerary._id,
                    token: await AsyncStorage.getItem('token')
                }
                await props.sendComment(data)
                setNewComment('')
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'You cant send and empyt comment',
                    visibilityTime: 3000,
                    autoHide: true,
                })
            }
        } else {
            Toast.show({
                type: 'info',
                text1: 'You most be logged to comment',
                visibilityTime: 3000,
                autoHide: true,
            })
        }
    }

    const deleteComment = async (data) => {
        props.deleteComment(data)
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.tittle} >{props.itinerary.tittle}</Text>
                <Image source={{ uri: props.itinerary.authorPhoto }} style={styles.authorPhoto} />
                <Text style={styles.name}>{props.itinerary.authorName}</Text>
                <View style={styles.viewRow}>
                    <View style={styles.viewRow}>
                        <Text style={styles.categoryText}>{props.itinerary.likes.length}</Text>
                        <Icon
                            name={hearth}
                            type='material'
                            color='red'
                            onPress={() => setLike()}
                        />
                    </View>
                    <View style={styles.viewRow}>
                        <Text style={styles.categoryText}>Price: </Text>
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
                    <Text style={styles.categoryText}>Durattion: {props.itinerary.duration} hs</Text>
                </View>
                <View style={!display ? { display: 'none' } : { width: '100%' }}>
                    <View>
                        <View>
                            <Text style={styles.commentText}>Activities: </Text>
                            <View>
                                <MyCarousel activities={activities} />
                            </View>
                        </View >
                        <View style={styles.commentContainer}>
                            <Text style={styles.commentText}>Comments</Text>
                            <View style={styles.commentInputContainer}>
                                <ScrollView style={styles.comments}>
                                    {
                                        props.itinerary.comments.map(comment => <Comment key={comment._id} comment={comment} itinerary={props.itinerary._id} deleteComment={deleteComment} />)
                                    }
                                </ScrollView>
                                <View style={styles.viewRow}>
                                    <TextInput
                                        placeholder={textInput}
                                        style={styles.input}
                                        value={newComment}
                                        onChangeText={(e) => readInput(e)}
                                        editable={disableInput}
                                    />
                                    <Icon
                                        name='send'
                                        type='material'
                                        color='white'
                                        onPress={() => sendMessage()}
                                    />
                                </View>
                            </View>
                        </View>
                    </View >
                </View >
                <TouchableOpacity onPress={() => changeView()} style={styles.button} >
                    <Text >{display ? 'View Less' : 'View more'}</Text>
                </TouchableOpacity>
            </View >
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#dddddd',
        width: '95%',
        marginBottom: 20,
        alignItems: 'center'
    },
    tittle: {
        fontSize: 30,
        marginBottom: 5,
        fontFamily: 'Rajdhani_500Medium'
    },
    authorPhoto: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginBottom: 5,
    },
    name: {
        fontSize: 25,
        marginBottom: 5,
        fontFamily: 'Rajdhani_500Medium'
    },
    categoryText: {
        fontFamily: 'Rajdhani_500Medium',
        fontSize: 18
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
        justifyContent: 'center',
    },
    commentContainer: {
        width: '100%',
    },
    comments: {
        minHeight: 200
    },
    commentText: {
        fontSize: 18,
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
    },
    commentInputContainer: {
        backgroundColor: '#0d1f41',
        marginBottom: 5,
    },
    input: {
        width: '90%',
        color: 'black',
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 25,
        marginBottom: 5,
        marginTop: 5,
        marginRight: 20
    }
})

const mapStateToProps = state => {
    return {
        user: state.authorReducer.userLogged
    }
}

const mapDispatchToProps = {
    putLike: itinerariesActions.putLike,
    deleteLike: itinerariesActions.deleteLike,
    sendComment: itinerariesActions.sendComment,
    deleteComment: itinerariesActions.deleteComment,
}
export default connect(mapStateToProps, mapDispatchToProps)(Itinerary)