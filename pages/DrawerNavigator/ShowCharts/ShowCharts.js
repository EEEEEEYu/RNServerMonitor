import React from 'react'
import {
  View,
  Text,
  Button
} from 'react-native'
import Swiper from 'react-native-swiper'
import CPUPage from './CPU/CPUPage'
import GPUPage from './GPU/GPUPage'
import MemoryPage from './Memory/MemoryPage'

export default class ShowCharts extends React.Component{

  render(){

    return(
      <Swiper>
        <CPUPage {...this.props}/>

        <GPUPage {...this.props}/>

        <MemoryPage {...this.props}/>
      </Swiper>
    )
  }
}