import React from 'react'
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList
} from 'react-native'



export default class NodeManagePage extends React.Component{

  state={
    nodes:[
      {
        id:'1',
        url:'192.168.1.4:5000',
        name:'新的节点'
      },
      {
        id:'2',
        url:'192.168.14.34:5000',
        name:'新的节点'
      }
    ]
  }

  _renderItem=({item})=>{
    return (
      <View style={styles.nodeView}>
        <TouchableOpacity style={styles.nodeButton}>
          <Text>{item.name}{item.id}</Text>
        </TouchableOpacity>
      </View>
    )
  }


  render(){
    return(
      <View>
          <FlatList 
            data={this.state.nodes}
            renderItem={this._renderItem}
            style={styles.list}
            keyExtractor={item=>item.id}
          />
        
        <View style={styles.bottomButtonView }>
          <TouchableOpacity style={styles.bottomButton} onPress={()=>{this.state.nodes.push(this._genNodeComponent)}}>
            <Text>编辑</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  bottomButton:{
    height:Dimensions.get('window').width/7,
    width:Dimensions.get('window').width/7,
    backgroundColor:'gray',
    borderColor:'gray',
    borderWidth:1,
    borderRadius:Dimensions.get('window').width/14,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'

  },
  bottomButtonView:{
    flexDirection:'row',
    justifyContent:'flex-end',
    right:Dimensions.get('window').width/14,
    top:Dimensions.get('window').height-Dimensions.get('window').width*3/14,
    position:'absolute'
  },
  nodeView:{
    flexDirection:'column',
    justifyContent:'center'
  },
  nodeButton:{
    height:100,
    width:Dimensions.get('window').width,
    borderRadius:30,
    backgroundColor:'lightblue',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    shadowColor:'gray',
    shadowOffset:{height:1,width:1},
    shadowOpacity:1,
    shadowRadius:1
  }
})