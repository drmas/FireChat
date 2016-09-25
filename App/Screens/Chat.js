import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

import { Colors, Styles } from '../Shared'

import TextField from '../Components/TextField';
import Button from '../Components/Button';
import Separator from '../Components/Separator';

export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = { messages: [] };
        this.onSend = this.onSend.bind(this);
    }
    static route = {
        navigationBar: {
            title: 'Chat',
            ... Styles.NavBarStyles
        }
    }


    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://lh3.googleusercontent.com/-RZkCJ8ZBI0o/AAAAAAAAAAI/AAAAAAAAAAA/a7-CJ_O0tjU/s46-c-k-no/photo.jpg',
                    },
                },
            ],
        });
    }
    onSend(messages = []) {
        this.setState({
                messages: GiftedChat.append(this.state.messages, messages),
            });
    }
    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                user={{
                    _id: 1,
                }}
                />
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