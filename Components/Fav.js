import React, { useContext, useState, useCallback, useEffect} from 'react';
import { View, Text, Image, FlatList, RefreshControl, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Authenticate, FavRequest, DisplayPicture, Sleeper, FavPostManagement } from '../API/ImgurRequest';

const Favorites = () => {

    const OAuth = useContext(Authenticate);
    const [favorites, setFavorites] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        Sleeper(1000).then(() => setRefreshing(false));
        FavRequest(OAuth).then((data) => {
            if (OAuth.account_username && OAuth.access_token && data != null)
                setFavorites(data);
            else
                setFavorites(null);
        });
    }, []);

    useEffect(() => {
        FavRequest(OAuth).then((data) => {
            if (OAuth.account_username && OAuth.access_token && data != null)
                setFavorites(data);
            else
                setFavorites(null);
        })
    }, [])

    if (favorites) {
        return (
            <View>
                <FlatList
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    data={favorites}
                    renderItem={({ item }) => 
                    <View>
                        <Image source={{uri: `${DisplayPicture(item.cover)}`}} style={{ height: 200, width: 200 }} />
                        <Text>{item.title}</Text>
                        <Button title='Unfav' onPress={() => {FavPostManagement(OAuth, item.id)}} />
                    </View>}
                />
            </View>
        );
    }
    return (
        <View>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <Text>You don't have any favorites</Text>
            </ScrollView>
        </View>
    );
}

export { Favorites };