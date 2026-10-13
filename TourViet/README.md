# Tour Việt — bài giữa kỳ Lập trình thiết bị di động

## 1. Cài đặt
1. Cài Node.js LTS và VS Code.
2. Giải nén thư mục dự án.
3. Mở terminal tại thư mục `TourViet`, chạy:
   ```bash
   npm install
   ```
4. Chạy app:
   ```bash
   npx expo start
   ```
   Quét QR bằng Expo Go hoặc nhấn `a`/`i` nếu môi trường đã cấu hình.

## 2. Tạo API MockAPI (bắt buộc)
1. Vào https://mockapi.io/ và tạo project.
2. Tạo resource tên `tours`.
3. Các field cần có: `name` (string), `city` (string), `days` (number), `price` (number), `seats` (number), `departure` (string), `image` (string), `isFavorite` (boolean). `id` do MockAPI tự tạo.
4. Thêm ít nhất 12 bản ghi, ít nhất 4 thành phố. Cần có ít nhất 2 tour `seats = 0`, 2 tour `seats` từ 1 đến 3, và 2 tour `isFavorite = true`.
5. Bản ghi đầu tiên phải có tên sinh viên trong `name`, ví dụ `Đà Lạt mộng mơ cùng Nguyễn Trọng Tiến`.
6. Sao chép endpoint resource, dạng `https://...mockapi.io/api/v1/tours`, rồi thay giá trị `API_URL` trong `App.tsx`.
7. Thay `MSSV_CUA_BAN` và `HO TEN SINH VIEN` trong `App.tsx`.

Ví dụ dữ liệu (tạo đủ 12 bản ghi trên MockAPI; thay tên ở bản ghi đầu tiên):
```json
[
  {"name":"Đà Lạt mộng mơ cùng Nguyễn Trọng Tiến","city":"Đà Lạt","days":3,"price":3590000,"seats":0,"departure":"2026-11-05","image":"https://images.unsplash.com/photo-1470770841072-f978cf4d019e","isFavorite":true},
  {"name":"Khám phá Đà Lạt","city":"Đà Lạt","days":2,"price":2290000,"seats":2,"departure":"2026-11-12","image":"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee","isFavorite":false},
  {"name":"Săn mây Đà Lạt","city":"Đà Lạt","days":3,"price":3190000,"seats":8,"departure":"2026-12-01","image":"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b","isFavorite":true},
  {"name":"Phố cổ Hội An","city":"Hội An","days":2,"price":1890000,"seats":0,"departure":"2026-11-08","image":"https://images.unsplash.com/photo-1528127269322-539801943592","isFavorite":false},
  {"name":"Đêm đèn lồng Hội An","city":"Hội An","days":2,"price":1990000,"seats":3,"departure":"2026-11-20","image":"https://images.unsplash.com/photo-1516483638261-f4dbaf036963","isFavorite":false},
  {"name":"Khám phá Huế","city":"Huế","days":3,"price":2790000,"seats":15,"departure":"2026-11-09","image":"https://images.unsplash.com/photo-1500534623283-312aade485b7","isFavorite":false},
  {"name":"Ẩm thực cố đô","city":"Huế","days":2,"price":1590000,"seats":6,"departure":"2026-12-02","image":"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4","isFavorite":false},
  {"name":"Hà Nội nghìn năm","city":"Hà Nội","days":3,"price":2990000,"seats":12,"departure":"2026-11-11","image":"https://images.unsplash.com/photo-1509030450996-dd1a26ab6c23","isFavorite":false},
  {"name":"Ẩm thực Hà Nội","city":"Hà Nội","days":1,"price":990000,"seats":4,"departure":"2026-11-25","image":"https://images.unsplash.com/photo-1555939594-58d7cb561ad1","isFavorite":false},
  {"name":"Biển Nha Trang","city":"Nha Trang","days":4,"price":4590000,"seats":20,"departure":"2026-11-14","image":"https://images.unsplash.com/photo-1500375592092-40eb2168fd21","isFavorite":false},
  {"name":"Lặn biển Nha Trang","city":"Nha Trang","days":2,"price":2590000,"seats":7,"departure":"2026-12-05","image":"https://images.unsplash.com/photo-1519046904884-53103b34b206","isFavorite":false},
  {"name":"Nha Trang cuối tuần","city":"Nha Trang","days":2,"price":2190000,"seats":10,"departure":"2026-12-18","image":"https://images.unsplash.com/photo-1469474968028-56623f02e42e","isFavorite":false}
]
```

## 3. Chạy test
```bash
npm test
```
Các test bao gồm nhóm và sắp xếp tour, định dạng ngày, nhãn chỗ, compact/normal, sự kiện nút tim và nhấn tên tour.

## 4. Đối chiếu 7 câu
- Câu 1: `SafeAreaProvider`, `SafeAreaView`, header, MSSV/họ tên, `TextInput` + `useState`.
- Câu 2: GET, `groupByCity`, `SectionList`, `keyExtractor`, sticky headers, loading.
- Câu 3: `TourItem`, `React.memo`, ảnh, ngày, giá, số chỗ, Alert và nút tim riêng.
- Câu 4: prop `compact`, ảnh 4:3, tim overlay, `FlatList` yêu thích nằm trong `ListHeaderComponent`.
- Câu 5: PUT, cập nhật lạc quan, rollback và Alert lỗi.
- Câu 6: `useMemo`, `trim`, tìm không phân biệt hoa thường, `ListEmptyComponent`, `RefreshControl`.
- Câu 7: hai file test trong `__tests__`.

## 5. Lưu ý
- MockAPI phải có dữ liệu thật; URL mẫu `YOUR_PROJECT` sẽ không chạy nếu chưa thay.
- Đề yêu cầu ảnh chụp toàn màn hình có ngày giờ sau khi hoàn thành từng câu. Hãy tự chụp màn hình môi trường làm bài để làm minh chứng.
