import React, {Component} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import FastImage from 'react-native-fast-image';

class NotificationGeneralItem extends Component {

    constructor(props) {
        super(props);
    }

    renderLikePostImageView = () => {
       const {item} = this.props;
       return  <View style={styles.postImageView}>
           <View style={styles.userView}>
               {item.postImages.map((data) =>  {
                   return (<FastImage key={data.imageId} style={styles.postImage} source={{uri: data.imageUrl}}/>)
               })}
           </View>
       </View>
    };

    renderUserMessage = () => {
        const {theme,item, navigation} = this.props;

        let count = item.users.length;

        let text = `started following you.`;
        let name = '';
        let name1 = '';
        let name2 = '';
        let name3 = '';
        if (count > 1) {
            name = item.users[0].username;
            if (count === 2) {
                name1 = item.users[1].username;
            } else if (count === 3) {
                name1 = item.users[1].username;
                name2 = item.users[2].username;
            } else if (count > 3) {
                name1 = item.users[1].username;
                name2 = item.users[2].username;
                name3 = `${count-2} others`;
            }
        } else {
            name = item.users[0].username;
        }

        if (count === 1) {
            return (
                <Text style={[styles.usernameText, {color: theme.primaryColor}]}>
                    <Text onPress={()=>navigation.push('OtherProfile', {user: item.users[0]})}>{`${name} `}</Text>
                    <Text style={[styles.otherText]}>{text}</Text>
                </Text>
            )
        } else if (count === 2) {
            return (
                <Text style={[styles.usernameText, {color: theme.primaryColor}]}>
                    <Text onPress={()=>navigation.push('OtherProfile', {user: item.users[0]})}>{`${name}, `}</Text>
                    <Text style={[styles.usernameText, {color: theme.primaryColor}]}>{`${name1} `}</Text>
                    <Text style={[styles.otherText]}>{text}</Text>
                </Text>
            )
        } else if (count === 3) {
            return (
                <Text style={[styles.usernameText, {color: theme.primaryColor}]}>
                    <Text onPress={()=>navigation.push('OtherProfile', {user: item.users[0]})}>{`${name}, `}</Text>
                    <Text style={[styles.usernameText, {color: theme.primaryColor}]}>{`${name1}`}</Text>
                    <Text style={[styles.otherText]}>{' and '}</Text>
                    <Text style={[styles.usernameText, {color: theme.primaryColor}]}>{`${name2} `}</Text>
                    <Text style={[styles.otherText]}>{text}</Text>
                </Text>
            )
        } else {
            return (
                <Text style={[styles.usernameText, {color: theme.primaryColor}]}>
                    <Text onPress={()=>navigation.push('OtherProfile', {user: item.users[0]})}>{`${name}, `}</Text>
                    <Text style={[styles.usernameText, {color: theme.primaryColor}]}>{`${name1}, `}</Text>
                    <Text style={[styles.usernameText, {color: theme.primaryColor}]}>{`${name2}`}</Text>
                    <Text style={[styles.otherText]}>{' and '}</Text>
                    <Text style={[styles.usernameText, {color: theme.primaryColor}]}>{`${name3} `}</Text>
                    <Text style={[styles.otherText]}>{text}</Text>
                </Text>
            )
        }
    };

    render() {
        const {theme,item, navigation} = this.props;

        let notificationType = item.notificationType;
        let count = item.postImages ? item.postImages.length : item.users.length;

        let text = '';
        if (notificationType === 'like') {
            text = `liked your post.`;
            if (count > 1)
                text = `liked ${count} your post.`
        } else if (notificationType === 'comment') {
            text = 'comment on your post.';
        }

        return (
            <View style={styles.container}>
                <View style={styles.userView}>
                    <TouchableWithoutFeedback onPress={()=>navigation.push('OtherProfile', {user: item})}>
                        <FastImage style={[styles.profileImage, {borderColor:  theme.secondaryColor}]} source={{uri: item.profilePic}}/>
                    </TouchableWithoutFeedback>
                    <View style={styles.nameView}>
                        {
                            notificationType === 'follow'
                                ? this.renderUserMessage()
                                : <Text style={[styles.usernameText, {color: theme.primaryColor}]}>
                                    <Text onPress={()=>navigation.push('OtherProfile', {user: item})}>{`${item.username} `}</Text>
                                    <Text style={[styles.otherText]}>{text}</Text>
                                </Text>
                        }
                        <Text style={[styles.timeText, {color: theme.secondaryColor}]}>{`2 min ago`}</Text>
                    </View>
                    {
                        count === 1 && notificationType !== 'follow' && <FastImage style={styles.postImage} source={{uri: item.postImages[0].imageUrl}}/>
                    }
                </View>
                {notificationType === 'like' && count > 1 && this.renderLikePostImageView()}
            </View>
        );
    }
}

export default NotificationGeneralItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: 15,
        paddingLeft: 15,
        paddingTop: 5,
        paddingBottom: 5,
    },
    userView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 52,
        height: 52,
        borderRadius: 26,
        borderWidth: 1
    },
    nameView: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center',
        marginRight: 6
    },
    usernameText: {
        fontSize: 14,
        fontWeight: '600',
    },
    otherText: {
        fontWeight: '400',
    },
    timeText: {
        marginTop: 3,
        fontSize: 12,
        fontWeight: '400',
    },
    postImageView: {
        marginLeft: 68
    },
    postImage: {
        width: 48,
        height: 48,
        borderRadius:5,
        marginRight: 8
    },
});
