import {Text, View, Dimensions, StatusBar, ScrollView, SafeAreaView} from 'react-native'
import {useState} from 'react'
import { ButtonGroup } from "@rneui/themed";
import {
  LineChart,
  BarChart,
  PieChart,
} from "react-native-chart-kit";

export default function Statis(){
    const [temperature, setTemperature] = useState([19.7,20.1,22.9,27.2,31.4,32.9]);
    const [checked, setChecked] = useState(2);
    const component1 = () => <Text>Day</Text>
    const component2 = () => <Text>Week</Text>
    const component3 = () => <Text>Month</Text>
    const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }]
    return(
      <SafeAreaView style={{marginBottom: 160}}>
        <View>
           <ButtonGroup
             onPress={(e)=>setChecked(e)}
              selectedIndex={checked}
              buttons={buttons}
              containerStyle={{height: 50}} />
          </View>
        <ScrollView>  
          <View >
             <Text style={{ fontWeight: '400', fontSize: 25, paddingLeft: 20}}>Temperature</Text>
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
                  //   bezier
                 style={{
                    margin: 15,
                 }}/>
          </View>

          <View>
          <Text style={{ fontWeight: '400', fontSize: 25, paddingLeft: 20}}>Humidity</Text>
          <BarChart
       //   style={graphStyle}
       data={ {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [15, 36, 68, 92, 100, 100]
          }
        ]
          }}
          width={Dimensions.get("window").width-30} // from react-native
          height={220}
          yAxisSuffix="%"
          chartConfig={{
            backgroundGradientFrom: "#1B6784",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#1B6784",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5,
            useShadowColorFromDataset: false // optional
          }}
          style={{
            margin: 15,
            backgroundColor: '#1B6784'
         }}
            />  
             </View>
             <View>
          <Text style={{ fontWeight: '400', fontSize: 25, paddingLeft: 20}}>Electricity</Text>
          <PieChart
            data={[
              {
                name: "Living room",
                electric: 21.6,
                color: "#48C9B0",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              },
              {
                name: "Kitchen",
                electric: 50.3,
                color: "#F7DC6F",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              },
              {
                name: "Gymroom",
                electric: 10.9,
                color: "#AAB7B8",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              },
              {
                name: "Bedroom",
                electric: 26.7,
                color: "#F1948A",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              },
              
            ]}
            width={Dimensions.get("window").width-30}
            height={220}
            chartConfig={{
              backgroundGradientToOpacity: 0.5,
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
              strokeWidth: 2, // optional, default 3
              barPercentage: 0.5,
              useShadowColorFromDataset: false // optional
            }}
            accessor={"electric"}
            backgroundColor={"transparent"}
         //   paddingLeft={"15"}
         //   center={[10, 50]}
           // absolute
/>
             </View>
        </ScrollView>
        </SafeAreaView>
    )
}