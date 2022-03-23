import React, {Component} from 'react';
import {FlatList, Image, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {connect} from 'react-redux';
import {TextField} from 'react-native-material-textfield';
import {White} from '../../../../themes/constantColors';
import Button from '../../../../components/general/Button';

class changePasswordScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Change Password',
        }
    };

    constructor(props) {
        super(props);

        this.oldPasswordRef = this.updateRef.bind(this, 'oldPassword');
        this.newPasswordRef = this.updateRef.bind(this, 'newPassword');
        this.confirmPasswordRef = this.updateRef.bind(this, 'confirmPassword');
    }

    componentDidMount(): void {
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    render() {
        const {theme, navigation} = this.props;

        return (
            <View style={[
                styles.container,
                {backgroundColor: theme.container.backgroundColor},
            ]}>
                <ScrollView contentContainerStyle={styles.innerViewContainer}>
                    <View style={styles.innerViewContainer}>
                        <TextField
                            ref={this.oldPasswordRef}
                            textColor={theme.primaryColor}
                            tintColor={theme.primaryColor}
                            baseColor={theme.primaryAlphaColor}
                            errorColor={theme.buttonRed}
                            fontSize={14}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            clearTextOnFocus={true}
                            label="Old Password"
                        />
                        <TextField
                            ref={this.newPasswordRef}
                            textColor={theme.primaryColor}
                            tintColor={theme.primaryColor}
                            baseColor={theme.primaryAlphaColor}
                            errorColor={theme.buttonRed}
                            fontSize={14}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            clearTextOnFocus={true}
                            label="New Password"
                        />
                        <TextField
                            ref={this.confirmPasswordRef}
                            textColor={theme.primaryColor}
                            tintColor={theme.primaryColor}
                            baseColor={theme.primaryAlphaColor}
                            errorColor={theme.buttonRed}
                            fontSize={14}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            clearTextOnFocus={true}
                            label="Confirm Password"
                        />
                        <Button
                            style={{fontSize: 15, color: White}}
                            containerStyle={[
                                styles.loginButton,
                                {backgroundColor: theme.buttonRed},
                            ]}
                            onPress={() => this.onSubmit()}>
                            Change Password
                        </Button>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(changePasswordScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerViewContainer: {
        flex: 1,
        padding: 12,
        paddingTop: 0,
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

