import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView, Text, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {W_WIDTH} from '../../utils/regex';

class PostImages extends Component
{
    constructor(props) {
        super(props);
    }

    renderItem = ({item}) => {
        return (
            <FastImage style={styles.imagePost} source={{uri: item.imageUrl}}/>
        )
    };

    render() {
        const {item} = this.props;

        return (
            <View>
                <FlatList
                    data={item.postImages}
                    renderItem={this.renderItem}
                    keyExtractor={itemImage => itemImage.imageId.toString()}
                    extraData={item.postImages}
                />
            </View>
        );
    }
}

export default PostImages;

const styles = StyleSheet.create({
    container: {

    },
    imagePost: {
        width: W_WIDTH,
        height: W_WIDTH,
    }
});
