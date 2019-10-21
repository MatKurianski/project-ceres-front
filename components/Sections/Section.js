import React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';

const {height, width} = Dimensions.get('window');

export default function Section(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {props.title}
            </Text>
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
        width: width,
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20
    }
})