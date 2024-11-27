// import React, { useEffect, useState } from 'react';
// import { StyleSheet, View, Text, Button, Platform, TouchableOpacity } from 'react-native';
// import { CalendarList, DateData } from 'react-native-calendars';
// import * as CalendarExpo from 'expo-calendar';
// import { Calendar as CalendarType } from 'expo-calendar';
// import { startOfWeek, endOfWeek, eachDayOfInterval, format, addMonths, subMonths, startOfMonth, addWeeks, subWeeks } from 'date-fns';

// type CalendarData = CalendarType[];
// type ViewMode = 'week' | 'month';

// export default function Settings() {
//   const [markedDates, setMarkedDates] = useState<{ [key: string]: { marked?: boolean; dotColor?: string; selected?: boolean; color?: string } }>({});
//   const [calendars, setCalendars] = useState<CalendarData[]>([]);
//   const [currentWeek, setCurrentWeek] = useState(new Date());
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [viewMode, setViewMode] = useState<ViewMode>('week');

//   useEffect(() => {
//     (async () => {
//       const { status } = await CalendarExpo.requestCalendarPermissionsAsync();
//       if (status === 'granted') {
//         const fetchedCalendars = await CalendarExpo.getCalendarsAsync(CalendarExpo.EntityTypes.EVENT);
        
//         const today = new Date().toISOString().split('T')[0];
//         setMarkedDates({
//           [today]: { marked: true, dotColor: 'blue' },
//         });
//       }
//     })();
//   }, []);

//   const createCalendar = async () => {
//     const defaultCalendarSource =
//       Platform.OS === 'ios'
//         ? await getDefaultCalendarSource()
//         : { isLocalAccount: true, name: 'Expo Calendar', type: 'local' };

//     const newCalendarID = await CalendarExpo.createCalendarAsync({
//       title: 'Expo Calendar',
//       color: 'blue',
//       entityType: CalendarExpo.EntityTypes.EVENT,
//       sourceId: defaultCalendarSource.id,
//       source: defaultCalendarSource,
//       name: 'internalCalendarName',
//       ownerAccount: 'personal',
//       accessLevel: CalendarExpo.CalendarAccessLevel.OWNER,
//     });
//     alert(`Your new calendar ID: ${newCalendarID}`);
//   };

//   async function getDefaultCalendarSource() {
//     const defaultCalendar = await CalendarExpo.getDefaultCalendarAsync();
//     return defaultCalendar.source;
//   }

//   const getWeekDays = (date: Date) => {
//     const start = startOfWeek(date, { weekStartsOn: 1 });
//     const end = endOfWeek(date, { weekStartsOn: 1 });
//     return eachDayOfInterval({ start, end });
//   };

//   const createDateData = (date: Date): DateData => {
//     return {
//       year: date.getFullYear(),
//       month: date.getMonth() + 1, // months are 0-based in JS
//       day: date.getDate(),
//       timestamp: date.getTime(),
//       dateString: format(date, 'yyyy-MM-dd')
//     };
//   };

//   const onDayPress = (day: DateData) => {
//     const selectedDate = new Date(day.timestamp);
//     setCurrentWeek(selectedDate);
//     setCurrentMonth(selectedDate);
    
//     setMarkedDates({
//       [day.dateString]: { selected: true, color: 'blue' },
//     });
//   };

//   const goToPreviousMonth = () => {
//     if (viewMode === 'month') {
//       const newDate = subMonths(currentMonth, 1);
//       const firstDayOfMonth = startOfMonth(newDate);
//       setCurrentMonth(newDate);
//       setCurrentWeek(firstDayOfMonth);
//     } else {
//       const newDate = subWeeks(currentWeek, 1);
//       setCurrentWeek(newDate);
//       setCurrentMonth(newDate);
//     }
//   };

//   const goToNextMonth = () => {
//     if (viewMode === 'month') {
//       const newDate = addMonths(currentMonth, 1);
//       const firstDayOfMonth = startOfMonth(newDate);
//       setCurrentMonth(newDate);
//       setCurrentWeek(firstDayOfMonth);
//     } else {
//       const newDate = addWeeks(currentWeek, 1);
//       setCurrentWeek(newDate);
//       setCurrentMonth(newDate);
//     }
//   };

//   const onMonthChange = (month: DateData) => {
//     const newDate = new Date(month.timestamp);
//     setCurrentMonth(newDate);
//     setCurrentWeek(newDate);
//   };

//   const toggleViewMode = (mode: ViewMode) => {
//     setViewMode(mode);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Calendar</Text>
//       <Button title="Create Calendar" onPress={createCalendar} />
      
//       <View style={styles.viewToggle}>
//         <TouchableOpacity 
//           style={[styles.toggleButton, viewMode === 'week' && styles.toggleButtonActive]} 
//           onPress={() => toggleViewMode('week')}
//         >
//           <Text style={[styles.toggleButtonText, viewMode === 'week' && styles.toggleButtonTextActive]}>Week</Text>
//         </TouchableOpacity>
//         <TouchableOpacity 
//           style={[styles.toggleButton, viewMode === 'month' && styles.toggleButtonActive]} 
//           onPress={() => toggleViewMode('month')}
//         >
//           <Text style={[styles.toggleButtonText, viewMode === 'month' && styles.toggleButtonTextActive]}>Month</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.monthNavigation}>
//         <TouchableOpacity onPress={goToPreviousMonth} style={styles.navigationButton}>
//           <Text style={styles.navigationButtonText}>←</Text>
//         </TouchableOpacity>
//         <Text style={styles.monthText}>
//           {viewMode === 'month' 
//             ? format(currentMonth, 'MMMM yyyy')
//             : `Week of ${format(currentWeek, 'MMM d, yyyy')}`
//           }
//         </Text>
//         <TouchableOpacity onPress={goToNextMonth} style={styles.navigationButton}>
//           <Text style={styles.navigationButtonText}>→</Text>
//         </TouchableOpacity>
//       </View>

//       {viewMode === 'month' && (
//         <CalendarList
//           showWeekNumbers={true}
//           pastScrollRange={0}
//           futureScrollRange={0}
//           onDayPress={onDayPress}
//           onMonthChange={onMonthChange}
//           markedDates={markedDates}
//           current={format(currentMonth, 'yyyy-MM-dd')}
//           calendarHeight={300}
//           horizontal={true}
//           pagingEnabled={true}
//           // hideArrows={false}
          
//           theme={{
//             backgroundColor: '#ffffff',
//             calendarBackground: '#ffffff',
//             textSectionTitleColor: '#b6c1cd',
//             selectedDayBackgroundColor: '#00adf5',
//             selectedDayTextColor: '#ffffff',
//             todayTextColor: '#00adf5',
//             dayTextColor: '#2d4150',
//             textDisabledColor: '#d9e1e8',
//             dotColor: '#00adf5',
//             selectedDotColor: '#ffffff',
//             arrowColor: 'orange',
//             monthTextColor: 'blue',
//             textDayFontFamily: 'System',
//             textMonthFontFamily: 'System',
//             textDayHeaderFontFamily: 'System',
//             textDayFontSize: 16,
//             textMonthFontSize: 16,
//             textDayHeaderFontSize: 16
//           }}
//         />
//       )}
      
//       <View style={styles.weekContainer}>
//         {getWeekDays(currentWeek).map((date) => (
//           <TouchableOpacity 
//             key={date.toISOString()} 
//             style={[
//               styles.dayContainer,
//               format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') && styles.todayContainer
//             ]}
//             onPress={() => onDayPress(createDateData(date))}
//           >
//             <Text style={styles.dayText}>{format(date, 'EEE')}</Text>
//             <Text style={[
//               styles.dateText,
//               format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') && styles.todayText
//             ]}>{format(date, 'd')}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingTop: 50,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   viewToggle: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 20,
//     paddingHorizontal: 20,
//   },
//   toggleButton: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     marginHorizontal: 5,
//     borderRadius: 20,
//     backgroundColor: '#f0f0f0',
//   },
//   toggleButtonActive: {
//     backgroundColor: '#00adf5',
//   },
//   toggleButtonText: {
//     fontSize: 16,
//     color: '#666',
//   },
//   toggleButtonTextActive: {
//     color: '#fff',
//   },
//   monthNavigation: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     marginBottom: 10,
//   },
//   navigationButton: {
//     padding: 10,
//   },
//   navigationButtonText: {
//     fontSize: 24,
//     color: '#00adf5',
//   },
//   monthText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2d4150',
//   },
//   weekContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingHorizontal: 10,
//     marginTop: 20,
//     backgroundColor: '#f8f8f8',
//     borderRadius: 10,
//     marginHorizontal: 10,
//     padding: 10,
//   },
//   dayContainer: {
//     alignItems: 'center',
//     padding: 10,
//     borderRadius: 8,
//   },
//   todayContainer: {
//     backgroundColor: '#e6f7ff',
//   },
//   dayText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   dateText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: 5,
//   },
//   todayText: {
//     color: '#00adf5',
//   },
// });

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const settings = () => {
  return (
    <View>
      <Text>settings</Text>
    </View>
  )
}

export default settings

const styles = StyleSheet.create({})