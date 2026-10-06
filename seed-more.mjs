import { db } from './lib/db.mjs';
import { randomBytes } from 'crypto';

// Xóa dữ liệu cũ nếu muốn, hoặc cứ thêm đè. Ở đây tôi sẽ chỉ thêm mới những cái chưa có.
// Hoặc có thể xóa bớt một vài sách cũ và insert lại để data đẹp.

const categories = [
  { name: 'Văn học', slug: 'van-hoc' },
  { name: 'Kinh tế', slug: 'kinh-te' },
  { name: 'Thiếu nhi', slug: 'thieu-nhi' },
  { name: 'Kỹ năng sống', slug: 'ky-nang-song' },
  { name: 'Ngoại ngữ', slug: 'ngoai-ngu' },
  { name: 'Tâm lý', slug: 'tam-ly' }
];

const articles = [
  { title: 'Tọa đàm: Đọc sách thế kỷ 21', slug: 'toa-dam-doc-sach-the-ky-21', category: 'Sự kiện', summary: 'Cùng chuyên gia bàn luận về thói quen đọc sách trong kỷ nguyên số và AI.', content: 'Nội dung bài viết chi tiết...' },
  { title: 'Top 10 cuốn sách đáng đọc nhất năm 2026', slug: 'top-10-sach-2026', category: 'Tin tức', summary: 'Những tựa sách làm mưa làm gió trên các bảng xếp hạng bán chạy toàn cầu.', content: 'Nội dung bài viết chi tiết...' },
  { title: 'Bí quyết chọn sách cho trẻ em mầm non', slug: 'bi-quyet-chon-sach-tre-em', category: 'Góc tư vấn', summary: 'Làm thế nào để trẻ yêu thích việc đọc ngay từ nhỏ?', content: 'Nội dung bài viết chi tiết...' },
  { title: 'Chương trình khuyến mãi: Mùa hè rực rỡ', slug: 'khuyen-mai-mua-he', category: 'Khuyến mãi', summary: 'Giảm giá lên đến 50% tất cả các tựa sách thiếu nhi và văn học.', content: 'Nội dung bài viết chi tiết...' }
];

const books = [
  // Văn học
  { title: 'Cây Cam Ngọt Của Tôi', author: 'José Mauro de Vasconcelos', category: 'Văn học', sku: 'VH001', slug: 'cay-cam-ngot-cua-toi', price: 90000, list_price: 115000, stock: 150, rating: 4.8 },
  { title: 'Nhà Giả Kim', author: 'Paulo Coelho', category: 'Văn học', sku: 'VH002', slug: 'nha-gia-kim', price: 75000, list_price: 89000, stock: 320, rating: 4.9 },
  { title: 'Hai Số Phận', author: 'Jeffrey Archer', category: 'Văn học', sku: 'VH003', slug: 'hai-so-phan', price: 120000, list_price: 155000, stock: 85, rating: 4.7 },
  { title: 'Trăm Năm Cô Đơn', author: 'Gabriel García Márquez', category: 'Văn học', sku: 'VH004', slug: 'tram-nam-co-don', price: 135000, list_price: 180000, stock: 40, rating: 4.6 },
  
  // Kinh tế
  { title: 'Nghĩ Giàu Làm Giàu', author: 'Napoleon Hill', category: 'Kinh tế', sku: 'KT001', slug: 'nghi-giau-lam-giau', price: 85000, list_price: 110000, stock: 200, rating: 4.8 },
  { title: 'Cha Giàu Cha Nghèo', author: 'Robert T. Kiyosaki', category: 'Kinh tế', sku: 'KT002', slug: 'cha-giau-cha-ngheo', price: 95000, list_price: 120000, stock: 450, rating: 5.0 },
  { title: 'Tư Duy Nhanh Và Chậm', author: 'Daniel Kahneman', category: 'Kinh tế', sku: 'KT003', slug: 'tu-duy-nhanh-va-cham', price: 150000, list_price: 195000, stock: 90, rating: 4.7 },
  
  // Kỹ năng sống
  { title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', category: 'Kỹ năng sống', sku: 'KN001', slug: 'dac-nhan-tam', price: 68000, list_price: 85000, stock: 500, rating: 4.9 },
  { title: 'Thói Quen Nguyên Tử', author: 'James Clear', category: 'Kỹ năng sống', sku: 'KN002', slug: 'thoi-quen-nguyen-tu', price: 115000, list_price: 145000, stock: 310, rating: 4.8 },
  { title: 'Đời Ngắn Đừng Ngủ Dài', author: 'Robin Sharma', category: 'Kỹ năng sống', sku: 'KN003', slug: 'doi-ngan-dung-ngu-dai', price: 72000, list_price: 90000, stock: 120, rating: 4.5 },

  // Tâm lý
  { title: 'Tâm Lý Học Tội Phạm', author: 'Stanton E. Samenow', category: 'Tâm lý', sku: 'TL001', slug: 'tam-ly-hoc-toi-pham', price: 145000, list_price: 185000, stock: 65, rating: 4.6 },
  { title: 'Muôn Kiếp Nhân Sinh', author: 'Nguyên Phong', category: 'Tâm lý', sku: 'TL002', slug: 'muon-kiep-nhan-sinh', price: 180000, list_price: 220000, stock: 180, rating: 4.9 },

  // Thiếu nhi
  { title: 'Dế Mèn Phiêu Lưu Ký', author: 'Tô Hoài', category: 'Thiếu nhi', sku: 'TN001', slug: 'de-men-phieu-luu-ky', price: 45000, list_price: 55000, stock: 400, rating: 5.0 },
  { title: 'Harry Potter Và Hòn Đá Phù Thủy', author: 'J.K. Rowling', category: 'Thiếu nhi', sku: 'TN002', slug: 'harry-potter-1', price: 165000, list_price: 200000, stock: 250, rating: 4.9 },
  { title: 'Hoàng Tử Bé', author: 'Antoine de Saint-Exupéry', category: 'Thiếu nhi', sku: 'TN003', slug: 'hoang-tu-be', price: 55000, list_price: 70000, stock: 320, rating: 4.8 },
  
  // Ngoại ngữ
  { title: 'Hack Não 1500 Từ Tiếng Anh', author: 'Nguyễn Văn Hiệp', category: 'Ngoại ngữ', sku: 'NN001', slug: 'hack-nao-1500', price: 295000, list_price: 395000, stock: 100, rating: 4.7 },
  { title: 'Giải Thích Ngữ Pháp Tiếng Anh', author: 'Mai Lan Hương', category: 'Ngoại ngữ', sku: 'NN002', slug: 'ngu-phap-mai-lan-huong', price: 105000, list_price: 140000, stock: 210, rating: 4.8 }
];

console.log('Bắt đầu chèn dữ liệu mẫu...');

// 1. Thêm Categories
const insertCat = db.prepare('INSERT OR IGNORE INTO categories (name, slug, active) VALUES (?, ?, 1)');
categories.forEach(c => insertCat.run(c.name, c.slug));

// 2. Thêm Articles
const insertArt = db.prepare('INSERT OR IGNORE INTO articles (title, slug, category, summary, content) VALUES (?, ?, ?, ?, ?)');
articles.forEach(a => insertArt.run(a.title, a.slug, a.category, a.summary, a.content));

// 3. Thêm Products (xóa hết rồi thêm lại để clean data)
db.exec('DELETE FROM products WHERE id > 0'); // Xóa sách hiện có
const insertProd = db.prepare(`
  INSERT INTO products (title, author, category, sku, slug, price, list_price, stock, description, status, rating) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'ACTIVE', ?)
`);
books.forEach(b => {
  insertProd.run(
    b.title, b.author, b.category, b.sku, b.slug, b.price, b.list_price, b.stock, 
    `Cuốn sách **${b.title}** của tác giả ${b.author} là một trong những tác phẩm được tìm kiếm nhiều nhất. Nội dung sâu sắc, mang lại nhiều giá trị nhân văn và kiến thức thực tiễn cho độc giả. Đừng bỏ lỡ cơ hội sở hữu cuốn sách tuyệt vời này tại Dalifa Books!`, 
    b.rating
  );
});

console.log('Đã chèn dữ liệu thành công!');
