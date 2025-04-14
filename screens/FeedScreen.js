import React from 'react';
import { View, StyleSheet } from 'react-native';
import Composer from '../components/Composer';
import PostList from '../components/PostList';

const FeedScreen = () => {
  return (
    <View style={styles.container}>
      <Composer />
      <PostList showArchived={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF4F2', // --background color
    padding: 16,
  },
});

export default FeedScreen;