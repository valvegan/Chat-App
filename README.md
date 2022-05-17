# Chat App
CHat app is a chatting application for mobile devices, created in React Native. The app provides users with a chat interface and options to share images and their location.

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

## Launch and dependencies
1) Make sure expo-cli is installed globally
>npm install expo-cli --global
2) new project initialization
>expo init "APP_NAME"

2) Development
>npm start
or 
>expo start

3) React navigation and dependencies
>npm install --save react-navigation
>npm install @react-navigation/native @react-navigation/stack
expo install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view

3) Svg Support
>npm i react-native-svg

4) Keyboard aware scroll
>npm i react-native-keyboard-aware-scroll-view --save