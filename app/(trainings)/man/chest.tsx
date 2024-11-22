import { Text, View, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router';
import React from 'react'

const ChestExercises = () => {
  const router = useRouter();

  return (
    <View className="flex-1 p-4">
      <Text className="text-xl font-bold mb-4">Упражнения для груди</Text>
      
      <TouchableOpacity 
        onPress={() => router.back()}
        className="mt-4 w-40 h-12 justify-center items-center rounded-lg bg-blue-500 shadow-md"
      >
        <Text className="text-white text-center font-semibold">
          Назад
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default ChestExercises