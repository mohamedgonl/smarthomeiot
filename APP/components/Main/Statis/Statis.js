import {Text, View, Dimensions, StatusBar} from 'react-native'
import LineGraph from '@chartiful/react-native-line-graph'
import {useState, useEffect} from 'react'
export default function Statis(){
    const [temperature, setTemperature] = useState([]);
    const getTemperature = async () => {
      try {
        const url = '';
        
      } catch (err) {
        
      }
    }
    return(
        <View  style={
            {flex: 1,
          //  justifyContent:'center',
        alignItems:'center'}
        }>
          <Text>Temperature</Text>
            <LineGraph
  data={[10, 15, 7, 20, 14, 12, 10, 20]}
  width={Dimensions.get('window').width - 90}
  height={200}
  lineColor='#347975'
  dotColor='#347975'
  lineWidth={3}
  isBezier
  hasDots={true}
  baseConfig={{
    startAtZero: false,
    hasXAxisBackgroundLines: false,
    xAxisLabelStyle: {
      prefix: '$',
      offset: 0
    },
    hasYAxisLabels: true
  }}
  style={{
    marginBottom: 30,
    padding: 10,
    paddingTop: 20,
    borderRadius: 20,
    width: Dimensions.get('window').width - 70,
    backgroundColor: `#dbf0ef`
  }}
/>
        </View>
    )
}