# DALIFA BOOKS — Localhost 0.1

Bản đầu chạy trên máy cá nhân: cửa hàng tiếng Việt, tìm theo tên/tác giả/SKU/ISBN, danh mục, sắp xếp giá, chi tiết sách, giỏ hàng, checkout COD, voucher, tra cứu đơn và quản trị.

## Chạy trên macOS / Windows / Linux

1. Cài **Node.js 24 LTS** (bản này cần `node:sqlite`, không dùng Node 20).
2. Giải nén ZIP, mở Terminal trong thư mục `dalifa-books`.
3. Chạy:

```sh
npm ci
npm run dev
```

4. Mở **http://localhost:3000**. Admin: **http://localhost:3000/admin**.
5. Dừng bằng Ctrl+C. Lần sau chỉ cần chạy `npm run dev`.

Nếu cổng 3000 đang được dùng: `npm run dev -- --port 3001`, rồi mở localhost:3001.

### Tài khoản quản trị thử nghiệm

- Email: `admin@dalifabooks.local`
- Mật khẩu: `DalifaLocal2026!`
- Trong Admin có mục **Đổi mật khẩu**. Mật khẩu mới tối thiểu 12 ký tự; sau đổi sẽ đăng nhập lại.
- Muốn đặt tài khoản ban đầu khác: sao chép `.env.example` thành `.env.local`, sửa email/mật khẩu **trước lần chạy đầu**. Thay đổi biến môi trường không ghi đè tài khoản đã tạo.

## Thử một đơn hàng

1. Thêm sách vào giỏ hoặc chọn Mua ngay.
2. Điền tên, số điện thoại 10 chữ số bắt đầu bằng 0, tỉnh/thành, phường/xã, địa chỉ.
3. Có thể thử `DALIFA50`: giảm 50.000đ cho tiền sách từ 500.000đ, 100 lượt dùng.
4. Phí giao hàng mẫu 30.000đ; miễn phí khi tiền sách sau giảm giá từ 300.000đ.
5. Bấm Đặt hàng COD, lưu mã đơn. Tra cứu bằng mã đơn và số điện thoại đã đặt.
6. Vào Admin → Đơn hàng → Chi tiết: Chờ xác nhận → Đã xác nhận → Đóng gói → Đang giao → Giao thành công.
7. Có thể hủy đơn trước khi chuyển Đang giao. Hủy sẽ trả hàng giữ và lượt voucher.

## Quản trị

- Tổng quan: doanh thu đơn giao thành công (không gồm phí ship), tổng số đơn, đơn mới, sách sắp hết.
- Sản phẩm: thêm/sửa tên, tác giả, danh mục, SKU, ISBN, đường dẫn, giá bìa, giá bán, tồn kho và mô tả.
- Lưu trữ sách: đổi trạng thái sang Lưu trữ. Không xóa dữ liệu liên quan tới đơn cũ.
- Kho: xem số tồn thực, số đang giữ, số khả dụng và lịch sử nhập/điều chỉnh/giữ/trả/xuất bán.
- Đơn hàng: tìm mã đơn/tên khách/SĐT, lọc trạng thái, xem lịch sử và cập nhật theo luồng hợp lệ.

## Dữ liệu

Tự khởi tạo 8 đầu sách mẫu khi chạy lần đầu. Bìa là bảng chữ minh họa, **không phải ảnh bìa thật**; giá, thông tin sách và phí ship là dữ liệu thử.

SQLite lưu ở `data/dalifa.sqlite`, dữ liệu còn nguyên sau khi tắt/mở máy. Sao lưu: dừng ứng dụng, sao chép toàn bộ thư mục `data/`. Không gửi bản sao database chứa dữ liệu khách hàng cho người không liên quan.

Muốn làm lại dữ liệu mẫu: dừng ứng dụng rồi đổi tên thư mục `data/` thành `data-backup/`; lần mở tiếp theo tự tạo dữ liệu mới.

## Kiểm tra và chạy bản build

```sh
npm test
npm run build
npm run test:http
npm start
```

`npm test` dùng database tạm, kiểm tra tính tiền ở server, tranh chấp tồn, rollback, voucher, giữ/trả/xuất kho và mật khẩu. `test:http` khởi động riêng tại cổng 3011, dùng database tạm và kiểm tra API/quyền quản trị/tra cứu/CSRF. Nó cần bản build trước.

## Kiến trúc và giới hạn bản đầu

- Next.js 16 + React 19 + TypeScript, API server Node.js, SQLite tích hợp Node 24; không yêu cầu Docker, PostgreSQL hoặc dịch vụ có phí.
- Nghiệp vụ tập trung trong `lib/db.mjs`; frontend không quyết định giá/tổng tiền.
- Transaction `BEGIN IMMEDIATE` bảo đảm đơn hàng, kho, voucher và lịch sử cùng thành công hoặc rollback. Giá/tên/SKU được chụp lại trong từng dòng đơn.
- Cookie HttpOnly, SameSite Strict; session admin 8 giờ; mật khẩu scrypt có salt, kiểm tra origin cho thao tác ghi; API quản trị kiểm tra quyền tại backend.
- Chỉ bind loopback 127.0.0.1. Dùng cùng một hostname localhost xuyên suốt để giữ cookie.
- Đây là bản localhost, **chưa phải toàn bộ DALIFA BOOKS 1.0**: chưa có tài khoản khách hàng, Excel import, upload ảnh, blog/banner/CMS, phân quyền nhân viên, giao vận thật, thanh toán QR, đối soát COD, trả hàng và SEO từng URL sách.
- Các màn hình cửa hàng hiện dùng hash URL (`#book/...`). Bản production cần chuyển thành route sách riêng, bổ sung SEO và chuyển PostgreSQL/Prisma theo kiến trúc đã dự kiến.
- Phần giới hạn truy cập dùng bộ nhớ của một tiến trình; chưa phù hợp nhiều server. Chưa bật HTTPS, email, backup tự động và monitoring. Không mở bản thử này lên Internet.

## Cấu trúc

- `app/page.tsx`: cửa hàng và các luồng mua/tra cứu.
- `app/admin/page.tsx`: quản trị.
- `app/api/[...path]/route.ts`: API.
- `app/globals.css`: giao diện responsive.
- `lib/db.mjs`: schema, dữ liệu mẫu, nghiệp vụ và transaction.
- `tests/`: kiểm tra nghiệp vụ và API.

Không cần mua domain hay hosting để dùng bản này.
