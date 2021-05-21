import 'react-native-gesture-handler'
import React from 'react'

import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import mainReducer from './redux/reducers/mainReducer'
import App2 from './App2'


const myStore = createStore(mainReducer, applyMiddleware(thunk))

const App = (props) => {
  return (
    <>
      <Provider store={myStore}>
        <App2 />
      </Provider>
    </>
  )
}


export default App