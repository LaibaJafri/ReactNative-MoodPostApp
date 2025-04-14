import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Composer = () => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [charRemaining, setCharRemaining] = useState(280);

  const updateCharCount = (text) => {
    setContent(text);
    setCharRemaining(280 - text.length);
  };

  const createPost = async () => {
    if (!content.trim() || content.length > 280) return;

    const newPost = {
      id: Date.now(),
      author: author.trim() || 'Anonymous',
      content: content.trim(),
      hashtags: extractHashtags(content),
      moods: { happy: 0, sad: 0, fire: 0 },
      archived: false,
      timestamp: new Date().toISOString(),
    };

    try {
      const existingPosts = await AsyncStorage.getItem('moodblog-posts');
      const posts = existingPosts ? JSON.parse(existingPosts) : [];
      posts.unshift(newPost);
      await AsyncStorage.setItem('moodblog-posts', JSON.stringify(posts));
      setAuthor('');
      setContent('');
      setCharRemaining(280);
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const extractHashtags = (text) => {
    const hashtags = text.match(/#\w+/g) || [];
    return [...new Set(hashtags)];
  };

  return (
    <View style={styles.composer}>
      <View style={styles.authorInput}>
        <Ionicons name="person" size={20} color="#94a3b8" />
        <TextInput
          style={styles.input}
          placeholder="Your name (optional)"
          value={author}
          onChangeText={setAuthor}
        />
      </View>
      <TextInput
        style={styles.postInput}
        placeholder="What's on your mind? #express"
        multiline
        maxLength={280}
        value={content}
        onChangeText={updateCharCount}
      />
      <View style={styles.footer}>
        <Text
          style={[
            styles.charCounter,
            charRemaining < 20 && styles.warning,
            charRemaining < 0 && styles.error,
          ]}
        >
          {charRemaining} characters left
        </Text>
        <TouchableOpacity style={styles.postBtn} onPress={createPost}>
          <Ionicons name="send" size={16} color="white" />
          <Text style={styles.postBtnText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  composer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  authorInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingVertical: 8,
    fontSize: 16,
    marginLeft: 8,
  },
  postInput: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  charCounter: {
    fontSize: 12,
    color: '#94a3b8',
  },
  warning: {
    color: '#f59e0b',
  },
  error: {
    color: '#ef4444',
  },
  postBtn: {
    backgroundColor: '#31473A',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  postBtnText: {
    color: 'white',
    fontWeight: '500',
    marginLeft: 4,
  },
});

export default Composer;