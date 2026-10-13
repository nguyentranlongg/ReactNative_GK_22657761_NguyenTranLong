import { formatDate, getSeatLabel, groupByCity } from '../utils/tour';
import { Tour } from '../components/TourItem';

const makeTour = (id: string, city: string, departure: string): Tour => ({
  id, name: `Tour ${id}`, city, days: 3, price: 3590000, seats: 10,
  departure, image: 'https://example.com/tour.jpg', isFavorite: false,
});

describe('groupByCity', () => {
  it('nhóm thành phố và sắp xếp tên thành phố A-Z', () => {
    const result = groupByCity([
      makeTour('1', 'Huế', '2026-11-01'),
      makeTour('2', 'Đà Lạt', '2026-11-01'),
      makeTour('3', 'Hà Nội', '2026-11-01'),
      makeTour('4', 'Đà Lạt', '2026-10-01'),
    ]);
    expect(result).toHaveLength(3);
    expect(result.map(s => s.title)).toEqual(['Đà Lạt', 'Hà Nội', 'Huế']);
  });

  it('sắp xếp tour trong cùng thành phố theo ngày tăng dần', () => {
    const result = groupByCity([
      makeTour('1', 'Đà Lạt', '2026-12-01'),
      makeTour('2', 'Đà Lạt', '2026-10-01'),
      makeTour('3', 'Đà Lạt', '2026-11-01'),
    ]);
    expect(result[0].data.map(t => t.departure)).toEqual([
      '2026-10-01', '2026-11-01', '2026-12-01',
    ]);
  });
});

describe('formatDate', () => {
  it('đổi YYYY-MM-DD sang DD/MM/YYYY', () => {
    expect(formatDate('2026-11-05')).toBe('05/11/2026');
  });
});

describe('getSeatLabel', () => {
  it('xử lý các giá trị biên 0, 3, 4', () => {
    expect(getSeatLabel(0)).toBe('Hết chỗ');
    expect(getSeatLabel(3)).toBe('Chỉ còn 3 chỗ');
    expect(getSeatLabel(4)).toBe('Còn 4 chỗ');
  });
});
