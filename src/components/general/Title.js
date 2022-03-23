import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';

class Title extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {theme, title} = this.props;

    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '800',
            color: theme.primaryColor,
          }}>
          {title}
        </Text>
      </View>
    );
  }
}

export default Title;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
});
