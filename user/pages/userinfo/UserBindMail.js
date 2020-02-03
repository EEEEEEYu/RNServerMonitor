import React from 'react'
import{
  Text,
  Button,
  View
} from 'react-native'


export default class UserBindMail extends React.Component{
  render(){
    return(
      <View>
        <Text>email!</Text>
        <Button title="点我回去" onPress={()=>this.props.navigation.goBack()}></Button>
      </View>
    )
  }
}