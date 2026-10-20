import React, { useState, useMemo } from 'react';
import { View, Text, Image, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DiaryCard from '../components/DiaryCard';
import DiaryDetailModal from '../components/DiaryDetailModal';
import SearchBar from '../components/SearchBar';
import EntryForm from '../components/EntryForm';
import { COLORS, SPACE, TYPO, BREAKPOINTS } from '../styles/tokens';

const INITIAL_ENTRIES = [
  { 
    id: '1', 
    title: 'Pagi yang Tenang', 
    date: '2026-10-18', 
    preview: 'Jalan pagi 20 menit dan menikmati udara segar.', 
    body: 'Hari ini aku bangun lebih pagi dan berjalan kaki selama 20 menit. Udara terasa sejuk, memberikan energi positif.', 
    mood: 'happy',
    moodImage: require('../../assets/moods/happy.png'), 
  },
  { 
    id: '2', 
    title: 'Produktif di Kampus', 
    date: '2026-10-17', 
    preview: 'Menyelesaikan modul praktikum dan berdiskusi dengan tim.', 
    body: 'Hari ini cukup produktif karena beberapa target perkuliahan selesai dan diskusi tim berjalan lancar.', 
    mood: 'focus',
    moodImage: require('../../assets/moods/focus.png'), 
  },
  { 
    id: '3', 
    title: 'Senja di Taman', 
    date: '2026-10-16', 
    preview: 'Membaca buku sambil menikmati suasana senja.', 
    body: 'Sore ini saya menikmati waktu di taman sambil membaca buku favorit.', 
    mood: 'calm',
    moodImage: require('../../assets/moods/calm.png'), 
  },
];

export default function DiaryListScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const twoCols = width >= BREAKPOINTS.tablet;

  // State Utama sesuai ketentuan
  const [entries, setEntries] = useState(INITIAL_ENTRIES);
  const [query, setQuery] = useState('');
  const [likedIds, setLikedIds] = useState(new Set());
  const [selected, setSelected] = useState(null);

  // Derived State (Pencarian Real-time dengan useMemo)
  const filtered = useMemo(() => {
    if (!query.trim()) return entries;
    const q = query.toLowerCase();
    return entries.filter((entry) => 
      entry.title.toLowerCase().includes(q) || 
      entry.preview.toLowerCase().includes(q) || 
      entry.date.toLowerCase().includes(q)
    );
  }, [entries, query]);

  // Toggle Like tanpa reload aplikasi
  const toggleLike = (id) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Tambah entri baru dari form
  const addEntry = (newEntry) => {
    setEntries((prev) => [newEntry, ...prev]);
  };

  const renderHeader = () => (
    <View style={styles.headerWrapper}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle} accessibilityRole="header">Buku Harian</Text>
        <Image 
          source={{ uri: 'https://avatar.iran.liara.run/public/35' }} 
          style={styles.avatar} 
          accessible={true} 
          accessibilityLabel="Avatar Profil" 
        />
      </View>
      <SearchBar placeholder="Cari entri berdasarkan judul/tanggal..." onChange={setQuery} />
      <EntryForm onSubmit={addEntry} />
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={twoCols ? styles.gridItem : styles.listItem}>
      <DiaryCard 
        {...item} 
        variant={twoCols ? 'grid' : 'list'} 
        liked={likedIds.has(item.id)}
        onToggleLike={() => toggleLifeSafe(item.id)}
        onPress={() => setSelected(item)} 
      />
    </View>
  );

  const toggleLifeSafe = (id) => toggleLike(id);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        key={twoCols ? 'grid-mode' : 'list-mode'}
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        numColumns={twoCols ? 2 : 1}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={twoCols ? styles.columnWrapper : undefined}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>Belum ada entri yang ditemukan.</Text>
        }
      />
      <DiaryDetailModal 
        visible={selected !== null} 
        onClose={() => setSelected(null)} 
        entry={selected} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  listContent: { paddingHorizontal: SPACE.l, paddingBottom: SPACE.xl },
  headerWrapper: { marginBottom: SPACE.m },
  headerContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: SPACE.l,
    marginTop: SPACE.m,
    marginBottom: SPACE.s 
  },
  headerTitle: { fontSize: TYPO.h1, fontWeight: '700', color: COLORS.text },
  avatar: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: COLORS.border },
  listItem: { marginBottom: SPACE.m },
  columnWrapper: { justifyContent: 'space-between', marginBottom: SPACE.m },
  gridItem: { flex: 1, maxWidth: '48%' },
  empty: { 
    textAlign: 'center', 
    color: COLORS.muted, 
    marginTop: 40, 
    fontSize: TYPO.body 
  },
});