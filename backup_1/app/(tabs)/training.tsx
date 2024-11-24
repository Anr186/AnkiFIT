import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { useRouter } from 'expo-router';
import React from 'react'
import { transform } from '@babel/core';

const Training = () => {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center gap-4">
      <Text className="font-mono font-extrabold text-2xl mb-4">Тренировки</Text>
      <ImageBackground 
      className="w-96 h-40 justify-center items-center rounded-xl shadow-md"
      imageStyle={{ borderRadius: 10 }}  
      source={{uri: "https://raw.githubusercontent.com/Anr186/AnkiFIT_Source/56706f3bd04e18c3821f7e589129defb6fa39c66/image/Splash.svg"}}
      >
        <View style={styles.overlay} />
        <TouchableOpacity 
        onPress={() => router.push("/man/chest")}
        className="w-96 h-40 justify-center items-center rounded-lg shadow-md"
      >
        <Text className="text-white font-semibold text-lg shadow-sm">
          Упражнения для груди
        </Text>
      </TouchableOpacity>
    </ImageBackground>


    <ImageBackground
    className="w-96 h-40 justify-center items-center rounded-xl shadow-md"
    imageStyle={{ borderRadius: 10, transform: [{ scaleX: -1 }] }}   
   
    source={{uri: "https://raw.githubusercontent.com/Anr186/AnkiFIT_Source/56706f3bd04e18c3821f7e589129defb6fa39c66/image/Splash.svg"}}
    >
      <View style={styles.overlay} />
      <TouchableOpacity 
        onPress={() => router.push("/man/hands")}
        className="w-96 h-40 justify-center items-center rounded-lg shadow-md"
      >
        <Text className="text-white font-semibold text-lg shadow-sm">
          Упражнения для рук
        </Text>
      </TouchableOpacity>
    </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    borderRadius: 10,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Используем rgba
  }
});

export default Training