import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import UserFeed from './UserFeed';
import PostImages from './PostImages';
import PostActivity from './PostActivity';
import ParsedText from 'react-native-parsed-text';
import {regex} from '../../utils/regex';

class FeedItem extends Component
{
    constructor(props) {
        super(props);
    }

    usernamePress = (name) => {
        const {item, navigation} = this.props;
        let getUsername = name.replace('@', '');
        let getUser = item.postDescriptionUserTag.find(o => o.username === getUsername);
        if (!regex.isEmpty(getUser))
            navigation.push('OtherProfile', {user: getUser});
    };

    postUsernamePress = () => {
        const {item, navigation} = this.props;
        navigation.push('OtherProfile', {user: item});
    };

    hashTagPress = (name) => {
        const {item, navigation} = this.props;
        navigation.push('HashTag', {item: item, hashTag: name});
    };

    render() {
        const {theme, item, navigation, onPress} = this.props;

        let highestCount = item.likeCount > item.viewCount ? `${item.likeCount} likes` : `${item.viewCount} views`;
        return (
            <View>
                <UserFeed theme={theme} item={item} navigation={navigation}/>
                <PostImages theme={theme} item={item} navigation={navigation}/>
                <PostActivity theme={theme} item={item} navigation={navigation} onPress={onPress}/>
                <View style={styles.description}>
                    <TouchableWithoutFeedback onPress={() => {navigation.push('Like', {item: item, type: 'post'})}}>
                        <Text style={[styles.textLikes, {color: theme.primaryColor}]}>{highestCount}</Text>
                    </TouchableWithoutFeedback>
                    <View style={styles.descriptionView}>
                        <ParsedText style={[styles.descriptionText, {color: theme.primaryColor}]}
                            parse={
                                [
                                    {pattern: new RegExp(item.username), style: styles.linkColor, onPress: this.postUsernamePress},
                                    {pattern: /@(\w+)/, style: [styles.linkColor, {color: theme.linkColor}], onPress: this.usernamePress},
                                    {pattern: /#(\w+)/, style: [styles.linkColor, {color: theme.linkColor}], onPress: this.hashTagPress},
                                ]
                            }
                            childrenProps={{allowFontScaling: false}}
                        >
                            {`${item.username} ${item.postDescription}`}
                        </ParsedText>
                    </View>
                    {item.commentCount > 0 && <TouchableWithoutFeedback onPress={() => {navigation.push('Comment', {item: item})}}>
                        <View style={styles.commentView}>
                            <Text style={[styles.commentText, {color: theme.secondaryColor}]}>{`View all ${item.commentCount} comments`}</Text>
                        </View>
                    </TouchableWithoutFeedback>}
                </View>
            </View>
        );
    }
}

export default FeedItem;

const styles = StyleSheet.create({
    container: {

    },
    description: {flex: 1, paddingLeft: 15, paddingRight:15},
    textLikes: {
        fontSize: 14,
        fontWeight: '800'
    },
    descriptionView: {flex: 1, paddingTop: 5},
    descriptionText: {
        flex: 1,
        fontSize: 14,
        fontWeight: '400'
    },
    linkColor: {fontWeight: '600'},
    commentView: {flex: 1, paddingTop: 5, paddingBottom: 15},
    commentText: {
        fontSize: 14,
        fontWeight: '500'
    }
});
