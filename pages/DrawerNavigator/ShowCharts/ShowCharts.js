import React from 'react'
import {
  View,
  Text,
  Button
} from 'react-native'
import Swiper from 'react-native-swiper'

export default class ShowCharts extends React.Component{
  render(){
    return(
      <Swiper>
        <View>
          <Text>page1</Text>
          <Button title="返回" onPress={()=>this.props.navigation.goBack()}/>
        </View>

        <View>
          <Text>page2</Text>
          <Button title="返回" onPress={()=>this.props.navigation.goBack()}/>
        </View>

        <View>
          <Text>page3</Text>
          <Button title="返回" onPress={()=>this.props.navigation.goBack()}/>
        </View>
      </Swiper>
    )
  }
}