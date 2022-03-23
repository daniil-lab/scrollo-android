import React, {Component} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {White} from '../../themes/constantColors';

class MessageListItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {theme,item, navigation} = this.props;

        return (
            <TouchableWithoutFeedback onPress={() => {
                navigation.push('Message', {item: item})
            }}>
                <View style={[
                    styles.container,
                    {backgroundColor: theme.container.backgroundColor,
                    borderColor: theme.secondarySColor},
                ]}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center',}}>
                        <FastImage style={styles.profileImage} source={{uri: item.profilePic}}/>
                        <View style={[styles.onlineView, {backgroundColor: theme.onlineColor}]} />
                        <View style={styles.nameView}>
                            <Text style={[styles.usernameText, {color: theme.primaryColor}]}>{item.username}</Text>
                            <Text style={[styles.messageText, {color: theme.secondaryColor}]}>{item.lastMessage}</Text>
                        </View>
                        <View style={styles.timeView}>
                            <Text style={[styles.timeText, {color: theme.secondaryColor}]}>{'23 m'}</Text>
                            {
                                item.unReadCount > 0 && <View style={[styles.readView, {backgroundColor: theme.buttonRed}]}>
                                    <Text style={[styles.readText]}>{item.unReadCount}</Text>
                                </View>
                            }
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default MessageListItem;

const styles = StyleSheet.create({
    container: {
        padding: 15,
        height: 75,
        borderBottomWidth: 1
    },
    profileImage: {
        width: 56,
        height: 56,
        borderRadius:28
    },
    onlineView: {
        height: 12,
        width: 12,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: White,
        marginTop: 30,
        marginLeft: -10
    },
    nameView: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center',
    },
    usernameText: {
        fontSize: 14,
        fontWeight: '500',
    },
    messageText: {
        marginTop: 4,
        fontSize: 14,
        fontWeight: '500',
    },
    timeView: {
        alignItems: 'center',
    },
    timeText: {
        fontSize: 12,
        fontWeight: '500',
    },
    readView: {
        marginTop: 4,
        alignItems: 'center',
        justifyContent: 'center',
        height: 22,
        width: 22,
        borderRadius: 11,
    },
    readText: {
        fontSize: 12,
        fontWeight: '500',
        color: White
    },
});
