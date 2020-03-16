import React from 'react'
import {AsyncStorage} from 'react-native'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import LoginPage from './pages/Login/LoginPage'
import RegisterPage from './pages/Register/RegisterPage'
import DrawerNavigator from './pages/DrawerNavigator/DrawerNavigator'
import Storage from 'react-native-storage'

var storage=new Storage({
    size:1000,
    storageBackend:AsyncStorage,
    defaultExpires:null,
    enableCache:true
})

global.storage=storage

const RootStack =createStackNavigator({
    LoginPage:LoginPage,
    RegisterPage:RegisterPage,
    DrawerNavigator:DrawerNavigator
},{
    initialRouteName:'LoginPage',
    headerMode:'none'
})

export default App=createAppContainer(RootStack)
