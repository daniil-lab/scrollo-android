import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from "react-native-linear-gradient";
import {LightWhite, LINK} from '../../themes/constantColors';
import {regex} from '../../utils/regex';
import ParsedText from 'react-native-parsed-text';

class CommentItem extends Component
{
    constructor(props) {
        super(props);
        this.state = {
           viewReplyCount: true
        }
    }

    onProfilePress = () => {
        const {item, navigation} = this.props;
        navigation.push('OtherProfile', {user: item});
    };

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
        const {theme, item, isLikeView, isReplayView, isLikeRight, isReplyArray, navigation, container} = this.props;
        const {viewReplyCount} = this.state;

        return (
            <View style={[styles.container, container]}>
                <View style={styles.innerContainer}>
                    <TouchableWithoutFeedback onPress={this.onProfilePress}>
                        <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 0}} colors={theme.gradientColors} style={styles.linearGradient}>
                            <View style={[styles.imageView, {borderColor: theme.container.backgroundColor}]}>
                                <FastImage style={[styles.imageProfile, {borderColor: theme.secondarySColor}]} source={{uri: item.profilePic}}/>
                            </View>
                        </LinearGradient>
                    </TouchableWithoutFeedback>
                    <View style={styles.commentView}>
                        <View style={styles.userView}>
                            <ParsedText style={[styles.usernameText, {color: theme.primaryColor}]}
                                        parse={
                                            [
                                                {pattern: new RegExp(item.username), style: styles.linkColor, onPress: this.postUsernamePress},
                                                {pattern: /@(\w+)/, style: [styles.linkColor, {color: theme.linkColor}], onPress: this.usernamePress},
                                                {pattern: /#(\w+)/, style: [styles.linkColor, {color: theme.linkColor}], onPress: this.hashTagPress},
                                            ]
                                        }
                                        childrenProps={{allowFontScaling: false}}
                            >
                                {`${item.username} ${!regex.isEmpty(item.postDescription) ? item.postDescription : item.comment}`}
                            </ParsedText>
                            <View style={styles.timeView}>
                                <Text style={[styles.timeText, {fontWeight: '400', color: theme.secondaryColor}]}>36m</Text>
                                {
                                    isLikeView
                                    && <Text style={[styles.timeText, {color: theme.secondaryColor}]}
                                             onPress={() => {navigation.push('Like', {item: item, type: 'comment'})}}
                                    >
                                        4 likes
                                    </Text>
                                }
                                {isReplayView &&  <Text style={[styles.timeText, {color: theme.secondaryColor}]}>Reply</Text>}
                            </View>
                        </View>
                        {
                            isLikeRight &&  <View>
                                <TouchableWithoutFeedback onPress={() => {}}>
                                    <View style={styles.iconView}>
                                        <FastImage
                                            resizeMode={FastImage.resizeMode.contain}
                                            style={styles.iconImage}
                                            source={item.isLike ? theme.icons.like : theme.icons.unlike}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        }
                    </View>
                </View>
                {isReplyArray && <View style={{
                    paddingTop: 16,
                    paddingLeft: 59,
                }}>
                    { viewReplyCount
                        ? <Text style={[styles.timeText, {fontWeight: '400', color: theme.secondaryColor}]}
                                onPress={() => {this.setState({viewReplyCount: false})}}>
                            {`----- View replies (${item.replays.length})`}
                        </Text>
                        : <View>
                            <FlatList
                                data={item.replays}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) =>
                                    <CommentItem
                                        container={{padding: 0}}
                                        theme={theme}
                                        item={item}
                                        navigation={navigation}
                                        isLikeView={true}
                                        isReplayView={true}
                                        isLikeRight={true}
                                        isReplyArray={false}
                                    />
                                }
                                keyExtractor={item => item.commentId.toString()}
                                extraData={item.replays}
                            />
                        </View>
                    }
                </View>}
            </View>
        );
    }
}

export default CommentItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        paddingBottom: 8
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    linearGradient: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        backgroundColor: LightWhite,
        borderRadius: 20,
        borderWidth: 2,
    },
    imageProfile: {
        width: 38,
        height: 38,
        borderRadius: 19,
        borderWidth: 1,
    },
    commentView: {
        flex: 1,
        flexDirection: 'row',
    },
    userView: {
        flex: 1,
        paddingLeft: 15
    },
    usernameText: {
        fontSize: 14,
        fontWeight: '400',
    },
    linkColor: {fontWeight: '600'},
    timeView: {
        marginTop: 8,
        alignItems: 'center',
        flexDirection: 'row',
    },
    timeText: {
        fontSize: 12,
        fontWeight: '600',
        paddingRight: 15
    },
    iconView: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconImage: {
        width: 12,
        height: 12,
    },
    replyView: {

    }
});
