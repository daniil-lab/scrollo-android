import React from 'react';
import {StyleSheet, View, TextInput, TouchableWithoutFeedback, FlatList} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {OS, regex, W_WIDTH} from '../../../utils/regex';
import Feather from 'react-native-vector-icons/Feather';
import {getStore} from '../../../../App';
import ActionSheet from "react-native-action-sheet";
import {Black} from '../../../themes/constantColors';
import ImagePicker from 'react-native-image-crop-picker';
import {showToast} from '../../../utils/toast';

class addPost extends React.Component
{
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Create post',
            animationEnabled: false
        }
    };

    constructor(props: any) {
        super(props);
        this.state = {
            description: '',
            photos: [{
                id: 0,
               path: '',
               local: true
            }]
        };
    }

    onChangeText = (description) => {
        this.setState({description})
    };

    showActionSheet = () => {
        let maxSelectedPhotos = 11 - this.state.photos.length;
        if (maxSelectedPhotos <= 0) {
            alert(`You can't select more than 10 photos and videos.`);
        } else {
            let options = [
                'Camera',
                'Library',
            ];
            let CANCEL_INDEX = 2;
            if(OS === 'ios') {
                options.push('Cancel');
            }

            ActionSheet.showActionSheetWithOptions({
                    options: options,
                    cancelButtonIndex: CANCEL_INDEX,
                    tintColor: Black
                },
                (buttonIndex) => {
                    if (buttonIndex === 0) {
                        this.openImagePicker('camera')
                    } else if(buttonIndex === 1) {
                        this.openImagePicker('library')
                    }
                });
        }
    };

    getPhotoCallback = (response) => {
        let newImages = response;
        newImages.map((item) => {
            return {
                ...item,
                id: this.state.photos.length
            }
        });
        newImages.push(...this.state.photos);
        this.setState({photos: newImages})
    };

    openImagePicker(type) {
        let maxSelectedPhotos = 11 - this.state.photos.length;
        const options = {
            width: W_WIDTH,
            height: W_WIDTH,
            multiple: true,
            maxFiles: maxSelectedPhotos
        };
        if (type === 'camera') {
            ImagePicker.openCamera(options, this.getPhotoCallback);
        } else {
            ImagePicker.openPicker(options).then(this.getPhotoCallback);
        }
    }

    removeItem = (item) => {
        console.log(item);
        // this.setState({
        //     ...this.state,
        //     photos: this.state.photos.splice(this.state.photos.findIndex((photo) => {
        //         if(photo.path.length != 0 && photo.id === item.id)
        //             return true;

        //         return false;
        //     }), 1)
        // })
    }

    renderItem = ({item, index}) => {
        const {theme, navigation} = this.props;

        if (regex.isEmpty(item.path)) {
            return (
                <TouchableWithoutFeedback onPress={() => this.showActionSheet()}>
                    <View style={{width: cellWidth, height: cellWidth, padding: 8}}>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.secondarySColor}}>
                            <Feather name="plus" size={18} color={theme.secondaryColor} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )
        }

        return (
            <TouchableWithoutFeedback onPress={() => this.removeItem(item)}>
                <View style={{width: cellWidth, height: cellWidth, padding: 8}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.secondarySColor}}>
                        <FastImage style={{width: cellWidth-16, height: cellWidth-16}} source={{uri: item.path}}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    };

    render() {
        const {theme, navigation} = this.props;
        const {description, photos} = this.state;

        return (
            <View
                style={[
                    styles.container,
                    {backgroundColor: theme.container.backgroundColor},
                ]}>
                <View style={styles.innerContainer}>
                    <TextInput
                        style={[styles.input, {borderColor: theme.secondaryColor, color: theme.primaryColor}]}
                        placeholder={'Write a caption...'}
                        placeholderTextColor={theme.secondaryColor}
                        multiline
                        onChangeText={description => this.onChangeText(description)}
                        value={description}
                        editable
                    />
                    <FlatList data={photos}
                              extraData={photos}
                              numColumns={4}
                              scrollEnabled={false}
                              keyExtractor={(item, index) => item.id }
                              renderItem={this.renderItem.bind(this)}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(addPost);

const cellWidth = (W_WIDTH - 30)/4;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    innerContainer: {
        flex: 1,
        padding: 15
    },
    input: {
       borderBottomWidth: 1,
       paddingBottom: 10,
       maxHeight: 150,
       marginBottom: 10
    }
});
