import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Face = () => {
  const navigation = useNavigation();
  const [report, setReport] = useState(1);
  const [photo, setPhoto] = useState(null);

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('오류', '사진 선택 중 문제가 발생했습니다.');
        } else if (response.assets && response.assets.length > 0) {
          setPhoto(response.assets[0].uri);
        }
      }
    );
  };

  const insertFace = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const formData = new FormData();

      formData.append('data', JSON.stringify(
        { 
            report: report
        }));

      if (photo) {
        formData.append('file', {
          uri: photo,
          type: 'image/jpeg',
          name: `photo_${Date.now()}.jpg`,
        });
      }

      const response = await axios.post(`${API_URL}/face/save`, formData, {
        headers: {
          Authorization: accessToken,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        Alert.alert('성공');
        navigation.navigate('FaceDetail', { refresh: true, data: response.data });
      } else {
        Alert.alert('오류');
      }
    } catch (error) {
      navigation.navigate('StartLogin');
      Alert.alert('오류', '서버 요청 중 문제가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>얼굴인식 테스트</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.uploadButton,
            report === 1 ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={() => setReport(1)}
        >
          <Text style={styles.buttonText}>1 (찾기)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.uploadButton,
            report === 0 ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={() => setReport(0)}
        >
          <Text style={styles.buttonText}>0 (등록)</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={pickImage} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>사진 선택</Text>
      </TouchableOpacity>

      {photo && <Image source={{ uri: photo }} style={styles.image} />}

      <TouchableOpacity onPress={insertFace} style={styles.registerButton}>
        <Text style={styles.registerButtonText}>등록하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  uploadButton: {
    flex: 1,
    padding: 12,
    borderRadius: 22.375,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#f1c0ba',
  },
  inactiveButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#f1c0ba',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 22.375,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginVertical: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  registerButton: {
    backgroundColor: '#f1c0ba',
    padding: 15,
    borderRadius: 22.375,
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Face;
