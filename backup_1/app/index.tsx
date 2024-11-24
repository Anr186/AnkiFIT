import { Redirect } from "expo-router";
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from "react";
 // import * as FileSystem from "expo-file-system";

// const filePath = `${FileSystem.documentDirectory}data.json`;

// export default function App() {
//   const [redirectPath, setRedirectPath] = useState<string | null>(null);

//   useEffect(() => {
//     const checkData = async () => {
//       const fileInfo = await FileSystem.getInfoAsync(filePath);

//       if (fileInfo.exists) {
//         const fileContent = await FileSystem.readAsStringAsync(filePath);
//         const parsedData = JSON.parse(fileContent);

//         if (parsedData.length > 0) {
//           setRedirectPath("/training"); // Если данные есть, перенаправляем на /training
//         } else {
//           setRedirectPath("/indata"); // Если данных нет, перенаправляем на /indata
//         }
//       } else {
//         setRedirectPath("/indata"); // Если файл не существует, перенаправляем на /indata
//       }
//     };

//     checkData();
//   }, []);

//   if (!redirectPath) {
//     return null;
//   }

//   return <Redirect href={redirectPath} />;
// }

const index = () => {
  return (
     <Redirect href={'/training'} />
  )
}

export default index

const styles = StyleSheet.create({})