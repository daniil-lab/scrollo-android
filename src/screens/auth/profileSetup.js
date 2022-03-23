import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import Button from '../../components/general/Button';
import {connect} from 'react-redux';
import {Black, White} from '../../themes/constantColors';
import Title from '../../components/general/Title';
import {OS} from '../../utils/regex';
import ActionSheet from 'react-native-action-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';

let formField = ['username', 'firstName', 'lastName', 'phone'];

class profileSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      profilePic: '',
    };

    this.usernameRef = this.updateRef.bind(this, 'username');
    this.firstRef = this.updateRef.bind(this, 'firstName');
    this.lastRef = this.updateRef.bind(this, 'lastName');
    this.phoneRef = this.updateRef.bind(this, 'phone');

    this.onSubmitUsername = this.onSubmitUsername.bind(this);
    this.onSubmitFirstName = this.onSubmitFirstName.bind(this);
    this.onSubmitLastName = this.onSubmitLastName.bind(this);
    this.onSubmitPhone = this.onSubmitPhone.bind(this);
  }

  updateRef = (name, ref) => {
    this[name] = ref;
  };

  showActionSheet = () => {
    let options = ['Camera', 'Library'];
    let CANCEL_INDEX = 2;
    if (OS === 'ios') {
      options.push('Cancel');
    }

    ActionSheet.showActionSheetWithOptions(
      {
        options: options,
        cancelButtonIndex: CANCEL_INDEX,
        tintColor: Black,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          this.openImagePicker('camera');
        } else if (buttonIndex === 1) {
          this.openImagePicker('library');
        }
      },
    );
  };

  getPhotoCallback = (response) => {
    this.setState({profilePic: response.path});
  };

  openImagePicker(type) {
    const options = {
      width: 400,
      height: 400,
      cropping: true,
    };
    if (type === 'camera') {
      ImagePicker.openCamera(options).then(this.getPhotoCallback);
    } else {
      ImagePicker.openPicker(options).then(this.getPhotoCallback);
    }
  }

  onSubmit = () => {
    let errors = {};

    formField.forEach((name) => {
      let value = this[name].value();

      if (!value) {
        errors[name] = 'Should not be empty';
      } else if (name === 'phone' && value.length < 10) {
        errors[name] = 'Phone should 10 digit';
      }
    });

    this.setState({errors});

    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      this.props.navigation.navigate('ProfileSetup');
    }
  };

  onSubmitUsername = () => {
    this.firstName.focus();
  };

  onSubmitFirstName = () => {
    this.lastName.focus();
  };

  onSubmitLastName = () => {
    this.phone.focus();
  };

  onSubmitPhone = () => {};

  onFocus = () => {
    let {errors = {}} = this.state;

    for (let name in errors) {
      let ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }

    this.setState({errors});
  };

  onChangeText = (text) => {
    formField
      .map((name) => {
        return {name, ref: this[name]};
      })
      .forEach(({name, ref}) => {
        if (ref.isFocused()) {
          this.setState({[name]: text});
        }
      });
  };

  render() {
    let {errors = {}, profilePic, username} = this.state;
    const {theme} = this.props;

    return (
      <SafeAreaView
        style={[
          styles.container,
          {backgroundColor: theme.container.backgroundColor},
        ]}>
        <KeyboardAvoidingView style={{flex: 1}} behavior={'height'}>
          <ScrollView
            contentContainerStyle={styles.innerViewContainer}
            scrollEnabled={false}>
            <View style={styles.innerViewContainer}>
              <Title theme={theme} title={'Profile Setup'} />
              <View style={styles.avatarView}>
                <TouchableWithoutFeedback onPress={this.showActionSheet}>
                  <FastImage
                    style={[
                      styles.avatarImage,
                      {borderColor: theme.secondaryColor},
                    ]}
                    source={{uri: profilePic}}
                  />
                </TouchableWithoutFeedback>
                <Text
                  style={[
                    styles.avatarImageText,
                    {color: theme.secondaryColor},
                  ]}>
                  Add Profile Pic
                </Text>
              </View>
              <TextField
                ref={this.usernameRef}
                value={username}
                textColor={theme.primaryColor}
                tintColor={theme.primaryColor}
                baseColor={theme.primaryAlphaColor}
                errorColor={theme.buttonRed}
                fontSize={14}
                autoCapitalize="none"
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                label="Username"
                error={errors.username}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitUsername}
                returnKeyType="next"
              />
              <View style={styles.nameView}>
                <TextField
                  containerStyle={[styles.nameTextView, {marginRight: 10}]}
                  ref={this.firstRef}
                  textColor={theme.primaryColor}
                  tintColor={theme.primaryColor}
                  baseColor={theme.primaryAlphaColor}
                  errorColor={theme.buttonRed}
                  fontSize={14}
                  autoCapitalize="none"
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onFocus={this.onFocus}
                  onChangeText={this.onChangeText}
                  onSubmitEditing={this.onSubmitFirstName}
                  returnKeyType="next"
                  label="First Name"
                  error={errors.firstName}
                />
                <TextField
                  containerStyle={[styles.nameTextView, {marginLeft: 10}]}
                  ref={this.lastRef}
                  textColor={theme.primaryColor}
                  tintColor={theme.primaryColor}
                  baseColor={theme.primaryAlphaColor}
                  errorColor={theme.buttonRed}
                  fontSize={14}
                  autoCapitalize="none"
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onFocus={this.onFocus}
                  onChangeText={this.onChangeText}
                  onSubmitEditing={this.onSubmitLastName}
                  returnKeyType="next"
                  label="Last Name"
                  error={errors.lastName}
                />
              </View>
              <TextField
                ref={this.phoneRef}
                textColor={theme.primaryColor}
                tintColor={theme.primaryColor}
                baseColor={theme.primaryAlphaColor}
                errorColor={theme.buttonRed}
                fontSize={14}
                keyboardType="phone-pad"
                autoCapitalize="none"
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitPhone}
                returnKeyType="next"
                label="Phone (+1 234 345 4567)"
                error={errors.phone}
              />
              <Button
                style={{fontSize: 15, color: White}}
                containerStyle={[
                  styles.loginButton,
                  {backgroundColor: theme.buttonRed},
                ]}
                onPress={() => this.onSubmit()}>
                Setup profile
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

let mapStateToProps;
mapStateToProps = (state) => ({
  theme: state.auth.theme,
});

export default connect(mapStateToProps)(profileSetup);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerViewContainer: {
    flex: 1,
    padding: 12,
    paddingTop: 8,
  },
  avatarView: {
    marginTop: 25,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    borderWidth: 1,
    height: 90,
    width: 90,
    borderRadius: 45,
  },
  avatarImageText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '800',
  },
  loginButton: {
    marginTop: 20,
    height: 46,
    overflow: 'hidden',
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  nameTextView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
