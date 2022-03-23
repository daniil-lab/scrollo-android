import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableWithoutFeedback, Switch} from 'react-native';
import {connect} from 'react-redux';
import {getStore} from '../../../../../App';
import {regex} from '../../../../utils/regex';
import Feather from 'react-native-vector-icons/Feather';
import {THEMES} from '../../../../themes/themes';
import {THEME} from '../../../../actions/types';
import {LightBlack, Red, White} from '../../../../themes/constantColors';

class settingScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Settings',
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [{
                id: 1,
                name: 'Edit Profile',
            },{
                id: 2,
                name: 'Change Password',
            },{
                id: 3,
                name: 'Theme Dark',
            },{
                id: 4,
                name: 'Get Help',
            },{
                id: 5,
                name: 'Report Problems',
            },{
                id: 6,
                name: 'Terms of Use',
            },{
                id: 7,
                name: 'Log out',
            }],
        }
    }

    componentDidMount(): void {
    }

    onItemPress = (item) => {
        const {navigation} = this.props;
        if (item.id === 1) {
           navigation.navigate('EditProfile')
        } else if (item.id === 2) {
            navigation.navigate('ChangePassword')
        } else if (item.id === 3) {
            this.toggleSwitch()
        } else if (item.id === 4) {
            navigation.navigate('WebLink')
        } else if (item.id === 5) {
            navigation.navigate('Report')
        } else if (item.id === 6) {
            navigation.navigate('WebLink')
        } else if (item.id === 7) {
            regex.logout()
        }
    };

    toggleSwitch = () => {
        const {theme, navigation} = this.props;
        let newTheme;
        if (theme.key === 'DARK') {
            newTheme = THEMES[1];
            regex.changeStatusStyle('dark-content');
        } else {
            newTheme = THEMES[0];
            regex.changeStatusStyle('light-content');
        }
        getStore.dispatch({type: THEME, payload: newTheme});
    };

    renderItem = ({item}) => {
        const {theme} = this.props;
        return (
            <TouchableWithoutFeedback onPress={()=>this.onItemPress(item)}>
                <View style={{
                    marginLeft: 15,
                    marginRight: 15,
                    paddingTop: 15,
                    paddingBottom: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderColor: theme.secondaryColor,
                }}>
                    <Text style={{flex: 1, fontSize: 13, fontWeight: '600', color: theme.primaryColor}}>{item.name}</Text>
                    {
                        item.id === 3
                            ? <Switch
                                trackColor={{ false: LightBlack, true: Red }}
                                thumbColor={White}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={this.toggleSwitch}
                                value={theme.key === 'DARK'}
                            />
                            : <Feather size={25} name={'chevron-right'} color={getStore.getState().auth.theme.secondaryColor}/>
                    }
                </View>
            </TouchableWithoutFeedback>
        )
    };

    render() {
        const {theme} = this.props;
        const {data} = this.state;

        return (
            <View style={[
                styles.container,
                {backgroundColor: theme.container.backgroundColor},
            ]}>
                <FlatList data={data}
                          extraData={data}
                          keyExtractor={(item, index) => item.id.toString() }
                          renderItem={this.renderItem}/>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(settingScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

