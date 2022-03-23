import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import Feather from 'react-native-vector-icons/Feather';
import Button from '../../components/general/Button';
import {connect} from 'react-redux';
import {White} from '../../themes/constantColors';
import SocialView from '../../components/general/SocialView';
import Title from '../../components/general/Title';
import {regex} from '../../utils/regex';
import login_API from '../../utils/api/auth/login_API';

class loginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secureTextEntry: true,
    };

    this.loginRef = this.updateRef.bind(this, 'login');
    this.passwordRef = this.updateRef.bind(this, 'password');

    this.onFocus = this.onFocus.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.onSubmitPassword = this.onSubmitPassword.bind(this);
    this.onAccessoryPress = this.onAccessoryPress.bind(this);

    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  onFocus() {
    let {errors = {}} = this.state;

    for (let name in errors) {
      let ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }

    this.setState({errors});
  }

  onChangeText(text) {
    ['login', 'password']
      .map(name => ({name, ref: this[name]}))
      .forEach(({name, ref}) => {
        if (ref.isFocused()) {
          this.setState({[name]: text});
        }
      });
  }

  onSubmitEmail() {
    this.password.focus();
  }

  onSubmitPassword() {
    this.password.blur();
  }

  onAccessoryPress() {
    this.setState(({secureTextEntry}) => ({secureTextEntry: !secureTextEntry}));
  }

  onForgotSubmit() {
    this.props.navigation.navigate('Forgot')
  }

  async onSubmit() {
    let errors = {};
    
    ['login', 'password'].forEach(name => {
      let value = this[name].value();
    
      if (!value) {
        errors[name] = 'Поле не должно быть пустым';
      }
    });
    
    this.setState({errors});

    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      const loginData = await login_API(this.login.value(), this.password.value());

      if(loginData != null) {
        regex.setDashboard(loginData.token, loginData.refreshToken, loginData.user);
      }
    }
  }

  renderPasswordAccessory() {
    const {theme} = this.props;
    let {secureTextEntry} = this.state;

    let name = secureTextEntry ? 'eye-off' : 'eye';

    return (
      <Feather
        size={20}
        name={name}
        color={theme.primaryColor}
        onPress={this.onAccessoryPress}
        suppressHighlighting={true}
      />
    );
  }

  render() {
    let {errors = {}, secureTextEntry} = this.state;
    const {theme, navigation} = this.props;

    return (
      <SafeAreaView
        style={[
          styles.container,
          {backgroundColor: theme.container.backgroundColor},
        ]}>
        <ScrollView
          contentContainerStyle={styles.innerViewContainer}
          scrollEnabled={false}>
          <View style={styles.innerViewContainer}>
            <Title theme={theme} title={'Вход'} />
            <TextField
              ref={this.loginRef}
              textColor={theme.primaryColor}
              tintColor={theme.primaryColor}
              baseColor={theme.primaryAlphaColor}
              errorColor={theme.buttonRed}
              fontSize={14}
              keyboardType="text"
              autoCapitalize="none"
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitEmail}
              returnKeyType="next"
              label="Логин"
              error={errors.login}
            />
            <TextField
              ref={this.passwordRef}
              textColor={theme.primaryColor}
              tintColor={theme.primaryColor}
              baseColor={theme.primaryAlphaColor}
              errorColor={theme.buttonRed}
              fontSize={14}
              secureTextEntry={secureTextEntry}
              autoCapitalize="none"
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              clearTextOnFocus={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitPassword}
              returnKeyType="done"
              label="Пароль"
              error={errors.password}
              // title="Choose wisely"
              // maxLength={30}
              // characterRestriction={20}
              renderRightAccessory={this.renderPasswordAccessory}
            />
            <View style={styles.forgotView}>
              <Button
                style={[styles.forgotText, {color: theme.primaryColor}]}
                containerStyle={styles.forgotButton}
                onPress={() => this.onForgotSubmit()}
              />
              <Button
                style={[styles.forgotText, {color: theme.primaryColor}]}
                containerStyle={styles.forgotButton}
                onPress={() => this.onForgotSubmit()}>
                Забыли пароль?
              </Button>
            </View>
            <Button
              style={{fontSize: 15, color: White}}
              containerStyle={[
                styles.loginButton,
                {backgroundColor: theme.buttonRed},
              ]}
              onPress={() => this.onSubmit()}>
              Войти
            </Button>
            <SocialView type={2} theme={theme} navigation={navigation} title={`Не зарегистрированы?`} subTitle={'Создать аккаунт'} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.auth.theme,
});

export default connect(mapStateToProps)(loginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerViewContainer: {
    flex: 1,
    padding: 12,
    paddingTop: 8,
  },
  forgotView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  forgotText: {
    fontSize: 12,
    fontWeight: '800',
  },
  forgotButton: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
    width: 150,
    overflow: 'hidden',
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  loginButton: {
    marginTop: 20,
    height: 46,
    overflow: 'hidden',
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialView: {
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
