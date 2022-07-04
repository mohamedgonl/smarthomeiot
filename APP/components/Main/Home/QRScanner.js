import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';

export default function QRScanner({navigation, route}) {
  const {roomId} = route.params
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);


  const addDevice = async (deviceId) =>{
    try {
      const url = 'https://smarthome-iot-hust.herokuapp.com/room/adddevice';
      const data = {
        roomId: roomId,
        deviceId : deviceId
      }
      await axios.post(url, data)
      .then(res=> res.data)
      .then(data =>{
        if(data.status == 'OK') Alert.alert('Add new device succcess!','',[{text: 'OK', onPress: ()=>navigation.goBack()}])
      })
    } catch (err) {
        console.log('add device err: ',err);
    }
  }




  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const getDeviceInfo = async (deviceId) => {
    try {
        const url = 'https://smarthome-iot-hust.herokuapp.com/device/'+deviceId
      await   axios.get(url)
        .then(res=>res.data)
        .then(data => {
            const deviceInfo = data.deviceInfo
            const showConfirmAddDevice = () => Alert.alert('Do you want to add this device to the room?','',
                [{text: 'YES',onPress: ()=>addDevice(deviceId)},{text: 'NO'}]);
            Alert.alert('Device found',`Device name: "${deviceInfo.deviceName}" Device type: "${deviceInfo.deviceType}"`,[{text:'OK', onPress: showConfirmAddDevice}])
        })
    } catch (err) {
        console.log(err);
    }
  }
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    getDeviceInfo(data)
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
        <Text
        style={{textAlign: 'center', marginBottom: 100, marginTop: 100, fontSize: 20, fontStyle: 'italic'}}
        >Scan your device's QR code</Text>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{width: 300, height: 300}}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
      //  justifyContent: 'center',
        alignSelf: 'center'
    }
 }); 