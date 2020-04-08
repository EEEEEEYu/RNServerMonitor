import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native'

export default class HistoryPage extends React.Component{
  render(){
    return(
      <View style={styles.layerView}>
        <Text>{this.props.route.params.Name}</Text>
        <Text>{this.props.route.params.ID}</Text>
        <Text>{this.props.route.params.IP}</Text>
        <Text>{this.props.route.params.Port}</Text>
      </View>
    )
  }
}

const windowHeight=Dimensions.get('window').height
const windowWidth=Dimensions.get('window').width

const styles=StyleSheet.create({
  layerView:{
    flex:1,
    flexDirection:'column'
  }
})