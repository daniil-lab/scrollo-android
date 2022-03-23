import React, {Component} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';

class webViewScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Edit Profile',
        }
    };

    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
    }

    render() {
        const {theme, navigation} = this.props;

        return (
            <View style={[
                styles.container,
                {backgroundColor: theme.container.backgroundColor},
            ]}>

            </View>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(webViewScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

