// import React, { useState, useEffect } from "react";
// import { ImageBackground, Text, View, ActivityIndicator } from "react-native";
// import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import { downloadAndCacheImage } from '../constants/failCache.js';

// const SplashScreen = () => {
//   const [isLoaded, setIsLoaded] = useState(false);  // Стейт для отслеживания загрузки изображения
//   const [imageUri, setImageUri] = useState<string | null>(null);  // Стейт для хранения пути к загруженному изображению

//   useEffect(() => {
//     const checkIfImageCached = async () => {
//       const cachedImageUri = await AsyncStorage.getItem('cachedImageUri');
//       if (cachedImageUri) {
//         setImageUri(cachedImageUri);  // Если изображение уже кешировано, используем его
//         setIsLoaded(true);  // Заставка готова
//       } else {
//         loadImage();  // Если изображения нет в кеше, загружаем
//       }
//     };

//     const loadImage = async () => {
//       try {
//         const fileUrl = 'https://github.com/Anr186/AnkiFIT_Source/blob/master/image/SplashScreen.png?raw=true';  
//         const filename = 'SplashScreen.png';  

//         const imagePath = await downloadAndCacheImage(fileUrl, filename);  // Загружаем изображение
//         await AsyncStorage.setItem('cachedImageUri', imagePath);  // Кешируем путь к изображению
//         setImageUri(imagePath);  // Устанавливаем путь к изображению в стейт
//         setIsLoaded(true);  // Изображение загружено
//       } catch (error) {
//         console.error('Ошибка загрузки изображения:', error);
//       }
//     };

//     checkIfImageCached();  // Проверяем наличие кешированного изображения при монтировании компонента
//   }, []);

//   if (!isLoaded) {
//     return (
//       <SafeAreaProvider>
//         <SafeAreaView className="flex-1" edges={["left", "right"]}>
//           <View className="flex-1 justify-center items-center">
//             <ActivityIndicator size="large" color="#ffffff" />
//           </View>
//         </SafeAreaView>
//       </SafeAreaProvider>
//     );
//   }

//   return (
//     <SafeAreaProvider>
//       <SafeAreaView className="flex-1" edges={["left", "right"]}>
//         {imageUri ? (
//           <ImageBackground source={{ uri: imageUri }} className="flex-1 justify-center items-center" resizeMode="cover">
//             <Text className="text-center text-3xl text-white">Ank1FIT</Text>
//           </ImageBackground>
//         ) : (
//           <Text className="text-center text-3xl text-white">Ошибка загрузки изображения</Text>
//         )}
//       </SafeAreaView>
//     </SafeAreaProvider>
//   );
// };

// export default SplashScreen;
import React, { useState } from "react";
import { ImageBackground, Text, View, ActivityIndicator} from "react-native";
import { SafeAreaView, SafeAreaProvider} from "react-native-safe-area-context";

const image = {
  uri: "https://github.com/Anr186/AnkiFIT_Source/blob/master/image/SplashScreen.png?raw=true",
};

const SplashScreen = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        className="flex-1" edges={["left", "right"]}>
        <ImageBackground source={image} className="flex-1 justify-center items-center" resizeMode="cover" onLoad={() => setIsLoaded(true)}>
          {isLoaded && (<Text className="text-center text-3xl text-white">Ank1FIT</Text>)}
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SplashScreen;
