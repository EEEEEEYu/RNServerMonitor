import React from 'react'
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	Image
} from 'react-native'
import {AreaChart,Grid} from 'react-native-svg-charts'
import * as shape from 'd3-shape'

class MyItem extends React.Component{
	render(){
		return(
			<TouchableOpacity style={styles.memoryItemView} onPress={this.props.pressFunc}>
				<View style={styles.memoryItemTextView}>
					<Text style={styles.memoryItemText}>{this.props.notificationText}</Text>
				</View>
				<View style={{
					flexDirection:'row',
					justifyContent:'center',
					alignItems:'center',
					width:windowWidth*0.16,
					backgroundColor:this.props.numberColor,
					borderRadius:windowWidth*0.08
				}}>
					<Text style={styles.memoryItemNumber}>{this.props.numberText}</Text>
				</View>
			</TouchableOpacity>
		)
	}
}

export default class MemoryPage extends React.Component{

	state={
		memData:[
			{"memoryUsed":12,"swapUsed":12,"buff/cacheUsed":23},
			{"memoryUsed":32,"swapUsed":23,"buff/cacheUsed":43},
			{"memoryUsed":64,"swapUsed":11,"buff/cacheUsed":33},
			{"memoryUsed":45,"swapUsed":7,"buff/cacheUsed":21},
			{"memoryUsed":87,"swapUsed":25,"buff/cacheUsed":29},
			{"memoryUsed":65,"swapUsed":19,"buff/cacheUsed":15},
			{"memoryUsed":45,"swapUsed":14,"buff/cacheUsed":22}
		],
		netData:[
			{"sentSpeed":2.3,"recvSpeed":3.2,"sentPkgLossRate":0.1,"recvPkgLossRate":0.2},
			{"sentSpeed":22,"recvSpeed":39.2,"sentPkgLossRate":0.10,"recvPkgLossRate":0.2},
			{"sentSpeed":27,"recvSpeed":32,"sentPkgLossRate":0.11,"recvPkgLossRate":0.2},
			{"sentSpeed":13.3,"recvSpeed":23.2,"sentPkgLossRate":0.31,"recvPkgLossRate":0.2},
			{"sentSpeed":22.3,"recvSpeed":30.2,"sentPkgLossRate":0.11,"recvPkgLossRate":0.3},
			{"sentSpeed":26.3,"recvSpeed":17.2,"sentPkgLossRate":0.21,"recvPkgLossRate":1.2},
			{"sentSpeed":23.3,"recvSpeed":29.2,"sentPkgLossRate":0.21,"recvPkgLossRate":2.4},
			{"sentSpeed":12.3,"recvSpeed":30.2,"sentPkgLossRate":0.17,"recvPkgLossRate":1.2},
			{"sentSpeed":29.3,"recvSpeed":13.2,"sentPkgLossRate":0.12,"recvPkgLossRate":0.8}
		],
		displayName:'memoryUsed',
		displayMem:true
	}

	componentDidMount(){
    this.testtimer=setInterval(()=>{
			let newArray1=this.state.memData.splice(0)
			let newArray2=this.state.netData.splice(0)
			newArray1.push(newArray1[0])
			newArray2.push(newArray2[0])
			newArray1=newArray1.splice(1,newArray1.length)
			newArray2=newArray2.splice(1,newArray2.length)
      this.setState({memData:newArray1,netData:newArray2})
    },4000)
  }


  componentWillUnmount(){
    this.testtimer&&clearInterval(this.testtimer);
  }

	_transformDisplayData=(memData,netData,name,displayMem)=>{
		if(displayMem){
			let temp=new Array(memData.length)
			for(let i=0;i<memData.length;i++){
				temp[i]=memData[i][name]
			}
			return temp
		}
		else{
			let temp=new Array(netData.length)
			for(let i=0;i<netData.length;i++){
				temp[i]=netData[i][name]
			}
			return temp
		}
	}

	render(){
		return(
			<View style={styles.layerView}>
				<AreaChart
          style={{ flex:40 }}
          data={ this._transformDisplayData(this.state.memData,this.state.netData,this.state.displayName,this.state.displayMem) }
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

						<TouchableOpacity style={styles.iconView} onPress={()=>{this.props.navigation.goBack()}}>
							<Image 
								source={require('../../../../assets/Icons/MemoryIcon.png')} 
								style={{height:windowWidth*0.25,width:windowWidth*0.25}}
							/>
						</TouchableOpacity>

						<MyItem 
							notificationText='内存' 
							numberText={this.state.memData[this.state.memData.length-1]['memoryUsed']+'%'}
							pressFunc={()=>{this.setState({displayName:'memoryUsed',displayMem:true})}}
							numberColor={this.state.memData[this.state.memData.length-1]['memoryUsed']<25?'green':
													this.state.memData[this.state.memData.length-1]['memoryUsed']<75?'orange':'red'}
						/>

					</View>

					<View style={styles.memoryLineView}>
						
						<MyItem 
							notificationText='交换内存' 
							numberText={this.state.memData[this.state.memData.length-1]['swapUsed']+'%'}
							pressFunc={()=>{this.setState({displayName:'swapUsed',displayMem:true})}}
							numberColor={this.state.memData[this.state.memData.length-1]['swapUsed']<25?'green':
													this.state.memData[this.state.memData.length-1]['swapUsed']<75?'orange':'red'}
						/>

						<MyItem 
							notificationText='cache' 
							numberText={this.state.memData[this.state.memData.length-1]['buff/cacheUsed']+'%'}
							pressFunc={()=>{this.setState({displayName:'buff/cacheUsed',displayMem:true})}}
							numberColor={this.state.memData[this.state.memData.length-1]['buff/cacheUsed']<25?'green':
													this.state.memData[this.state.memData.length-1]['buff/cacheUsed']<75?'orange':'red'}
						/>

					</View>

					{/*分割线 */}
					<View style={{height:2,backgroundColor:'white'}}></View>

					<View style={styles.memoryLineView}>
						
						<TouchableOpacity style={styles.iconView} onPress={()=>{this.props.navigation.goBack()}}>
							<Image 
								source={require('../../../../assets/Icons/NetIcon.png')} 
								style={{height:windowWidth*0.2,width:windowWidth*0.2}}
							/>
						</TouchableOpacity>

						<MyItem 
							notificationText='上传速度' 
							numberText={this.state.netData[this.state.netData.length-1]['sentSpeed']+'k/s'}
							pressFunc={()=>{this.setState({displayName:'sentSpeed',displayMem:false})}}
							numberColor={this.state.netData[this.state.netData.length-1]['sentSpeed']<256?'green':
													this.state.netData[this.state.netData.length-1]['sentSpeed']<512?'orange':'red'}
						/>

					</View>

					<View style={styles.memoryLineView}>
						
						<MyItem 
							notificationText='下载速度' 
							numberText={this.state.netData[this.state.netData.length-1]['recvSpeed']+'k/s'}
							pressFunc={()=>{this.setState({displayName:'recvSpeed',displayMem:false})}}
							numberColor={this.state.netData[this.state.netData.length-1]['recvSpeed']<256?'green':
													this.state.netData[this.state.netData.length-1]['recvSpeed']<512?'orange':'red'}
						/>

						<MyItem 
							notificationText='上传丢包率' 
							numberText={this.state.netData[this.state.netData.length-1]['sentPkgLossRate']+'%'}
							pressFunc={()=>{this.setState({displayName:'sentPkgLossRate',displayMem:false})}}
							numberColor={this.state.netData[this.state.netData.length-1]['sentPkgLossRate']<10?'green':
													this.state.netData[this.state.netData.length-1]['sentPkgLossRate']<20?'orange':'red'}
						/>

					</View>

					<View style={styles.memoryLineView}>
						
						<MyItem 
							notificationText='下载丢包率' 
							numberText={this.state.netData[this.state.netData.length-1]['recvPkgLossRate']+'%'}
							pressFunc={()=>{this.setState({displayName:'recvPkgLossRate',displayMem:false})}}
							numberColor={this.state.netData[this.state.netData.length-1]['recvPkgLossRate']<10?'green':
													this.state.netData[this.state.netData.length-1]['recvPkgLossRate']<20?'orange':'red'}
						/>

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
	//单行的View
	memoryLineView:{
		flexDirection:'row',
		justifyContent:'center',
		height:windowHeight*0.1,
	},
	//单个监控指标的View
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
	//图标的View
	iconView:{
		flex:1,
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		marginHorizontal:5,
		marginVertical:5
	},
	//单项指标提示文字的View
	memoryItemTextView:{
		flexDirection:'row',
		justifyContent:'flex-start',
		width:windowWidth*0.24,
		marginLeft:windowWidth*0.05
	},
	//单项指标提示文字
	memoryItemText:{
		fontSize:windowWidth*0.043,
		color:'white'
	},

	memoryItemNumber:{
		fontSize:windowWidth*0.043,
		color:'white'
	}
})