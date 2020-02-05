import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions
}from 'react-native'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'


export default class UserOptionsButton extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <TouchableOpacity style={styles.outerbox} onPress={this.props.pressEvent}>
        <Text style={styles.font}>
          {this.props.fixedText}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles=StyleSheet.create({
  outerbox:{
    width:Dimensions.get('window').width/2*0.8,
    height:Dimensions.get('window').width/6,
    alignItems:'center',
    backgroundColor:'darkgray',
    justifyContent:'center',
    borderRadius:20,
    borderWidth:1
  },
  font:{
    fontSize:20
  }
})