import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView, Text} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import Feather from 'react-native-vector-icons/Feather';
import Button from '../../components/general/Button';
import {connect} from 'react-redux';
import {White} from '../../themes/constantColors';
import SocialView from '../../components/general/SocialView';
import Title from '../../components/general/Title';
import {regex} from '../../utils/regex';
import checkEmail_API from '../../utils/api/user/checkEmail_API';
import checkLogin_API from '../../utils/api/user/checkLogin_API';
import signIn_API from '../../utils/api/auth/signIn_API';
import login_API from '../../utils/api/auth/login_API';

let formField = ['email', 'password', 'name', 'login'];

class registerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secureTextEntry: true,
      secureTextEntry1: true,
    };

    this.emailRef = this.updateRef.bind(this, 'email');
    this.passwordRef = this.updateRef.bind(this, 'password');
    this.nameRef = this.updateRef.bind(this, 'name');
    this.loginRef = this.updateRef.bind(this, 'login');

    this.onFocus = this.onFocus.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.onSubmitPassword = this.onSubmitPassword.bind(this);
    this.onAccessoryPress = this.onAccessoryPress.bind(this);

    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);
  }

  updateRef = (name, ref) => {
    this[name] = ref;
  };

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

  onSubmitEmail() {
    this.password.focus();
  }

  onSubmitPassword() {
    this.password.blur();
    this.onSubmit();
  }

  onAccessoryPress() {
    this.setState(({secureTextEntry}) => ({secureTextEntry: !secureTextEntry}));
  }

  async onSubmit() {
    let errors = {};

    formField.forEach((name) => {
      let value = this[name].value();

      if (!value) {
        errors[name] = 'Поле не должно быть пустым';
      } else {
        if (name === 'email' && !regex.validateEmail(value)) {
          errors[name] = 'Невалидный E-MAIL';
        } else if (name === 'password' && value.length < 6) {
          errors[name] = 'Минимальная длина пароля 6 символов';
        } else if (name === 'confirm' && value.length < 6) {
          errors[name] = 'Минимальная длина подтверждения пароля 6 символов';
        } else if (name === 'confirm') {
          let passwordValue = this.password.value();
          if (passwordValue !== value) {
            errors[name] = "Пароли не совпадают";
          }
        }
      }
    });

    if(!errors.email) {
      const checkEmail = await checkEmail_API(this.email.value());

      if(checkEmail == null) {
        errors.email = "Ошибка при проверке E-MAIL";
      }
  
      if(checkEmail && checkEmail.result)
        errors.email = "Указанный E-MAIL уже занят";
  
    }
    
    if(!errors.login) {
      const checkLogin = await checkLogin_API(this.login.value());

      if(checkLogin == null) {
        errors.login = "Ошибка при проверке логина";
      }
  
      if(checkLogin && checkLogin.result)
        errors.login = "Указанный логин уже занят";
    }

    this.setState({errors});

    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      const registerData = await signIn_API(this.login.value(), this.name.value(), this.email.value(), this.password.value());

      if(registerData != null) {
        const loginData = await login_API(this.login.value(), this.password.value());

        if(loginData != null) {
          regex.setDashboard(loginData.token, loginData.refreshToken, loginData.user);
        }
      }
    }
  };

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
          scrollEnabled={true}>
          <View style={styles.innerViewContainer}>
            <Title theme={theme} title={'Создание аккаунта'} />
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
                ref={this.emailRef}
                textColor={theme.primaryColor}
                tintColor={theme.primaryColor}
                baseColor={theme.primaryAlphaColor}
                errorColor={theme.buttonRed}
                fontSize={14}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitEmail}
                returnKeyType="next"
                label="Электронная почта"
                error={errors.email}
            />
            <TextField
                ref={this.nameRef}
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
                label="Имя"
                error={errors.name}
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
                returnKeyType="next"
                label="Пароль"
                error={errors.password}
                renderRightAccessory={this.renderPasswordAccessory}
            />

            <View style={styles.signUpView}>
              <Text style={[styles.signUpText, {color: theme.secondaryColor}]}>
                {/* By signing up you agree to our Terms of Use and Privacy Policy */}
              </Text>
            </View>
            <Button
              style={{fontSize: 15, color: White}}
              containerStyle={[
                styles.loginButton,
                {backgroundColor: theme.buttonRed},
              ]}
              onPress={() => this.onSubmit()}>
              Создать аккаунт
            </Button>
            <SocialView
              type={1}
              theme={theme}
              navigation={navigation}
              title={'Уже есть аккаунт?'}
              subTitle={'Войти'}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.auth.theme,
});

export default connect(mapStateToProps)(registerScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerViewContainer: {
    // flex: 1,
    padding: 12,
    paddingTop: 8,
  },
  signUpView: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpText: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '500',
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
