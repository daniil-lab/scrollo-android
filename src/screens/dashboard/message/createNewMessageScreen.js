import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {connect} from 'react-redux';
import messageListData from './messageListData';
import {Red} from '../../../themes/constantColors';
import FollowAndFollowingItem from '../../../components/general/FollowAndFollowingItem';
import {Icon, Input, Item} from 'native-base';
import {getStore} from '../../../../App';

class createNewMessageScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'New Message',
            headerRight: () => {
                return <TouchableWithoutFeedback onPress={() => {
                    navigation.pop();
                    navigation.push('Message', {item: null})
                }}>
                    <View style={{paddingLeft: 15, paddingRight: 15}}>
                        <View style={styles.iconView}>
                            <Text style={[{fontSize: 16, fontWeight: '600',color: getStore.getState().auth.theme.followColor}]}>
                                {'Chat'}
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            }
        }
    };

    constructor(props) {
        super(props);
        let newData = messageListData.map((item) => {
            item.selected = false;
            return item;
        });
        this.state = {
            data: newData
        }
    }

    componentDidMount(): void {
    }

    onPress = (item) => {
        item.selected = !item.selected;
        this.setState({data: this.state.data})
    };

    render() {
        const {theme, navigation} = this.props;
        const {data} = this.state;

        return (
            <View style={[
                styles.container,
                {backgroundColor: theme.container.backgroundColor},
            ]}>
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => {
                        return (
                            <View style={{padding: 15, paddingLeft: 15}}>
                                <Item style={[styles.inputItem, {borderColor: theme.secondaryColor}]}>
                                    <Icon name="ios-search" style={{color: theme.secondaryColor, fontSize: 20, marginTop: 5}} />
                                    <Input placeholder="Search" placeholderTextColor={theme.secondaryColor} style={{fontSize: 15, color: theme.secondaryColor}} />
                                </Item>
                                <Text style={{fontSize: 15, fontWeight: '600', color: theme.primaryColor}}>Suggested</Text>
                            </View>
                        )
                    }}
                    renderItem={({ item }) => <FollowAndFollowingItem onPress={this.onPress.bind(this)} type={'message'} theme={theme} item={item} navigation={navigation}/>}
                    keyExtractor={item => item.userId.toString()}
                    extraData={data}
                />
            </View>
        );
    }
}

let mapStateToProps;
mapStateToProps = state => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(createNewMessageScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerViewContainer: {
        flex: 1,
        padding: 12,
        paddingTop: 8,
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
        marginBottom: 15,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        backgroundColor: Red,
        right: 0,
    },
    iconImage: {
        width: 25,
        height: 25,
    },
});
