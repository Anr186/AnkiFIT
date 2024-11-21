import { Stack} from "expo-router";
import { useState, useEffect } from "react";

import SplashScreen from "./splash";

import "../global.css";

const RootLayout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(trainings)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: true }} />
    </Stack>
  );
};

export default RootLayout;
