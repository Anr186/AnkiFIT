import React, { useState, useEffect } from "react";
import { ImageBackground, Text, View, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";

const image = {
  uri: "https://github.com/Anr186/AnkiFIT_Source/blob/master/image/SplashScreen.png?raw=true",
};

const filePath = `${FileSystem.documentDirectory}user.json`;

const SplashScreen: React.FC = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkUserData = async () => {
      const fileInfo = await FileSystem.getInfoAsync(filePath);

      if (fileInfo.exists) {
        const fileContent = await FileSystem.readAsStringAsync(filePath);
        const userData = JSON.parse(fileContent);

        if (userData?.gender === "male") {
          router.replace("/training");
        } else if (userData?.gender === "female") {
          router.replace("/wtraining");
        } 
      } 
    };
    setTimeout(() => {
      setIsLoaded(true);
      checkUserData();
    }); 
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />
      <ImageBackground
        source={image}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        resizeMode="cover"
      >
        {isLoaded && <Text style={{ textAlign: "center", fontSize: 36, color: "white" }}>Ank1FIT</Text>}
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;