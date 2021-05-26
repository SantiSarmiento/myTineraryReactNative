import React, { useEffect, useState } from 'react'
import NavBar from "../components/NavBar"
import { StyleSheet, Text, View, Image, TextInput, Alert } from 'react-native'
import { Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import { connect } from 'react-redux'
import itinerariesActions from '../redux/actions/itinerariesActions'


const Comment = (props) => {
    const [user, setUser] = useState(false)
    const [input, setInput] = useState(false)
    const [commentEdit, setCommentEdit] = useState(props.comment.comment)

    useEffect(() => {
        if (props.user !== null) {
            if (props.user._id === props.comment.user._id) {
                setUser(true)
            }
        } else {
            setUser(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.user])

    const readInput = e => {
        const text = e
        setCommentEdit(text)
    }

    const sendComment = async () => {
        if (commentEdit.trim() !== props.comment.comment) {
            const data = {
                commentId: props.comment._id,
                itineraryId: props.itinerary,
                token: await AsyncStorage.getItem('token')
            }
            const token = await AsyncStorage.getItem('token')
            const editData = { ...data, commentEdit, token }
            props.editMessage(editData)
        }
        setInput(!input)
    }

    const cancel = () => {
        setCommentEdit(props.comment.comment)
        setInput(!input)
    }

    const confirmDeleteComment = async () => {
        const data = {
            commentId: props.comment._id,
            itineraryId: props.itinerary,
            token: await AsyncStorage.getItem('token')
        }
        Alert.alert(
            "Confirm",
            "Are you sure you want to delete message ?",
            [
                {
                    text: "No",
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: () => props.deleteComment(data),
                    style: "destructive",
                }
            ],
        )

    }


    return (
        <View style={styles.commentContainer}>
            {
                user &&
                <>
                    <View style={styles.viewRow}>
                        {
                            !input
                                ?
                                <Icon
                                    name='create'
                                    type='material'
                                    color='black'
                                    onPress={() => setInput(!input)}
                                />
                                :
                                <Icon
                                    name='create'
                                    type='material'
                                    color='green'
                                    onPress={() => sendComment()}
                                />
                        }
                        {
                            !input
                                ?
                                <Icon
                                    name='clear'
                                    type='material'
                                    color='black'
                                    onPress={() => confirmDeleteComment()}
                                />
                                :
                                <Icon
                                    name='clear'
                                    type='material'
                                    color='red'
                                    onPress={() => cancel()}
                                />
                        }
                    </View>
                </>
            }
            <View style={styles.flex}>
                <Image source={{ uri: props.comment.user.photoUrl }} style={styles.photo} />
                <Text style={styles.name}>{props.comment.user.firstName} {props.comment.user.lastName}</Text>
            </View>
            {input
                ?
                <TextInput
                    style={styles.input}
                    value={commentEdit}
                    onChangeText={(e) => readInput(e)}
                    autoFocus={true}
                />
                :
                <Text>{props.comment.comment}</Text>
            }
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
    },
    viewRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        marginHorizontal: 20,
        justifyContent: 'flex-end'
    },
    input: {
        borderBottomWidth: 1,
        padding: 5
    }
})

const mapStateToProps = state => {
    return {
        user: state.authorReducer.userLogged
    }
}

const mapDispatchToProps = {
    editMessage: itinerariesActions.editMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)