import React, {Component} from 'react';
import {Text, View, ActivityIndicator, StyleSheet, FlatList} from 'react-native';
import {connect} from 'react-redux';
import { Item, Input, Icon } from 'native-base';
import data from './data';
import FastImage from 'react-native-fast-image';
import FollowAndFollowingItem from '../../../components/general/FollowAndFollowingItem';

class viewsAndLikesScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Views and Likes',
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: data,
        }
    }

    componentDidMount(): void {
    }

    renderHeader = () => {
        const {theme, route} = this.props;

        let type = route.params.type;
        if (type === 'comment')
           return (<View />);

        let item = route.params.item;
        let views = item.viewCount;

        return (
            <View style={styles.headerView}>
                <Item style={[styles.inputItem, {borderColor: theme.secondaryColor}]}>
                    <Icon name="ios-search" style={{color: theme.secondaryColor, fontSize: 20, marginTop: 5}} />
                    <Input placeholder="Search" placeholderTextColor={theme.secondaryColor} style={{fontSize: 15, color: theme.secondaryColor}} />
                </Item>
                {item.viewCount !== 0 && <View style={styles.views}>
                    <FastImage resizeMode={FastImage.resizeMode.contain} style={styles.iconImage} source={theme.icons.play}/>
                    <Text style={[styles.textView, {color: theme.primaryColor}]}>{`${views} Views`}</Text>
                </View>}
                {item.viewCount !== 0 && <View style={[styles.likeView, {borderColor: theme.secondaryColor}]}>
                    <Text style={[styles.textLike, {color: theme.secondaryColor}]}>{`LIKED BY`}</Text>
                    <Text style={[styles.countLikeText,{color: theme.secondarySColor}]}>{`2003 likes`}</Text>
                </View>}
            </View>
        )
    };

    render() {
        const {theme, navigation} = this.props;
        const {loading, data} = this.state;

        if (loading) {
            return (
                <View style={{flex: 1, alignItems: 'center', paddingTop: 100, backgroundColor: theme.container.backgroundColor}}>
                    <ActivityIndicator size="small" color={theme.secondaryColor} />
                </View>
            )
        }

        return (
            <View style={[
                styles.container,
                {backgroundColor: theme.container.backgroundColor},
            ]}>
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={({ item }) => <FollowAndFollowingItem type={'like'} theme={theme} item={item} navigation={navigation} />}
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

export default connect(mapStateToProps)(viewsAndLikesScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    iconImage: {
        width: 40,
        height: 40,
    },
    headerView: {paddingTop: 8},
    inputItem: {
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 5,
        height: 40,
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
        paddingLeft: 12,
        paddingRight: 12,
        marginBottom: 15,
    },
    views: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        paddingBottom: 40
    },
    textView: {
        marginTop: 8,
        fontSize: 20,
        fontWeight: '400',
    },
    likeView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        marginLeft: 15,
        marginRight: 15,
        paddingBottom: 8,
        marginBottom: 5,
    },
    textLike: {
        fontSize: 16,
        fontWeight: '600',
    },
    countLikeText: {
        fontSize: 14,
        fontWeight: '400',
    }
});
