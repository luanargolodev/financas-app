import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from '../../contexts/auth';

export default function Home() {  
  const { user } = useContext(AuthContext);

 return (
    <View>
      <Text>{user && user.name}</Text>
      <Text>{user && user.email}</Text>
    </View>
  );
}