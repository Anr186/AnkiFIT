import React, { useState } from "react";
import { ImageBackground, Text, View, StatusBar, Platform } from "react-native";


const image = {
  uri: "https://github.com/Anr186/AnkiFIT_Source/blob/master/image/SplashScreen.png?raw=true",
};

const SplashScreen = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
      <View className="flex-1">
         <StatusBar hidden />
        <ImageBackground source={image} className="flex-1 justify-center items-center" resizeMode="cover" onLoad={() => setIsLoaded(true)}>
          {isLoaded && (<Text className="text-center text-3xl text-white">Ank1FIT</Text>)}
        </ImageBackground>
      </View>
  );
};

export default SplashScreen;
