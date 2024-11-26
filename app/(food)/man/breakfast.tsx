import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const BreakFast = () => {
    const router = useRouter();
    return (
        <View>
            <Text>BreakFast</Text>
        </View>
  )
}

export default BreakFast

const styles = StyleSheet.create({})