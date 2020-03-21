import React from 'react'
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  Modal,
  Alert
} from 'react-native'

import { TextInput } from 'react-native-gesture-handler'



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
      },
      {
        id:'3',
        url:'192.168.14.34:5000',
        name:'新的节点'
      }
    ],
    nextID:3,
    modalVisible:false,
    newnodeNameInput:null,
    newnodeIPInput:null,
    newnodePortInput:null
  }

  _renderItem=({item})=>{
    return (
      <View style={styles.nodeView}>
        <TouchableOpacity 
          style={styles.nodeButton}
          onPress={()=>{
            this.props.navigation.navigate('ShowCharts',{ID:item.id,URL:item.url,Name:item.name})
          }}
        >
          <Text>{item.name}{item.id}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  _addNewNode=()=>{
    if(this.state.newnodeNameInput==null){Alert.alert('节点名称不能为空!')}
    else if(this.state.newnodeIPInput==null){Alert.alert('节点IP地址不能为空!')}
    else if(this.state.newnodePortInput==null){Alert.alert('节点端口不能为空!')}
    else{
      //采用深拷贝方法，避免影响原state
      let newNodeArray=this.state.nodes.slice(0)
      newNodeArray.push({
        id:toString(this.state.nextID),
        url:this.state.newnodeIPInput+':'+this.state.newnodePortInput,
        name:this.state.newnodeNameInput
      })
      this.setState({
        nodes:newNodeArray,
        modalVisible:false,
        newnodeNameInput:null,
        newnodeIPInput:null,
        newnodePortInput:null
      })
      //更新下一个id
      let newNextID=this.state.nextID+1
      this.setState({nextID:newNextID})
    }
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
          <TouchableOpacity style={styles.bottomButton} onPress={()=>{this.setState({modalVisible:true})}}>
            <Text>编辑</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          hardwareAccelerated={true}
        >
          <View style={styles.modalLayer}>
            <View style={styles.modalContainer}>

              <Text>新的节点</Text>

              <View style={styles.newnodeView}>
                <Text style={styles.inputNotification}>节点名称</Text>
                <TextInput 
                  style={styles.newnodeInput} 
                  onChangeText={(text)=>{
                    this.setState({newnodeNameInput:text})
                  }}
                />
              </View>

              <View style={styles.newnodeView}>
                <Text style={styles.inputNotification}>节点IP</Text>
                <TextInput 
                  style={styles.newnodeInput}
                  onChangeText={(text)=>{
                    this.setState({newnodeIPInput:text})
                  }}
                />
              </View>

              <View style={styles.newnodeView}>
                <Text style={styles.inputNotification}>节点端口号</Text>
                <TextInput 
                  style={styles.newnodeInput}
                  onChangeText={(text)=>{
                    this.setState({newnodePortInput:text})
                  }}
                />
              </View>

              <Button title="确定" onPress={this._addNewNode}/>
              <Button title="关闭" onPress={()=>{
                this.setState({newnodeNameInput:null,newnodeIPInput:null,newnodePortInput:null,modalVisible:false})
              }}/>
            </View>
          </View>
        </Modal>

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
    height:120,
    width:Dimensions.get('window').width,
    borderRadius:30,
    backgroundColor:'lightblue',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:10,

    shadowColor:'gray',
    shadowOffset:{height:1,width:1},
    shadowOpacity:1,
    shadowRadius:1
  },
  modalLayer: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    flex: 1,
    justifyContent: 'center',
    padding: 32
  },
  modalContainer: {
    height: Dimensions.get('window').height*0.4,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  newnodeView:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    marginVertical:10
  },
  inputNotification:{
    marginHorizontal:10
  },
  newnodeInput:{
    borderWidth:2,
    borderColor:'black',
    borderRadius:7,
    width:Dimensions.get('window').height*0.4-100,
    height:32,
    marginHorizontal:15
  }
})
