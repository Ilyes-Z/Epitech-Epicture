import React, { useContext, useCallback, useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, Image, RefreshControl, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Authenticate, SearchRequest, DisplayPicture, Sleeper, FavPostManagement, UpVote, DownVote } from '../API/ImgurRequest';

let newText = "";


const SearchPost = () => {
    const OAuth = useContext(Authenticate);
    const [search, setSearch] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const onRefresh = useCallback(() => {
        setRefresh(true);
        Sleeper(1000).then(() => setRefresh(false));
        SearchRequest("", false).then((data) => {
            setSearch(data);
        });
    });

    useEffect(() => {
        SearchRequest("", false).then((data) => {
            setSearch(data);
        })
    }, [])

    if (search) {
        return (
            <View>
                <TextInput
                    placeholder="Research"
                    onChangeText={(text) => newText = text}
                />
                <View>
                    <Button title="Search" onPress={() => {
                        if (newText.length > 0) {
                            SearchRequest(newText, true).then((data) => {
                                setSearch(data);
                            });
                        }}} />
                </View>
                <View>
                    <Button title="Trends" onPress={() => {
                        SearchRequest("", false).then((data) => {
                            setSearch(data);
                        });
                    }}/>
                </View>
                <FlatList
                    refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
                    data={search}
                    renderItem={({ item }) => 
                    <View>
                        <Image source={{uri: `${DisplayPicture(item.cover)}`}} style={{ resizeMode: 'center', height: 200, width: 200 }} />
                        <Text>{item.title}</Text>
                        <View style={styles.fixToText}>
                            <Button title='up vote' onPress={() => {UpVote(OAuth, item.id)}} />
                            <Button title='down vote' onPress={() => {DownVote(OAuth, item.id)}} />
                            <Button title='fav' onPress={() => {FavPostManagement(OAuth, item.id)} }/>
                        </View>
                    </View>}
                />
            </View>
        );
    }
    return (
        <View>
            <TextInput
                placeholder="Research"
                onChangeText={(text) => newText = text}
            />
            <View>
                <Button title="Search" onPress={() => {
                    if (newText.length > 0) {
                        SearchRequest(newText, true).then((data) => {
                            setSearch(data);
                        });
                    }}} />
            </View>
            <View>
                <Button title="Trends" onPress={() => {
                    SearchRequest("", false).then((data) => {
                        setSearch(data);
                    });
                }}/>
            </View>
            <View>
                <ScrollView refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}>
                    <Text >Nothing to display</Text>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'center',
    }
  });

export { SearchPost}