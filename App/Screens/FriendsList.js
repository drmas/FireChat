import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ListView,
    Image
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import md5 from '../lib/md5'

import { Colors, Styles } from '../Shared'

import Button from '../Components/Button';
import firestack from '../lib/Firestack';

var navigator;

export default class FriendsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loading: true 
        };
        this.friendsRef = this.getRef().child('friends');

        navigator = this.props.navigator
    }

    getRef() {
        return firestack.database.ref();
    }

    async listenForItems(friendsRef) {

        var user = await firestack.auth.getCurrentUser();

        friendsRef.on('value', ({value}) => {
            var items = [];
            Object.keys(value).forEach((key) => {
                const child = value[key];
                if(child.email != user.email)
                    items.push({
                        name: child.name,
                        uid: child.uid,
                        email: child.email
                    });
            });
            
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items),
                loading: false
            });

        });
    }

    componentDidMount() {
        this.listenForItems(this.friendsRef);
    }

    static route = {
        navigationBar: {
            title: 'Friends List',
            ... Styles.NavBarStyles,
            renderRight: (route, props) => <Button primary
                style={styles.rightButton}
                onPress={() => {
                    firebase.auth().signOut().then(() => {
                        navigator.pop();
                    }, function (error) {
                        // An error happened.
                    });
                } }>Log out</Button>
        }
    }


    renderRow = (rowData) => {
        return <TouchableOpacity onPress={() => this.props.navigator.push('chat', {friend: rowData}) }>
            <View style={styles.profileContainer}>
                <Image source={{ uri: 'https://www.gravatar.com/avatar/' + md5(rowData.email) }} style={styles.profileImage}/>
                <Text style={styles.profileName}>{rowData.name}</Text>
            </View>
        </TouchableOpacity>
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topGroup}>
                    <Text style={styles.myFriends}>My Friends</Text>
                    <TouchableOpacity>
                        <Text style={styles.inviteFriends}>Invite More Freinds</Text>
                    </TouchableOpacity>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow} />
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
    rightButton: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 10,
        padding: 0,
    },
    topGroup: {
        flexDirection: 'row',
        margin: 10
    },
    myFriends: {
        flex: 1,
        color: Colors.grayColor,
        fontSize: 16,
        padding: 5
    },
    inviteFriends: {
        color: Colors.mainColor,
        padding: 5
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        marginLeft: 6,
        marginBottom: 8,
    },
    profileImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginLeft: 6
    },
    profileName: {
        marginLeft: 6,
        fontSize: 16
    }

})