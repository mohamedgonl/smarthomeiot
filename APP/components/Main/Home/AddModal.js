import { Dimensions, Modal, StyleSheet, View, Text, Animated } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather'
import React, {useState, useEffect} from "react";
const width = Dimensions.get('window')
const AddModal = ({visible,children, headerTitle, hide, submit}) => {
    const [showModal, setShowModal] = useState(visible);
    const scaleValue = React.useRef(new Animated.Value(0)).current;
    // hieu ung bat tat modal
    React.useEffect(()=>{
        toggleModal()
    },[visible])

    const toggleModal = () => {
        if(visible) {
            setShowModal(true);
            Animated.spring(scaleValue,{
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start()
        }
        else {
            setShowModal(false);

        }
    }
    return (
        <Modal
        transparent visible={showModal}>
            <View style={style.modalBackGround}>
                <Animated.View style={[style.modalContainer,{transform:[{scale: scaleValue}]}]}>
                    <View style={[{flexDirection:'row', alignItems:'center'}]}>
                        <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 25, flex:4}} >{headerTitle}</Text>
                        <Icon onPress={hide}
                         name='x-circle' style={{flex: 1, textAlign: 'right'}} size={25}></Icon>
                    </View>
                    <View style={{zIndex:2}}>{children}</View>
                    <TouchableOpacity
                    onPress={submit}
                     style={{zIndex:3,backgroundColor:'#B5D29E', borderRadius: 25, borderColor:'black', height: 40, width:80, justifyContent: 'center', alignSelf: 'center'}}>
                        <Text style={{textAlign: 'center', fontStyle:'italic', fontWeight:'500'}}>Save</Text>
                    </TouchableOpacity>
             </Animated.View>
             </View>
        </Modal>
    )
}
const style = StyleSheet.create({
    modalBackGround : {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: 'center',
        paddingBottom: 50,
        alignItems: 'center',
        zIndex: 1
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        zIndex: 2,
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,
    }
})
export default AddModal