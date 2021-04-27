import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Authenticate } from '../API/ImgurRequest';
import { Favorites } from '../Components/Fav';
import { UserGallery } from '../Components/UserGallery';
import { SearchPost } from '../Components/Search';
import { UploadPicture } from '../Components/Upload';

const Tab = createBottomTabNavigator();

const BotNav = ({ route }) => {
  return (
    <Authenticate.Provider value={route.params.auth}>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{ activeTintColor: '#FFFFFF'}}
      >
        <Tab.Screen name="Search" component={SearchPost} options={{ tabBarLabel: 'Search' }} />
        <Tab.Screen name="Gallery" component={UserGallery} options={{ tabBarLabel: 'Gallery' }} />
        <Tab.Screen name="Favorite" component={Favorites} options={{ tabBarLabel: 'Favorites' }} />
        <Tab.Screen name="Upload" component={UploadPicture} options={{ tabBarLabel: 'Upload' }} />
      </Tab.Navigator>
    </Authenticate.Provider>
  );
}

export { BotNav }