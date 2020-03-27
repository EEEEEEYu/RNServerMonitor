import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions
} from 'react-native'

class CollapsibleList extends React.Component{
  render(){
    if(this.props.open){
      return(
        <View>
          <TouchableOpacity 
            style={styles.collapsibleListHeader}
            onPress={this.props.touchFunc}
          >
            <Text>打开状态</Text>
          </TouchableOpacity>
        </View>
      )
    }
    else{
      return(
        <View>
          <TouchableOpacity 
            style={styles.collapsibleListHeader}
            onPress={this.props.touchFunc}
          >
            <Text>关闭状态</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
}

export default class ProcPage extends React.Component{

  state={
    data:[
      {
        pid:2231,
        user: "yhw",
        cpu: 4.3,
        name: "code"
      },
      {
        pid:2221,
        user: "yhw",
        cpu: 2.3,
        name: "Xorg"
      },
      {
        pid:1647,
        user: "yhw",
        cpu: 1.9,
        name: "gnome-shell"
      }

    ],
    CPUOpen:false,
    GPUOpen:false,
    MemOpen:false
  }

  _reverseCPUListOpen=()=>{
    this.setState({CPUOpen:!this.state.CPUOpen})
  }

  _reverseGPUListOpen=()=>{
    this.setState({GPUOpen:!this.state.GPUOpen})
  }

  _reverseMemListOpen=()=>{
    this.setState({MemOpen:!this.state.MemOpen})
  }

  render(){
    return(
      <View style={styles.layerView}>
        <Text>proc page</Text>

        <CollapsibleList 
          open={this.state.CPUOpen}
          touchFunc={this._reverseCPUListOpen}
        />

        <CollapsibleList 
          open={this.state.GPUOpen}
          touchFunc={this._reverseGPUListOpen}
        />

        <CollapsibleList 
          open={this.state.MemOpen}
          touchFunc={this._reverseMemListOpen}
        />

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
  },
  collapsibleListHeader:{
    height:windowHeight*0.12,
    backgroundColor:'gray',
    borderColor:'black',
    borderWidth:1
  }
})