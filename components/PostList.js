import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PostList = ({ showArchived }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const storedPosts = await AsyncStorage.getItem('moodblog-posts');
        const parsedPosts = storedPosts ? JSON.parse(storedPosts) : [];
        setPosts(parsedPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      }
    };

    loadPosts();
    // Listen for changes (e.g., when a new post is added)
    const interval = setInterval(loadPosts, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMood = async (postId, mood) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, moods: { ...post.moods, [mood]: post.moods[mood] + 1 } };
      }
      return post;
    });
    setPosts(updatedPosts);
    await AsyncStorage.setItem('moodblog-posts', JSON.stringify(updatedPosts));
  };

  const handleArchive = async (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, archived: !post.archived };
      }
      return post;
    });
    setPosts(updatedPosts);
    await AsyncStorage.setItem('moodblog-posts', JSON.stringify(updatedPosts));
  };

  const handleDelete = async (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    await AsyncStorage.setItem('moodblog-posts', JSON.stringify(updatedPosts));
  };

  const filteredPosts = posts.filter(post => post.archived === showArchived);

  const renderPost = ({ item }) => {
    const contentWithHashtags = item.content.split(/(#\w+)/g).map((part, index) => {
      if (part.match(/#\w+/)) {
        return <Text key={index} style={styles.hashtag}>{part}</Text>;
      }
      return <Text key={index}>{part}</Text>;
    });

    return (
      <View style={styles.post}>
        <Text style={styles.postContent}>{contentWithHashtags}</Text>
        <View style={styles.postMeta}>
          <Text style={styles.postAuthor}>{item.author}</Text>
          <Text style={styles.postDate}>{new Date(item.timestamp).toLocaleString()}</Text>
        </View>
        <View style={styles.postActions}>
          <View style={styles.moodActions}>
            <TouchableOpacity
              style={styles.moodBtn}
              onPress={() => handleMood(item.id, 'happy')}
            >
              <Text style={styles.moodEmoji}>😊</Text>
              <Text style={styles.moodCount}>{item.moods.happy}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.moodBtn}
              onPress={() => handleMood(item.id, 'sad')}
            >
              <Text style={styles.moodEmoji}>😢</Text>
              <Text style={styles.moodCount}>{item.moods.sad}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.moodBtn}
              onPress={() => handleMood(item.id, 'fire')}
            >
              <Text style={styles.moodEmoji}>🔥</Text>
              <Text style={styles.moodCount}>{item.moods.fire}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.postControls}>
            <TouchableOpacity onPress={() => handleArchive(item.id)}>
              <Ionicons
                name={item.archived ? 'archive-outline' : 'archive'}
                size={20}
                color="#94a3b8"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Ionicons name="trash" size={20} color="#94a3b8" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={filteredPosts}
      renderItem={renderPost}
      keyExtractor={item => item.id.toString()}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Ionicons
            name={showArchived ? 'archive' : 'chatbubble-ellipses-outline'}
            size={32}
            color="#e2e8f0"
          />
          <Text style={styles.emptyText}>
            {showArchived ? 'No archived posts yet' : 'No posts yet. Be the first to share!'}
          </Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  post: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  postContent: {
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 24,
  },
  hashtag: {
    color: '#31473A',
  },
  postMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  postAuthor: {
    fontWeight: '500',
    color: '#1e293b',
  },
  postDate: {
    fontSize: 12,
    color: '#94a3b8',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moodActions: {
    flexDirection: 'row',
    gap: 8,
  },
  moodBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  moodEmoji: {
    fontSize: 20,
  },
  moodCount: {
    fontSize: 12,
    marginLeft: 4,
    color: '#1e293b',
  },
  postControls: {
    flexDirection: 'row',
    gap: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    color: '#94a3b8',
    marginTop: 16,
  },
});

export default PostList;