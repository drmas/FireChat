import React, {Component} from 'react';
import { 
    View,
    Text,
    StyleSheet
} from 'react-native';
const firebase = require("firebase");
import Spinner from 'react-native-loading-spinner-overlay';

import { Colors, Styles } from '../Shared'

import TextField from '../Components/TextField';
import Button from '../Components/Button';
import Separator from '../Components/Separator';

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            errorMessage: null
        }

        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
    }

    onAuthStateChanged = (user) => {
            if (user) {
                this.getRef().child('friends').push({
                    email: user.email,
                    uid: user.uid,
                    name: this.state.name
                })
                this.props.navigator.push('friendsList')
                this.setState({
                    loading: false
                })
            }
        }

    getRef() {
        return firebase.database().ref();
    }

    static route = {
        navigationBar: {
            title: 'SignUp',
            ... Styles.NavBarStyles
        }
    }

    signup = () => {
        this.setState({
            errorMessage: null,
            loading: true 
        })
        const {email, password} = this.state;
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
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
                <TextField placeholder="Full Name" 
                    value={this.state.name}
                    onChangeText={name => this.setState({ name }) } />
                <TextField placeholder="Email" 
                    value={this.state.email}
                    onChangeText={email => this.setState({ email }) } />
                <TextField placeholder="Password" secureTextEntry 
                    value={this.state.password}
                    onChangeText={password => this.setState({ password }) } />
                <Button secondary onPress={()=>this.signup()}>Sign Up</Button>
                {this.renderErrorMessage()}
                <Separator />
                <Button primary onPress={() => {
                    this.props.navigator.pop();
                }}>Login</Button>
                <Button secondary onPress={() => {
                    this.props.navigator.push('forgetPassword');
                }}>Forget Password</Button>

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
    }
})