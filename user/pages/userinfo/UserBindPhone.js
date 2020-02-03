import React from 'react'
import{
  Text,
  View,
  Button
} from 'react-native'


export default class UserBindPhone extends React.Component{
  render(){
    return(
      <View>
        <Text>phone!</Text>
        <Button title="点我回去" onPress={()=>this.props.navigation.goBack()}></Button>
      </View>
    )
  }
}