import 'react-native-gesture-handler'
import React from 'react'
import { StatusBar } from 'react-native'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import mainReducer from './redux/reducers/mainReducer'
import { NavigationContainer } from '@react-navigation/native'
import Drawer from './navigation/Drawer'

const myStore = createStore(mainReducer, applyMiddleware(thunk))

const App = (props) => {
  return (
    <>
      <Provider store={myStore}>
        <NavigationContainer>
          <StatusBar />
          <Drawer />
        </NavigationContainer>
      </Provider>
    </>
  )
}

export default App