import React from 'react'
import {View,SafeAreaView,Text} from 'react-native'
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import LoginPage from './pages/Login/LoginPage'
import RegisterPage from './pages/Register/RegisterPage'
import DrawerNavigator from './pages/DrawerNavigator/DrawerNavigator'


const RootStack =createStackNavigator({
    LoginPage:LoginPage,
    RegisterPage:RegisterPage,
    DrawerNavigator:DrawerNavigator
},{
    initialRouteName:'LoginPage',
    headerMode:'none'
})

export default App=createAppContainer(RootStack)