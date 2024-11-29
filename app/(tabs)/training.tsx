import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, ScrollView, TextInput, Button, StyleSheet, Image } from 'react-native'
import { useRouter } from 'expo-router'
import { startOfWeek, endOfWeek, eachDayOfInterval, format, isSameDay } from 'date-fns'
import * as FileSystem from 'expo-file-system'
import { Feather } from '@expo/vector-icons'

interface DailyPlan {
  date: string;
  plan: string;
}

const Training = () => {
  const router = useRouter()
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [dailyPlan, setDailyPlan] = useState('')
  const [plans, setPlans] = useState<DailyPlan[]>([])
  const [isEditing, setIsEditing] = useState(false)

  const getWeekDays = (date: Date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 })
    const end = endOfWeek(date, { weekStartsOn: 1 })
    return eachDayOfInterval({ start, end })
  }

  const getPlanForDate = (date: Date): string => {
    const plan = plans.find(p => p.date === format(date, 'yyyy-MM-dd'));
    return plan ? plan.plan : '';
  }

  useEffect(() => {
    loadPlans();
  }, [])

  useEffect(() => {
    setDailyPlan(getPlanForDate(selectedDate));
    setIsEditing(false);
  }, [selectedDate, plans])

  const loadPlans = async () => {
    const filePath = `${FileSystem.documentDirectory}data.json`
    const fileInfo = await FileSystem.getInfoAsync(filePath)
    if (fileInfo.exists) {
      const jsonData = await FileSystem.readAsStringAsync(filePath)
      setPlans(JSON.parse(jsonData))
    }
  }

  const savePlan = async () => {
    const newPlan: DailyPlan = {
      date: format(selectedDate, 'yyyy-MM-dd'),
      plan: dailyPlan
    }
    const updatedPlans = [...plans.filter(p => p.date !== newPlan.date), newPlan]
    setPlans(updatedPlans)
    const filePath = `${FileSystem.documentDirectory}data.json`
    await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedPlans))
    setIsEditing(false)
  }

  return (
    <ScrollView className="flex-1 p-4">
      <Text className="text-xl mb-4 text-center">Тренировки</Text>
      
      {/* Weekly Calendar */}
      <View className="flex-row justify-around mb-4 bg-gray-100 rounded-lg p-2">
        {getWeekDays(currentWeek).map((date) => (
          <TouchableOpacity 
            key={date.toISOString()} 
            className={`items-center justify-center w-10 h-10 rounded-full ${
              isSameDay(date, selectedDate) ? 'bg-blue-500' : 
              isSameDay(date, new Date()) ? 'bg-blue-200' : ''
            }`}
            onPress={() => {
              setSelectedDate(date);
            }}
          >
            <Text className={`text-xs ${
              isSameDay(date, selectedDate) ? 'text-white' : 
              isSameDay(date, new Date()) ? 'text-blue-800' : 'text-gray-600'
            }`}>
              {format(date, 'EEE')}
            </Text>
            <Text className={`text-sm ${
              isSameDay(date, selectedDate) ? 'text-white font-bold' : 
              isSameDay(date, new Date()) ? 'text-blue-800 font-bold' : ''
            }`}>
              {format(date, 'd')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Display saved plan with edit button */}
      <View className="mb-4 p-4 bg-blue-100 rounded-lg relative">
        <Text className="text-lg font-bold mb-2">
          План на {format(selectedDate, 'dd.MM')}
        </Text>
        {isEditing ? (
          <>
            <TextInput
              className="border border-gray-300 rounded-lg p-2 mb-2 bg-white"
              multiline
              numberOfLines={4}
              value={dailyPlan}
              onChangeText={setDailyPlan}
              placeholder="Введите план на день"
            />
            <Button title="Сохранить" onPress={savePlan} />
          </>
        ) : (
          <>
            <Text>{dailyPlan || 'Нет плана на этот день'}</Text>
            <TouchableOpacity 
              className="absolute top-2 right-2"
              onPress={() => setIsEditing(true)}
            >
              <Feather name="edit-2" size={24} color="#4B5563" />
            </TouchableOpacity>
          </>
        )}
      </View>
      <TouchableOpacity 
          onPress={() => router.push("../man/chest")}
          className="mb-4 rounded-xl overflow-hidden"
        >
          <Image
           source={require('../../assets/images/chest1.png')}
            className="w-full h-32"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-black opacity-30" />
          <Text className="absolute bottom-2 left-2 text-white text-xl font-bold">
          Упражнения для груди
          </Text>
        </TouchableOpacity>

      <TouchableOpacity 
          onPress={() => router.push("../man/hands")}
          className="mb-4 rounded-xl overflow-hidden"
        >
          <Image
           source={require('../../assets/images/hands1.png')}
            className="w-full h-32"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-black opacity-30" />
          <Text className="absolute bottom-2 left-2 text-white text-xl font-bold">
          Упражнения для рук
          </Text>
        </TouchableOpacity>
    </ScrollView>
  )
}

export default Training

