// import { Text, View } from 'react-native'
// import { useRouter } from 'expo-router';
// import React from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage';


// const Indata = () => {
//   const router = useRouter();
  
//   return (
//     <View>
//       <Text onPress={() => {
//           router.replace("/training"); 
//         }}>Введите вес</Text>
//     </View>
//   )
// }

// export default Indata

// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, Button } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useRouter } from 'expo-router';


// const Indata = () => {
//     const router = useRouter();

//   const [text, setText] = useState('');
//   const [storedText, setStoredText] = useState<string | null>(null);

  
//   const saveText = async () => {
//       await AsyncStorage.setItem('myText', text); 
//       setText(''); 
 
//   };


//   const loadText = async () => {
//       const savedText = await AsyncStorage.getItem('myText'); // Получение текста
//       if (savedText !== null) setStoredText(savedText);
//   };

//   useEffect(() => { loadText(); }, []);
//   const getAllData = async () => {
//     const keys = await AsyncStorage.getAllKeys(); // Получить все ключи
//     const values = await AsyncStorage.multiGet(keys); // Получить значение по всем ключам
//     // console.log(values); // Логируем ключи и значения
//   };
  
//   useEffect(() => {
//     getAllData();
//   }, []);
//   return (
//     <View>
//       <TextInput placeholder="Введите текст" value={text} onChangeText={setText}/>
//       <Button title="Сохранить текст" onPress={saveText} />
//       {storedText && ( <Text>Сохраненный текст: {storedText}</Text>)}
//     </View>
//   );
// };
// export default Indata;
import { Text, View, Button, TextInput } from 'react-native';
import React, { useState, useEffect } from "react";
import { useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import data from "../data.json";

interface Item {
  id: string;
  name: string;
  weight: string;
  height: string;
}

const filePath = `${FileSystem.documentDirectory}data.json`; 

const Indata: React.FC = () => {

  const router = useRouter();

  const [items, setItems] = useState<Item[]>([]); 
  const [newName, setNewName] = useState<string>(''); 
  const [newWeight, setNewWeight] = useState<string>(''); 
  const [newHeight, setNewHeight] = useState<string>(''); 

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const fileUri = filePath;
    const fileInfo = await FileSystem.getInfoAsync(fileUri);

    if (!fileInfo.exists) {
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
    }

    const jsonData = await FileSystem.readAsStringAsync(fileUri);
    setItems(JSON.parse(jsonData));
  };

  const addItem = async () => { 
    const newItem: Item = {
      id: Date.now().toString(),
      name: newName,
      weight: newWeight,
      height: newHeight,
    };
    
    const newItems = [newItem];
    setItems(newItems);
    await FileSystem.writeAsStringAsync(filePath, JSON.stringify(newItems));

    setNewName('');
    setNewWeight('');
    setNewHeight('');
  };

  return (
    <View>
      <TextInput 
        placeholder="Имя" 
        value={newName} 
        onChangeText={setNewName} 
      />
      <TextInput 
        placeholder="Вес" 
        value={newWeight} 
        onChangeText={setNewWeight} 
        keyboardType="numeric" 
      />
      <TextInput 
        placeholder="Рост" 
        value={newHeight} 
        onChangeText={setNewHeight} 
        keyboardType="numeric" 
      />
      <Button title="Добавить элемент" onPress= {() => { addItem(); router.replace("/training");}}/>
    </View>
  );
};

export default Indata;
