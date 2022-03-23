import React, { Component } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from "react-native-linear-gradient";
import Feather from 'react-native-vector-icons/Feather';
import { getStore } from '../../../App';
import CONFIG from '../../utils/CONFIG';

class FollowAndFollowingItem extends Component {

    constructor(props) {
        super(props);
    }

    onPress = () => {
        const { item, navigation, type, onPress } = this.props;
        if (type === 'message') {
            onPress(item);
        } else
            navigation.push('OtherProfile', { id: item.id })
    };

    render() {
        const { theme, item, type } = this.props;

        let follow = item.isFollow ? theme.followingColor : theme.followColor;
        let gradientColors = (type === 'suggest' || type === 'message')
            ? theme.gradientTransparentColors
            : theme.gradientColors;
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={this.onPress}>
                    <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={gradientColors} style={styles.linearGradient}>
                        <View style={[styles.imageView, { borderColor: theme.container.backgroundColor }]}>
                            <FastImage style={[styles.imageProfile, { borderColor: theme.secondarySColor }]} source={{ uri: CONFIG.RESOURCE_URL + item.avatar }} />
                        </View>
                    </LinearGradient>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.onPress}>
                    <View style={styles.nameView}>
                        <Text style={[styles.usernameText, { color: theme.primaryColor }]}>{item.name}</Text>
                        <Text style={[styles.nameText, { color: theme.secondaryColor }]}>{`@${item.login}`}</Text>
                        {type === 'suggest' && <Text style={[styles.nameText, { color: theme.secondaryColor }]}>{item.message}</Text>}
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.optionView}>
                    {/* {
                        type === 'message'
                            ? <TouchableWithoutFeedback onPress={this.onPress}>
                                <View style={[{width: 30, height: 30}]}>
                                    <Feather name={item.selected ? "check-circle" : "circle"} size={25} color={theme.secondaryColor} />
                                </View>
                            </TouchableWithoutFeedback>
                            : <TouchableWithoutFeedback>
                                <View style={[styles.followView, {borderColor: theme.followColor}]}>
                                    <Text style={[styles.followText, {color: theme.followColor}]}>{'Follow'}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                    } */}
                    <TouchableWithoutFeedback>
                        <View style={[styles.followView, { borderColor: theme.followColor }]}>
                            <Text style={[styles.followText, { color: theme.followColor }]}>{item.isFollower ? "Отписаться" : "Подписаться"}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    {type === 'suggest' && <TouchableWithoutFeedback>
                        <View style={[styles.followView, { width: 40, borderWidth: 0 }]}>
                            <Feather name="x" size={20} color={theme.secondaryColor} />
                        </View>
                    </TouchableWithoutFeedback>}
                    {(type === 'followers' || type === 'following') && <TouchableWithoutFeedback>
                        <View style={[styles.followView, { width: 40, borderWidth: 0 }]}>
                            <Feather name="more-vertical" size={25} color={theme.secondaryColor} />
                        </View>
                    </TouchableWithoutFeedback>}
                </View>
            </View>
        );
    }
}

export default FollowAndFollowingItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 15,
        paddingLeft: 15,
        paddingTop: 5,
        paddingBottom: 5,
    },
    linearGradient: {
        width: 63,
        height: 63,
        borderRadius: 31.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 58,
        height: 58,
        borderRadius: 29,
        borderWidth: 3,
    },
    imageProfile: {
        width: 52,
        height: 52,
        borderRadius: 26,
        borderWidth: 1,
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
    nameText: {
        marginTop: 3,
        fontSize: 12,
        fontWeight: '500',
    },
    optionView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    followView: {
        paddingTop: 6,
        paddingBottom: 6,
        // width: 80,
        paddingHorizontal: 5,
        alignItems: 'center',
        borderRadius: 3,
        borderWidth: 1,
    },
    followText: {
        fontSize: 13,
        fontWeight: '600',
    }
});
