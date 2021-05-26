import React, { useEffect, useState } from 'react'
import NavBar from "../components/NavBar"
import { StyleSheet, ActivityIndicator, ScrollView, ImageBackground, Text, TouchableOpacity, View, Image, TextInput } from 'react-native'
import { connect } from 'react-redux'
import itinerariesActions from '../redux/actions/itinerariesActions'
import { Icon } from 'react-native-elements'
import Toast from 'react-native-toast-message'
import Carousel from 'react-native-snap-carousel'
import axios from 'axios'
import MyCarousel from '../components/MyCarousel'
import Comment from '../components/Comment'

const Itinerary = (props) => {
    const [itinerary, setItinerary] = useState()
    const [display, setDisplay] = useState(false)
    const [flag, setFlag] = useState(false)
    const userId = props.user && props.user._id
    const data = { itineraryId: props.route.params.itinerary._id, userId }
    const [activities, setActivities] = useState([])
    const [newComment, setNewComment] = useState('')
    const hearth = itinerary && props.user && itinerary.likes.find(like => like.user === props.user._id) ? 'favorite' : 'favorite-border'

    useEffect(() => {
        props.navigation.addListener('focus', () => {
            console.log("entro aca")
            setItinerary(props.itinerariesList.find(itinerary => itinerary._id === props.route.params.itinerary._id))
        })
        props.navigation.addListener('blur', () => {
            setItinerary(null)
        })
    }, [])

    const setLike = async () => {
        if (props.user) {
            if (!flag) {
                setFlag(true)
                if (itinerary.likes.find(like => like.user === props.user._id)) {
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

    const changeView = () => {
        setDisplay(!display)
        if (!display && activities.length === 0) {
            axios.get('https://mytinerarysarmiento.herokuapp.com/api/activities/' + itinerary._id)
                .then(response => setActivities(response.data.response.activities))
        }
    }

    const readInput = e => {
        const text = e
        setNewComment(text)
        console.log(newComment)
    }

    const disableInput = props.user ? true : false
    const textInput = props.user ? 'Leave a comment' : 'You most be logged to comment'


    if (!itinerary) {
        return null
    }

    return (
        <>
            <NavBar props={props} />
            <View style={styles.container}>
                <Text style={styles.tittle}>{itinerary.tittle}</Text>
                <Image source={{ uri: itinerary.authorPhoto }} style={styles.authorPhoto} />
                <Text style={styles.name}>{itinerary.authorName}</Text>
                <View style={styles.viewRow}>
                    <View style={styles.viewRow}>
                        <Text>{itinerary.likes.length}</Text>
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
                            [...Array(itinerary.price)].map((money, index) =>
                                <Icon
                                    key={index}
                                    name='attach-money'
                                    type='material'
                                    color='green'
                                />)
                        }
                    </View>
                    <Text>Durattion: {itinerary.duration} hs</Text>
                </View>
                <View>
                    <View>
                        <Text style={styles.name}>Activities: </Text>
                        {/*                         <View>
                            <MyCarousel activities={activities} />
                        </View> */}
                    </View>
                    <View style={styles.commentContainer}>
                        <Text style={styles.commentText}>Comments</Text>
                        <View style={styles.commentInputContainer}>
                            <View style={styles.comments}>
                                {
                                    itinerary.comments.map(comment => <Comment key={comment._id} comment={comment} itinerary={itinerary._id} />)
                                }
                            </View>
                            <TextInput
                                placeholder={textInput}
                                style={styles.input}
                                value={newComment}
                                onChangeText={(e) => readInput(e)}
                                editable={disableInput}
                            />
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={() => changeView()} style={styles.button} >
                    <Text >Go back</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#d8e3e7',
        width: '100%',
        minHeight: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
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
        fontSize: 18,
        marginBottom: 5
    },
    viewRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        marginHorizontal: 20,
        justifyContent: 'center'
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
        width: 370,
    },
    commentText: {
        fontSize: 18,
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
    },
    comments: {
        alignItems: 'flex-start',
        width: '100%',
    },
    commentInputContainer: {
        backgroundColor: '#0d1f41',
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        width: '80%',
        color: 'black',
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 15,
        marginBottom: 5
    }
})

const mapStateToProps = state => {
    return {
        user: state.authorReducer.userLogged,
        itinerariesList: state.itineraries.itineraries,
    }
}

const mapDispatchToProps = {
    sendComment: itinerariesActions.sendComment,
    deleteComment: itinerariesActions.deleteComment,
    putLike: itinerariesActions.putLike,
    deleteLike: itinerariesActions.deleteLike
}
export default connect(mapStateToProps, mapDispatchToProps)(Itinerary)