import React, {Component} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {W_WIDTH} from '../../utils/regex';

class ProfilePostItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {theme, navigation, item, data, index} = this.props;

        return (
            <TouchableWithoutFeedback onPress={() => {
                navigation.push('PostFeed', {data: data, index: index, type: 'profile'})
            }}>
                <View style={styles.container}>
                    <FastImage style={styles.postImage} source={{uri: item.postImages[0].imageUrl}}/>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default ProfilePostItem;

const styles = StyleSheet.create({
    container: {
        paddingTop: 2,
        paddingRight: 2
    },
    postImage: {
        width: W_WIDTH/3,
        height: W_WIDTH/3,
    },
});
