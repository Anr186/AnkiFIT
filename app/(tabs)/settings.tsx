import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Platform } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars'; // Импортируем DateObject
import * as CalendarExpo from 'expo-calendar';
import { Calendar as CalendarType } from 'expo-calendar';

// Определяем тип для состояния календарей
type CalendarData = CalendarType[];

export default function Settings() {
  const [markedDates, setMarkedDates] = useState<{ [key: string]: { marked?: boolean; dotColor?: string; selected?: boolean; color?: string } }>({});
  const [calendars, setCalendars] = useState<CalendarData[]>([]); // Явное указание типа

  useEffect(() => {
    (async () => {
      const { status } = await CalendarExpo.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const fetchedCalendars = await CalendarExpo.getCalendarsAsync(CalendarExpo.EntityTypes.EVENT);
        console.log('Here are all your calendars:');
        console.log({ fetchedCalendars });
        
        // Пример: отмечаем текущую дату
        const today = new Date().toISOString().split('T')[0];
        setMarkedDates({
          [today]: { marked: true, dotColor: 'blue' }, // Отметка текущей даты
        });

        //  setCalendars(fetchedCalendars); // Сохраните полученные календари в состоянии
      }
    })();
  }, []);

  const createCalendar = async () => {
    const defaultCalendarSource =
      Platform.OS === 'ios'
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: 'Expo Calendar', type: 'local' };

    const newCalendarID = await CalendarExpo.createCalendarAsync({
      title: 'Expo Calendar',
      color: 'blue',
      entityType: CalendarExpo.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: 'internalCalendarName',
      ownerAccount: 'personal',
      accessLevel: CalendarExpo.CalendarAccessLevel.OWNER,
    });
    alert(`Your new calendar ID is: ${newCalendarID}`);
  };

  async function getDefaultCalendarSource() {
    const defaultCalendar = await CalendarExpo.getDefaultCalendarAsync();
    return defaultCalendar.source;
  }

  return (
    <View style={styles.container}>
      <Text>Календарь</Text>
      <Button title="кнопка ьез особого смысла" onPress={createCalendar} />
      <Calendar
        // Dispatches when the day is pressed
        onDayPress={(day: DateData) => {  // Указываем тип DayObject
          console.log('Selected day:', day);
          setMarkedDates({
            [day.dateString]: { selected: true, color: 'blue' }, // Отметка выбранной даты
          });
        }}
        // Отображаем текущую дату
        markedDates={markedDates}
        current={new Date().toISOString().split('T')[0]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 50,
  },
});
