# Chat App
Chat app is a chatting application for mobile devices, created in React Native. The app provides users with a chat interface and options to share images and their location.

## tools: 
- Expo, 
- Google Firestore Database, 
- React Native

## User Stories
- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my
friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange
the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any
time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen
reader so that I can engage with a chat interface.

### Key Features
- A Start page where users can enter their name and choose a background color for the chat screen
- A page displaying the conversation, as well as an input field and submit button.
- Permission to send images and location data 
- Offline storage
- Anoynymous user authentication (via Google Firebase authentication)

## Prerequisities
- Node and latest version of npm
- Android studio, Xcode, or a mobile phone
- Expo 

## Setting up the development environment (Expo, Android Studio, etc.).
1) Make sure expo-cli is installed globally
>npm install expo-cli --global
2) new project initialization
>expo init "APP_NAME"

2) Lanch
>npm start
or 
>expo start

## Database configuration
Chat-app makes use of Cloud Firestore, a real-time database which synchronizes data across multiple devices and stores it in Firebase's Cloud. 
>npm install --save firebase
(current version: "^9.8.1"

## Necessary libraries to install.
1) React navigation and dependencies
>npm install --save react-navigation
>npm install @react-navigation/native @react-navigation/stack
>expo install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view

2) Svg Support
>npm i react-native-svg

3) Keyboard aware scroll
>npm i react-native-keyboard-aware-scroll-view --save

4) Gifted Chat library
>npm install react-native-gifted-chat --save

5) React-Native async storage
>expo install @react-native-async-storage/async-storage

6) NetInfo package
>npm install --save @react-native-community/netinfo

7) Expo's ImagePicker API 
>expo install expo-image-picker

8) Expo's Location API and react-native-maps
>expo install expo-location
>expo install react-native-maps

## Personal reflections on the project
Working on this project I had to spend quite a lot of time troubleshooting and learning how to use the latest version of firestore for React-Native (as usual, it's one thing to read the Documentation of a Library or a tool or a framwork, but it's oftentimes a lot more work to actually understand how to implement the features and the commands correctly!). Tasks included creating two separate screens (a "start" screen and a "chat" screen); allowing users to "register" anonymously and chose whether to "logout" and "register" again, or remain on the current session; allowing users to pick a background color for their chat screen; allowing users to view their messages while offline and being able to send pictures/location data along with text messages.
Something I would do differently if i were to re-do this project is the authentication process, as I'd much rather be able to save some kind of customised user data to keep track of my users (since currently they're anonymous, only an ID is saved). I would also like to integrate a voice note feature. Nonetheless, I've definitely learned a lot through this mini-project as is! 
