import React, {Component} from 'react';
import { 
    View,
    StyleSheet
} from 'react-native';
import { Colors, Styles } from '../Shared'

export default class MyTextField extends Component {
    render() {
        return (
            <View style={styles.container} />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        height: 1,
        backgroundColor: Colors.secondaryColor,
        alignSelf: 'stretch'
    },
})