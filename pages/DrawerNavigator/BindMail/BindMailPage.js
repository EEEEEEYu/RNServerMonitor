import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native'

import {TextInput} from 'react-native-gesture-handler'

export default class BindMailPage extends React.Component{
  render(){
    return(
      <View style={styles.layerView}>

        <View style={styles.headerView}>
          <Text style={styles.headerText}>通知邮箱设置</Text>
        </View>

        <View style={styles.inputView}>
          <Text style={styles.inputNotificationText}>邮箱</Text>
          <TextInput style={styles.input}/>
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.goBack()}>
            <Text style={{fontSize:windowWidth*0.05}}>返回</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={{fontSize:windowWidth*0.05}}>确认</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

const windowWidth=Dimensions.get('window').width
const windowHeight=Dimensions.get('window').height

const styles=StyleSheet.create({
  layerView:{
    flexDirection:'column',
    alignItems:'center',
    flex:1
  },
  headerView:{
    marginTop:windowHeight*0.2,
    marginBottom:windowHeight*0.12
  },
  headerText:{
    fontSize:windowHeight*0.05
  },
  inputView:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    marginBottom:windowHeight*0.12
  },
  inputNotificationText:{
    fontSize:windowWidth*0.08,
    marginHorizontal:windowWidth*0.07
  },
  input:{
    width:windowWidth*0.5,
    height:windowHeight*0.05,
    borderWidth:2,
    borderColor:'black'
  },
  buttonView:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    width:windowWidth
  },
  button:{
    height:windowWidth*0.1,
    width:windowHeight*0.15,
    borderWidth:2,
    borderColor:'black',
    justifyContent:'center',
    alignItems:'center'
  }
})