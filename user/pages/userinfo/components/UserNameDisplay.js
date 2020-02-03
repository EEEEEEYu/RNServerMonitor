import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions
}from 'react-native'

export default class UserName extends React.Component{
  render(){
    return(
      <View style={styles.outerbox}>
        <Text style={styles.font}>
          {this.props.username}
        </Text>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  outerbox:{
    height:100,
    alignItems:'center',
    backgroundColor:'rgb(100,217,254)',
    justifyContent:'center'
  },
  font:{
    fontSize:30,
    color:'white'
  }
})