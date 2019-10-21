import React from 'react';
import { StyleSheet, View, Image, Text, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

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
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.desc}>{'R$ '+props.price}</Text>
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
    title: {
        fontWeight: 'bold'
    },
    desc: {
        flex: 1,
        textAlign: 'right',
        textAlignVertical: 'bottom'
    }
});


