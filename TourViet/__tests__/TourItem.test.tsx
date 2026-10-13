import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import TourItem, { Tour } from '../components/TourItem';

const tour: Tour = {
  id: 'tour-1',
  name: 'Đà Lạt mộng mơ',
  city: 'Đà Lạt',
  days: 3,
  price: 3590000,
  seats: 3,
  departure: '2026-11-05',
  image: 'https://example.com/tour.jpg',
  isFavorite: false,
};

describe('TourItem', () => {
  it('compact không hiển thị thành phố', () => {
    const { queryByText } = render(
      <TourItem tour={tour} compact onPress={jest.fn()} onToggleFavorite={jest.fn()} />
    );
    expect(queryByText('Đà Lạt')).toBeNull();
  });

  it('không compact thì hiển thị thành phố', () => {
    const { getByText } = render(
      <TourItem tour={tour} onPress={jest.fn()} onToggleFavorite={jest.fn()} />
    );
    expect(getByText('Đà Lạt')).toBeTruthy();
  });

  it('nhấn nút tim gọi toggle đúng một lần và không gọi onPress', () => {
    const onPress = jest.fn();
    const onToggleFavorite = jest.fn();
    const { getByTestId } = render(
      <TourItem tour={tour} onPress={onPress} onToggleFavorite={onToggleFavorite} />
    );

    fireEvent.press(getByTestId('fav-btn'));

    expect(onToggleFavorite).toHaveBeenCalledTimes(1);
    expect(onToggleFavorite).toHaveBeenCalledWith('tour-1', true);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('nhấn phần tên tour gọi onPress với object tour', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <TourItem tour={tour} onPress={onPress} onToggleFavorite={jest.fn()} />
    );

    fireEvent.press(getByText('Đà Lạt mộng mơ'));
    expect(onPress).toHaveBeenCalledWith(tour);
  });
});
