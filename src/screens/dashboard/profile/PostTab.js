import React, {Component} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {W_WIDTH} from '../../../utils/regex';
import ProfilePostItem from '../../../components/general/ProfilePostItem';

class PostTab extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {theme, data, navigation} = this.props;

        return (
            <View
                style={[
                    styles.container,
                    {backgroundColor: theme.container.backgroundColor},
                ]}>
                <FlatList data={data}
                          extraData={data}
                          numColumns={3}
                          scrollEnabled={false}
                          keyExtractor={(item, index) => item.postId.toString() }
                          renderItem={({item, index}) => <ProfilePostItem theme={theme} navigation={navigation} item={item} index={index} data={data} />}
                />
            </View>
        );
    }
}

export default PostTab;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    postImage: {
        width: W_WIDTH/3,
        height: W_WIDTH/3,
    },
});
