# USAGE

First make sure you have expo installed.
If not `npm install --global expo-cli`.
In the root of the project use `npm install`or `yarn install`to install node_modules

### DEBUG MODE

To launch the project in debug just use `expo start`( or `npm start`)
Expo CLI starts Metro Bundler, which is an HTTP server that compiles the JavaScript code of your app and then just press `Run on Android device/emulator`and make sure to have the toggle 'PRODUCTION MODE' OFF, an emulator will appear and you will be able to use the app

### RELEASE MODE

For the release mode just use `expo build:android` and choose apk or app-bundle option 

### Imgur Call

All the request are made in `API/ImgurRequest.js`:
  - Fav/Unfav image
  - Display Favorites Images
  - Display user gallery
  - UP/DOWN vote on image
  - Search request (hot/text)
  - Upload request

Routes system used is stored in `Routes/Routes.js` pathing and navigationBar.
And all the pages are in the `Components` folder.

Enjoy !