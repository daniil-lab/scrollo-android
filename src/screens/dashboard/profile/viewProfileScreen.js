import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import Button from '../../../components/general/Button';
import { Tab, Tabs, TabHeading } from 'native-base';
import PostTab from './PostTab';
import LikeTab from './LikeTab';
import data from '../feed/data';
import { getStore } from '../../../../App';
import { regex } from '../../../utils/regex';
import ParsedText from 'react-native-parsed-text';
import { LINK } from '../../../themes/constantColors';
import getMe_API from '../../../utils/api/user/getMe_API';
import CONFIG from '../../../utils/CONFIG';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import getById_API from '../../../utils/api/user/getById_API';
import followedOnUser_API from '../../../utils/api/follow/followedOnUser_API';

class profileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            postData: [...data, ...data, ...data],
            likeData: [...data, ...data],
            selectedIndex: 0,
            userInfo: null,
            followed: null
        }
    }

    componentDidMount() {
        this.navigationOptions();
        if (this.props.route.params.id === undefined)
            this.props.navigation.navigate("Feed");
        else
            this.getUserData();
    }

    navigationOptions = () => {
        this.props.navigation.setOptions({
            title: this.state.userInfo === null ? "Загрузка..." : this.state.userInfo.login
        });

        // if (regex.isEmpty(route.params)) {
        //     header.headerRight = () => {
        //         return <TouchableWithoutFeedback onPress={() => {
        //             navigation.navigate('Setting')
        //         }}>
        //             <View style={styles.iconView}>
        //                 <FastImage
        //                     resizeMode={FastImage.resizeMode.contain}
        //                     style={styles.iconImage}
        //                     source={getStore.getState().auth.theme.icons.setting}
        //                 />
        //             </View>
        //         </TouchableWithoutFeedback>
        //     }
        // }

    };

    async getUserData() {
        const userData = await getById_API(this.props.route.params.id);

        if (userData != null)
            this.setState({
                ...this.state,
                userInfo: userData
            })

        this.navigationOptions();

        this.followedOnUser();
    }

    async followedOnUser() {
        const followData = await followedOnUser_API(this.props.route.params.id);

        console.log(followData);

        if (followData != null)
            this.setState({
                ...this.state,
                followed: followData.result
            })
    }

    onChangeTab = (index) => {
        this.setState({ selectedIndex: index.i })
    };

    tabFollow = (type) => {
        const { route } = this.props;
        const { isOtherProfile } = this.state;
        let userData = {
            username: 'ardaturan'
        };
        if (isOtherProfile)
            userData = route.params.user;

        this.props.navigation.push('FollowAndFollowing', { type: type, user: userData });
    };

    usernamePress = (name) => {
        const { navigation } = this.props;
        let getUsername = name.replace('@', '');
        navigation.push('OtherProfile', { user: { username: getUsername, userId: 23, profilePic: 'https://scontent-bom1-2.cdninstagram.com/v/t51.2885-19/10593515_274006656127260_1937926446_a.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com&_nc_ohc=K1x_KvjQoYIAX8Oj0h7&oh=4c6f8b782dc97fef7b30c9dd5817e4d0&oe=5EB6A2AF' } });
    };

    hashTagPress = (name) => {
        const { navigation } = this.props;
        navigation.push('HashTag', { hashTag: name });
    };

    renderUserInfo = () => {
        const { theme, navigation, route } = this.props;
        const { isOtherProfile, userInfo, followed } = this.state;

        if (isOtherProfile) {
            let userData = route.params.user;
            name = userData.username;
            username = userData.username;
            profilePic = userData.profilePic;
        }

        return userInfo && (
            <View>
                <View style={styles.userView}>
                    <View>
                        <FastImage resizeMode='stretch' style={styles.profileImage} source={{ uri: CONFIG.RESOURCE_URL + userInfo.avatar }} />
                    </View>
                    <View style={styles.nameView}>
                        <Text style={[styles.nameText, { color: theme.primaryColor }]}>{userInfo.personal.name}</Text>
                        <Text style={[styles.usernameText, { color: theme.secondaryColor }]}>{`@${userInfo.login}`}</Text>
                        <View style={styles.followView}>
                            <View>
                                <Text style={[styles.postCountText, { color: theme.primaryColor }]}>{userInfo.postCount}</Text>
                                <Text style={[styles.postText, { color: theme.secondaryColor }]}>Посты</Text>
                            </View>
                            <TouchableWithoutFeedback onPress={() => this.tabFollow('followers')}>
                                <View>
                                    <Text style={[styles.postCountText, { color: theme.primaryColor }]}>{userInfo.followersCount}</Text>
                                    <Text style={[styles.postText, { color: theme.secondaryColor }]}>Подписчики</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.tabFollow('following')}>
                                <View>
                                    <Text style={[styles.postCountText, { color: theme.primaryColor }]}>{userInfo.followingCount}</Text>
                                    <Text style={[styles.postText, { color: theme.secondaryColor }]}>Подписки</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
                <View style={styles.bioView}>
                    <ParsedText style={[styles.bioText, { color: theme.primaryColor }]}
                        parse={
                            [
                                { pattern: /@(\w+)/, style: [styles.linkColor, { color: theme.linkColor }], onPress: this.usernamePress },
                                { pattern: /#(\w+)/, style: [styles.linkColor, { color: theme.linkColor }], onPress: this.hashTagPress },
                            ]
                        }
                        childrenProps={{ allowFontScaling: false }}
                    >
                        {userInfo.personal.bio === null ? "" : userInfo.personal.bio}
                    </ParsedText>
                    <Text style={[styles.linkText, { color: theme.buttonRed }]}>{userInfo.personal.website === null ? "" : userInfo.personal.website}</Text>
                </View>
                {
                    userInfo.type === "OPEN" ? (<View style={{ flex: 1, flexDirection: 'row' }}>
                        <Button style={{ fontSize: 14, color: theme.secondaryColor }}
                            containerStyle={[styles.button, { borderColor: theme.secondaryColor }]}
                            onPress={() => { }}>
                            { followed === null ? "Загрузка..." : followed === true ? "Отписаться" : "Подписаться" }
                        </Button>
                        <Button style={{ fontSize: 14, color: theme.secondaryColor }}
                            containerStyle={[styles.button, { borderColor: theme.secondaryColor }]}
                            onPress={() => { }}>
                            Написать
                        </Button>
                    </View>) : (<View style={{ flex: 1, flexDirection: 'row' }}>
                        <Button style={{ fontSize: 14, color: theme.secondaryColor }}
                            containerStyle={[styles.button, { borderColor: theme.secondaryColor }]}
                            onPress={() => { }}>
                            Отправить заявку на подписку
                        </Button>
                    </View>)
                }
            </View>
        )
    };

    render() {
        const { theme, navigation } = this.props;
        const { postData, likeData, selectedIndex } = this.state;

        return (
            <View style={[
                styles.container,
                { backgroundColor: theme.container.backgroundColor },
            ]}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
                    {this.renderUserInfo()}
                    <Tabs tabBarUnderlineStyle={{ backgroundColor: theme.buttonRed, height: 2 }} onChangeTab={this.onChangeTab}>
                        <Tab heading={<TabHeading style={{ backgroundColor: theme.container.backgroundColor }}>
                            <FastImage
                                resizeMode={FastImage.resizeMode.contain}
                                style={styles.iconImage}
                                source={selectedIndex === 0 ? theme.icons.selectedPost : theme.icons.post}
                            />
                        </TabHeading>}>
                            <PostTab theme={theme} data={postData} navigation={navigation} />
                        </Tab>
                        <Tab heading={<TabHeading style={{ backgroundColor: theme.container.backgroundColor }}>
                            <FastImage
                                resizeMode={FastImage.resizeMode.contain}
                                style={styles.iconImage}
                                source={selectedIndex === 1 ? theme.icons.selectedActivity : theme.icons.activity}
                            />
                        </TabHeading>}>
                            <LikeTab theme={theme} data={likeData} navigation={navigation} />
                        </Tab>
                    </Tabs>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.auth.theme,
    user: state.auth.user
});

export default connect(mapStateToProps)(profileScreen);

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    userView: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15
    },
    profileImage: {
        width: 84,
        height: 84,
        borderRadius: 42,
    },
    nameView: {
        flex: 1,
        marginLeft: 15
    },
    nameText: {
        fontSize: 16,
        fontWeight: '800',
    },
    usernameText: {
        fontSize: 14,
        fontWeight: '600',
    },
    followView: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    postCountText: {
        fontSize: 14,
        fontWeight: '800',
    },
    postText: {
        marginTop: 2,
        fontSize: 12,
        fontWeight: '600',
    },
    bioView: {
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15
    },
    bioText: {
        fontSize: 13,
        fontWeight: '400',
    },
    linkColor: { color: LINK, fontWeight: '600' },
    linkText: {
        marginTop: 5,
        fontSize: 13,
        fontWeight: '600',
    },
    button: {
        flex: 1,
        margin: 15,
        height: 36,
        overflow: 'hidden',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconView: {
        width: 35,
        height: 35,
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconImage: {
        width: 25,
        height: 25,
    },
});

