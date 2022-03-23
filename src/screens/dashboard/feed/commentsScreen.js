import React, {Component} from 'react';
import {
    Text,
    View,
    ActivityIndicator,
    StyleSheet,
    FlatList,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {Footer} from 'native-base';
import commentEmojiData from './commentEmojiData';
import {comments} from './../feed/data';
import {regex, W_WIDTH} from '../../../utils/regex';
import FastImage from 'react-native-fast-image';
import CommentItem from '../../../components/feed/CommentItem';

class commentsScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Comments',
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            commentData: comments,
            emojiData: commentEmojiData,
            postData: props.route.params.item,
        }
    }

    componentDidMount(): void {
    }

    render() {
        const {theme, navigation} = this.props;
        const {loading, postData, commentData, emojiData} = this.state;

        if (loading) {
           return (
               <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                   <ActivityIndicator size="large" color={theme.secondaryColor} />
               </View>
           )
        }

        return (
            <View
                style={[
                    styles.container,
                    {backgroundColor: theme.container.backgroundColor},
                ]}>
                <View style={styles.topView}>
                    <FlatList
                        data={commentData}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={() => {
                            return (<CommentItem
                                container={{paddingBottom: 15, borderBottomWidth: 1, borderColor: theme.secondarySColor}}
                                theme={theme}
                                item={postData}
                                navigation={navigation}
                                isLikeView={false}
                                isReplayView={false}
                                isLikeRight={false}
                                isReplyArray={false}
                            />)
                        }}
                        renderItem={({ item }) =>
                            <CommentItem
                                theme={theme}
                                item={item}
                                navigation={navigation}
                                isLikeView={true}
                                isReplayView={true}
                                isLikeRight={true}
                                isReplyArray={!regex.isEmpty(item.replays)}
                            />
                        }
                        keyExtractor={item => item.commentId.toString()}
                        extraData={commentData}
                    />
                </View>
                <Footer style={[styles.footerView, {backgroundColor: theme.container.backgroundColor}]}>
                    <KeyboardAvoidingView>
                        <View style={{flex: 1}}>
                            <FlatList
                                data={emojiData}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) => <TouchableOpacity>
                                    <View style={{width: (W_WIDTH-10)/emojiData.length}}>
                                        <Text style={styles.emoji}>{item.comment}</Text>
                                    </View>
                                </TouchableOpacity>}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={emojiData}
                                horizontal={true}
                                scrollEnabled={false}
                            />
                            <View style={styles.inputZone}>
                                <TouchableOpacity style={{justifyContent:'center'}}>
                                    <FastImage
                                        style={[styles.imageProfile, {backgroundColor: theme.secondarySColor, borderColor: theme.secondarySColor}]}
                                        source={{uri: 'https://scontent-bom1-2.cdninstagram.com/v/t51.2885-19/10593515_274006656127260_1937926446_a.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com&_nc_ohc=K1x_KvjQoYIAX8Oj0h7&oh=4c6f8b782dc97fef7b30c9dd5817e4d0&oe=5EB6A2AF'}}/>
                                </TouchableOpacity>
                                <TextInput underlineColorAndroid='transparent' style={[styles.inputStyle, {borderColor: theme.secondaryColor}]}
                                           placeholder='Add a comment...' placeholderTextColor={theme.secondaryColor}/>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </Footer>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(commentsScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topView: {
        flex: 1,
    },
    footerView: {
        height: 110,
        padding: 10,
        paddingLeft: 0,
        paddingRight: 0
    },
    emoji: {
        marginLeft: 10,
        fontSize: 19
    },
    inputZone:{
        flexDirection:'row',
        flex: 10,
        justifyContent: 'center',
        alignItems:'center',
        paddingLeft: 5,
        paddingRight: 10
    },
    imageProfile: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
    },
    inputStyle:{
        fontSize:13,
        height:40,
        fontWeight:"400",
        marginLeft:10,
        padding:3,
        paddingLeft:10,
        borderWidth:1,
        borderRadius:20,
        flex:6
    },
});
