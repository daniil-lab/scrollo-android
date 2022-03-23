import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import Button from '../../../components/general/Button';
import { Tab, Tabs, TabHeading } from 'native-base';
import data from './../feed/data';
import {getStore} from '../../../../App';
import {regex} from '../../../utils/regex';
import ParsedText from 'react-native-parsed-text';
import {LINK} from '../../../themes/constantColors';
import HashTagTopTab from './HashTagTopTab';
import HashTagRecentTab from './HashTagRecentTab';

class hashTagScreen extends Component {

    static navigationOptions = ({navigation, route}) => {
        let header = {
            title: route.params.hashTag,
        };

        return header;
    };

    constructor(props) {
        super(props);
        this.state = {
            topData: [...data, ...data, ...data],
            recentData: [...data, ...data],
            selectedIndex: 0,
        }
    }

    componentDidMount(): void {
    }

    onChangeTab = (index) => {
        this.setState({selectedIndex:index.i})
    };

    renderHeader = () => {
        const {theme, navigation} = this.props;
        let profilePic = 'https://scontent-bom1-2.cdninstagram.com/v/t51.2885-19/10593515_274006656127260_1937926446_a.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com&_nc_ohc=K1x_KvjQoYIAX8Oj0h7&oh=4c6f8b782dc97fef7b30c9dd5817e4d0&oe=5EB6A2AF';

        return (
           <View>
               <View style={styles.userView}>
                   <View>
                       <FastImage style={styles.profileImage} source={{uri: profilePic}}/>
                   </View>
                   <View style={{flex: 1, alignItems:'center'}}>
                       <Text style={[styles.nameText, {color: theme.primaryColor}]}>11.3M
                           <Text style={{fontWeight: '400', color: theme.secondaryColor}}> posts</Text>
                       </Text>
                       <Button style={{fontSize: 14, color: theme.secondaryColor}}
                               containerStyle={[styles.button, {borderColor: theme.secondaryColor}]}
                               onPress={() => {}}>
                           Following
                       </Button>
                       <Text style={[styles.infoText, {color: theme.secondaryColor}]}>See a few top posts each week</Text>
                   </View>
               </View>
           </View>
       )
    };

    render() {
        const {theme, navigation} = this.props;
        const {topData, recentData, selectedIndex} = this.state;

        return (
            <View style={[
                styles.container,
                {backgroundColor: theme.container.backgroundColor},
            ]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {this.renderHeader()}
                    <Tabs tabBarUnderlineStyle={{backgroundColor: theme.buttonRed, height: 2}} onChangeTab={this.onChangeTab}>
                        <Tab heading={<TabHeading style={{backgroundColor: theme.container.backgroundColor}}>
                            <Text style={{fontSize: 16, fontWeight: '500', color: selectedIndex === 0 ? theme.buttonRed : theme.primaryColor}}>TOP</Text>
                        </TabHeading>}>
                            <HashTagTopTab theme={theme} data={topData} navigation={navigation} />
                        </Tab>
                        <Tab heading={<TabHeading style={{backgroundColor: theme.container.backgroundColor}}>
                            <Text style={{fontSize: 16, fontWeight: '500', color: selectedIndex === 1 ? theme.buttonRed : theme.primaryColor}}>RECENT</Text>
                        </TabHeading>}>
                            <HashTagRecentTab theme={theme} data={recentData} navigation={navigation} />
                        </Tab>
                    </Tabs>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(hashTagScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        borderRadius:42
    },
    nameText: {
        fontSize: 16,
        fontWeight: '800',
    },
    button: {
        marginTop: 10,
        height: 34,
        width: 150,
        overflow: 'hidden',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoText: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 12,
        fontWeight: '400',
    },
});

