import React from 'react'
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Alert
}from 'react-native'
import UserName from './components/UserNameDisplay'
import UserOptionsButton from './components/UserOptionButton'

export default class UserScreen extends React.Component{
  render(){

    return(
      <SafeAreaView style={styles.SafeAreaViewStyle}>
        <View style={styles.BackGroundImage}></View>
        <UserName username="用户名(可能加入头像)"/>
        <View style={styles.ButtonView}>
          <UserOptionsButton 
            fixedText="已绑定邮箱:" 
            pressEvent={()=>{this.props.navigation.navigate("UserBindMail")}}
          />
          <UserOptionsButton 
            fixedText="已绑定手机:"
            pressEvent={()=>{this.props.navigation.navigate("UserBindPhone")}}
          />
        </View>

        <View style={styles.ButtonView}>
          <UserOptionsButton fixedText="上次登录时间:"/><UserOptionsButton fixedText="退出登录"/>
        </View>
      </SafeAreaView>
    )
  }
}

const styles=StyleSheet.create({
  SafeAreaViewStyle:{
    flexDirection:"column"
  },
  ButtonView:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginTop:10
  },
  BackGroundImage:{
    height:200,
    backgroundColor:'yellow'
  }
})