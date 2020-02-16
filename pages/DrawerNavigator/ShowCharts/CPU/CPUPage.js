import React from 'react'
import {
  View,
  Text,
  Button,
  Dimensions
} from 'react-native'

import {AreaChart,Grid} from 'react-native-svg-charts'
import * as shape from 'd3-shape'



export default class CPUPage extends React.Component{
  state={
    phoneWidth:Dimensions.get("window").width,
    step:Dimensions.get("window").width/20
  }

  _genPath=()=>{
    path=""
    for(let i=0;i<20;++i){

    }
    return path
  }

  render(){
    const data = [ 50, 10, 40, 95, 14, 24, 85, 91, 35, 53, 53, 24, 50, 20, 80 ]

    return(
      <View>
        <Text>cpu page</Text>
        <AreaChart
                style={{ height: 200 }}
                data={ data }
                contentInset={{ top: 30, bottom: 30 }}
                curve={ shape.curveNatural }
                svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
            >
            
        </AreaChart>
        <Button title="返回" onPress={()=>this.props.navigation.goBack()}/>
      </View>
    )
  }
}