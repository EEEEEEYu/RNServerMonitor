import React from 'react'
import {
  View,
  Text,
  Button
} from 'react-native'


export default class ConfigureUser extends React.Component{
  render(){
    return(
      <View>
        <Text>用户管理界面</Text>
        <Button onPress={()=>{this.props.navigation.goBack()}} title='返回'/>
      </View>
    )
  }
}