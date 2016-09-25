import React, {Component} from 'react';
import { 
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { Colors, Styles } from '../Shared'

export default class MyTextField extends Component {
    render() {
        const color = this.props.primary ? Colors.mainColor: Colors.secondaryColor
        const textColor = this.props.primary ? 'white' : Colors.mainColor
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={[styles.container, {backgroundColor: color}, this.props.style]}>
                    <Text
                        style={[styles.text, {color: textColor}]}>{this.props.children}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        backgroundColor: Colors.mainColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        elevation: 4
    },
    text: {
        fontSize: 16,
        color: 'white'
    }
})