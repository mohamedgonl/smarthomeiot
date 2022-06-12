import {StyleSheet,Text, View, Touchable, Image} from 'react-native'

export default function Profile(){
    return(
        <View style={
            {flex: 1,
            justifyContent:'center',
        alignItems:'center'}
        }>
            <Text>
                This is profile
            </Text>
        </View>
    )
}