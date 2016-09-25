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
            title: 'SignUp',
            ... Styles.NavBarStyles
        }
    }

    render() {
        console.log(Colors)
        return (
            <View style={styles.container}>
                <TextField placeholder="Full Name" />
                <TextField placeholder="Email" />
                <TextField placeholder="Password" secureTextEntry />
                <Button secondary>Sign Up</Button>
                <Separator />
                <Button primary onPress={() => {
                    this.props.navigator.pop();
                }}>Login</Button>
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