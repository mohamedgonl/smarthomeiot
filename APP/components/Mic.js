import {StyleSheet,Text, View, Touchable, Image} from 'react-native'

export default function Mic(){
    return(
        <View style={
            {flex: 1,
            justifyContent:'center',
            alignItems:'center'}
        }>
            <Text>
                This is MIC
            </Text>
        </View>
    )
}