import { TouchableOpacity, Text, View } from 'react-native'
import { useRouter } from 'expo-router'
import React from 'react'

const Food = () => {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center gap-4">
      <Text className="text-xl mb-4">Полезные перекусы</Text>
      
      <TouchableOpacity 
        onPress={() => router.push("../man/breakfast")}
        className="w-64 h-20 justify-center items-center rounded-lg bg-blue-500 shadow-md"
      >
        <Text className="text-white font-semibold text-lg shadow-sm">
          Полезный завтрак
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => router.push("../man/dinner")}
        className="w-64 h-20 justify-center items-center rounded-lg bg-green-500 shadow-md"
      >
        <Text className="text-white font-semibold text-lg shadow-sm">
          Крутой ужин
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Food