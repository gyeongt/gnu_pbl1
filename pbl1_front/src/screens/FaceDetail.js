import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const FaceDetail = ({ route }) => {
  const { data } = route.params;

  const renderItem = ({ item, index }) => (
    
    <View style={styles.itemContainer}>
      {/* 이미지 표시 */}
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      
      {/* 인덱스, 점수 표시 */}
      <View style={styles.textContainer}>
        <Text style={styles.index}>{index + 1}.</Text>
        <Text style={styles.score}>{item.score.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>인식 결과</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  index: {
    fontWeight: 'bold',
  },
  score: {
    fontSize: 16,
    color: '#000',
  },
});

export default FaceDetail;
