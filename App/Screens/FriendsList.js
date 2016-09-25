import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ListView,
    Image
} from 'react-native';
import { Colors, Styles } from '../Shared'

import TextField from '../Components/TextField';
import Button from '../Components/Button';
import Separator from '../Components/Separator';

export default class FriendsList extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows([
                'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
            ])
        };
    }

    static route = {
        navigationBar: {
            title: 'Friends List',
            ... Styles.NavBarStyles,
            renderRight: (route, props) => <Button primary style={styles.rightButton}>Log out</Button>
        }
    }

    renderRow = (rowData) => {
        return <TouchableOpacity onPress={()=> this.props.navigator.push('chat')}>
            <View style={styles.profileContainer}>
                <Image source={{uri: 'https://lh3.googleusercontent.com/-RZkCJ8ZBI0o/AAAAAAAAAAI/AAAAAAAAAAA/a7-CJ_O0tjU/s46-c-k-no/photo.jpg'}} style={styles.profileImage}/>
                <Text style={styles.profileName}>{rowData}</Text>
            </View>
        </TouchableOpacity>
    }

    render() {
        console.log(Colors)
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
    profileName:{
        marginLeft: 6,
        fontSize: 16
    }

})