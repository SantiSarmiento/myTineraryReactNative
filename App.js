import React from 'react'
import Home from './screens/Home'
import { StatusBar } from 'react-native'
import SignUp from './screens/SignUp'
import SignIn from './screens/SignIn'
import Cities from './screens/Cities'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import mainReducer from './redux/reducers/mainReducer'

const myStore = createStore(mainReducer, applyMiddleware(thunk))

const App = () => {
  return (
    <>
      <Provider store={myStore}>
        <StatusBar />
        {/*       <Home /> */}
        {/*       <SignUp /> */}
        {/*       <SignIn /> */}
        <Cities />
      </Provider>
    </>
  )
}

export default App