import React, {Component} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {connect} from 'react-redux';
import FeedItem from '../../../components/feed/FeedItem';
import {getStore} from '../../../../App';
import Button from '../../../components/general/Button';

class postFeedScreen extends Component {

    static navigationOptions = ({navigation, route}) => {
        let type = route.params.type;
        if (type === 'hashTag') {
            let {theme} =  getStore.getState().auth;
            let color = theme.primaryColor;
            return {
                headerTitle: props => <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 12, fontWeight: '400', color: color}}>Top posts</Text>
                    <Text style={{marginTop: 2, fontSize: 14, fontWeight: '600', color: color}}>#4384</Text>
                </View>,
                headerRight: props => <Button style={{fontSize: 12, color: theme.secondaryColor}}
                                              containerStyle={[styles.button, {borderColor: theme.secondaryColor}]}
                                              onPress={() => {}}>
                    Following
                </Button>
            }
        } else {
            return {
                title: 'Posts',
            }
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            data: props.route.params.data
        }
    }

    onPress = (type, item) => {
        if (type === 'like') {
            item.isLike = !item.isLike;
        } else if (type === 'mark') {
            item.isMark = !item.isMark;
        }
        this.setState({data: this.state.data});
    };

    render() {
        const {theme, navigation, route} = this.props;
        let {data} = this.state;

        return (
            <View
                style={[
                    styles.container,
                    {backgroundColor: theme.container.backgroundColor},
                ]}>
                <FlatList
                    data={data}
                    renderItem={({ item }) =>
                        <FeedItem
                            theme={theme}
                            item={item}
                            navigation={navigation}
                            onPress={(type) => this.onPress(type, item)}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                    extraData={data}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(postFeedScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerViewContainer: {
        flex: 1,
        padding: 12,
        paddingTop: 8,
    },
    button: {
        marginRight: 10,
        height: 34,
        width: 80,
        overflow: 'hidden',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
