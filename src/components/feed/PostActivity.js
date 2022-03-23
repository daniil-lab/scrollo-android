import React, {Component} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import FastImage from 'react-native-fast-image';

class PostActivity extends Component
{
    constructor(props) {
        super(props);
    }

    render() {
        const {theme, item, navigation, onPress} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.likeView}>
                    <TouchableWithoutFeedback onPress={() => onPress('like')}>
                        <View style={styles.iconView}>
                            <FastImage
                                resizeMode={FastImage.resizeMode.contain}
                                style={styles.iconImage}
                                source={item.isLike ? theme.icons.like : theme.icons.unlike}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={{marginLeft: 8}}>
                        <TouchableWithoutFeedback onPress={() => {navigation.push('Comment', {item: item})}}>
                            <View style={styles.iconView}>
                                <FastImage
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={styles.iconImage}
                                    source={theme.icons.comment}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={() => onPress('mark')}>
                    <View style={[styles.iconView, {alignItems: 'flex-end'}]}>
                        <FastImage
                            resizeMode={FastImage.resizeMode.contain}
                            style={styles.iconImage}
                            source={item.isMark ? theme.icons.mark : theme.icons.unmark}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

export default PostActivity;

const styles = StyleSheet.create({
    container: {
        paddingLeft: 15,
        paddingRight:15,
        paddingTop: 2,
        paddingBottom: 2,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    likeView: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    imageProfile: {
        width: 34,
        height: 34,
        borderRadius: 17
    },
    iconView: {
        width: 35,
        height: 35,
        justifyContent: 'center',
    },
    iconImage: {
        width: 20,
        height: 20,
    },
});
