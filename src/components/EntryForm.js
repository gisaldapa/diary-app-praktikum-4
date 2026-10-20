import React, { useState } from 'react'; 
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native'; 
import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens'; 
 
export default function EntryForm({ onSubmit }) { 
  const [title, setTitle] = useState(''); 
  const [date, setDate] = useState('2026-10-19'); 
  const [preview, setPreview] = useState(''); 
 
  const canSubmit = title.trim().length > 0 && preview.trim().length > 0; 
 
  const submit = () => { 
    if (!canSubmit) return; 
 
    onSubmit?.({ 
      id: Date.now().toString(), 
      title: title.trim(), 
      date: date.trim(), 
      preview: preview.trim(), 
      body: preview.trim(), 
      mood: 'happy',
      moodImage: require('../../assets/moods/happy.png'), 
    }); 
 
    setTitle(''); 
    setDate('2026-10-19'); 
    setPreview(''); 
  }; 
 
  return ( 
    <View style={styles.form}> 
      <Text style={styles.heading}>Tambah Entri Baru</Text> 
 
      <TextInput 
        value={title} 
        onChangeText={setTitle} 
        placeholder="Judul entri..." 
        style={styles.input} 
        placeholderTextColor={COLORS.muted}
      /> 
 
      <TextInput 
        value={date} 
        onChangeText={setDate} 
        placeholder="YYYY-MM-DD" 
        style={styles.input} 
        placeholderTextColor={COLORS.muted}
      /> 
 
      <TextInput 
        value={preview} 
        onChangeText={setPreview} 
        placeholder="Ringkasan catatan..." 
        style={[styles.input, styles.multiline]} 
        multiline 
        placeholderTextColor={COLORS.muted}
      /> 

      <Pressable 
        onPress={submit} 
        style={[styles.button, !canSubmit && styles.buttonDisabled]}
        disabled={!canSubmit}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Simpan entri baru"
      > 
        <Text style={styles.buttonText}>Simpan Entri</Text> 
      </Pressable> 
    </View> 
  ); 
} 
 
const styles = StyleSheet.create({ 
  form: { 
    paddingHorizontal: SPACE.l, 
    marginBottom: SPACE.m, 
    gap: SPACE.s 
  }, 
  heading: { 
    fontSize: TYPO.title, 
    fontWeight: '700', 
    color: COLORS.text, 
    marginBottom: SPACE.xs, 
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
  multiline: { 
    minHeight: 70, 
    textAlignVertical: 'top', 
  }, 
  button: { 
    marginTop: SPACE.xs, 
    padding: SPACE.m, 
    borderRadius: RADIUS.card, 
    backgroundColor: COLORS.accent, 
    alignItems: 'center', 
  }, 
  buttonDisabled: { opacity: 0.5 },  
  buttonText: { color: '#fff', fontWeight: '700' }, 
});