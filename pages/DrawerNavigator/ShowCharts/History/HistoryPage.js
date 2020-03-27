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
        <Text>history page</Text>
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