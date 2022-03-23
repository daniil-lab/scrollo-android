import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback, Share} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from "react-native-linear-gradient";
import ActionSheet from 'react-native-action-sheet';
import {OS} from '../../utils/regex';
import {Black, LightWhite} from '../../themes/constantColors';
import {showCenterToast} from '../../utils/toast';

class UserFeed extends Component
{
    constructor(props) {
        super(props);
    }

    onProfilePress = () => {
        const {item, navigation} = this.props;
        navigation.push('OtherProfile', {user: item});
    };

    onShare = async () => {
        const {item} = this.props;
        try {
            const result = await Share.share({
                message: item.postDescription,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                } else {
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    showActionSheet = () => {
        const {item} = this.props;
        let options = [
            'Report...',
            'Share to...',
            'Unfollow',
            'Delete',
        ];
        let CANCEL_INDEX = 4;
        let DELETE_INDEX = 3;
        if(OS === 'ios') {
            options.push('Cancel');
        }

        ActionSheet.showActionSheetWithOptions({
                options: options,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DELETE_INDEX,
                tintColor: Black
            },
            (buttonIndex) => {
                if (buttonIndex === 1) {
                    this.onShare();
                } else if(buttonIndex === 2) {
                    showCenterToast(`unfollow ${item.username}`)
                } else if(buttonIndex === 3) {
                    showCenterToast(`delete`)
                }
            });
    };

    render() {
        const {theme, item} = this.props;

        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this.onProfilePress}>
                    <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 0}} colors={item.isLocal ? theme.gradientTransparentColors : theme.gradientColors} style={styles.linearGradient}>
                        <View style={[styles.imageView, {borderColor: theme.container.backgroundColor}]}>
                            <FastImage style={[styles.imageProfile, {borderColor: theme.secondarySColor}]} source={{uri: item.profilePic}}/>
                        </View>
                    </LinearGradient>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.onProfilePress}>
                    <View style={styles.textView}>
                        <Text style={[styles.text, {color: theme.primaryColor}]}>{item.username}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.showActionSheet}>
                    <View style={styles.optionView}>
                        <FastImage resizeMode={FastImage.resizeMode.contain} style={styles.optionImage} source={theme.icons.options}/>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

export default UserFeed;

const styles = StyleSheet.create({
    container: {
        padding: 15,
        paddingTop: 0,
        alignItems: 'center',
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
    textView: {
        flex: 1,
        marginRight: 10,
        marginLeft: 10,
    },
    text: {
       fontSize: 14,
       fontWeight: '600'
    },
    optionView: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionImage: {
        width: 20,
        height: 20,
    },
});
