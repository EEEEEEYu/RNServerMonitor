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
import ProcPage from './Proc/ProcPage'
import HistoryPage from './History/HistoryPage'

export default class ShowCharts extends React.Component{

  render(){

    return(
      <Swiper>
        {/*CPU页面*/}
        <CPUPage {...this.props}/>

        {/*GPU页面*/}
        <GPUPage {...this.props}/>

        {/*内存与网络页面*/}
        <MemoryPage {...this.props}/>

        {/*进程页面 */}
        <ProcPage {...this.props}/>

        {/*历史信息页面 */}
        <HistoryPage {...this.props} />

      </Swiper>
    )
  }
}