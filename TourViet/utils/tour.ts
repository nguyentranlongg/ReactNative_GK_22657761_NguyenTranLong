import { Tour } from '../components/TourItem';

export type TourSection = { title: string; data: Tour[] };

export function groupByCity(tours: Tour[]): TourSection[] {
  const grouped = new Map<string, Tour[]>();
  tours.forEach(tour => {
    const list = grouped.get(tour.city) ?? [];
    list.push(tour);
    grouped.set(tour.city, list);
  });

  return Array.from(grouped.entries())
    .sort(([cityA], [cityB]) => cityA.localeCompare(cityB, 'vi'))
    .map(([city, data]) => ({
      title: city,
      data: data.sort((a, b) => a.departure.localeCompare(b.departure)),
    }));
}

export function formatDate(date: string): string {
  const parts = date.split('-');
  if (parts.length !== 3) return date;
  const [year, month, day] = parts;
  return `${day}/${month}/${year}`;
}

export function getSeatLabel(seats: number): string {
  if (seats <= 0) return 'Hết chỗ';
  if (seats <= 3) return `Chỉ còn ${seats} chỗ`;
  return `Còn ${seats} chỗ`;
}
