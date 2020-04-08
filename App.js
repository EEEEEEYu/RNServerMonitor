import React from 'react'
import 'react-native-gesture-handler'
import 'react-native-gesture-handler/Swipeable'
import {AsyncStorage} from 'react-native'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import LoginPage from './pages/Login/LoginPage'
import RegisterPage from './pages/Register/RegisterPage'
import DrawerNavigator from './pages/DrawerNavigator/DrawerNavigator'
import Storage from 'react-native-storage'

//创建全局变量storage用来做本地存储
var storage=new Storage({
    size:1000,
    storageBackend:AsyncStorage,
    defaultExpires:null,
    enableCache:true
})
global.storage=storage
global.UserEmail=''

//应用的三个根页面，分别是登录、注册和抽屉导航页面
const RootStack =createStackNavigator({
    LoginPage:LoginPage,
    RegisterPage:RegisterPage,
    DrawerNavigator:DrawerNavigator
},{
    initialRouteName:'LoginPage',
    headerMode:'none'
})

//生成应用
export default App=createAppContainer(RootStack)
