import React, { useEffect, useContext, useState} from 'react';
import { View, Text, Platform, Button, Image, StyleSheet, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { UploadRequest, Authenticate } from '../API/ImgurRequest';

const UploadPicture = () => {
    const OAuth = useContext(Authenticate);
    const [image, setImage] = useState(null);

    useEffect(() => {
        async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Camera roll permissions needed to add a post.');
                }
                status = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    alert('Camera permissions needed to add a post.');
                }
            }
        }
    }, [])

    const pickImageFromGallery = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            UploadRequest(OAuth, result);
        }
    }

    const takePicture = async () => {

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        })

        if (!result.cancelled) {
            setImage(result.uri);
            UploadRequest(OAuth, result);
        }
    }

    return (
        <View>
            <View>
                <Button title="Pick an image from camera roll" onPress={pickImageFromGallery} />
                <Button title="Take a picture" onPress={takePicture} />
            </View>
            {image && <Image source={{uri: image}} style={{ height: 200, width: 200 }} />}
            {image && <Text>Picture uploaded</Text>}
        </View>
    );
}

export { UploadPicture };