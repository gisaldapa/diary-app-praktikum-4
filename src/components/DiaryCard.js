import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens';

export default function DiaryCard({ 
  title, 
  date, 
  preview, 
  mood, 
  moodImage, 
  liked = false, 
  onPress = () => {}, 
  onToggleLike = () => {},
  variant = 'list' 
}) { 
  const getBorderColor = () => {
    switch (mood) {
      case 'happy': return '#4ade80';   
      case 'focus': return '#60a5fa';   
      case 'calm': return '#a78bfa';    
      case 'excited': return '#fbbf24'; 
      case 'tired': return '#f87171';   
      default: return COLORS.border;
    }
  };

  return ( 
    <View 
      style={[
        styles.card,
        variant === 'grid' && styles.cardGrid,
        { borderColor: getBorderColor() }
      ]}
    > 
      {/* Area Utama Kartu (Klik untuk melihat detail modal) */}
      <Pressable 
        onPress={onPress}
        style={({ pressed }) => [
          styles.cardMain,
          variant === 'grid' && styles.cardMainGrid,
          { opacity: pressed ? 0.85 : 1 }
        ]} 
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`Buka entri harian: ${title}, tanggal ${date}`} 
      > 
        {moodImage && (
          <Image 
            source={moodImage} 
            style={styles.mood} 
            accessible={true}
            accessibilityLabel={`Ikon mood ${mood || 'entri'}`}
          />
        )}

        <View style={styles.content}> 
          <Text style={styles.title} numberOfLines={1}>{title}</Text> 
          <Text style={styles.date}>{date}</Text> 
          <Text style={styles.preview} numberOfLines={2} ellipsizeMode="tail">
            {preview}
          </Text> 
        </View> 
      </Pressable> 

      {/* Tombol Like Terpisah (Tanpa Nested Pressable Konflik) */}
      <Pressable 
        onPress={onToggleLike}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={liked ? 'Batalkan suka' : 'Sukai entri'}
        style={({ pressed }) => [
          styles.likeContainer,
          { opacity: pressed ? 0.7 : 1 }
        ]}
      >
        <Text style={styles.like}>{liked ? '❤️' : '🤍'}</Text>
      </Pressable>
    </View> 
  ); 
}

const styles = StyleSheet.create({ 
  card: { 
    flexDirection: 'row', 
    alignItems: 'center',
    padding: SPACE.m, 
    borderWidth: 2,
    borderRadius: RADIUS.card, 
    backgroundColor: COLORS.surface, 
    gap: SPACE.m,
  }, 
  cardGrid: {
    flexDirection: 'column', 
    alignItems: 'center',
    textAlign: 'center',
  }, 
  cardMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.m,
  },
  cardMainGrid: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  mood: { 
    width: 64, 
    height: 64, 
    borderRadius: RADIUS.avatar,
    backgroundColor: '#eef2ff',
  }, 
  content: { 
    flex: 1, 
    width: '100%',
  }, 
  title: { fontSize: TYPO.title, fontWeight: '700', color: COLORS.text, marginBottom: 2 }, 
  date: { fontSize: TYPO.caption, color: COLORS.muted, marginBottom: SPACE.s }, 
  preview: { fontSize: TYPO.body, color: COLORS.text, lineHeight: 20 }, 
  likeContainer: {
    padding: SPACE.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  like: { 
    fontSize: 22, 
    paddingHorizontal: 6 
  }, 
});