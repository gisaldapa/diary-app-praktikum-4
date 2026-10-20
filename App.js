import React from 'react'; 
import { StatusBar } from 'expo-status-bar'; 
import { SafeAreaProvider } from 'react-native-safe-area-context'; 
 
import DiaryListScreen from './src/screens/DiaryListScreen'; 
 
export default function App() { 
  return ( 
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <DiaryListScreen />
    </SafeAreaProvider>
  ); 
}