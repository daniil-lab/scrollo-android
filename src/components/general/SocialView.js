import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class SocialView extends Component {
  constructor(props) {
    super(props);

    this.onSignUpPress = this.onSignUpPress.bind(this);
  }

  onSignUpPress() {
    const {type} = this.props;
    if (type === 2)
      this.props.navigation.navigate('Register');
    else
      this.props.navigation.navigate('Login');
  };

  render() {
    const {theme, subTitle, title, type} = this.props;

    let socialText = type === 2 ? 'login' : 'sign up';
    return (
      <View style={styles.container}>
        {/* <View style={styles.socialView}>
          <Text style={[styles.socialText, {color: theme.primaryColor}]}>
            {`Or ${socialText} with social account`}
          </Text>
        </View>
        <View style={styles.socialButtonView}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.socialButton,
                {marginRight: 10, borderColor: theme.primaryColor},
              ]}>
              <MaterialCommunityIcons name="google-plus" size={22} color={theme.primaryColor} />
              <Text style={[styles.buttonText, {color: theme.primaryColor}]}>
                Google
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.socialButton,
                {marginLeft: 10, borderColor: theme.primaryColor},
              ]}>
              <MaterialCommunityIcons name="facebook" size={22} color={theme.primaryColor} />
              <Text style={[styles.buttonText, {color: theme.primaryColor}]}>
                Facebook
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View> */}
        <View style={{flex: 1, minHeight: 80}}>
          <View style={{flex: 1}} />
          <TouchableWithoutFeedback onPress={this.onSignUpPress}>
            <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
              <Text style={{color: theme.secondaryColor, fontSize: 13}}>
                {title}
              </Text>
              <Text
                  style={{
                    color: theme.primaryColor,
                    marginLeft: 5,
                    fontSize: 13,
                    fontWeight: '800',
                  }}>
                {subTitle}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

export default SocialView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  socialView: {
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialText: {
    fontSize: 12,
    fontWeight: '800',
  },
  socialButtonView: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  socialButton: {
    flex: 1,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 12,
    marginLeft: 5,
    fontWeight: '800',
  },
});
