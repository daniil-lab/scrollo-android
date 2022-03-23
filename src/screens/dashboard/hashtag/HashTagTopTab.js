import React, {Component} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View, FlatList} from 'react-native';
import {W_WIDTH} from '../../../utils/regex';
import HashTagItem from './HashTagItem';

class HashTagTopTab extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {theme, navigation, data} = this.props;

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
                          keyExtractor={(item, index) => index.toString() }
                          renderItem={({item, index}) => <HashTagItem theme={theme} navigation={navigation} item={item} index={index} data={data} />}
                />
            </View>
        );
    }
}

export default HashTagTopTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    postImage: {
        width: W_WIDTH/3,
        height: W_WIDTH/3,
    },
});
