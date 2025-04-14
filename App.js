import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import FeedScreen from './screens/FeedScreen';
import ArchiveScreen from './screens/ArchiveScreen';
import CustomHeader from './components/CustomHeader';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Feed') {
              iconName = 'list';
            } else if (route.name === 'Archive') {
              iconName = 'archive';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#31473A', // --primary color
          tabBarInactiveTintColor: '#94a3b8', // --gray color
          header: () => <CustomHeader />, // Use the custom header
        })}
      >
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="Archive" component={ArchiveScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}