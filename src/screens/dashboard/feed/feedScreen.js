import React, {Component} from 'react';
import {View, StyleSheet, FlatList, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import data, {storyData} from './data';
import FastImage from 'react-native-fast-image';
import {getStore} from '../../../../App';
import StoryItem from '../../../components/feed/StoryItem';
import FeedItem from '../../../components/feed/FeedItem';
import stories from '../story/stories';
import Feather from 'react-native-vector-icons/Feather';

class feedScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Feeds',
            headerLeft: () => {
                return <View style={{paddingLeft: 15, paddingRight: 15}}>
                    <TouchableWithoutFeedback onPress={() => {}}>
                        <View style={styles.iconView}>
                            <FastImage
                                resizeMode={FastImage.resizeMode.contain}
                                style={styles.iconImage}
                                source={getStore.getState().auth.theme.icons.camera}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            },
            headerRight: () => {
                return <View style={{paddingLeft: 15, paddingRight: 15}}>
                    <TouchableWithoutFeedback onPress={() => navigation.push('AddPost')}>
                        <View style={styles.iconView}>
                            <Feather name="plus-circle" size={25} color={getStore.getState().auth.theme.primaryColor} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            }
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            data: data,
            storyData: [
                {
                   isLocal: true,
                   username: 'Your story'
                },
                ...storyData
            ],
        };
    }

    onPress = (type, item) => {
        if (type === 'like') {
            item.isLike = !item.isLike;
        } else if (type === 'mark') {
            item.isMark = !item.isMark;
        }
        this.setState({data: this.state.data});
    };

    onStoryPress = (type, item, index) => {
        if (type === 'storyOpen') {
            this.props.navigation.navigate('Stories', {stories});
        }
    };

    renderHeader = () => {
        const {storyData} = this.state;
        const {theme, navigation} = this.props;
        return <View style={{paddingTop: 10, paddingBottom: 5}}>
            <FlatList
                data={storyData}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <StoryItem
                    theme={theme}
                    item={item}
                    navigation={navigation}
                    onStoryPress={this.onStoryPress}/>
                }
                keyExtractor={(item, index) => index.toString()}
                extraData={storyData}
                horizontal={true}
            />
        </View>;
    };

    render() {
        const {theme, navigation} = this.props;
        const {data} = this.state;

        return (
            <View
                style={[
                    styles.container,
                    {backgroundColor: theme.container.backgroundColor},
                ]}>
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={({ item }) =>
                        <FeedItem
                            theme={theme}
                            item={item}
                            navigation={navigation}
                            onPress={(type) => this.onPress(type, item)}
                        />
                    }
                    keyExtractor={item => item.postId.toString()}
                    extraData={data}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(feedScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerViewContainer: {
        flex: 1,
        padding: 12,
        paddingTop: 8,
    },
    iconView: {
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconImage: {
        width: 25,
        height: 25,
    },
    modal: {
        flex: 1
    },
});
