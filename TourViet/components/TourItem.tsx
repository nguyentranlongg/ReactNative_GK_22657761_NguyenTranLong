import React from 'react';
import {
  Image, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import { formatDate, getSeatLabel } from '../utils/tour';

export type Tour = {
  id: string;
  name: string;
  city: string;
  days: number;
  price: number;
  seats: number;
  departure: string;
  image: string;
  isFavorite: boolean;
};

export type TourItemProps = {
  tour: Tour;
  compact?: boolean;
  onPress: (tour: Tour) => void;
  onToggleFavorite: (id: string, next: boolean) => void;
};

function TourItem({ tour, compact = false, onPress, onToggleFavorite }: TourItemProps) {
  const soldOut = tour.seats === 0;
  const lowSeats = tour.seats <= 3;

  return (
    <View style={[styles.card, compact ? styles.compactCard : styles.rowCard]}>
      <TouchableOpacity
        activeOpacity={0.85}
        style={[compact ? styles.compactMain : styles.rowMain]}
        onPress={() => onPress(tour)}
        accessibilityRole="button"
      >
        <Image
          source={{ uri: tour.image }}
          style={[styles.image, compact ? styles.compactImage : styles.rowImage]}
          resizeMode="cover"
        />
        <View style={[styles.info, compact && styles.compactInfo]}>
          <Text style={styles.name} numberOfLines={compact ? 1 : 2}>{tour.name}</Text>
          {!compact && (
            <>
              <Text style={styles.city}>{tour.city}</Text>
              <Text style={styles.detail}>📅 {formatDate(tour.departure)} · {tour.days} ngày</Text>
              <Text style={[styles.seats, lowSeats && styles.lowSeats]}>
                {getSeatLabel(tour.seats)}
              </Text>
            </>
          )}
          <Text style={styles.price}>{tour.price.toLocaleString('vi-VN')} ₫</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        testID="fav-btn"
        style={[styles.favoriteButton, compact && styles.compactFavoriteButton]}
        onPress={() => onToggleFavorite(tour.id, !tour.isFavorite)}
        accessibilityRole="button"
        accessibilityLabel={tour.isFavorite ? 'Bỏ yêu thích' : 'Thêm yêu thích'}
      >
        <Text style={[styles.heart, tour.isFavorite && styles.heartActive]}>
          {tour.isFavorite ? '♥' : '♡'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(TourItem);

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#E4EAED' },
  rowCard: { marginHorizontal: 12, marginTop: 10, flexDirection: 'row', alignItems: 'center', padding: 9, minHeight: 108 },
  rowMain: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  image: { backgroundColor: '#E1E8EB' },
  rowImage: { width: 90, height: 90, borderRadius: 8 },
  info: { flex: 1, paddingHorizontal: 10, paddingVertical: 2 },
  name: { color: '#172B3A', fontSize: 15, fontWeight: '700' },
  city: { color: '#536873', fontSize: 13, marginTop: 3 },
  detail: { color: '#536873', fontSize: 12, marginTop: 4 },
  seats: { color: '#24734D', fontSize: 12, marginTop: 4, fontWeight: '600' },
  lowSeats: { color: '#D62828' },
  price: { color: '#087F8C', fontSize: 15, fontWeight: '800', marginTop: 5 },
  favoriteButton: { width: 38, height: 44, alignItems: 'center', justifyContent: 'center' },
  heart: { color: '#596B73', fontSize: 28 },
  heartActive: { color: '#E63946' },
  compactCard: { width: 160, minHeight: 190, marginBottom: 6 },
  compactMain: { flex: 1 },
  compactImage: { width: '100%', aspectRatio: 4 / 3 },
  compactInfo: { paddingHorizontal: 8, paddingTop: 8, paddingBottom: 10 },
  compactFavoriteButton: { position: 'absolute', top: 5, right: 5, width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.92)' },
});
