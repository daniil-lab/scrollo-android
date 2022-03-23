import React, {Component} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';

class SuggestedViewItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {theme,item, navigation} = this.props;

        return (
            <TouchableWithoutFeedback onPress={()=>navigation.push('OtherProfile', {user: item})}>
                <View style={styles.container}>
                    <FastImage style={[styles.profileImage, {borderColor:  theme.secondaryColor}]} source={{uri: item.profilePic}}/>
                    <View style={styles.nameView}>
                        <Text style={[styles.usernameText, {color: theme.primaryColor}]}>{item.username}</Text>
                        <Text style={[styles.usernameText, {color: theme.secondaryColor}]}>{item.name}</Text>
                        <Text style={[styles.usernameText, {color: theme.secondaryColor}]}>{item.message}</Text>
                    </View>
                    <View style={styles.optionView}>
                        <TouchableWithoutFeedback>
                            <View style={[styles.followView, {borderColor: theme.followColor}]}>
                                <Text style={[styles.followText, {color: theme.followColor}]}>{'Follow'}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <View style={[styles.followView, {width: 40, borderWidth: 0}]}>
                                <Feather name="x" size={20} color={theme.secondaryColor} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default SuggestedViewItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 15,
        paddingLeft: 15,
        paddingTop: 5,
        paddingBottom: 5,
    },
    profileImage: {
        width: 56,
        height: 56,
        borderRadius: 28,
        borderWidth: 1
    },
    nameView: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center',
    },
    usernameText: {
        fontSize: 14,
        fontWeight: '500',
    },
    optionView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    followView: {
        paddingTop: 6,
        paddingBottom: 6,
        width: 80,
        alignItems: 'center',
        borderRadius: 3,
        borderWidth: 1,
    },
    followText: {
        fontSize: 13,
        fontWeight: '600',
    }
});
