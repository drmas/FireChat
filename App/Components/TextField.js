import React, {Component} from 'react';
import { 
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';
import { Colors, Styles } from '../Shared'

export default class MyTextField extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                    style={styles.text}
                    placeholder={this.props.placeholder}
                    onChangeText={this.props.onChangeText}
                    value={this.props.value}
                    secureTextEntry={this.props.secureTextEntry}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderBottomWidth: 1,
        borderColor: '#DBDBDB'
    },
    text: {
        fontSize: 16,
        height: 40
    }
})