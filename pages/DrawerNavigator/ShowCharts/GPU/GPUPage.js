import React from 'react'
import {
    View,
		Text,
		StyleSheet,
		Dimensions,
		FlatList,
		TouchableOpacity
} from 'react-native'
import {AreaChart,Grid} from 'react-native-svg-charts'
import * as shape from 'd3-shape'

export default class GPUPage extends React.Component{

	state={
		data:[34,23,45,65,15,5,58,26,48,62,6],
		overallUtilization:45,
		overallMemory:96,
		individualInfo:[
			{
				id:'0',
				utilization:85,
				memory:56,
				temperature:60
			},
			{
				id:'1',
				utilization:50,
				memory:60,
				temperature:80
			},
			{
				id:'2',
				utilization:32,
				memory:67,
				temperature:45
			},
			{
				id:'3',
				utilization:55,
				memory:74,
				temperature:23
			}
		]
	}

	_renderItem=({item})=>{
		return(
			<TouchableOpacity style={styles.individualInfoView}>
				
				<View style={styles.individualNameTextView}>
					<Text style={styles.individualNameText}>Nvidia GTX 1080Ti</Text>
				</View>
				
				<View style={styles.individualDetailView}>
					<Text style={styles.individualDetailText}>使用率</Text>
					<View style={styles.individualDetailNumberView}>
						<Text style={styles.individualDetailNumber}>{item.utilization}</Text>
					</View>
					<Text style={styles.individualDetailText}>显存</Text>
					<View style={styles.individualDetailNumberView}>
						<Text style={styles.individualDetailNumber}>{item.memory}</Text>
					</View>
					<Text style={styles.individualDetailText}>温度</Text>
					<View style={styles.individualDetailNumberView}>
						<Text style={styles.individualDetailNumber}>{item.temperature}</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}

  render(){
    return(
			<View style={styles.layerView}>
				<Text>GPU page</Text>
        {/*图表显示区域*/}
        <AreaChart
          style={{ flex:40 }}
          data={ this.state.data }
					curve={ shape.curveBasis }
          svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}   
        />

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

					<View style={styles.overallInfoView}>

						<View style={styles.overallIconView}>
							<Text>这里放入GPU图标</Text>
						</View>

						<View style={styles.overallListView}>
							<View style={styles.overallListItemView}>

								<Text style={styles.overallListItemText}>总使用</Text>
								<View style={styles.overallListItemNumberView}>
									<Text style={styles.overallListItemNumber}>8.9%</Text>
								</View>

							</View>
							<View style={styles.overallListItemView}>
								<Text style={styles.overallListItemText}>总显存</Text>
								<View style={styles.overallListItemNumberView}>
									<Text style={styles.overallListItemNumber}>89%</Text>
								</View>
							</View>
						</View>

					</View>

					{/*分割线*/}
					<View style={{height:2,backgroundColor:'white'}}></View>

					<FlatList
						data={this.state.individualInfo}
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
	//"总使用"和"总显存"提示文字的样式
	overallListItemText:{
		fontSize:18,
		color:'white'
	},
	//包裹"总使用"和"总显存"数字的View
	overallListItemNumberView:{
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		height:windowHeight*0.03,
		width:windowHeight*0.06,
		borderRadius:windowHeight*0.03,
		backgroundColor:'green',
		marginHorizontal:12
	},
	//"总使用"和"总显存"数字的样式
	overallListItemNumber:{
		fontSize:18,
		color:'white'
	},
	//下方列表中单个GPU内容的样式
	individualInfoView:{
		flexDirection:'column',
		height:windowHeight*0.15,
		borderRadius:30,
		borderColor:'white',
		borderWidth:2,
		marginVertical:5,
		marginHorizontal:5
	},
	//单个GPU内容中GPU名字的View
	individualNameTextView:{
		flexDirection:'row',
		justifyContent:'flex-start',
		marginLeft:windowWidth*0.06,
		marginTop:18
	},
	//单个GPU内容中GPU名字文字样式
	individualNameText:{
		fontSize:20,
		color:'white'
	},
	//单个GPU硬件详细数值的View
	individualDetailView:{
		flexDirection:'row',
		justifyContent:'flex-start',
		alignItems:'center',
		marginLeft:windowWidth*0.06,
		marginVertical:10
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
		fontSize:20
	},
	//单个GPU硬件详细数值的数字View
	individualDetailNumberView:{
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'green',
		height:windowHeight*0.03,
		width:windowHeight*0.06,
		borderRadius:windowHeight*0.03,
		marginHorizontal:windowWidth*0.03
	},
	//单个GPU硬件详细数值的数字样式
	individualDetailNumber:{
		color:'white',
		fontSize:18
	}
})