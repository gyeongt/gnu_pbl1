import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { Button } from './Button';

export const GooeyMenu = ({ navigation }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAnimation] = useState(new Animated.Value(0));
  const [buttonRotation] = useState(new Animated.Value(0));

  const toggleMenu = () => {
    Animated.timing(menuAnimation, {
      toValue: menuOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // 회전 애니메이션 추가
    Animated.timing(buttonRotation, {
      toValue: menuOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setMenuOpen(!menuOpen);
  };

  const menuStyle = (index) => {
    const distance = 60; 
    const totalButtons = 4;

    const angle = index * (Math.PI / (totalButtons - 0.8)) + 0.1;

    const x = distance * Math.cos(angle);
    const y = distance * Math.sin(angle); 

    const adjustedY = y + 53; 

    return {
      opacity: menuAnimation.interpolate({
        inputRange: [0, 1], 
        outputRange: [0, 1],
      }),
      transform: [
        {
          translateX: menuAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, x],
          }),
        },
        {
          translateY: menuAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -adjustedY],
          }),
        },
      ],
    };
  };

  // 회전된 버튼 스타일
  const buttonRotationStyle = {
    transform: [
      {
        rotate: buttonRotation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg'], // 버튼이 0도에서 45도로 회전
        }),
      },
    ],
  };

  const menuItems = [
    { text: 'MY', target: 'MyPage' },
    { text: '게시판', target: 'Board' },
    { text: '제보', target: 'DogRegistration' },
    { text: '실종', target: 'MissingDogRegistration' },
  ];

  return (
    <View style={styles.container}>
      {menuItems.map((item, index) => (
        <Animated.View 
          key={index} 
          style={[styles.menuItemWrapper, menuStyle(index)]}
        >
          <Button
            text={item.text}
            onPress={() => navigation.navigate(item.target)}
          />
        </Animated.View>
      ))}

      <TouchableOpacity style={styles.centerButton} onPress={toggleMenu}>
        <Animated.Text style={[styles.buttonText, buttonRotationStyle]}>
          +
        </Animated.Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
  },
  centerButton: {
    width: 70, 
    height: 70,
    backgroundColor: '#fbf3e9',
    borderRadius: 40, 
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 2,
  },
  menuItemWrapper: {
    position: 'absolute',
  },
  buttonText: {
    color: '#999',
    fontWeight: 'bold',
    fontSize: 22,
  },
});
