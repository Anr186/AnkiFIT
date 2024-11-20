import { Text, View } from 'react-native'
import { useRouter } from 'expo-router';
import React from 'react'



const Indata = () => {
  const router = useRouter();
  
  return (
    <View>
      <Text onPress={() => {
          router.replace("/training"); 
        }}>Введите вес</Text>
    </View>
  )
}

export default Indata
