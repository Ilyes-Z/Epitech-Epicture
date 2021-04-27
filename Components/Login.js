import React from 'react';
import { WebView } from 'react-native-webview';
import { clientId, AuthToImgur } from '../API/ImgurRequest';

let isAuth = false;

const ParseUrl = (url) => {
    let regex = /[?&#]([^=#]+)=([^&#]*)/g,
        params = {},
        match
    while ((match = regex.exec(url))) {
        params[match[1]] = match[2]
    }
    return (params);
}

const onNavigationStateChange = (navigationState, navigation) => {

    const url = navigationState.url
    const OAuth = ParseUrl(url);

    if (AuthToImgur(OAuth) == true && isAuth == false) {
        isAuth = true;
        navigation.reset({
            index: 1,
            routes: [{ name: 'Home', params: {auth: OAuth}}],
        });
    }
};

const Login = ({ navigation }) => {
  return (
      <WebView
        incognito={true}
        scalesPageToFit
        source={{ uri: `https://api.imgur.com/oauth2/authorize?client_id=${clientId}&response_type=token&state=state` }}
        onNavigationStateChange={navigationState => {
            onNavigationStateChange(navigationState, navigation)
        }}
      />
  )
};

export { Login }