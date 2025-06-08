# INT3306_QAirline

## Thành Viên
* Nguyễn Đức Thiện 22021164
* Nguyễn Kiên Trung 2202****
* Lê Thái Sơn 22021185

## Chức năng

### Chức năng cho khách hàng
* Xem thông tin các chuyến bay mình đã đặt
* Tìm kiếm chuyến bay dựa trên điểm đến, điểm đi và ngày bay
* Đặt vé máy bay
* Huỷ vé (trong thời gian được huỷ)
* Xem các bài đăng, khuyến mãi,... được đăng trên trang web

### Đối với admin
* Đăng thông báo, khuyến mãi,... lên web
* Quản lý (sửa, thêm thông tin,...) các chuyến bay, hãng bay đối tác,...
* Sửa, thêm thông tin các tàu bay
* Quản lý (xem, sửa thông tin, xoá/huỷ) đặt chỗ

## Chạy project 
### Yêu cầu với môi trường trước khi chạy
* Nodejs và npm (backend)

### Các bước chạy
1. Clone project này về, sau đó:
```bash
cd INT3306-QAirline
```

2. Chạy backend:
```bash
cd server
npm install
npm start
```
Backend sẽ được chạy ở port 5000

3. Chạy frontend
```bash
cd client
npm install
npm start
```
Frontend được chạy ở port 5001.

Giao diện người dùng
```bash
http://localhost:5001/
```

Giao diện admin
```bash
http://localhost:5001/admin
```