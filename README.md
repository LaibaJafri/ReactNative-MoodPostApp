MoodPost (React Native Implementation)
A React Native mobile app that functions as a moodboard-style blogging platform. Users can share posts, react with moods, archive posts, and delete them. The app is built with React Native components and hooks for state management.
Features

Create Posts: Users can write posts (up to 280 characters) with an optional author name. Posts can include hashtags (e.g., #express).
Mood Reactions: Users can react to posts with three moods: Happy (😊), Sad (😢), and Fire (🔥).
Archive Posts: Posts can be archived and viewed in a separate "Archive" tab.
Delete Posts: Users can delete posts.
Tabs: Switch between "Feed" (active posts) and "Archive" (archived posts) views.
Persistent Storage: Posts are saved to AsyncStorage and persist across app restarts.
Responsive Design: The app is styled for mobile devices (iOS and Android).

Tech Stack

React Native: Built with React Native for cross-platform mobile development.
React Hooks: Uses useState and useEffect for state management.
AsyncStorage: For persisting posts across app sessions.
React Native Vector Icons: For Font Awesome icons (e.g., user, archive, trash).

Prerequisites

Node.js (v14 or higher) and npm (v6 or higher) installed on your machine.
Expo CLI: Install globally with npm install -g expo-cli.
Expo Go App: Install on your iOS or Android device for testing, or set up an emulator/simulator (e.g., Android Studio for Android, Xcode for iOS).
A mobile device or emulator/simulator to run the app.

Start the Expo Development Server:Start the app with:
expo start

This will open the Expo developer tools in your browser.

Run the App:

On a Physical Device: Use the Expo Go app on your iOS or Android device to scan the QR code displayed in the browser or terminal.
On an Emulator/Simulator:
For Android: Press a in the terminal to open in an Android emulator (requires Android Studio).
For iOS: Press i in the terminal to open in an iOS simulator (requires Xcode on macOS).




Test the App:

Create a post by entering some text (e.g., "Hello #test") and an optional author name, then tap "Post".
React to posts with mood buttons (😊, 😢, 🔥).
Archive or delete posts using the respective buttons.
Switch between "Feed" and "Archive" tabs to view active or archived posts.



Usage

Creating a Post:

Enter your name (optional) in the "Your name" field.
Write your post in the textarea (max 280 characters).
Tap the "Post" button to share your post.
The post will appear in the "Feed" tab.


Reacting to Posts:

Tap the mood buttons (😊, 😢, 🔥) to add a reaction. The reaction count will increment.


Archiving Posts:

Tap the archive icon to move a post to the "Archive" tab.
In the "Archive" tab, tap the unarchive icon to move it back to "Feed".


Deleting Posts:

Tap the trash icon to delete a post.


Switching Tabs:

Use the "Feed" and "Archive" tabs to switch between active and archived posts.



Styling
The app uses React Native styles defined in styles.js with the following features:

Colors: Defined using a colors object for consistency (e.g., primary: #31473A).
Shadows: Uses elevation (Android) and shadow* properties (iOS) for card effects.
Responsive Design: Styled for mobile devices with flexible layouts.

Known Issues

Mood Animation: The mood reaction animation is simplified (no floating effect) due to limitations in React Native’s styling. For better animations, consider using react-native-reanimated.
Delete Confirmation: React Native doesn’t have a built-in confirm dialog like the web. You can use Alert from React Native to add a confirmation prompt for deleting posts.


