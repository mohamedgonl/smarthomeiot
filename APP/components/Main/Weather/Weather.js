import {Text, View, Dimensions, StatusBar, ScrollView, Image, ImageBackground, SafeAreaView, StyleSheet} from 'react-native'
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
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
export default function Weather(){
    const [curdata, setCurData] = useState({
        location: {
            name: ''
        },
        current: {
            temp_c: 0.0,
            temp_f: 0.0,
            condition: {
                text: '',
                icon: ''
            },
            humidity: 0,
            uv: 0,
            cloud: 0,
            wind_dir: '',
            wind_mph: 0.0
        }
    });
    const [forecast, setForecast] = useState([]);
    const [reload, setReload] = useState(0);
    useEffect(() => {
        getWeatherData()
    }, []);
    const getWeatherData = async () => {
      try {
        const url = 'http://api.weatherapi.com/v1/forecast.json?key=16c80faf85f8469888485235221107&q=Hanoi&days=7';
        await  axios.get(url)
        .then(res => res.data)
        .then(dat => {
            setCurData({
                location: {
                    name: dat.location.name,
                },
                current: {
                    temp_c: dat.current.temp_c,
                    temp_f: dat.current.temp_f,
                    condition: {
                        text: dat.current.condition.text,
                        icon:'https:'+ dat.current.condition.icon
                    },
                    humidity: dat.current.humidity,
                    uv: dat.current.uv,
                    cloud: dat.current.cloud,
                    wind_dir: dat.current.wind_dir,
                    wind_mph: dat.current.wind_mph
                }
            })
             let forecastday = dat.forecast.forecastday
             forecastday = forecastday.map(e => {
                return({
                    date: e.date,
                    max: e.day.maxtemp_c,
                    min: e.day.mintemp_c,
                    icon: e.day.condition.icon,
                    text: e.day.condition.text
                })
            })
            setForecast(forecastday)
        })
        .finally(()=>{
           setReload(reload+1)
        })
      } catch (err) {
        console.log(err);
      }
    }
    const ForecastView = ({day, text, icon, max, min}) => {
        icon = 'https:' + icon;
        return (
        <View style={{backgroundColor: '#E1E1E1', height: 80, borderRadius: 10, width: '100%', marginTop: 10, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{justifyContent: 'center', maxWidth: 100}}>
                <Text style={style.curWeTittle}>{day}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', maxWidth: 150}}>
            <Image 
             style={{resizeMode: 'contain', height: 40, width: 40}}
            source={{uri:icon}}></Image>
            <Text style={{fontSize: 20}}>{text}</Text>
            </View>
            <View style={{justifyContent: 'center', maxWidth: 150}}>
                <Text style={style.curWeTittle}>Max: {max}°C</Text>
                <Text style={style.curWeTittle}>Min: {min}°C</Text>
            </View>
        </View>
        )
    }
    return(
        <SafeAreaView style={{flex: 1}}>
            <ImageBackground source={{uri: 'https://i.pinimg.com/550x/b1/9b/93/b19b93f12acc611dd7338491f659dd3d.jpg'}}
        style={{flex: 1, justifyContent: 'center'}}>
        <ScrollView
        style={{marginHorizontal: 5}}>
        <View style={{alignItems: 'center', marginTop: 50, marginBottom: 20}}>
            <IconEntypo  name='location' size={26} color='white' > {curdata.location.name}</IconEntypo>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{fontSize: 50, color: 'white', fontWeight: '600'}} >{curdata.current.temp_c}°C</Text>
            <Image 
             style={{width: 100, height: 100}}
            source={{uri:curdata.current.condition.icon}}></Image>
            </View>
            <Text style={{color: 'white', fontSize: 25, fontStyle: 'italic', fontWeight: '200'}}>{curdata.current.condition.text}</Text>
            <View style={{backgroundColor: '#FBFBFB', height: 140, borderRadius: 15, width: '100%', marginTop: 20, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-around'}}>
                <View style={{justifyContent: 'space-around'}}>
                    <View>
                        <Text style={style.curWeTittle}>F</Text>
                        <Text>{curdata.current.temp_f}°</Text>
                    </View>
                    <View>
                        <Text style={style.curWeTittle}>Wind</Text>
                        <Text>{curdata.current.wind_mph}M/s</Text>
                    </View>
                </View>
                <View style={{justifyContent: 'space-around'}}>
                    <View>
                        <Text style={style.curWeTittle}>Humidity</Text>
                        <Text>{curdata.current.humidity}%</Text>
                    </View>
                    <View>
                        <Text style={style.curWeTittle}>Wind direction</Text>
                        <Text>{curdata.current.wind_dir}</Text>
                    </View>
                </View>
                <View style={{justifyContent: 'space-around'}}>
                    <View>
                        <Text style={style.curWeTittle}>UV</Text>
                        <Text>7.0</Text>
                    </View>
                    <View>
                        <Text style={style.curWeTittle}>Cloud</Text>
                        <Text>{curdata.current.cloud}%</Text>
                    </View>
                </View>
              
            </View>
        </View>
        {forecast.map((e)=> <ForecastView
        icon={e.icon}
        max={e.max}
        text= {e.text}
        min= {e.min}
         day={e.date} />)}
       
</ScrollView>
        </ImageBackground></SafeAreaView>
        
    )
}


const style = StyleSheet.create({
    curWeTittle : {
        color: '#000000',
        fontSize: 17,
        fontWeight: '700'
    },
    curWeValue: {
        color: '#696F70'
    }
})