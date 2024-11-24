import { StyleSheet, Text, View, Image } from 'react-native'
import { Tabs } from 'expo-router';
import React from 'react';
import icons from '../../constants/icons.js';

interface TabIconProps {
  icon: any; 
  name: string;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, name })  => {
return (
  <View className="flex items-center justify-center gap-2">
    <Image source={icon} resizeMode="contain" className="w-6 h-6"/>
    <Text>{name}</Text>
  </View>
)};

const TabsLayout = () => {
  return (
  <>
    <Tabs>
    <Tabs.Screen name="training" options={{title: "Тренировки", headerShown: false, tabBarIcon: () => <TabIcon icon={icons.home} name="Тренировки" />}}/>
    <Tabs.Screen name="food" options={{title: "Еда", headerShown: false, tabBarIcon: () => <TabIcon icon={icons.profile} name="Еда" />}}/>
    <Tabs.Screen name="profile" options={{title: "Профиль", headerShown: false, tabBarIcon: () => <TabIcon icon={icons.home} name="Профиль" />}}/>
    <Tabs.Screen name="settings" options={{title: "Настройки", headerShown: false, tabBarIcon: () => <TabIcon icon={icons.profile} name="Настройки" />}}/>
    </Tabs>
  </>
  )
}

export default TabsLayout