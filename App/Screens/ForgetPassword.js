import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { Colors, Styles } from '../Shared'

import TextField from '../Components/TextField';
import Button from '../Components/Button';
import Separator from '../Components/Separator';

export default class ForgetPassword extends Component {

    static route = {
        navigationBar: {
            title: 'Forget Password',
            ... Styles.NavBarStyles
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextField placeholder="Email" />
                <Button primary>Forget Password</Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        marginRight: 10,
        marginLeft: 10
    }
})