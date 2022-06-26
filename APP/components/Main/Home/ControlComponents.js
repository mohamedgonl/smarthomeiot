
import ColorPicker from 'react-native-wheel-color-picker'
import Slider from '@react-native-community/slider'
import DropDownPicker from 'react-native-dropdown-picker';
import {Text, View,Switch} from 'react-native'
import {useState} from 'react'
const ControlSlider = ({ name, value, max}) => {
    const [range, setRange] = useState(value);
    return (
    <View style={{flexDirection:'row', flexWrap:'wrap',  marginTop: 10, padding: 10, zIndex:1}}> 
        <Text style={{ alignSelf: 'flex-end', fontSize: 20, fontWeight: '500', fontStyle:'italic', marginRight:25, marginLeft:10, paddingBottom:10, width:100}}>{name}:</Text>
        <View style={{justifyContent:'center', alignSelf:'stretch'}}>
            <Text  style={{ alignSelf: 'center', fontSize: 18}}>{range}</Text>
            <Slider
                style={{width: 250, height: 40}}
                minimumValue={0}
                maximumValue={max}
                minimumTrackTintColor='tomato'
                maximumTrackTintColor='#DCDCDC'
                thumbTintColor='tomato'
                value={range}
                onValueChange={value=> setRange(parseInt(value))} />
        </View>
    </View> )
}
const StatusView = ({isEnabled,setIsEnabled}) => {

    return (
        <View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={()=>setIsEnabled(isEnabled=>!isEnabled)}
          value={isEnabled}
        />
      </View>
    )
}
const ModePicker = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);     
    const [items, setItems] = useState([
          {label: 'Cực mạnh', value: '1'},
          {label: 'Mạnh', value: '2'},
          {label: 'Vừa', value: '3'},
          {label: 'Nhẹ', value: '4'},
          {label: 'Cực nhẹ', value: '5'},
       ]);
    return ( 
    <View style={{flexDirection:'row', flexWrap:'wrap',  marginTop: 10, padding: 10, zIndex: 5}}>
        <Text  style={{ width: 100,alignSelf: 'flex-end', fontSize: 20, fontWeight: '500', fontStyle:'italic', marginRight:25, marginLeft:10, paddingBottom:10, width:100}}>Mode:</Text>
        <View style={{justifyContent:'center'}}> 
            <DropDownPicker 
            placeholder='Select mode'
            style={{ width: 250}}
            selectedItemLabelStyle={{
                fontWeight: "bold"
              }}
            
            autoScroll={true}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}

            //onSelectItem ={(item) => setNewDevice({ ...newDevice,deviceType: item.value,})}
            setItems={setItems} /> 
        </View>
       
    </View>
    )
}

const ColorMode = () => {
    const [color, setColor] = useState('#ed1c24');
    return(
    <View style={{ marginTop: 10, padding: 10,flexDirection:'row', flexWrap:'wrap'}}>
        <Text 
        style={{ width: 100, fontSize: 20, fontWeight: '500', 
        fontStyle:'italic', marginRight:25, marginLeft:10, paddingBottom:10, width:100}}>Color: </Text>
        <ColorPicker
        onColorChange={color=>console.log(color)}
		thumbSize={20}
		shadeSliderThumb
        sliderHidden
        color={color}
        swatches={false}
        row={true}
		 />
    </View>
        
    )
}

export {ColorMode,ControlSlider,ModePicker,StatusView}