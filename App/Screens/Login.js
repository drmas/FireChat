import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Colors, Styles } from '../Shared'

import TextField from '../Components/TextField';
import Button from '../Components/Button';
import Separator from '../Components/Separator';

import firestack from '../lib/Firestack';

export default class Login extends Component {

    static route = {
        navigationBar: {
            title: 'Login',
            ... Styles.NavBarStyles
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: null
        }
    }

    componentDidMount() {
        firestack.auth.listenForAuth((evt) => {
            // evt is the authentication event
            // it contains an `error` key for carrying the
            // error message in case of an error
            // and a `user` key upon successful authentication
            if (!evt.authenticated) {
                // There was an error or there is no user
                console.log(evt.error)
            } else {
                // evt.user contains the user details
                this.props.navigator.push('friendsList')
                this.setState({
                    loading: false
                })
            }
        })
            .then(() => console.log('Listening for authentication changes'))
    }

    componentWillMount() {
        firestack.auth.unlistenForAuth();
    }

    login = () => {
        this.setState({
            errorMessage: null,
            loading: true 
        })
        const {email, password} = this.state;
        firestack.auth.signInWithEmail(email, password)
            .catch((error) => {
                // Handle Errors here.
                var errorMessage = error.rawDescription;
                this.setState({
                    errorMessage,
                    loading: false
                })
            });
    }

    renderErrorMessage = () => {
        if(this.state.errorMessage)
            return <Text style={styles.error}>{this.state.errorMessage}</Text>
    }

    render() {
        return (
            <View style={styles.container}>
                <TextField placeholder="Email"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email }) } />
                <TextField placeholder="Password" secureTextEntry
                    value={this.state.password}
                    onChangeText={password => this.setState({ password }) } />
                <Button primary onPress={this.login}>Login</Button>
                {this.renderErrorMessage()}
                <Separator />
                <Button secondary onPress={() => {
                    this.props.navigator.push('signup');
                } }>Sign Up</Button>
                <Button secondary onPress={() => {
                    this.props.navigator.push('forgetPassword');
                } }>Forget Password</Button>

                <Spinner visible={this.state.loading} />
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
    },
    error: {
        margin: 8,
        marginBottom: 0,
        color: 'red',
        textAlign: 'center'
    }
})