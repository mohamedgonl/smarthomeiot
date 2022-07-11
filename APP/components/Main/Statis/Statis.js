import {Text, View, Dimensions, StatusBar} from 'react-native'
import LineGraph from '@chartiful/react-native-line-graph'
import {useState, useEffect} from 'react'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default function Statis(){
    const [temperature, setTemperature] = useState([1,2,3,4,5]);
    const getTemperature = async () => {
      try {
        const url = '';
        
      } catch (err) {
        
      }
    }
    return(
        <>
        <View>
  <Text>Bezier Line Chart</Text>
  <LineChart
    data={{
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: temperature
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisSuffix="°C"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "E2E2C2",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      //marginVertical: 8,
      //borderRadius: 16,
      margin: 15
    }}
  />
</View>
        </>
    )
}