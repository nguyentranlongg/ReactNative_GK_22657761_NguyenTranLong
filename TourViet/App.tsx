import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator, Alert, FlatList, Image, RefreshControl, SectionList,
  StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TourItem, { Tour } from './components/TourItem';
import { groupByCity } from './utils/tour';

// Thay URL này bằng endpoint Resource "tours" của bạn trên mockapi.io.
// Ví dụ: https://YOUR_PROJECT.mockapi.io/api/v1/tours
const API_URL = 'https://68d74a50c2a1754b426cff70.mockapi.io/tours';

// Thay bằng MSSV và họ tên thật trước khi nộp bài.
const MSSV = '22657761';
const FULL_NAME = 'Nguyen Tran Long';

function TourScreen() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadTours = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`GET thất bại: HTTP ${response.status}`);
      const data: Tour[] = await response.json();
      setTours(data);
    } catch (error) {
      Alert.alert(
        'Không tải được dữ liệu',
        'Kiểm tra API_URL, kết nối mạng và resource tours trên MockAPI.\n' +
        (error instanceof Error ? error.message : 'Lỗi không xác định')
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { loadTours(); }, [loadTours]);

  // Tìm kiếm chỉ ảnh hưởng danh sách nhóm chính, không ảnh hưởng mục yêu thích.
  const filteredTours = useMemo(() => {
    const normalized = keyword.trim().toLocaleLowerCase();
    if (!normalized) return tours;
    return tours.filter(t => t.name.toLocaleLowerCase().includes(normalized));
  }, [tours, keyword]);

  const sections = useMemo(() => groupByCity(filteredTours), [filteredTours]);
  const favoriteTours = useMemo(
    () => tours.filter(t => t.isFavorite),
    [tours]
  );

  const handleTourPress = useCallback((tour: Tour) => {
    Alert.alert(
      tour.name,
      `Ngày khởi hành: ${tour.departure}\nSố ngày: ${tour.days} ngày\nGiá: ${tour.price.toLocaleString('vi-VN')} ₫`
    );
  }, []);

  const handleToggleFavorite = useCallback(async (id: string, next: boolean) => {
    const oldTour = tours.find(t => t.id === id);
    if (!oldTour) return;

    // Cập nhật lạc quan: giao diện đổi ngay trước khi PUT hoàn tất.
    setTours((prev: Tour[]) =>
      prev.map((t: Tour) =>
      t.id === id ? { ...t, isFavorite: next } : t
      )
    );

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite: next }),
      });
      if (!response.ok) throw new Error(`PUT thất bại: HTTP ${response.status}`);
    } catch (error) {
      // Hoàn tác nếu PUT lỗi/mất mạng.
      setTours(prev => prev.map(t => t.id === id ? { ...t, isFavorite: oldTour.isFavorite } : t));
      Alert.alert(
        'Không cập nhật được yêu thích',
        error instanceof Error ? error.message : 'Vui lòng thử lại.'
      );
    }
  }, [tours]);

  const renderFavoriteHeader = () => (
    <View style={styles.favoriteSection}>
      <Text style={styles.favoriteTitle}>Tour yêu thích ({favoriteTours.length})</Text>
      {favoriteTours.length === 0 ? (
        <Text style={styles.noFavorite}>Chưa có tour yêu thích</Text>
      ) : (
        <FlatList
          horizontal
          data={favoriteTours}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          renderItem={({ item }) => (
            <TourItem
              tour={item}
              compact
              onPress={handleTourPress}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>Tour Việt</Text>
        <Text style={styles.student}>{MSSV} – {FULL_NAME}</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm tour theo tên..."
          value={keyword}
          onChangeText={setKeyword}
          clearButtonMode="while-editing"
          autoCapitalize="none"
        />
      </View>

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#087F8C" />
          <Text style={styles.loadingText}>Đang tải danh sách tour...</Text>
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TourItem
              tour={item}
              onPress={handleTourPress}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title} · {section.data.length} tour</Text>
            </View>
          )}
          stickySectionHeadersEnabled
          ListHeaderComponent={renderFavoriteHeader}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Không tìm thấy tour phù hợp</Text>
          }
          contentContainerStyle={sections.length === 0 ? styles.emptyContainer : styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => loadTours(true)} />
          }
        />
      )}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <TourScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F7F8' },
  header: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 12, backgroundColor: '#FFFFFF' },
  appTitle: { fontSize: 28, fontWeight: '800', color: '#087F8C' },
  student: { marginTop: 4, color: '#52616B', fontSize: 13 },
  searchInput: { marginTop: 12, borderWidth: 1, borderColor: '#D5DEE2', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, backgroundColor: '#F9FBFC', fontSize: 15 },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { marginTop: 10, color: '#52616B' },
  listContent: { paddingBottom: 24 },
  emptyContainer: { flexGrow: 1, paddingBottom: 24 },
  favoriteSection: { paddingTop: 14, paddingBottom: 8, paddingHorizontal: 16, backgroundColor: '#F4F7F8' },
  favoriteTitle: { fontSize: 18, fontWeight: '700', color: '#172B3A', marginBottom: 10 },
  noFavorite: { color: '#6B7780', paddingVertical: 14 },
  sectionHeader: { backgroundColor: '#E5F4F5', paddingHorizontal: 16, paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#D3E8EA' },
  sectionTitle: { color: '#075D66', fontWeight: '700', fontSize: 15 },
  emptyText: { textAlign: 'center', color: '#687780', padding: 24, fontSize: 15 },
});
