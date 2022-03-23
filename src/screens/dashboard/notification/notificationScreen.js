import React, {Component} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from 'react-native';
import notificationData from './notificationData';
import {connect} from 'react-redux';
import suggestedData from './suggestedData';
import SuggestedViewItem from '../../../components/general/SuggestedViewItem';
import NotificationGeneralItem from '../../../components/notification/NotificationGeneralItem';
import FollowAndFollowingItem from '../../../components/general/FollowAndFollowingItem';

class notificationScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Activity',
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: notificationData,
            suggestData: suggestedData
        }
    }

    componentDidMount(): void {
    }

    renderFooter = () => {
        const {loading, suggestData} = this.state;

        if (suggestData.length === 0 )
            return (<View />);

       const {theme, navigation} = this.props;

       return (<View>
           <FlatList
               data={suggestData}
               ListHeaderComponent={() => {
                  return (
                      <View style={{padding: 15, paddingLeft: 15}}>
                          <Text style={{fontSize: 15, fontWeight: '600', color: theme.primaryColor}}>Suggestion for you</Text>
                      </View>
                  )
               }}
               renderItem={({ item }) => <FollowAndFollowingItem type={'suggest'} theme={theme} item={item} navigation={navigation}/>}
               keyExtractor={item => item.userId.toString()}
               extraData={suggestData}
           />
       </View>)
    };

    render() {
        const {theme, navigation} = this.props;
        const {loading, data} = this.state;

        if (loading) {
            return (
                <View style={{flex: 1, alignItems: 'center', paddingTop: 100, backgroundColor: theme.container.backgroundColor}}>
                    <ActivityIndicator size="small" color={theme.secondaryColor} />
                </View>
            )
        }

        return (
            <View style={[
                styles.container,
                {backgroundColor: theme.container.backgroundColor},
            ]}>
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={this.renderFooter}
                    renderItem={({ item }) => <NotificationGeneralItem theme={theme} item={item} navigation={navigation}/>}
                    keyExtractor={item => item.notificationId.toString()}
                    extraData={data}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(notificationScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
