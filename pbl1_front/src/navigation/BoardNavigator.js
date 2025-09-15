import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import Board from '../screens/Board';
import BoardDetail from '../screens/BoardClick';
import BoardUpdate from '../screens/BoardUpdate';
import DogRegistration from '../screens/DogRegistration';
//import PaymentScreen from '../screens/Payment';
import MyPage from '../screens/MyPage';
import MissingDogRegistration from '../screens/MissingDogRegistration';
import MyActive from '../screens/MyActive';
import EditProfileScreen from '../screens/EditProfileScreen';
import Inquiry from '../screens/Inquiry';
import NoticeScreen from '../screens/NoticeScreen';
import NoticeDetailScreen from '../screens/NoticeDetailScreen';
import SignUpScreen from '../screens/SignUpScreen';
import StartLogin from '../screens/StartLogin';
import ForgetAccount from '../screens/ForgetAccount';
import Face from '../screens/Face';
import FaceDetail from '../screens/FaceDetail';

const Stack = createStackNavigator();

const BoardNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Face">
      <Stack.Screen name="Board" component={Board} />
      <Stack.Screen name="BoardDetail" component={BoardDetail} />
      <Stack.Screen name="BoardUpdate" component={BoardUpdate} />
      <Stack.Screen name="DogRegistration" component={DogRegistration} />
      <Stack.Screen name="MyPage" component={MyPage} />
      <Stack.Screen name="MyActive" component={MyActive} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="MissingDogRegistration" component={MissingDogRegistration} />
      <Stack.Screen name="Inquiry" component={Inquiry} />
      <Stack.Screen name="NoticeScreen" component={NoticeScreen} />
      <Stack.Screen name="NoticeDetailScreen" component={NoticeDetailScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="StartLogin" component={StartLogin} />
      <Stack.Screen name="ForgetAccount" component={ForgetAccount} />
      <Stack.Screen name="Face" component={Face} />
      <Stack.Screen name="FaceDetail" component={FaceDetail} />
    </Stack.Navigator>
  );
};

export default BoardNavigator;
