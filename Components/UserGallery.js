import React, { useContext, useEffect, useState, useCallback } from 'react';
import { View, Text, Image, FlatList, RefreshControl, ScrollView, Button, TextInput } from 'react-native';
import { Authenticate, UserGalleryRequest, Sleeper } from '../API/ImgurRequest';


const UserGallery = () => {
  const OAuth = useContext(Authenticate);
  const [pictures, setPictures] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  let result = useState([]);

    const onRefresh = useCallback(() => {
        setRefresh(true);
        Sleeper(1000).then(() => setRefresh(false));
        UserGalleryRequest(OAuth).then((data) => {
            if (OAuth.account_username && OAuth.access_token && data != null)
                setPictures(data);
            else
                setPictures(null);
        });
    }, []);

    useEffect(() => {
        UserGalleryRequest(OAuth).then((data) => {
            if (OAuth.account_username && OAuth.access_token && data != null)
                setPictures(data);
            else
                setPictures(null);
        })
    }, []);

    const handleChangeTitle = (event) => {
        event.preventDefault();
        event.preventDefault();
        setTitle(event.target.value);
    };

    const handleChangeDescription = (event) => {
        event.preventDefault();
        setDescription(event.target.value);
    };
    const updateData = async (item, title, description) => {
        // https://api.imgur.com/3/image/
        if (title != null && description != null ) {
            let FormData = new FormData();
            FormData.append("title", title);
            FormData.append("description", description);

            const result = await (
                fetch(`https://api.imgur.com/3/image/${item}`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${OAuth.access_token}`
                    },
                    body: FormData
                })
                    .then((response) => response.json())
                    .then((json) => {
                        if (json.success == true) {
                            console.log("added");
                        } else
                            console.log("not added");
                            return (null);
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            );
        }
    }

    if (pictures) {
        return (
            <View>
                <FlatList
                    refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
                    data={pictures}
                    renderItem={({ item }) => 
                    <>
                    <View>
                        <Image source={{uri: item.link}} style={{ height: 200, width: 200 }} />
                        <Text>{item.title}</Text>
                    </View>
                    <TextInput placeholder='new title' value={title} onChange={handleChangeTitle} />
                    <TextInput placeholder='new description' value={description} onChange={handleChangeDescription} />
                    <Button title='update' onPress={() => {updateData(item.id , title, description)}} />
                    </>}
                />
            </View>
        );
    }
    return (
        <View>
            <ScrollView refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}>
                <Text>Nothing to load</Text>
            </ScrollView>
        </View>
    );
}

export { UserGallery }