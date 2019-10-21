import React from 'react';
import { StyleSheet, View, Image, Dimensions} from 'react-native';
import CustomText from './../Custom/CustomText'

export default function FoodCard(props) {
  return (
    <View style={styles.foodcard}>
        <View style={{height: 100, width: 100, justifyContent: 'center', alignItems: 'center'}}>
            <Image
                resizeMode='stretch'
                style={{width: 70, height: 70}}
                source={props.image}
            />
        </View>
         <View style={styles.text}>
            <CustomText bold={true} style={styles.title}>{props.title}</CustomText>
            <CustomText style={styles.desc}>{'R$ '+props.price}</CustomText>
         </View>
    </View>
  );
}

const styles = StyleSheet.create({
    foodcard: {
        flex: 1,
        flexDirection: 'row',
        width: "100%",
        height: 100,
        borderWidth: 0.8,
        borderColor: '#E0E0E0',
        borderRadius: 5,
        backgroundColor: '#fff',
        marginBottom: 5
    },
    text: {
        flex: 1,
        padding: 15
    },
    title: {},
    desc: {
        flex: 1,
        textAlign: 'right',
        textAlignVertical: 'bottom'
    }
});


