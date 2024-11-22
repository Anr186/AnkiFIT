import { Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from "react";
import { useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system';

interface User {
  id: string;
  name: string;
  weight: string;
  height: string;
  gender: string;
}

const filePath = `${FileSystem.documentDirectory}user.json`;

const wProfile: React.FC = () => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [gender, setGender] = useState<string>('male');

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const fileInfo = await FileSystem.getInfoAsync(filePath);

    if (fileInfo.exists) {
      const jsonData = await FileSystem.readAsStringAsync(filePath);
      const existingUser = JSON.parse(jsonData) as User;
      setUser(existingUser);
      setName(existingUser.name);
      setWeight(existingUser.weight);
      setHeight(existingUser.height);
      setGender(existingUser.gender);
    }
  };

  const saveUser = async () => {
    const updatedUser: User = {
      id: Date.now().toString(),
      name,
      weight,
      height,
      gender,
    };

    setUser(updatedUser);
    await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedUser));
    setEditing(false);
  };

  if (!user && !editing) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Данных пользователя нет. Нажмите "Редактировать", чтобы добавить их.</Text>
        <Button title="Редактировать" onPress={() => setEditing(true)} />
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      {editing ? (
        <>
          <TextInput
            placeholder="Имя"
            value={name}
            onChangeText={setName}
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
            }}
          />
          <TextInput
            placeholder="Вес"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
            }}
          />
          <TextInput
            placeholder="Рост"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
            }}
          />
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>Выберите пол:</Text>
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <TouchableOpacity
              onPress={() => setGender('male')}
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

            <TouchableOpacity
              onPress={() => setGender('female')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
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

          <Button title="Сохранить" onPress={saveUser} />
        </>
      ) : (
        <>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Профиль</Text>
          <Text>Имя: {user?.name}</Text>
          <Text>Вес: {user?.weight} кг</Text>
          <Text>Рост: {user?.height} см</Text>
          <Text>Пол: {user?.gender === 'male' ? 'Мужской' : 'Женский'}</Text>
          <Button title="Редактировать" onPress={() => setEditing(true)} />
        </>
      )}
    </View>
  );
};

export default wProfile;
