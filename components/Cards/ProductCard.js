import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import CustomText from './../Custom/CustomText'
import SellerStatusBadge from './../Badges/SellerStatusBadge'

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
         <View style={styles.textArea}>
            <View style={styles.desc}>
                <View style={styles.title}>
                    <CustomText numberOfLines={1} bold={true} >{props.title}</CustomText>
                    <CustomText numberOfLines={1} italic={true} >{props.seller}</CustomText>
                </View>
                <SellerStatusBadge online={props.online} style={styles.badge} />
            </View>
            <CustomText style={styles.price}>{'R$ '+props.price}</CustomText>
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
    desc: {
        flex: 1
    },
    textArea: {
        flex: 1,
        flexDirection: 'row',
        padding: 10
    },
    badge: {
        flex: 0
    },
    title: {
        flex: 1
    },
    price: {
        flex: 0,
        textAlignVertical: 'bottom'
    }
});


