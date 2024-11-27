import { TouchableOpacity, Text, View } from 'react-native'
import { useRouter } from 'expo-router'
import React from 'react'

const Food = () => {
  const router = useRouter();
  return (
    <View className="flex-1 p-4 justify-center">
      <Text className="text-xl mb-4 text-center">Полезные перекусы</Text>
      
      <TouchableOpacity 
        onPress={() => router.push("../man/breakfast")}
        className="mb-4 p-8 rounded-lg bg-green-500 shadow-md"
      >
        <Text className="text-white text-xl font-bold mb-2 text-center">
          Полезный завтрак
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => router.push("../man/dinner")}
        className="mb-4 p-8 rounded-lg bg-green-500 shadow-md"
      >
        <Text className="text-white text-xl font-bold mb-2 text-center">
          Крутой ужин
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Food