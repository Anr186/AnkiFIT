import { Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from "react";
import { useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system';

interface User {
  id: string;
  name: string;
  age: string;
  weight: string;
  height: string;
  gender: string;
}

const filePath = `${FileSystem.documentDirectory}user.json`;

const Indata: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [gender, setGender] = useState<string>(''); 

  const saveUser = async () => {
    const updatedUser: User = {
      id: Date.now().toString(),
      name,
      age,
      weight,
      height,
      gender,
    };

    await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedUser));

    if (gender === 'male') {
      router.replace('/training');
    } else if (gender === 'female') {
      router.replace('/wtraining');
    }

  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Имя" value={name} onChangeText={setName} 
      style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
        }}
      />
      <TextInput placeholder="Возраст" value={age} onChangeText={setAge} keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
        }}
      />
      <TextInput placeholder="Вес"value={weight} onChangeText={setWeight} keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
        }}
      />
      <TextInput placeholder="Рост" value={height} onChangeText={setHeight}keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
        }}
      />

      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <TouchableOpacity onPress={() => setGender('male')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 20,
          }}
        >
          <View
            style={{
              height: 20,
              width: 20,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: '#000',
              backgroundColor: gender === 'male' ? '#000' : '#fff',
              marginRight: 5,
            }}
          />
          <Text>Мужской</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setGender('female')} style={{ flexDirection: 'row', alignItems: 'center',}}>
          <View
            style={{
              height: 20,
              width: 20,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: '#000',
              backgroundColor: gender === 'female' ? '#000' : '#fff',
              marginRight: 5,
            }}
          />
          <Text>Женский</Text>
        </TouchableOpacity>
      </View>

      <Button
        title="Продолжить"
        onPress={saveUser}
      />
    </View>
  );
};

export default Indata;
