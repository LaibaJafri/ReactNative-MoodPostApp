import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>MoodPost</Text>
      <Text style={styles.tagline}>A moodboard you can write on</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#EDF4F2', // Match your app background
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  logo: {
    fontSize: 32,
    fontWeight: '700',
    color: '#31473A', // Use your --primary color
  },
  tagline: {
    fontSize: 14,
    color: '#94a3b8', // Use your --gray color
    marginTop: 4,
  },
});

export default CustomHeader;