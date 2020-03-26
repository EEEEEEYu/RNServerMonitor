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

				<View style={styles.gpuContentView}>

					<View style={styles.overallInfoView}>

						<View style={styles.overallIconView}>
							<Text>这里放入GPU图标</Text>
						</View>

						<View style={styles.overallListView}>
							<View style={styles.overallListItemView}>
								<Text>整体使用率</Text>
								<Text>8.9%</Text>
							</View>
							<View style={styles.overallListItemView}>
								<Text>整体显存使用率</Text>
								<Text>89%</Text>
							</View>
						</View>

					</View>

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
		alignItems:'center'
	},
	//图表下方所有item的View
	gpuContentView:{
		flexDirection:'column',
		justifyContent:'flex-start',
		flex:50
	},
	//头部整体信息的View
	overallInfoView:{
		height:windowHeight*0.15,
		flexDirection:'row',
		justifyContent:'flex-start',
		backgroundColor:'red'
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
		flex:1,
		backgroundColor:'orange'
	},
	individualInfoView:{
		flexDirection:'column',
		height:windowHeight*0.15,
		backgroundColor:'green'
	},
	individualNameTextView:{
		flexDirection:'row',
		justifyContent:'flex-start'
	},
	individualNameText:{
		fontSize:20,
		color:'white'
	},
	individualDetailView:{
		flexDirection:'row',
		justifyContent:'space-evenly',
		alignItems:'center'
	},
	individualDetailTextView:{
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center'
	},
	individualDetailText:{
		color:'white',
		fontSize:20
	},
	individualDetailNumberView:{

	},
	individualDetailNumber:{
		color:'white',
		fontSize:18
	}
})