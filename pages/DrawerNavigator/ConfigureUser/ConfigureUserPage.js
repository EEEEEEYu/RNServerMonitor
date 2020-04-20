import React from 'react'
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'


export default class ConfigureUser extends React.Component{

  state={
    //用户邮箱、名字、权限、上次登录时间、在线状态
    users:[
      {UserEmail:'468085999@qq.com',UserName:'余浩文',Authority:true,LastLoginTime:'2020-3-28',UserState:false},
      {UserEmail:'m18107220188@163.com',UserName:'aaa',Authority:false,LastLoginTime:'2020-3-28',UserState:true},
      {UserEmail:'435234653@qq.com',UserName:'bbb',Authority:false,LastLoginTime:'2020-3-28',UserState:false}
    ]
  }

  _renderItem=({item})=>{
    return(
      <View style={styles.userView}>
        
        <View style={styles.userHeaderView}>
          <Text>{item.UserName}</Text>
          <Text>{item.UserEmail}</Text>
        </View>

        <View style={styles.userRowView}> 
          <Text>用户权限:</Text>
          <Text>{item.Authority?'管理员':'用户'}</Text>

          <Text>在线状态:</Text>
          <Text>{item.UserState?'在线':'不在线'}</Text>
        </View>

        <View style={styles.userRowView}>
          <Text>上次登录时间:</Text>
    <     Text>{item.LastLoginTime}</Text>
        </View>

      </View>
    )
  }

  render(){
    return(
      <View style={styles.layerView}>
        <FlatList
          renderItem={this._renderItem}
          data={this.state.users}
          keyExtractor={item=>item.UserEmail}
          ListFooterComponent={()=>{
            return(<View style={{backgroundColor:'white',height:300}}/>)
          }}
        />

        {/*底部菜单组件*/}
        <View style={styles.settingListButtonView }>
            <TouchableOpacity style={styles.bottomButton} onPress={()=>this.props.navigation.goBack()}>
              <Ionicons name="md-arrow-round-back" size={45} color='black'/>
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
    justifyContent:'center',
    alignItems:'center'
  },
  userView:{
    height:windowHeight*0.18,
    width:windowWidth*0.96,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    marginTop:windowHeight*0.05,
    borderColor:'black',
    borderWidth:2,
    borderRadius:windowWidth*0.08
  },
  userHeaderView:{
    flexDirection:'row',
    justifyContent:'center'
  },
  userRowView:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  //包裹添加、编辑节点按钮View的样式
  settingListButtonView:{
    flexDirection:'column',
    justifyContent:'flex-end',
    right:Dimensions.get('window').width/14,
    top:Dimensions.get('window').height-Dimensions.get('window').width*4/14,
    position:'absolute',
    height:Dimensions.get('window').width*2/14
  },
  //最底部设置按钮的样式
  bottomButton:{
    height:Dimensions.get('window').width/7,
    width:Dimensions.get('window').width/7,
    backgroundColor:'white',
    borderColor:'black',
    borderWidth:2,
    borderRadius:Dimensions.get('window').width/14,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    marginTop:Dimensions.get('window').width/42
  }
})