import { Text, View, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router';
import React from 'react'

const Training = () => {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center gap-4">
      <Text className="text-xl mb-4">Тренировки</Text>
      
      <TouchableOpacity 
        onPress={() => router.push("/man/chest")}
        className="w-64 h-20 justify-center items-center rounded-lg bg-blue-500 shadow-md"
      >
        <Text className="text-white font-semibold text-lg shadow-sm">
          Упражнения для груди
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => router.push("/man/hands")}
        className="w-64 h-20 justify-center items-center rounded-lg bg-green-500 shadow-md"
      >
        <Text className="text-white font-semibold text-lg shadow-sm">
          Упражнения для рук
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Training