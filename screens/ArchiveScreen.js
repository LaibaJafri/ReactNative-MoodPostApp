import React from 'react';
import { View, StyleSheet } from 'react-native';
import PostList from '../components/PostList';

const ArchiveScreen = () => {
  return (
    <View style={styles.container}>
      <PostList showArchived={true} />
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

export default ArchiveScreen;