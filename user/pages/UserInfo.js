import React from 'react'
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ART
}from 'react-native'

export default class UserScreen extends React.Component{
  render(){
    return(
      <SafeAreaView>
        <Text style={styles.userName} >用户名</Text>
        <Text style={styles.lastLoginTime}>上次登录:</Text>
      </SafeAreaView>
    )
  }
}

const styles=StyleSheet.create({
  userName:{
    fontSize:50,
    textAlign:'left',
    marginLeft:40,
    marginTop:40
  },
  lastLoginTime:{
    fontSize:20,
    marginLeft:40
  }
})