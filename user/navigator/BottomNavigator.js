import React, { Component } from 'react'
import {Image,StyleSheet, Alert} from 'react-native'

import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator,BottomTabBar} from 'react-navigation-tabs'
import NodeDetailScreen from '../pages/nodedetail/NodeDetail'
import NodeManageScreen from '../pages/nodemanage/NodeManage'
import UserInfoRootStack from '../pages/userinfo/UserInfoContainer'

//父导航器配置信息
const TabNavigatorConfig={
    //子路由
    UserScreen:{
        screen:UserInfoRootStack,
        navigationOptions:{
            //配置子路由详细信息
            tabBarLabel:'用户信息',
            tabBarIcon:({focused})=>{
                if(!focused) return <Image source={require('../assets/icon/User.png')} style={styles.bottomTabIconStyle}/>
                else return <Image source={require('../assets/icon/UserSelected.png')} style={styles.bottomTabIconStyle}/>
            }
        }
    },
    NodeManageScreen:{
        screen:NodeManageScreen,
        navigationOptions:{
            tabBarLabel:'节点管理',
            tabBarIcon:({focused})=>{
                if(!focused) return <Image source={require('../assets/icon/NodeManage.png')} style={styles.bottomTabIconStyle}/>
                else return <Image source={require('../assets/icon/NodeManageSelected.png')} style={styles.bottomTabIconStyle}/>
            }
        }
    },
    NodeDetailScreen:{
        screen:NodeDetailScreen,
        navigationOptions:{
            tabBarLabel:'节点详细信息',
            tabBarIcon:({focused})=>{
                if(!focused) return <Image source={require('../assets/icon/NodeDetail.png')} style={styles.bottomTabIconStyle}/>
                else return <Image source={require('../assets/icon/NodeDetailSelected.png')} style={styles.bottomTabIconStyle}/>
            }
        }
    },
}

class BottomNavigator extends React.Component{
    render(){
        //生成父导航器
        const BottomNavigator=createAppContainer(createBottomTabNavigator(
            //参数1:父导航器自定义配置
            //参数2:默认导航器
            TabNavigatorConfig,{
                tabBarComponent: props => (<BottomTabBar {...props} />),
                initialRouteName:"UserScreen"
            }
        ))
        return <BottomNavigator/>
    }
}
//底部导航器不仅包括了导航条，还包括了各个页面的根堆栈
export default BottomNavigator

const styles=StyleSheet.create({
    bottomTabIconStyle:{
        width:30,
        height:30
    }
})