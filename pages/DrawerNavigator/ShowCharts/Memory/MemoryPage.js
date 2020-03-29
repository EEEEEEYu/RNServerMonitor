import React from 'react'
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	Dimensions
} from 'react-native'
import {AreaChart,Grid} from 'react-native-svg-charts'
import * as shape from 'd3-shape'

class MyItem extends React.Component{
	render(){
		return(
			<TouchableOpacity style={styles.memoryItemView} onPress={()=>{this.props.pressFunc}}>
				<View style={styles.memoryItemTextView}>
					<Text style={styles.memoryItemText}>{this.props.notificationText}</Text>
				</View>
				<View style={styles.memoryItemNumberView}>
					<Text style={styles.memoryItemNumber}>{this.props.numberText}</Text>
				</View>
			</TouchableOpacity>
		)
	}
}

export default class MemoryPage extends React.Component{

	state={
		data:[
			{"memoryUsed":12,"swapUsed":12,"buff/cacheUsed":23},
			{"memoryUsed":32,"swapUsed":23,"buff/cacheUsed":43},
			{"memoryUsed":64,"swapUsed":11,"buff/cacheUsed":33},
			{"memoryUsed":45,"swapUsed":7,"buff/cacheUsed":21},
			{"memoryUsed":87,"swapUsed":25,"buff/cacheUsed":29},
			{"memoryUsed":65,"swapUsed":19,"buff/cacheUsed":15},
			{"memoryUsed":45,"swapUsed":14,"buff/cacheUsed":22}
		],
		displayName:'memoryUsed'
	}

	_transformDisplayData=(data,name)=>{
		let temp=new Array(data.length)
    for(let i=0;i<data.length;i++){
      temp[i]=data[i][name]
    }
    return temp
	}

	render(){
		return(
			<View style={styles.layerView}>
				<AreaChart
          style={{ flex:40 }}
          data={ this._transformDisplayData(this.state.data,this.state.displayName) }
          contentInset={{ top: 30,bottom:30 }}
          curve={ shape.curveNatural }
          svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
        />

				{/*分割线 */}
				<View style={{height:2,backgroundColor:'white'}}></View>

				{/*刻度尺 */}
        <View style={styles.rulerView}>
          <Text style={styles.rulerText}>60s</Text>
          <Text style={styles.rulerText}>50s</Text>
          <Text style={styles.rulerText}>40s</Text>
          <Text style={styles.rulerText}>30s</Text>
          <Text style={styles.rulerText}>20s</Text>
          <Text style={styles.rulerText}>10s</Text>
          <Text style={styles.rulerText}>0s</Text>
        </View>

				

				<View style={styles.memoryContentView}>

					{/*分割线 */}
					<View style={{height:2,backgroundColor:'white'}}></View>

					<View style={styles.memoryLineView}>

						<TouchableOpacity style={styles.memoryItemView}>
							<Text>这里放入内存图标</Text>
						</TouchableOpacity>

						<MyItem notificationText='内存' numberText='21.2%'/>

					</View>

					<View style={styles.memoryLineView}>
						
						<MyItem notificationText='交换内存' numberText='21.2%'/>

						<MyItem notificationText='cache' numberText='21.2%'/>

					</View>

					{/*分割线 */}
					<View style={{height:2,backgroundColor:'white'}}></View>

					<View style={styles.memoryLineView}>
						
						<MyItem notificationText='这里放网络图标' />

						<MyItem notificationText='上传速度' numberText='21.2%'/>

					</View>

					<View style={styles.memoryLineView}>
						
						<MyItem notificationText='下载速度' numberText='21.2%'/>

						<MyItem notificationText='上传丢包率' numberText='21.2%'/>

					</View>

					<View style={styles.memoryLineView}>
						
						<MyItem notificationText='下载丢包率' numberText='21.2%'/>

						<MyItem notificationText='带宽使用' numberText='21.2%'/>

					</View>

				</View>
			</View>
		)
	}
}

const windowHeight=Dimensions.get('window').height
const windowWidth=Dimensions.get('window').width

const styles=StyleSheet.create({
	layerView:{
		flexDirection:'column',
		justifyContent:'flex-start',
		flex:1
	},
	//刻度尺view
	rulerView:{
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		backgroundColor:'rgba(134, 65, 244, 0.8)'
	},
	rulerText:{
		color:'white'
	},
	//刻度尺以下的整体View
	memoryContentView:{
		flex:50,
		flexDirection:'column',
		justifyContent:'flex-start',
		backgroundColor:'rgba(134, 65, 244, 0.8)'
	},
	memoryLineView:{
		flexDirection:'row',
		justifyContent:'center',
		height:windowHeight*0.1,
	},
	memoryItemView:{
		flex:1,
		flexDirection:'row',
		justifyContent:'flex-start',
		alignItems:'center',
		borderRadius:20,
		borderWidth:2,
		borderColor:'white',
		marginHorizontal:5,
		marginVertical:5
	},
	memoryItemTextView:{
		flexDirection:'row',
		justifyContent:'flex-start',
		width:windowWidth*0.24,
		marginLeft:windowWidth*0.05
	},
	memoryItemText:{
		fontSize:windowWidth*0.043,
		color:'white'
	},
	memoryItemNumberView:{
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		width:windowWidth*0.16,
		backgroundColor:'red',
		borderRadius:windowWidth*0.08
	},
	memoryItemNumber:{
		fontSize:windowWidth*0.043,
		color:'white'
	}
})