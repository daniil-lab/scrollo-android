import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import Story  from './Story';
import {connect} from 'react-redux';
import { CubeNavigationHorizontal } from 'react-native-3dcube-navigation'

class Stories extends React.PureComponent {

    static navigationOptions = ({navigation}) => {
        return {
            title: '',
            headerShown: false,
            animationEnabled: false
        }
    };

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render(): React.Node {
        const { theme, navigation, route } = this.props;
        const stories = route.params.stories;
        return (
            <View style={styles.container}>
                <CubeNavigationHorizontal ref={view => { this.cube = view; }}>
                    {
                        stories.map((story, i) => (
                            <Story {...{ story }} theme={theme} navigation={navigation} />
                        ))
                    }
                </CubeNavigationHorizontal>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.auth.theme,
});

export default connect(mapStateToProps)(Stories);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
});
