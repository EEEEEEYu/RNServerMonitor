import React from 'react'
import {
  View,
  Text,
  Button
} from 'react-native'
import Swiper from 'react-native-swiper'
import CPUPage from './CPU/CPUPage'

export default class ShowCharts extends React.Component{

  state={
    ID:null,
    URL:null,
    Name:null
  }

  componentDidMount(){
    this.setState({
      ID:this.props.route.params.ID,
      URL:this.props.route.params.URL,
      Name:this.props.route.params.Name
    })
  }


  render(){

    return(
      <Swiper>
        <CPUPage {...this.props}/>

        <View>
          <Text>{this.state.Name+this.state.ID}</Text>
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