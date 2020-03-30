import React from 'react'
import {
    View,
		Text,
		StyleSheet,
		Dimensions,
		FlatList,
		TouchableOpacity,
		Image
} from 'react-native'
import {AreaChart,Grid} from 'react-native-svg-charts'
import * as shape from 'd3-shape'

export default class GPUPage extends React.Component{

	state={
		data:[
			{"overallInfo": {"utilization": 35,"memoryUsed": 78},"individualInfo": {"0": {"hardwareInfo": {"utilization": 34,"memoryUsed": 65,"temperature": 45}},"1": {"hardwareInfo": {"utilization": 32,"memoryUsed": 12,"temperature": 87}}}},
			{"overallInfo": {"utilization": 24,"memoryUsed": 45},"individualInfo": {"0": {"hardwareInfo": {"utilization": 43,"memoryUsed": 23,"temperature": 21}},"1": {"hardwareInfo": {"utilization": 17,"memoryUsed": 17,"temperature": 54}}}},
			{"overallInfo": {"utilization": 46,"memoryUsed": 34},"individualInfo": {"0": {"hardwareInfo": {"utilization": 13,"memoryUsed": 65,"temperature": 54}},"1": {"hardwareInfo": {"utilization": 23,"memoryUsed": 19,"temperature": 87}}}},
			{"overallInfo": {"utilization": 54,"memoryUsed": 54},"individualInfo": {"0": {"hardwareInfo": {"utilization": 56,"memoryUsed": 23,"temperature": 68}},"1": {"hardwareInfo": {"utilization": 26,"memoryUsed": 31,"temperature": 68}}}},
			{"overallInfo": {"utilization": 65,"memoryUsed": 35},"individualInfo": {"0": {"hardwareInfo": {"utilization": 34,"memoryUsed": 86,"temperature": 78}},"1": {"hardwareInfo": {"utilization": 56,"memoryUsed": 24,"temperature": 45}}}},
			{"overallInfo": {"utilization": 78,"memoryUsed": 13},"individualInfo": {"0": {"hardwareInfo": {"utilization": 37,"memoryUsed": 34,"temperature": 78}},"1": {"hardwareInfo": {"utilization": 78,"memoryUsed": 21,"temperature": 78}}}},
			{"overallInfo": {"utilization": 49,"memoryUsed": 12},"individualInfo": {"0": {"hardwareInfo": {"utilization": 85,"memoryUsed": 44,"temperature": 87}},"1": {"hardwareInfo": {"utilization": 45,"memoryUsed": 61,"temperature": 45}}}},
			{"overallInfo": {"utilization": 23,"memoryUsed": 32},"individualInfo": {"0": {"hardwareInfo": {"utilization": 77,"memoryUsed": 53,"temperature": 54}},"1": {"hardwareInfo": {"utilization": 56,"memoryUsed": 39,"temperature": 12}}}},
			{"overallInfo": {"utilization": 49,"memoryUsed": 52},"individualInfo": {"0": {"hardwareInfo": {"utilization": 51,"memoryUsed": 12,"temperature": 64}},"1": {"hardwareInfo": {"utilization": 45,"memoryUsed": 27,"temperature": 10}}}},
			{"overallInfo": {"utilization": 65,"memoryUsed": 42},"individualInfo": {"0": {"hardwareInfo": {"utilization": 40,"memoryUsed": 34,"temperature": 60}},"1": {"hardwareInfo": {"utilization": 43,"memoryUsed": 11,"temperature": 29}}}}
		],
		displayName:'utilization',
		displayID:-1
	}

	componentDidMount(){
    this.testtimer=setInterval(()=>{
      newArray=this.state.data.splice(0)
      newArray.push(newArray[0])
      newArray=newArray.splice(1,newArray.length)
      this.setState({data:newArray})
    },4000)
	}
	


  componentWillUnmount(){
    this.testtimer&&clearInterval(this.testtimer);
  }

	//渲染底部单个GPU信息组件的函数
	_renderItem=({item})=>{
		return(
			<View style={styles.individualInfoView}>
				
				<View style={styles.individualNameTextView}>
					<Text style={styles.individualNameText}>Nvidia GTX 1080Ti</Text>
				</View>
				
				<View style={styles.individualDetailView}>

					{/*按下后，图表显示单个GPU的使用率*/}
					<TouchableOpacity 
						style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}
						onPress={()=>{this.setState({displayName:'utilization',displayID:item.id})}}
					>

						<Text style={styles.individualDetailText}>使用率</Text>
						<View style={{
							flexDirection:'row',
							justifyContent:'center',
							alignItems:'center',
							backgroundColor:item.utilization<25?'green':item.utilization<75?'orange':'red',
							height:windowHeight*0.03,
							width:windowWidth*0.14,
							borderRadius:windowHeight*0.03,
							marginHorizontal:windowWidth*0.02
						}}>
							<Text style={styles.individualDetailNumber}>{item.utilization+'%'}</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity 
						style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}
						onPress={()=>{this.setState({displayName:'memoryUsed',displayID:item.id})}}
					>
						<Text style={styles.individualDetailText}>显存</Text>
						<View style={{
							flexDirection:'row',
							justifyContent:'center',
							alignItems:'center',
							backgroundColor:item.memoryUsed<25?'green':item.memoryUsed<75?'orange':'red',
							height:windowHeight*0.03,
							width:windowWidth*0.14,
							borderRadius:windowHeight*0.03,
							marginHorizontal:windowWidth*0.02
						}}>
							<Text style={styles.individualDetailNumber}>{item.memoryUsed+'%'}</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity 
						style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}
						onPress={()=>{this.setState({displayName:'temperature',displayID:item.id})}}
					>
						<Text style={styles.individualDetailText}>温度</Text>
						<View style={{
							flexDirection:'row',
							justifyContent:'center',
							alignItems:'center',
							backgroundColor:item.temperature<50?'green':item.temperature<80?'orange':'red',
							height:windowHeight*0.03,
							width:windowWidth*0.14,
							borderRadius:windowHeight*0.03,
							marginHorizontal:windowWidth*0.02
						}}>
							<Text style={styles.individualDetailNumber}>{item.temperature+'℃'}</Text>
						</View>
					</TouchableOpacity>


				</View>
			</View>
		)
	}

	_transformDisplayData=(data,displayName,ID)=>{
		//ID为-1时，图表显示的是整体情况
		if(ID==-1){
			let temp=new Array(data.length)
			for(let i=0;i<temp.length;i++){
				temp[i]=data[i]['overallInfo'][displayName]
			}
			return temp
		}
		//ID大于-1时，图表显示的是单个GPU的某项具体指标
		else{
			let temp=new Array(data.length)
			for(let i=0;i<temp.length;i++){
				temp[i]=data[i]['individualInfo'][ID]['hardwareInfo'][displayName]
			}
			return temp
		}
	}

	//传入数组最后一个item的individualInfo，返回数组化的单个GPU信息
	_transformFlatListData=(data)=>{
		let temp=new Array(data.length)
		let i=0
		for(var key in data){
			temp[i]={
				id:key,
				utilization:data[key]['hardwareInfo']['utilization'],
				memoryUsed:data[key]['hardwareInfo']['memoryUsed'],
				temperature:data[key]['hardwareInfo']['temperature']
			}
			i+=1
		}

		return temp
	}

  render(){
    return(
			<View style={styles.layerView}>
        {/*图表显示区域*/}
        <AreaChart
          style={{ flex:40 }}
          data={ this._transformDisplayData(this.state.data,this.state.displayName,this.state.displayID) }
					curve={ shape.curveBasis }
					contentInset={{top:30,bottom:30}}
          svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}   
        />

				{/*分割线*/}
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

				{/*分割线*/}
				<View style={{height:2,backgroundColor:'white'}}></View>

				<View style={styles.gpuContentView}>

					{/*刻度尺正下方的整体信息页面 */}
					<View style={styles.overallInfoView}>

						<TouchableOpacity style={styles.overallIconView} onPress={()=>{this.props.navigation.goBack()}}>
							<Image 
								source={require('../../../../assets/Icons/GPUIcon.png')} 
								style={{height:windowWidth*0.27,width:windowWidth*0.27}}
							/>
						</TouchableOpacity>

						<View style={styles.overallListView}>
							<TouchableOpacity style={styles.overallListItemView} onPress={()=>{this.setState({displayName:'utilization',displayID:-1})}}>

								<Text style={styles.individualDetailText}>总使用率</Text>
								<View style={{
									flexDirection:'row',
									justifyContent:'center',
									alignItems:'center',
									backgroundColor:	this.state.data[this.state.data.length-1]['overallInfo']['utilization']<25?'green':
																		this.state.data[this.state.data.length-1]['overallInfo']['utilization']<75?'orange':'red',
									height:windowHeight*0.03,
									width:windowWidth*0.14,
									borderRadius:windowHeight*0.03,
									marginHorizontal:windowWidth*0.02
								}}>
									<Text style={styles.individualDetailNumber}>{this.state.data[this.state.data.length-1]['overallInfo']['utilization']+'%'}</Text>
								</View>

							</TouchableOpacity>
							<TouchableOpacity style={styles.overallListItemView} onPress={()=>{this.setState({displayName:'memoryUsed',displayID:-1})}}>
								<Text style={styles.individualDetailText}>显存使用</Text>
								<View style={{
									flexDirection:'row',
									justifyContent:'center',
									alignItems:'center',
									backgroundColor:	this.state.data[this.state.data.length-1]['overallInfo']['memoryUsed']<25?'green':
																		this.state.data[this.state.data.length-1]['overallInfo']['memoryUsed']<75?'orange':'red',
									height:windowHeight*0.03,
									width:windowWidth*0.14,
									borderRadius:windowHeight*0.03,
									marginHorizontal:windowWidth*0.02
								}}>
									<Text style={styles.individualDetailNumber}>{this.state.data[this.state.data.length-1]['overallInfo']['memoryUsed']+'%'}</Text>
								</View>
							</TouchableOpacity>
						</View>

					</View>

					{/*分割线*/}
					<View style={{height:2,backgroundColor:'white'}}></View>

					{/*下方的单个GPU信息列表*/}
					<FlatList
						data={this._transformFlatListData(this.state.data[this.state.data.length-1]['individualInfo'])}
						renderItem={this._renderItem}
						keyExtractor={item=>item.id}
					/>

				</View>
			</View>
		)
  }
}

const windowWidth=Dimensions.get('window').width
const windowHeight=Dimensions.get('window').height

const styles=StyleSheet.create({
	//整体页面的View
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
	//图表下方所有item的View
	gpuContentView:{
		flexDirection:'column',
		justifyContent:'flex-start',
		backgroundColor:'rgba(134, 65, 244, 0.8)',
		flex:50
	},
	//头部整体信息的View
	overallInfoView:{
		height:windowHeight*0.15,
		flexDirection:'row',
		justifyContent:'flex-start'
	},
	//头部GPU图标的View
	overallIconView:{
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		flex:1
	},
	//头部包裹两项指标的View
	overallListView:{
		flexDirection:'column',
		justifyContent:'center',
		flex:1
	},
	//头部每一项指标的View
	overallListItemView:{
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		flex:1
	},
	//下方列表中单个GPU内容的样式
	individualInfoView:{
		flexDirection:'column',
		justifyContent:'space-evenly',
		height:windowHeight*0.15,
		borderRadius:30,
		borderColor:'white',
		borderWidth:2,
		marginVertical:8,
		marginHorizontal:5
	},
	//单个GPU内容中GPU名字的View
	individualNameTextView:{
		flexDirection:'row',
		justifyContent:'flex-start',
		marginLeft:windowWidth*0.06
	},
	//单个GPU内容中GPU名字文字样式
	individualNameText:{
		fontSize:windowWidth*0.075,
		color:'white'
	},
	//单个GPU硬件详细数值的View
	individualDetailView:{
		flexDirection:'row',
		justifyContent:'flex-start',
		alignItems:'center',
		marginLeft:windowWidth*0.06
	},
	//单个GPU硬件详细数值的提示文字View
	individualDetailTextView:{
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center'
	},
	//单个GPU硬件详细数值的提示文字样式
	individualDetailText:{
		color:'white',
		fontSize:windowWidth*0.048
	},
	//单个GPU硬件详细数值的数字样式
	individualDetailNumber:{
		color:'white',
		fontSize:windowWidth*0.045
	}
})