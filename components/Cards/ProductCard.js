import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import CustomText from './../Custom/CustomText'
import SellerStatusBadge from './../Badges/SellerStatusBadge'

export default function ProductCard(props) {
  return (
    <View style={styles.foodcard}>
        <View style={{height: 100, width: 100, justifyContent: 'center', alignItems: 'center'}}>
            <Image
                resizeMode='stretch'
                style={{width: 75, height: 75, borderRadius: 15}}
                source={props.image}
            />
        </View>
         <View style={styles.textArea}>
            <View style={styles.desc}>
                <View style={styles.titleArea}>
                    <CustomText style={styles.titleText} numberOfLines={1} >{props.title}</CustomText>
                    <CustomText numberOfLines={1} italic={true} style={styles.sellerText} >{props.seller}</CustomText>
                </View>
                <SellerStatusBadge online={props.online} style={styles.badge} />
            </View>
            <CustomText style={styles.price}>{'R$ '+props.price.toFixed(2)}</CustomText>
         </View>
    </View>
  );
}

const styles = StyleSheet.create({
    foodcard: {
        flexDirection: 'row',
        height: 100,
        borderWidth: 0.8,
        borderColor: '#E0E0E0',
        borderRadius: 5,
        backgroundColor: '#fff',
        marginBottom: 8,
        elevation: 2
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
    titleArea: {
      flex: 1
    },
    titleText: {
      fontSize: 15
    },
    price: {
        flex: 0,
        textAlignVertical: 'bottom'
    },
    sellerText: {
      fontSize: 11
    }
});