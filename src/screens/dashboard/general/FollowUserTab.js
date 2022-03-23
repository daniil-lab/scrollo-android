import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import FollowAndFollowingItem from '../../../components/general/FollowAndFollowingItem';
import {Icon, Input, Item} from 'native-base';

class FollowUserTab extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {theme, data, navigation, title} = this.props;

        console.log(this.props)

        return (
            <View style={[
                styles.container,
                {backgroundColor: theme.container.backgroundColor},
            ]}>
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    onScroll={(e) => {
                        console.log(e);
                    }}
                    ListHeaderComponent={() => {
                        return (
                            <View style={{padding: 15, paddingLeft: 15}}>
                                <Item style={[styles.inputItem, {borderColor: theme.secondaryColor}]}>
                                    <Icon name="ios-search" style={{color: theme.secondaryColor, fontSize: 20, marginTop: 5}} />
                                    <Input placeholder="Search" placeholderTextColor={theme.secondaryColor} style={{fontSize: 15, color: theme.secondaryColor}} />
                                </Item>
                            </View>
                        )
                    }}
                    renderItem={({ item }) => <FollowAndFollowingItem type={"FOLLOWING"} theme={theme} item={item} navigation={navigation} />}
                    keyExtractor={item => item.id.toString()}
                    extraData={this.props.followingData != null ? 
                        this.props.followingData.data.map((item) => {
                            return {
                                ...item.followOnUser
                            }
                        }) : []}
                />
            </View>
        );
    }
}

export default FollowUserTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputItem: {
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 5,
        height: 40,
        alignItems: 'center',
        // marginLeft: 15,
        // marginRight: 15,
        paddingLeft: 12,
        paddingRight: 12,
        // marginBottom: 15,
    },
});
