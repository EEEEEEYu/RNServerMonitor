import React from 'react'
import {
  View,
  Text,
  Button
} from 'react-native'

export default class NodeManagePage extends React.Component{
  render(){
    return(
      <View>
        <Text>节点管理界面</Text>
        <Button title="打开抽屉" onPress={()=>this.props.navigation.openDrawer()} />
        <Button title="显示节点详细信息" onPress={()=>this.props.navigation.navigate("ShowCharts")} />
      </View>
    )
  }
}