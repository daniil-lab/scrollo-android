import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import { Tab, Tabs, TabHeading } from 'native-base';
import data from '../feed/data';
import FollowUserTab from './FollowUserTab';
import getFollowers_API from '../../../utils/api/follow/getFollowers_API';
import getFollowing_API from '../../../utils/api/follow/getFollowing_API';
import getMe_API from '../../../utils/api/user/getMe_API';

class followAndFollowingScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: null,
            followers: [],
            following: [],
            followersData: null,
            followingData: null,
            selectedIndex: 0,
        }
    }

    componentDidMount() {
        this.navigationOptions();

        this.getUserData();
        this.getFollowers();
        this.getFollowing();
    }

    async getUserData() {
        const userData = await getMe_API();

        if(userData != null)
            this.setState({
                ...this.state,
                userInfo: userData
            })

        this.navigationOptions();
    }

    navigationOptions = () => {
        this.props.navigation.setOptions({
            title: this.state.userInfo == null ? "Загрузка..." : this.state.userInfo.login
        })
    };

    updateFollowersState(data) {
        this.setState({
            ...data
        });

        this.getFollowers();
    }

    updateFollowingState(data) {
        this.setState({
            ...data
        });

        this.getFollowing();
    }

    async getFollowers() {
        const result = await getFollowers_API(this.state.followersData == null ? 0 : this.state.followersData.page, 30);

        if(result)
            this.setState({
                ...this.state,
                followersData: result
            });
    }

    async getFollowing() {
        const result = await getFollowing_API(this.state.followingData == null ? 0 : this.state.followingData.page, 30);

        console.log(result);

        if(result)
            this.setState({
                ...this.state,
                followingData: result
            });
    }

    onChangeTab = (index) => {
        this.setState({selectedIndex:index.i})
    };

    render() {
        const {theme, navigation} = this.props;
        const {followers, following, selectedIndex} = this.state;

        return (
            <View style={[
                styles.container,
                {backgroundColor: theme.container.backgroundColor},
            ]}>
                <Tabs tabBarUnderlineStyle={{backgroundColor: theme.buttonRed, height: 2}} onChangeTab={this.onChangeTab}>
                    <Tab heading={<TabHeading style={{backgroundColor: theme.container.backgroundColor}}>
                        <Text style={{color: selectedIndex === 0 ? theme.buttonRed : theme.primaryColor}}>{`Подписчики`}</Text>
                    </TabHeading>}>
                        <FollowUserTab updateFollowersState={this.updateFollowersState} followersData={this.state.followersData} title={'Подписчики'} theme={theme} data={followers} navigation={navigation} />
                    </Tab>
                    <Tab heading={<TabHeading style={{backgroundColor: theme.container.backgroundColor}}>
                        <Text style={{color: selectedIndex === 1 ? theme.buttonRed : theme.primaryColor}}>{`Подписки`}</Text>
                    </TabHeading>}>
                        <FollowUserTab updateFollowingState={this.updateFollowingState} followingData={this.state.followingData} title={'Подписки'} theme={theme} data={following} navigation={navigation} />
                    </Tab>
                </Tabs>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(followAndFollowingScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

