import React, { useState } from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

interface CameraButtonProps {
  onImageSelect: (uri: string) => void;
}

export default function CameraButton({ onImageSelect }: CameraButtonProps) {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à câmera!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onImageSelect(result.assets[0].uri);
    }
  };

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onImageSelect(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {image ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity
            style={styles.changeButton}
            onPress={() => {
              Alert.alert('Foto da Máquina', 'Escolha uma opção:', [
                { text: 'Tirar Foto', onPress: pickImage },
                { text: 'Galeria', onPress: pickFromGallery },
                { text: 'Cancelar', style: 'cancel' },
              ]);
            }}
          >
            <Ionicons name="camera" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.placeholder}
          onPress={() => {
            Alert.alert('Foto da Máquina', 'Escolha uma opção:', [
              { text: 'Tirar Foto', onPress: pickImage },
              { text: 'Galeria', onPress: pickFromGallery },
              { text: 'Cancelar', style: 'cancel' },
            ]);
          }}
        >
          <Ionicons name="camera" size={40} color={Colors.textSecondary} />
          <Text style={styles.placeholderText}>Adicionar Foto</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  imageContainer: { position: 'relative' },
  image: { width: '100%', height: 200, borderRadius: 12 },
  changeButton: {
    position: 'absolute', right: 10, top: 10,
    backgroundColor: Colors.secondary, width: 40, height: 40,
    borderRadius: 20, justifyContent: 'center', alignItems: 'center',
  },
  placeholder: {
    width: '100%', height: 200, borderRadius: 12,
    borderWidth: 2, borderColor: Colors.border, borderStyle: 'dashed',
    justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background,
  },
  placeholderText: { color: Colors.textSecondary, marginTop: 8, fontSize: 14 },
});