import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import loginScreen from '../screens/auth/loginScreen';
import forgotScreen from '../screens/auth/forgotScreen';
import registerScreen from '../screens/auth/registerScreen';
import {connect} from 'react-redux';
import profileSetup from '../screens/auth/profileSetup';
import SplashScreen from '../screens/SplashScreen';
import feedScreen from '../screens/dashboard/feed/feedScreen';
import messageListScreen from '../screens/dashboard/message/messageListScreen';
import notificationScreen from '../screens/dashboard/notification/notificationScreen';
import profileScreen from '../screens/dashboard/profile/profileScreen';
import viewsAndLikesScreen from '../screens/dashboard/feed/viewsAndLikesScreen';
import commentsScreen from '../screens/dashboard/feed/commentsScreen';
import settingScreen from '../screens/dashboard/profile/menu/settingScreen';
import editProfileScreen from '../screens/dashboard/profile/menu/editProfileScreen';
import changePasswordScreen from '../screens/dashboard/profile/menu/changePasswordScreen';
import reportScreen from '../screens/dashboard/profile/menu/reportScreen';
import webViewScreen from '../screens/dashboard/profile/menu/webViewScreen';
import followAndFollowingScreen from '../screens/dashboard/general/followAndFollowingScreen';
import postFeedScreen from '../screens/dashboard/general/postFeedScreen';
import messageScreen from '../screens/dashboard/message/messageScreen';
import FastImage from 'react-native-fast-image';
import {Red} from '../themes/constantColors';
import {regex} from '../utils/regex';
import Feather from 'react-native-vector-icons/Feather';
import addPost from '../screens/dashboard/addpost/addPost';
import createNewMessageScreen from '../screens/dashboard/message/createNewMessageScreen';
import Stories3 from '../screens/dashboard/story/Stories3';
import hashTagScreen from '../screens/dashboard/hashtag/hashTagScreen';
import AsyncStorage from '@react-native-community/async-storage';
import refresh_API from '../utils/api/auth/refresh_API';
import viewProfileScreen from '../screens/dashboard/profile/viewProfileScreen';

let RootStack = createStackNavigator();
let Tab = createBottomTabNavigator();

const styleBack = {width: 20, height: 20, marginLeft: 15};

const loginNavigationOption = (theme, navigationVisible) => {
    return {
        headerShown: navigationVisible,
        headerBackTitleVisible: false,
        headerBackImage: () => {
            return <FastImage style={styleBack} source={theme.icons.back}/>
        },
        headerTintColor: theme.container.headerTextColor,
        headerStyle: {
            backgroundColor: theme.container.backgroundColor,
            shadowOpacity: 0,
            shadowOffset: {height: 0, width: 0},
            shadowRadius: 0,
            elevation: 0
        },
    }
};

const mapStateToPropsStack = state => ({
    loading: state.auth.loading,
    theme: state.auth.theme,
});

let FeedStack = createStackNavigator();

class FeedStackScreenWrapper extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {
        const {theme, loading, navigation, route} = this.props;
        navigation.setOptions({tabBarVisible: (regex.isEmpty(route.state) || route.state.index === 0)});
        let navigationVisible = !loading;

        return (
            <FeedStack.Navigator screenOptions={loginNavigationOption(theme, navigationVisible)}>
                <FeedStack.Screen name="Feed" component={feedScreen} options={feedScreen.navigationOptions} />
                <FeedStack.Screen name="AddPost" component={addPost} options={addPost.navigationOptions} />
                <FeedStack.Screen name="Comment" component={commentsScreen} options={commentsScreen.navigationOptions} />
                <FeedStack.Screen name="Like" component={viewsAndLikesScreen} options={viewsAndLikesScreen.navigationOptions} />
                <FeedStack.Screen name="Stories" component={Stories3} options={Stories3.navigationOptions} />
                <FeedStack.Screen name="OtherProfile" component={viewProfileScreen} />
                <FeedStack.Screen name="FollowAndFollowing" component={followAndFollowingScreen} options={followAndFollowingScreen.navigationOptions} />
                <FeedStack.Screen name="PostFeed" component={postFeedScreen} options={postFeedScreen.navigationOptions} />
                <FeedStack.Screen name="HashTag" component={hashTagScreen} options={hashTagScreen.navigationOptions} />
            </FeedStack.Navigator>
        )
    }
}

export const FeedStackScreen = connect(mapStateToPropsStack)(FeedStackScreenWrapper);

let MessageStack = createStackNavigator();

class MessageStackScreenWrapper extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {
        const {theme, loading, navigation, route} = this.props;
        navigation.setOptions({tabBarVisible: (regex.isEmpty(route.state) || route.state.index === 0)});
        let navigationVisible = !loading;

        return (
            <MessageStack.Navigator screenOptions={loginNavigationOption(theme, navigationVisible)}>
                <MessageStack.Screen name="MessageList" component={messageListScreen} options={messageListScreen.navigationOptions} />
                <MessageStack.Screen name="Message" component={messageScreen} options={messageScreen.navigationOptions} />
                <MessageStack.Screen name="NewMessage" component={createNewMessageScreen} options={createNewMessageScreen.navigationOptions} />
                <MessageStack.Screen name="OtherProfile" component={viewProfileScreen} />
                <MessageStack.Screen name="FollowAndFollowing" component={followAndFollowingScreen} options={followAndFollowingScreen.navigationOptions} />
                <MessageStack.Screen name="PostFeed" component={postFeedScreen} options={postFeedScreen.navigationOptions} />
                <MessageStack.Screen name="Comment" component={commentsScreen} options={commentsScreen.navigationOptions} />
                <MessageStack.Screen name="Like" component={viewsAndLikesScreen} options={viewsAndLikesScreen.navigationOptions} />
                <MessageStack.Screen name="HashTag" component={hashTagScreen} options={hashTagScreen.navigationOptions} />
            </MessageStack.Navigator>
        )
    }
}

export const MessageStackScreen = connect(mapStateToPropsStack)(MessageStackScreenWrapper);

let NotificationStack = createStackNavigator();

class NotificationStackScreenWrapper extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {
        const {theme, loading, navigation, route} = this.props;
        navigation.setOptions({tabBarVisible: (regex.isEmpty(route.state) || route.state.index === 0)});
        let navigationVisible = !loading;

        return (
            <NotificationStack.Navigator screenOptions={loginNavigationOption(theme, navigationVisible)}>
                <NotificationStack.Screen name="Notification" component={notificationScreen} options={notificationScreen.navigationOptions} />
                <NotificationStack.Screen name="OtherProfile" component={viewProfileScreen} />
                <NotificationStack.Screen name="FollowAndFollowing" component={followAndFollowingScreen} options={followAndFollowingScreen.navigationOptions} />
                <NotificationStack.Screen name="PostFeed" component={postFeedScreen} options={postFeedScreen.navigationOptions} />
                <NotificationStack.Screen name="Comment" component={commentsScreen} options={commentsScreen.navigationOptions} />
                <NotificationStack.Screen name="Like" component={viewsAndLikesScreen} options={viewsAndLikesScreen.navigationOptions} />
                <NotificationStack.Screen name="HashTag" component={hashTagScreen} options={hashTagScreen.navigationOptions} />
            </NotificationStack.Navigator>
        )
    }
}

export const NotificationStackScreen = connect(mapStateToPropsStack)(NotificationStackScreenWrapper);

let ProfileStack = createStackNavigator();

class ProfileStackScreenWrapper extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {
        const {theme, loading, navigation, route} = this.props;
        navigation.setOptions({tabBarVisible: (regex.isEmpty(route.state) || route.state.index === 0)});
        let navigationVisible = !loading;

        return (
            <ProfileStack.Navigator screenOptions={loginNavigationOption(theme, navigationVisible)}>
                <ProfileStack.Screen name="Profile" component={profileScreen} options={profileScreen.navigationOptions} />
                <ProfileStack.Screen name="FollowAndFollowing" component={followAndFollowingScreen} options={followAndFollowingScreen.navigationOptions} />
                <ProfileStack.Screen name="PostFeed" component={postFeedScreen} options={postFeedScreen.navigationOptions} />
                <ProfileStack.Screen name="Setting" component={settingScreen} options={settingScreen.navigationOptions} />
                <ProfileStack.Screen name="EditProfile" component={editProfileScreen} options={editProfileScreen.navigationOptions} />
                <ProfileStack.Screen name="ChangePassword" component={changePasswordScreen} options={changePasswordScreen.navigationOptions} />
                <ProfileStack.Screen name="Report" component={reportScreen} options={reportScreen.navigationOptions} />
                <ProfileStack.Screen name="WebLink" component={webViewScreen} options={webViewScreen.navigationOptions} />
                <ProfileStack.Screen name="OtherProfile" component={viewProfileScreen} />
                <ProfileStack.Screen name="Comment" component={commentsScreen} options={commentsScreen.navigationOptions} />
                <ProfileStack.Screen name="Like" component={viewsAndLikesScreen} options={viewsAndLikesScreen.navigationOptions} />
                <ProfileStack.Screen name="HashTag" component={hashTagScreen} options={hashTagScreen.navigationOptions} />
            </ProfileStack.Navigator>
        )
    }
}

export const ProfileStackScreen = connect(mapStateToPropsStack)(ProfileStackScreenWrapper);

let appNav = null;

class AppNavigator extends React.PureComponent {

  constructor(props) {
      super(props);

      this.state = {
          load: true
      }
  }

  componentDidMount() {
      appNav = this;

      this.getAuthData();
  }

  async getAuthData() {
      const refreshToken = await AsyncStorage.getItem("refresh_token");
      
      if(refreshToken == null)
        this.setState({
          load: false
        })
      else {
        const loginData = await refresh_API(refreshToken);

        if(loginData) {
          await regex.setDashboard(loginData.token, loginData.refreshToken, loginData.user);
          this.setState({
            load: false
          })
        } else {
          this.setState({
            load: false
          })
        }
      }
  }

  tabBarIcon = ({ color, size }) => (
        <Feather name="home-outline" color={color} size={size} />
  );

  render() {
    const {theme, user, loading} = this.props;
    const { load } = this.state;
    let navigationVisible = !load;

    if (load) {
        return (
            <SplashScreen/>
        )
    }

    return (
      <NavigationContainer>
          {
              user === null
                  ? <RootStack.Navigator screenOptions={loginNavigationOption(theme, navigationVisible)}>
                        <RootStack.Screen name="Login" component={loginScreen} options={{title: ''}} />
                        <RootStack.Screen name="Forgot" component={forgotScreen} options={{title: ''}} />
                        <RootStack.Screen name="Register" component={registerScreen} options={{title: ''}}/>
                        <RootStack.Screen name="ProfileSetup" component={profileSetup} options={{title: ''}}/>
                    </RootStack.Navigator>
                  : <Tab.Navigator initialRouteName="Home"
                                   tabBarOptions={{
                                       showLabel: false,
                                       activeTintColor: Red,
                                       inactiveTintColor: theme.primaryColor,
                                       activeBackgroundColor: theme.container.backgroundColor,
                                       inactiveBackgroundColor: theme.container.backgroundColor,
                                       style: {
                                           backgroundColor: theme.container.backgroundColor,
                                           borderTopWidth: 0
                                       }
                                   }}
                  >
                        <Tab.Screen name="Home" component={FeedStackScreen} options={{
                            tabBarIcon: ({ color, size }) => (
                                <Feather name="home" color={color} size={size} />
                            ),
                        }}/>
                        <Tab.Screen name="Chat" component={MessageStackScreen} options={{
                            tabBarIcon: ({ color, size }) => (
                                <Feather name="message-circle" color={color} size={size} />
                            ),
                        }}/>
                        <Tab.Screen name="Activity" component={NotificationStackScreen}  options={{
                            tabBarIcon: ({ color, size }) => (
                                <Feather name="heart" color={color} size={size} />
                            ),
                        }}/>
                        <Tab.Screen name="Profile" component={ProfileStackScreen} options={{
                            tabBarIcon: ({ color, size }) => (
                                <Feather name="user" color={color} size={size} />
                            ),
                        }}/>
                    </Tab.Navigator>
          }
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  user: state.auth.user,
  theme: state.auth.theme,
});

export default connect(mapStateToProps)(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
    iconImage: {
        width: 18,
        height: 18,
    },
});
