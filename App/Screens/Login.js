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

export default class Login extends Component {

    static route = {
        navigationBar: {
            title: 'Login',
            ... Styles.NavBarStyles
        }
    }

    render() {
        console.log(Colors)
        return (
            <View style={styles.container}>
                <TextField placeholder="Email" />
                <TextField placeholder="Password" secureTextEntry />
                <Button primary onPress={() => {
                    this.props.navigator.push('friendsList');
                }}>Login</Button>
                <Separator />
                <Button secondary onPress={() => {
                    this.props.navigator.push('signup');
                }}>Sign Up</Button>
                <Button secondary onPress={() => {
                    this.props.navigator.push('forgetPassword');
                }}>Forget Password</Button>
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