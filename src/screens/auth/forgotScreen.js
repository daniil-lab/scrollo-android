import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView, Text} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import Button from '../../components/general/Button';
import {connect} from 'react-redux';
import {White} from '../../themes/constantColors';
import Title from '../../components/general/Title';

class forgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.emailRef = this.updateRef.bind(this, 'email');
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  onSubmit() {
    let errors = {};

    ['email'].forEach(name => {
      let value = this[name].value();

      if (!value) {
        errors[name] = 'Should not be empty';
      } else {
      }
    });

    this.setState({errors});
  }

  render() {
    let {errors = {}} = this.state;
    const {theme} = this.props;

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
            <Title theme={theme} title={'Forgot Password?'} />
            <Text
              style={{
                marginTop: 20,
                marginBottom: 15,
                fontSize: 13,
                fontWeight: '600',
                color: theme.secondaryColor,
              }}>
              Please enter your email to receive the instruction to reset your
              password
            </Text>
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
              returnKeyType="next"
              label="Email Address"
              error={errors.email}
            />
            <Button
              style={{fontSize: 15, color: White}}
              containerStyle={[
                styles.loginButton,
                {backgroundColor: theme.buttonRed},
              ]}
              onPress={() => this.onSubmit()}>
              Send me now
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

let mapStateToProps;
mapStateToProps = state => ({
  theme: state.auth.theme,
});

export default connect(mapStateToProps)(forgotPassword);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerViewContainer: {
    flex: 1,
    padding: 12,
    paddingTop: 8,
  },
  loginButton: {
    marginTop: 20,
    height: 46,
    overflow: 'hidden',
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
