import { DatabaseSync } from 'node:sqlite';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
const folder = process.env.DATA_DIR || path.join(process.cwd(), 'data');
mkdirSync(folder, { recursive: true });
export const db = new DatabaseSync(path.join(folder, 'dalifa.sqlite'));
db.exec(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;
CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY,slug TEXT UNIQUE NOT NULL,title TEXT NOT NULL,author TEXT NOT NULL,category TEXT NOT NULL,sku TEXT UNIQUE NOT NULL,isbn TEXT DEFAULT '',price INTEGER NOT NULL CHECK(price>=0),list_price INTEGER NOT NULL CHECK(list_price>=0),stock INTEGER NOT NULL CHECK(stock>=0),reserved INTEGER NOT NULL DEFAULT 0 CHECK(reserved>=0 AND reserved<=stock),description TEXT NOT NULL, color TEXT DEFAULT '#164b41',status TEXT DEFAULT 'ACTIVE');
CREATE TABLE IF NOT EXISTS admins(id INTEGER PRIMARY KEY,email TEXT UNIQUE,password TEXT NOT NULL);

CREATE TABLE IF NOT EXISTS sessions(token TEXT PRIMARY KEY,admin_id INTEGER NOT NULL REFERENCES admins(id),expires INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS carts(token TEXT,product_id INTEGER REFERENCES products(id),quantity INTEGER CHECK(quantity>0),PRIMARY KEY(token,product_id));
CREATE TABLE IF NOT EXISTS orders(id INTEGER PRIMARY KEY,code TEXT UNIQUE NOT NULL,phone TEXT NOT NULL,recipient TEXT NOT NULL,address TEXT NOT NULL,note TEXT NOT NULL,status TEXT NOT NULL DEFAULT 'PENDING',subtotal INTEGER NOT NULL,discount INTEGER NOT NULL,shipping INTEGER NOT NULL,total INTEGER NOT NULL,coupon TEXT,created TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS order_items(id INTEGER PRIMARY KEY,order_id INTEGER REFERENCES orders(id),product_id INTEGER REFERENCES products(id),title TEXT,sku TEXT,price INTEGER,quantity INTEGER);
CREATE TABLE IF NOT EXISTS history(id INTEGER PRIMARY KEY,order_id INTEGER REFERENCES orders(id),status TEXT,created TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS inventory_history(id INTEGER PRIMARY KEY,product_id INTEGER REFERENCES products(id),kind TEXT,quantity INTEGER,note TEXT,created TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS coupons(code TEXT PRIMARY KEY,amount INTEGER,min_total INTEGER,limit_count INTEGER,used INTEGER DEFAULT 0,active INTEGER DEFAULT 1);
CREATE TABLE IF NOT EXISTS audit(id INTEGER PRIMARY KEY,admin_id INTEGER,action TEXT,detail TEXT,created TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS categories(id INTEGER PRIMARY KEY, name TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, active INTEGER DEFAULT 1);
CREATE TABLE IF NOT EXISTS articles(id INTEGER PRIMARY KEY, title TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, cover TEXT, summary TEXT, content TEXT, category TEXT, created TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS settings(key TEXT PRIMARY KEY, value TEXT NOT NULL);
`);
export function hashPassword(password) {const salt=randomBytes(16).toString('hex');return salt+':'+scryptSync(password,salt,64).toString('hex');}
export function verifyPassword(password, hash) {const [salt,value]=hash.split(':');const a=scryptSync(password,salt,64),b=Buffer.from(value,'hex');return a.length===b.length&&timingSafeEqual(a,b);}
try { db.exec('ALTER TABLE products ADD COLUMN rating REAL DEFAULT 5.0;'); } catch(e) {}

if (!db.prepare('SELECT id FROM admins LIMIT 1').get()) db.prepare('INSERT INTO admins(email,password) VALUES (?,?)').run(process.env.ADMIN_EMAIL||'admin@dalifabooks.local',hashPassword(process.env.ADMIN_PASSWORD||'DalifaLocal2026!'));
if (!db.prepare('SELECT id FROM products LIMIT 1').get()) {
 const books=[['nha-gia-kim','Nhà Giả Kim','Paulo Coelho','Văn học',99000,150000,50,'Một hành trình tìm kiếm ước mơ và khám phá những điều quý giá trong cuộc sống.','#bf7e21'],['mat-biec','Mắt Biếc','Nguyễn Nhật Ánh','Văn học',85000,110000,30,'Câu chuyện tuổi thơ, tình bạn và những rung động đầu đời.','#194c67'],['hoang-tu-be','Hoàng Tử Bé','Antoine de Saint-Exupéry','Thiếu nhi',65000,90000,40,'Câu chuyện nhỏ về tình yêu, tình bạn và cách nhìn thế giới.','#255868'],['atomic-habits','Thói Quen Tí Hon','James Clear','Kỹ năng',149000,189000,25,'Khám phá sức mạnh của những thay đổi nhỏ trong thói quen hằng ngày.','#a96c53'],['tu-duy-nhanh-va-cham','Tư Duy Nhanh Và Chậm','Daniel Kahneman','Kinh tế',179000,239000,18,'Một góc nhìn về cách chúng ta suy nghĩ và đưa ra quyết định.','#313d59'],['cay-cam-ngot','Cây Cam Ngọt Của Tôi','José Mauro de Vasconcelos','Văn học',108000,145000,35,'Thế giới tuổi thơ đầy xúc cảm của cậu bé Zezé.','#a45a24'],['english-grammar','English Grammar in Use','Raymond Murphy','Ngoại ngữ',199000,250000,12,'Sách luyện tập ngữ pháp tiếng Anh dành cho người tự học.','#284b96'],['doraemon','Doraemon — Tập 1','Fujiko F. Fujio','Thiếu nhi',25000,25000,60,'Những cuộc phiêu lưu vui nhộn của mèo máy và những người bạn.','#147e9a']];
 const stmt=db.prepare('INSERT INTO products(slug,title,author,category,sku,price,list_price,stock,description,color) VALUES (?,?,?,?,?,?,?,?,?,?)');
 books.forEach((b,i)=>stmt.run(b[0],b[1],b[2],b[3],`DLF${String(i+1).padStart(4,'0')}`,b[4],b[5],b[6],b[7],b[8]));
 db.prepare('INSERT OR IGNORE INTO coupons(code,amount,min_total,limit_count) VALUES (?,?,?,?)').run('DALIFA50',50000,500000,100);
}
if (!db.prepare('SELECT id FROM categories LIMIT 1').get()) {
  const cats = [
    ['Văn học', 'van-hoc'], ['Kinh tế', 'kinh-te'], ['Kỹ năng', 'ky-nang'],
    ['Ngoại ngữ', 'ngoai-ngu'], ['Tiếng Anh', 'tieng-anh'], ['Thiếu nhi', 'thieu-nhi']
  ];
  cats.forEach(c => db.prepare('INSERT INTO categories(name, slug) VALUES (?,?)').run(c[0], c[1]));
}
if (!db.prepare('SELECT id FROM articles LIMIT 1').get()) {
  db.prepare("INSERT INTO articles(title, slug, summary, content, category) VALUES ('Lễ hội sách mùa xuân 2026', 'le-hoi-sach-mua-xuan', 'Hàng ngàn đầu sách giảm giá mạnh dịp đầu năm.', 'Nội dung chi tiết về lễ hội sách mùa xuân 2026 tại Dalifa Books...', 'Sự kiện')").run();
  db.prepare("INSERT INTO articles(title, slug, summary, content, category) VALUES ('Cách đọc sách hiệu quả', 'cach-doc-sach-hieu-qua', 'Phương pháp giúp bạn đọc 100 trang sách mỗi ngày.', 'Nội dung chi tiết...', 'Tin tức')").run();
}
if (!db.prepare("SELECT key FROM settings WHERE key='about_title'").get()) {
  db.prepare("INSERT INTO settings(key, value) VALUES ('about_title', 'Về Dalifa Books')").run();
  db.prepare("INSERT INTO settings(key, value) VALUES ('about_text', 'Dalifa Books là hệ thống nhà sách trực tuyến hàng đầu, mang đến cho bạn hàng vạn đầu sách chất lượng cao từ các nhà xuất bản uy tín trong và ngoài nước. Sứ mệnh của chúng tôi là lan tỏa tri thức, khơi dậy niềm đam mê đọc sách trong cộng đồng.')").run();
  db.prepare("INSERT INTO settings(key, value) VALUES ('about_image', 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200&auto=format&fit=crop')").run();
}
import { ABOUT_DEFAULT } from './about-default.mjs';
export const SETTING_KEYS = ['contact_address','contact_phone','contact_email','about_html','policy_payment','policy_shipping','policy_privacy','policy_return','stores_html','recruitment_html'];
{
  const defaults = {
    contact_address: 'Tầng 3 Dream Home Center 11a ngõ 282 Nguyễn Huy Tưởng, Thanh Xuân, Hà Nội',
    contact_phone: '0932 329 959',
    contact_email: 'mkt.dalifabooks@gmail.com',
    about_html: ABOUT_DEFAULT,
    policy_payment: '<p>Nội dung chính sách thanh toán đang được cập nhật.</p>',
    policy_shipping: '<p>Nội dung chính sách vận chuyển đang được cập nhật.</p>',
    policy_privacy: '<p>Nội dung chính sách bảo mật đang được cập nhật.</p>',
    policy_return: '<p>Nội dung chính sách đổi trả đang được cập nhật.</p>',
    stores_html: '<p>Thông tin hệ thống nhà sách đang được cập nhật.</p>',
    recruitment_html: '<p>Thông tin tuyển dụng đang được cập nhật.</p>'
  };
  for (const [k, v] of Object.entries(defaults)) db.prepare('INSERT OR IGNORE INTO settings(key, value) VALUES (?,?)').run(k, v);
}
export class AppError extends Error {constructor(code,message,status=400){super(message);this.code=code;this.status=status;}}
export function fail(code,message,status=400){throw new AppError(code,message,status);}
export function integer(value,min=0,max=1e9){if(!Number.isSafeInteger(value)||value<min||value>max)fail('INVALID_INPUT','Số lượng hoặc số tiền không hợp lệ.');return value;}
export function string(value,max=200,required=true){if(typeof value!=='string'||value.trim().length>max||(required&&!value.trim()))fail('INVALID_INPUT','Vui lòng kiểm tra thông tin đã nhập.');return value.trim();}
export function transaction(fn){db.exec('BEGIN IMMEDIATE');try {const result=fn();db.exec('COMMIT');return result;}catch(e){db.exec('ROLLBACK');throw e;}}
export function products(admin=false){return db.prepare(`SELECT *,stock-reserved AS available FROM products ${admin?'':"WHERE status='ACTIVE'"} ORDER BY id DESC`).all();}
export function cart(token){return db.prepare("SELECT p.*,c.quantity,p.stock-p.reserved AS available FROM carts c JOIN products p ON p.id=c.product_id WHERE c.token=?").all(token);}
export function setCart(token,id,quantity){integer(id,1);integer(quantity,0,99);const p=db.prepare("SELECT *,stock-reserved AS available FROM products WHERE id=? AND status='ACTIVE'").get(id);if(!p)fail('NOT_FOUND','Không tìm thấy sách.',404);if(quantity>p.available)fail('INSUFFICIENT_STOCK',`Chỉ còn ${p.available} cuốn sách.`);if(!quantity)db.prepare('DELETE FROM carts WHERE token=? AND product_id=?').run(token,id);else db.prepare('INSERT INTO carts VALUES (?,?,?) ON CONFLICT(token,product_id) DO UPDATE SET quantity=excluded.quantity').run(token,id,quantity);return cart(token);}
export function quote(token,coupon=''){const items=cart(token);if(!items.length)fail('EMPTY_CART','Giỏ hàng chưa có sách.');for(const p of items)if(p.status!=='ACTIVE'||p.quantity>p.available)fail('INSUFFICIENT_STOCK',`${p.title} không đủ tồn kho.`);const subtotal=items.reduce((s,p)=>s+p.price*p.quantity,0);let discount=0;const code=typeof coupon==='string'?coupon.trim().toUpperCase():'';if(code){const c=db.prepare('SELECT * FROM coupons WHERE code=? AND active=1').get(code);if(!c||c.used>=c.limit_count)fail('INVALID_COUPON','Mã giảm giá không khả dụng.');if(subtotal<c.min_total)fail('COUPON_MIN_TOTAL',`Đơn cần từ ${c.min_total.toLocaleString('vi-VN')}đ để dùng mã.`);discount=Math.min(c.amount,subtotal);}const shipping=subtotal-discount>=300000?0:30000;return {items,subtotal,discount,shipping,total:subtotal-discount+shipping,coupon:code};}
export function createOrder(token,input){const name=string(input.name,100),phone=string(input.phone,20).replace(/[\s.-]/g,'');if(!/^0\d{9}$/.test(phone))fail('INVALID_PHONE','Số điện thoại cần có 10 chữ số, bắt đầu bằng 0.');const address=[string(input.address,300),string(input.ward,100),string(input.province,100)].join(', ');const note=string(input.note??'',500,false);return transaction(()=>{const q=quote(token,input.coupon);const code='DLF-'+new Date().toISOString().slice(2,10).replaceAll('-','')+'-'+randomBytes(4).toString('hex').toUpperCase();const result=db.prepare('INSERT INTO orders(code,phone,recipient,address,note,subtotal,discount,shipping,total,coupon) VALUES (?,?,?,?,?,?,?,?,?,?)').run(code,phone,name,address,note,q.subtotal,q.discount,q.shipping,q.total,q.coupon);const id=Number(result.lastInsertRowid);for(const p of q.items){db.prepare('INSERT INTO order_items(order_id,product_id,title,sku,price,quantity) VALUES (?,?,?,?,?,?)').run(id,p.id,p.title,p.sku,p.price,p.quantity);db.prepare('UPDATE products SET reserved=reserved+? WHERE id=?').run(p.quantity,p.id);db.prepare('INSERT INTO inventory_history(product_id,kind,quantity,note) VALUES (?,?,?,?)').run(p.id,'RESERVE',p.quantity,code);}if(q.coupon)db.prepare('UPDATE coupons SET used=used+1 WHERE code=?').run(q.coupon);db.prepare('INSERT INTO history(order_id,status) VALUES (?,?)').run(id,'PENDING');db.prepare('DELETE FROM carts WHERE token=?').run(token);return orderDetail(id);});}
export function orderDetail(id){const o=db.prepare('SELECT * FROM orders WHERE id=?').get(id);if(!o)fail('NOT_FOUND','Không tìm thấy đơn hàng.',404);return {...o,items:db.prepare('SELECT * FROM order_items WHERE order_id=?').all(id),history:db.prepare('SELECT * FROM history WHERE order_id=? ORDER BY id').all(id)};}
export const transitions={PENDING:['CONFIRMED','CANCELLED'],CONFIRMED:['PACKING','CANCELLED'],PACKING:['SHIPPING','CANCELLED'],SHIPPING:['DELIVERED'],DELIVERED:[],CANCELLED:[]};
export function changeStatus(id,status,adminId){return transaction(()=>{const order=orderDetail(id);if(!transitions[order.status]?.includes(status))fail('INVALID_STATUS','Không thể chuyển sang trạng thái này.');if(status==='CANCELLED'||status==='DELIVERED'){for(const item of order.items){db.prepare('UPDATE products SET reserved=reserved-?,stock=stock-? WHERE id=?').run(item.quantity,status==='DELIVERED'?item.quantity:0,item.product_id);db.prepare('INSERT INTO inventory_history(product_id,kind,quantity,note) VALUES (?,?,?,?)').run(item.product_id,status==='DELIVERED'?'SALE':'RELEASE',item.quantity,order.code);}if(status==='CANCELLED'&&order.coupon)db.prepare('UPDATE coupons SET used=used-1 WHERE code=?').run(order.coupon);}db.prepare('UPDATE orders SET status=? WHERE id=?').run(status,id);db.prepare('INSERT INTO history(order_id,status) VALUES (?,?)').run(id,status);audit(adminId,'ORDER_STATUS',`${order.code}: ${order.status} → ${status}`);return orderDetail(id);});}
export function audit(adminId,action,detail){db.prepare('INSERT INTO audit(admin_id,action,detail) VALUES (?,?,?)').run(adminId,action,detail);}
export function saveProduct(input,id,adminId){const title=string(input.title),author=string(input.author),category=string(input.category),sku=string(input.sku,50),slug=string(input.slug,120);if(!/^[a-z0-9-]+$/.test(slug))fail('INVALID_SLUG','Đường dẫn chỉ gồm chữ thường không dấu, số và dấu gạch ngang.');const price=integer(input.price),list=integer(input.list_price),stock=integer(input.stock);if(list<price)fail('INVALID_PRICE','Giá bìa cần lớn hơn hoặc bằng giá bán.');const description=string(input.description,10000);const status=input.status==='ARCHIVED'?'ARCHIVED':'ACTIVE';return transaction(()=>{if(id){const old=db.prepare('SELECT * FROM products WHERE id=?').get(id);if(!old)fail('NOT_FOUND','Không tìm thấy sách.',404);if(stock<old.reserved)fail('RESERVED_STOCK',`Đang giữ ${old.reserved} cuốn cho đơn hàng, không thể giảm tồn thấp hơn.`);db.prepare('UPDATE products SET title=?,author=?,category=?,sku=?,slug=?,price=?,list_price=?,stock=?,description=?,status=?,isbn=? WHERE id=?').run(title,author,category,sku,slug,price,list,stock,description,status,string(input.isbn??'',50,false),id);if(stock!==old.stock)db.prepare('INSERT INTO inventory_history(product_id,kind,quantity,note) VALUES (?,?,?,?)').run(id,'ADJUST',stock-old.stock,'Điều chỉnh bởi quản trị');}else{id=Number(db.prepare('INSERT INTO products(title,author,category,sku,slug,price,list_price,stock,description,status,isbn) VALUES (?,?,?,?,?,?,?,?,?,?,?)').run(title,author,category,sku,slug,price,list,stock,description,status,string(input.isbn??'',50,false)).lastInsertRowid);db.prepare('INSERT INTO inventory_history(product_id,kind,quantity,note) VALUES (?,?,?,?)').run(id,'IMPORT',stock,'Thêm sách');}audit(adminId,'PRODUCT_SAVE',sku);return db.prepare('SELECT *,stock-reserved AS available FROM products WHERE id=?').get(id);});}
export function getCategories() { return db.prepare('SELECT * FROM categories WHERE active=1').all().map(c => ({...c})); }
export function getArticles() { return db.prepare('SELECT * FROM articles ORDER BY id DESC').all().map(a => ({...a})); }
export function getSettings() { const s = db.prepare('SELECT * FROM settings').all(); return s.reduce((a, c) => ({...a, [c.key]:c.value}), {}); }


export function saveSettings(input, adminId) {
  if (!input || typeof input !== 'object') fail('INVALID_INPUT', 'Dữ liệu không hợp lệ.');
  transaction(() => {
    for (const [k, v] of Object.entries(input)) {
      if (!SETTING_KEYS.includes(k)) continue;
      const val = string(String(v ?? ''), 200000, false);
      db.prepare('INSERT INTO settings(key, value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value').run(k, val);
    }
    audit(adminId, 'SETTINGS_SAVE', Object.keys(input).join(','));
  });
  return getSettings();
}
export function saveArticle(input, id, adminId) {
  const title = string(input.title, 200), slug = string(input.slug, 150);
  if (!/^[a-z0-9-]+$/.test(slug)) fail('INVALID_SLUG', 'Đường dẫn chỉ gồm chữ thường không dấu, số và dấu gạch ngang.');
  const category = string(input.category || 'Tin tức', 50), summary = string(input.summary ?? '', 500, false), content = string(input.content ?? '', 200000, false), cover = string(input.cover ?? '', 500, false);
  if (id) {
    if (!db.prepare('SELECT id FROM articles WHERE id=?').get(id)) fail('NOT_FOUND', 'Không tìm thấy bài viết.', 404);
    db.prepare('UPDATE articles SET title=?,slug=?,cover=?,summary=?,content=?,category=? WHERE id=?').run(title, slug, cover, summary, content, category, id);
  } else {
    id = Number(db.prepare('INSERT INTO articles(title,slug,cover,summary,content,category) VALUES (?,?,?,?,?,?)').run(title, slug, cover, summary, content, category).lastInsertRowid);
  }
  audit(adminId, 'ARTICLE_SAVE', slug);
  return db.prepare('SELECT * FROM articles WHERE id=?').get(id);
}
export function deleteArticle(id, adminId) {
  const a = db.prepare('SELECT * FROM articles WHERE id=?').get(id);
  if (!a) fail('NOT_FOUND', 'Không tìm thấy bài viết.', 404);
  db.prepare('DELETE FROM articles WHERE id=?').run(id);
  audit(adminId, 'ARTICLE_DELETE', a.slug);
  return {};
}
export function getArticle(slug) { const a = db.prepare('SELECT * FROM articles WHERE slug=?').get(slug); return a ? { ...a } : null; }
