import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import { TextField } from 'react-native-material-textfield';
import { OS } from '../../../../utils/regex';
import ActionSheet from 'react-native-action-sheet';
import { Black } from '../../../../themes/constantColors';
import ImagePicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';
import changeAvatar_API from '../../../../utils/api/user/changeAvatar_API';
import getMe_API from '../../../../utils/api/user/getMe_API';
import RNFS from 'react-native-fs';
import RNFB from 'react-native-fetch-blob';
import CONFIG from '../../../../utils/CONFIG';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import checkEmail_API from '../../../../utils/api/user/checkEmail_API';
import checkLogin_API from '../../../../utils/api/user/checkLogin_API';
import Button from '../../../../components/general/Button';
import removeAvatar_API from '../../../../utils/api/user/removeAvatar_API';
import { getStore } from '../../../../../App';
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import updateUser_API from '../../../../utils/api/user/updateUser_API';

class editProfileScreen extends Component {
    constructor(props) {

        super(props);
        this.state = {
            userInfo: null,
            name: 'Arda Turan',
            username: 'ardaturan',
            weblink: '',
            bio: '',
            profilePic: 'https://scontent-bom1-2.cdninstagram.com/v/t51.2885-19/10593515_274006656127260_1937926446_a.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com&_nc_ohc=K1x_KvjQoYIAX8Oj0h7&oh=4c6f8b782dc97fef7b30c9dd5817e4d0&oe=5EB6A2AF',
        };

        this.nameRef = this.updateRef.bind(this, 'name');
        this.regionRef = this.updateRef.bind(this, 'region');
        this.phoneRef = this.updateRef.bind(this, 'phone');
        this.genderRef = this.updateRef.bind(this, 'gender');
        this.accountTypeRef = this.updateRef.bind(this, 'accountType');
        this.emailRef = this.updateRef.bind(this, 'email');
        this.usernameRef = this.updateRef.bind(this, 'username');
        this.weblinkRef = this.updateRef.bind(this, 'webLink');
        this.bioRef = this.updateRef.bind(this, 'bio');
    }

    componentDidMount() {
        this.getUserData();
        this.navigationOptions();
    }

    navigationOptions() {
        this.props.navigation.setOptions({
            title: 'Изменение профиля',
            headerRight: () => {
                return (<TouchableWithoutFeedback onPress={() => {
                    this.onSubmit();
                }}>
                    <View style={styles.iconView}>
                        <FastImage
                            resizeMode={FastImage.resizeMode.contain}
                            style={styles.iconImage}
                            source={getStore.getState().auth.theme.icons.done}
                        />
                    </View>
                </TouchableWithoutFeedback>)
            }
        })
    };

    async getUserData() {
        const userData = await getMe_API();

        if (userData != null)
            this.setState({
                ...this.state,
                name: userData.personal.name,
                gender: userData.personal.gender,
                region: userData.personal.region,
                accountType: userData.type,
                phone: userData.phone,
                email: userData.email,
                username: userData.login,
                webLink: userData.personal.webSite,
                bio: userData.personal.bio,
                userInfo: userData
            })
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    showSelectGender = async () => {
        let options = [
            'Мужской',
            'Женский',
        ];

        if (OS === 'ios') {
            options.push('Отмена');
        }

        ActionSheet.showActionSheetWithOptions({
            options: options,
            cancelButtonIndex: 3,
            destructiveButtonIndex: [0, 1],
            tintColor: Black
        },
            async (buttonIndex) => {
                if (buttonIndex === 0) {
                    this.gender.setValue("Мужской");
                } else if (buttonIndex === 1) {
                    this.gender.setValue("Женский");
                }
            });
    }

    showSelectAccountType = async () => {
        let options = [
            'Открытый',
            'Закрытый',
        ];

        if (OS === 'ios') {
            options.push('Отмена');
        }

        ActionSheet.showActionSheetWithOptions({
            options: options,
            cancelButtonIndex: 3,
            destructiveButtonIndex: [0, 1],
            tintColor: Black
        },
            async (buttonIndex) => {
                if (buttonIndex === 0) {
                    this.accountType.setValue("Открытый");
                } else if (buttonIndex === 1) {
                    this.accountType.setValue("Закрытый");
                }
            });
    }

    showActionSheet = async () => {
        let options = [
            'Камера',
            'Библиотека',
            'Удалить фото',
        ];
        let CANCEL_INDEX = 3;
        let DELETE_INDEX = 2;
        if (OS === 'ios') {
            options.push('Отмена');
        }

        ActionSheet.showActionSheetWithOptions({
            options: options,
            cancelButtonIndex: CANCEL_INDEX,
            destructiveButtonIndex: DELETE_INDEX,
            tintColor: Black
        },
            async (buttonIndex) => {
                if (buttonIndex === 0) {
                    this.openImagePicker('camera')
                } else if (buttonIndex === 1) {
                    this.openImagePicker('library')
                } else if (buttonIndex === 2) {
                    await removeAvatar_API();
                    this.getUserData();
                }
            });
    };

    getPhotoCallback = async (response) => {
        if (response) {
            await changeAvatar_API(response.path);

            this.getUserData();
        }
    };

    async openImagePicker(type) {
        const options = {
            width: 400,
            height: 400,
            cropping: true
        };

        const checkResult = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

        if (checkResult != RESULTS.GRANTED) {
            const requestResult = request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

            if (requestResult == RESULTS.GRANTED) {
                if (type === 'camera') {
                    ImagePicker.openCamera(options).then(this.getPhotoCallback);
                } else {
                    ImagePicker.openPicker(options).then(this.getPhotoCallback);
                }
            }
        } else {
            if (type === 'camera') {
                ImagePicker.openCamera(options).then(this.getPhotoCallback);
            } else {
                ImagePicker.openPicker(options).then(this.getPhotoCallback);
            }
        }
    }

    async onSubmit() {
        let errors = {};

        const canEmpty = ["phone", "bio", "webLink", "region"];
        const genderValues = ["F", "M"];
        const accountTypeValues = ["CLOSED", "OPEN"];

        ['name', 'username', 'webLink', 'bio', 'email', 'phone', 'gender', 'accountType'].forEach(name => {
            let value = this[name].value();

            if (!value && !canEmpty.includes(name)) {
                errors[name] = 'Поле не должно быть пустым';
            } else {

            }
        });

        if (!errors.email && this.email.value() != this.state.userInfo.email) {
            const checkEmail = await checkEmail_API(this.email.value());

            if (checkEmail == null) {
                errors.email = "Ошибка при проверке E-MAIL";
            }

            if (checkEmail && checkEmail.result)
                errors.email = "Указанный E-MAIL уже занят";

        }

        if (!errors.username && this.username.value() != this.state.userInfo.login) {
            const checkLogin = await checkLogin_API(this.username.value());

            if (checkLogin == null) {
                errors.username = "Ошибка при проверке логина";
            }

            if (checkLogin && checkLogin.result)
                errors.username = "Указанный логин уже занят";
        }

        if (!errors.phone && this.phone.value().length != 0 && this.phone.value() != this.state.userInfo.personal.phone) {
            const checkLogin = await checkLogin_API(this.phone.value());

            if (checkLogin == null) {
                errors.phone = "Ошибка при проверке номера";
            }

            if (checkLogin && checkLogin.result)
                errors.phone = "Указанный номер уже занят";
        }
        console.log(errors);

        if (Object.keys(errors).length === 0 && errors.constructor === Object) {
            const result = await updateUser_API(this.name.value(), this.username.value(),
            this.email.value(), this.phone.value(), this.region.value(), this.bio.value(), this.gender.value() === "Женский" ? "F" : "M",
            this.webLink.value(), this.accountType.value() === "Закрытый" ? "CLOSED" : "OPEN");

            if(result != null)
                this.getUserData();
        }

        this.setState({ errors });
    }

    render() {
        const { theme, navigation } = this.props;
        const { userInfo, region, accountType,  gender, phone, email, errors = {}, profilePic, username, name, weblink, bio } = this.state;

        return userInfo && (
            <View style={[
                styles.container,
                { backgroundColor: theme.container.backgroundColor },
            ]}>
                <ScrollView
                    contentContainerStyle={styles.innerViewContainer}
                    scrollEnabled={true}>
                    <View style={styles.innerViewContainer}>
                        <View style={styles.avatarView}>
                            <TouchableOpacity onPress={() => this.showActionSheet()}>
                                <FastImage resizeMode='stretch' style={[styles.avatarImage, { borderColor: theme.secondaryColor }]} source={{ uri: CONFIG.RESOURCE_URL + userInfo.avatar }} />
                            </TouchableOpacity>
                            <Text style={[styles.avatarImageText, { color: theme.secondaryColor }]}>Аватар</Text>
                        </View>
                        <TextField
                            ref={this.nameRef}
                            value={name}
                            textColor={theme.primaryColor}
                            tintColor={theme.primaryColor}
                            baseColor={theme.primaryAlphaColor}
                            errorColor={theme.buttonRed}
                            fontSize={14}
                            autoCapitalize="none"
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            label="Имя"
                            error={errors.name}
                        />
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
                            label="Логин"
                            error={errors.username}
                        />
                        <TextField
                            ref={this.emailRef}
                            value={email}
                            textColor={theme.primaryColor}
                            tintColor={theme.primaryColor}
                            baseColor={theme.primaryAlphaColor}
                            errorColor={theme.buttonRed}
                            fontSize={14}
                            autoCapitalize="none"
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            label="Электронная почта"
                            error={errors.email}
                        />
                        <TextField
                            ref={this.phoneRef}
                            value={phone}
                            textColor={theme.primaryColor}
                            tintColor={theme.primaryColor}
                            baseColor={theme.primaryAlphaColor}
                            errorColor={theme.buttonRed}
                            keyboardType="phone-pad"
                            fontSize={14}
                            autoCapitalize="none"
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            label="Номер телефона"
                            error={errors.phone}
                        />
                        <TextField
                            ref={this.regionRef}
                            value={region}
                            textColor={theme.primaryColor}
                            tintColor={theme.primaryColor}
                            baseColor={theme.primaryAlphaColor}
                            errorColor={theme.buttonRed}
                            fontSize={14}
                            autoCapitalize="none"
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            label="Регион"
                            error={errors.region}
                        />
                        <TouchableNativeFeedback onPress={this.showSelectGender}>
                            <TextField
                                ref={this.genderRef}
                                value={gender === "F" ? "Женский" : "Мужской"}
                                disabled
                                textColor={theme.primaryColor}
                                tintColor={theme.primaryColor}
                                baseColor={theme.primaryAlphaColor}
                                errorColor={theme.buttonRed}
                                style={{
                                    color: theme.primaryColor
                                }}
                                fontSize={14}
                                autoCapitalize="none"
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                label="Пол"
                                error={errors.gender}
                            />
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={this.showSelectAccountType}>
                            <TextField
                                ref={this.accountTypeRef}
                                value={accountType === "CLOSED" ? "Закрытый" : "Открытый"}
                                disabled
                                textColor={theme.primaryColor}
                                tintColor={theme.primaryColor}
                                baseColor={theme.primaryAlphaColor}
                                errorColor={theme.buttonRed}
                                style={{
                                    color: theme.primaryColor
                                }}
                                fontSize={14}
                                autoCapitalize="none"
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                label="Тип аккаунта"
                                error={errors.accountType}
                            />
                        </TouchableNativeFeedback>
                        <TextField
                            ref={this.weblinkRef}
                            value={weblink}
                            textColor={theme.primaryColor}
                            tintColor={theme.primaryColor}
                            baseColor={theme.primaryAlphaColor}
                            errorColor={theme.buttonRed}
                            fontSize={14}
                            autoCapitalize="none"
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            label="Сайт"
                            error={errors.webLink}
                        />
                        <TextField
                            ref={this.bioRef}
                            value={bio}
                            textColor={theme.primaryColor}
                            tintColor={theme.primaryColor}
                            baseColor={theme.primaryAlphaColor}
                            errorColor={theme.buttonRed}
                            fontSize={14}
                            autoCapitalize="none"
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            label="Биография"
                            error={errors.bio}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(editProfileScreen);

const styles = StyleSheet.create({
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
    button: {
        margin: 15,
        height: 36,
        overflow: 'hidden',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
    },
    innerViewContainer: {
        // flex: 1,
        padding: 12,
        // paddingTop: 8,
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
        borderRadius: 45
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
});

