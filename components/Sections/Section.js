import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import CustomText from './../Custom/CustomText'

export default function Section(props) {
    return (
        <View style={styles.container}>
            <CustomText style={styles.text}>
                {props.title}
            </CustomText>
            <ScrollView horizontal={props.horizontal} styles={styles.scrollview}>
                {props.children}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        padding: 15,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white'
    },
    text: {
        marginBottom: 15,
        marginHorizontal: 3,
        fontSize: 14,
        fontWeight: 'bold'
    },
    scrollview: {
        borderWidth: 1,
        borderColor: 'grey',
        width: '100%',
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20
    }
})