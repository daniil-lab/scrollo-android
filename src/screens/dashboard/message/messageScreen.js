import React from 'react'
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat';
import {connect} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {Red} from '../../../themes/constantColors';

class messageScreen extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Message',
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
    }

    componentDidMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
            ],
        })
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    render() {
        const {theme, navigation} = this.props;

        return (
            <View style={[
                styles.container,
                {backgroundColor: theme.container.backgroundColor},
            ]}>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                    renderBubble={(props) => {
                        return (
                            <Bubble
                                {...props}
                                wrapperStyle={{
                                    right: {
                                        backgroundColor: Red
                                    }
                                }}
                            />
                        )
                    }}
                    renderInputToolbar={(props) => {
                        return (
                            <InputToolbar
                                {...props}
                                containerStyle={{backgroundColor: theme.container.backgroundColor}}
                            />
                        )
                    }}
                    textInputStyle={[styles.textInput, {color: theme.primaryColor}]}
                />
            </View>
        )
    }
}

let mapStateToProps;
mapStateToProps = state => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(messageScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
       fontSize: 14,
       fontWeight: '500'
    }
});
