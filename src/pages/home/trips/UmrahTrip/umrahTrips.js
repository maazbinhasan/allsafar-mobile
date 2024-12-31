import React, { useState } from 'react';
import { View, Button, Alert, Image, StyleSheet, Text } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const UploadImageComponent = () => {
  const [imageUri, setImageUri] = useState(null);
  const [base64String, setBase64String] = useState(null);

  // Function to handle the image pick and upload
  const handleImagePick = () => {
    const options = {
      mediaType: 'photo', // pick images only
      includeBase64: true, // to get the base64 string
      quality: 1,
    };

    // Launch the image picker
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled the image picker");
      } else if (response.errorCode) {
        console.error(response.errorMessage);
        Alert.alert('Error', response.errorMessage);
      } else {
        // Set the image URI for preview
        setImageUri(response.assets[0].uri);

        // Set the base64 string
        setBase64String(response.assets[0].base64);

        // Optionally, upload the image to the backend after picking
        handleImageUpload(response.assets[0].base64);
      }
    });
  };

  // Function to upload the image to the backend
  const handleImageUpload = async (base64Image) => {
    try {
      const response = await fetch('YOUR_BACKEND_API_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64Image, // Send base64 string to the backend
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Image uploaded successfully!");
        console.log("Image uploaded:", data);
      } else {
        throw new Error(data.message || "Failed to upload image.");
      }
    } catch (error) {
      Alert.alert("Upload Error", error.message);
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Upload Image</Text>
      <Button title="Pick an Image" onPress={handleImagePick} />
      {imageUri && (
        <Image
          source={{ uri: imageUri }} // Image preview from URI
          style={styles.imagePreview}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
});

export default UploadImageComponent;
