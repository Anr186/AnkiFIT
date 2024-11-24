import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';

interface Item {
  id: string;
  name: string;
  weight: string; 
  height: string;
}

const filePath = `${FileSystem.documentDirectory}data.json`; 

const Profile: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      if (fileInfo.exists) {
        const jsonData = await FileSystem.readAsStringAsync(filePath);
        setItems(JSON.parse(jsonData));
      }
 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Профили</Text>
      {items.map((item) => (
        <View key={item.id} style={styles.profileContainer}>
          <Text>Имя: {item.name}</Text>
          <Text>Вес: {item.weight}</Text>
          <Text>Рост: {item.height}</Text>
        </View>
      ))}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileContainer: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});