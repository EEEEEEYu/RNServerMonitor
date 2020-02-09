import React from 'react'
import {
  View,
  Text,
  Button
} from 'react-native'

export default class ShowCharts extends React.Component{
  render(){
    return(
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text>图表显示区域</Text>
        <Button title="返回" onPress={()=>this.props.navigation.goBack()}/>
      </View>
    )
  }
}