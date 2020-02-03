import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import UserInfoMain from './UserInfoMain'
import UserBindMail from './UserBindMail'
import UserBindPhone from './UserBindPhone'

const UserInfoRootStack=createStackNavigator({
  UserInfoMain:UserInfoMain,
  UserBindMail:UserBindMail,
  UserBindPhone:UserBindPhone
},{
  initialRouteName:"UserInfoMain",//设置初始页面
  headerMode:"none",//隐藏页眉
  navigationOptions:({navigation})=>({
    tabBarVisible: navigation.state.index===0
  })
})

export default UserInfoRootStack