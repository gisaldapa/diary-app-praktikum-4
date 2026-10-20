import React, { useState } from 'react'; 
import { View, TextInput, StyleSheet } from 'react-native'; 
import { COLORS, SPACE, RADIUS } from '../styles/tokens'; 
 
export default function SearchBar({ 
  placeholder = 'Cari entri...', 
  onChange, 
}) { 
  const [queryText, setQueryText] = useState(''); 
 
  const handleChange = (text) => { 
    setQueryText(text); 
    onChange?.(text); 
  }; 
 
  return (      
    <View style={styles.wrap}>
      <TextInput 
        style={styles.input}
        placeholder={placeholder}
        value={queryText}
        onChangeText={handleChange}
        placeholderTextColor={COLORS.muted}
      />
    </View>
  ); 
} 
 
const styles = StyleSheet.create({ 
  wrap: { 
    paddingHorizontal: SPACE.l, 
    paddingVertical: SPACE.m, 
  }, 
  input: { 
    borderWidth: 1, 
    borderColor: COLORS.border, 
    borderRadius: RADIUS.card, 
    paddingHorizontal: SPACE.m, 
    paddingVertical: 10, 
    backgroundColor: '#fff', 
    color: COLORS.text,
  }, 
});