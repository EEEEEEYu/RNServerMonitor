import React from 'react'
import {
  View,
  Text,
  Button
} from 'react-native'
import Swiper from 'react-native-swiper'
import CPUPage from './CPU/CPUPage'

export default class ShowCharts extends React.Component{
  render(){
    return(
      <Swiper>
        <CPUPage {...this.props}/>

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