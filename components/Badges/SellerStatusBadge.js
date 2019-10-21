import React from 'react'
import { View, StyleSheet } from 'react-native'
import CustomText from './../Custom/CustomText'
import { Entypo } from '@expo/vector-icons'

export default function SellerStatusBadge(props) {
    let icon = "info-with-circle"
    
    let text = "Online agora!"
    let color = "green"

    if (!props.online) {
        text = "Offline"
        color = "grey"
    }
    return(
        <View style={styles.container}>
            <Entypo name={icon} size={12} color={color} style={styles.icon} />
            <CustomText italic={true} style={styles.status}>{text}</CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'row'
    },
    icon: {
        flex: 0,
        marginRight: 3
    },
    status: {
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 10,
        textAlignVertical: 'center'
    }
})