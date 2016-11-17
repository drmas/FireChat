import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import md5 from '../lib/md5'

import { Colors, Styles } from '../Shared'

import firestack from '../lib/Firestack';

import TextField from '../Components/TextField';
import Button from '../Components/Button';
import Separator from '../Components/Separator';

export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }

    generateChatId() {
        if(this.user.uid > this.friend.uid)
            return `${this.user.uid}-${this.friend.uid}`
        else
            return `${this.friend.uid}-${this.user.uid}`
    }

    static route = {
        navigationBar: {
            title: 'Chat',
            ... Styles.NavBarStyles
        }
    }

    getRef() {
        return firestack.database.ref();
    }

    listenForItems(chatRef) {
        chatRef.on('value', ({value}) => {
            if(!value) {
                return this.setState({
                    loading: false,
                    messages: []
                });
            }
            // get children as an array
            var items = [];
            Object.keys(value).forEach((key) => {
                const child = value[key];
                var avatar = 'https://www.gravatar.com/avatar/' + ( child.uid == this.user.uid? md5(this.user.email) : md5(this.friend.email))
                var name = child.uid == this.user.uid? this.user.name: this.friend.name
                items.push({
                    _id: child.createdAt,
                    text: child.text,
                    createdAt: new Date(child.createdAt),
                    user: {
                        _id: child.uid,
                        avatar: avatar
                    }
                });
            });

            this.setState({
                loading: false,
                messages: items
            })


        });
    }

    async componentDidMount() {
        this.user = await firestack.auth.getCurrentUser();
        this.friend = this.props.friend;

        this.chatRef = this.getRef().child('chat/' + this.generateChatId());
        this.chatRefData = this.chatRef.orderByChild('order')
        this.onSend = this.onSend.bind(this);
        this.listenForItems(this.chatRefData);
    }

    componentWillUnmount() {
        this.chatRefData.off()
    }

    onSend(messages = []) {

        // this.setState({
        //     messages: GiftedChat.append(this.state.messages, messages),
        // });
        messages.forEach(message => {
            var now = new Date().getTime()
            this.chatRef.push({
                _id: now,
                text: message.text,
                createdAt: now,
                uid: this.user.uid,
                order: -1 * now
            })
        })
        
    }
    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend.bind(this)}
                user={{
                    _id: this.user ? this.user.uid : '',
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