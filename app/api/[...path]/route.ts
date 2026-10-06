import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';
import { db, products, cart, setCart, quote, createOrder, orderDetail, changeStatus, saveProduct, verifyPassword, hashPassword, string, audit, fail, getCategories, getArticles, getSettings, saveSettings, saveArticle, deleteArticle } from '../../../lib/db.mjs';
export const runtime='nodejs';
const attempts=new Map<string,{count:number,until:number}>();
function rate(key:string){let v=attempts.get(key);if(!v||v.until<Date.now()){v={count:0,until:Date.now()+60000};attempts.set(key,v);}if(++v.count>10)fail('RATE_LIMIT','Thử lại sau một phút.',429);if(attempts.size>10000)for(const [k,x] of attempts)if(x.until<Date.now())attempts.delete(k);}
async function handle(req:NextRequest){let newCart=false;let token=req.cookies.get('dalifa_cart')?.value;if(!token||!/^[a-f0-9]{48}$/.test(token)){token=randomBytes(24).toString('hex');newCart=true;}try{const p=req.nextUrl.pathname.replace('/api/v1/','');const method=req.method;const session=req.cookies.get('dalifa_session')?.value;const admin=session?db.prepare('SELECT a.id,a.email FROM sessions s JOIN admins a ON a.id=s.admin_id WHERE s.token=? AND s.expires>?').get(session,Date.now()):null;
if(method!=='GET'){const origin=req.headers.get('origin');if(origin&&!origin.includes('dalifabooks.local')&&!origin.includes('localhost')&&!origin.includes('127.0.0.1')&&!origin.includes('tin365.online'))fail('FORBIDDEN','Yêu cầu không hợp lệ.',403);if(Number(req.headers.get('content-length'))>50000)fail('TOO_LARGE','Dữ liệu quá lớn.',413);}
const body=(method==='GET'||method==='DELETE')?{}:await req.json();let data:any;let loginToken:string|undefined;
if(p==='products'&&method==='GET')data=products();
else if(p==='categories'&&method==='GET')data=getCategories();
else if(p==='articles'&&method==='GET')data=getArticles();
else if(p==='settings'&&method==='GET')data=getSettings();
else if(p==='cart'&&method==='GET')data=cart(token);
else if(p==='cart/items'&&method==='POST')data=setCart(token,body.productId,body.quantity);
else if(p==='checkout/preview'&&method==='POST')data=quote(token,body.coupon);
else if(p==='orders'&&method==='POST')data=createOrder(token,body);
else if(p==='orders/lookup'&&method==='POST'){rate('lookup:'+token);const phone=string(body.phone,20).replace(/[\s.-]/g,'');const o=db.prepare('SELECT id FROM orders WHERE code=? AND phone=?').get(string(body.code,50).toUpperCase(),phone);if(!o)fail('NOT_FOUND','Mã đơn hoặc số điện thoại không đúng.',404);data=orderDetail(o.id);}
else if(p==='auth/login'&&method==='POST'){rate('login');const a=db.prepare('SELECT * FROM admins WHERE email=?').get(string(body.email).toLowerCase());if(!a||!verifyPassword(string(body.password),a.password))fail('INVALID_LOGIN','Email hoặc mật khẩu không đúng.',401);loginToken=randomBytes(32).toString('hex');db.prepare('INSERT INTO sessions VALUES (?,?,?)').run(loginToken,a.id,Date.now()+8*3600000);data={email:a.email};}
else if(p==='auth/logout'&&method==='POST'){if(session)db.prepare('DELETE FROM sessions WHERE token=?').run(session);data={};}
else if(p.startsWith('admin/')){if(!admin)fail('UNAUTHORIZED','Vui lòng đăng nhập quản trị.',401);
if(p==='admin/me')data=admin;
else if(p==='admin/products'&&method==='GET')data=products(true);
else if(p==='admin/products'&&method==='POST')data=saveProduct(body,null,admin.id);
else if(/^admin\/products\/\d+$/.test(p)&&method==='PATCH')data=saveProduct(body,Number(p.split('/')[2]),admin.id);
else if(p==='admin/orders'&&method==='GET')data=db.prepare('SELECT * FROM orders ORDER BY id DESC').all();
else if(/^admin\/orders\/\d+$/.test(p)&&method==='GET')data=orderDetail(Number(p.split('/')[2]));
else if(/^admin\/orders\/\d+\/status$/.test(p)&&method==='PATCH')data=changeStatus(Number(p.split('/')[2]),body.status,admin.id);
else if(p==='admin/inventory'&&method==='GET')data=db.prepare('SELECT h.*,p.title,p.sku FROM inventory_history h JOIN products p ON p.id=h.product_id ORDER BY h.id DESC LIMIT 500').all();
else if(p==='admin/dashboard'&&method==='GET')data={orders:db.prepare('SELECT COUNT(*) AS n FROM orders').get().n,pending:db.prepare("SELECT COUNT(*) AS n FROM orders WHERE status='PENDING'").get().n,revenue:db.prepare("SELECT COALESCE(SUM(total-shipping),0) AS n FROM orders WHERE status='DELIVERED'").get().n,lowStock:products(true).filter((p:any)=>p.available<=5&&p.status==='ACTIVE')};
else if(p==='admin/articles'&&method==='GET')data=getArticles();
else if(p==='admin/articles'&&method==='POST')data=saveArticle(body,null,admin.id);
else if(/^admin\/articles\/\d+$/.test(p)&&method==='PATCH')data=saveArticle(body,Number(p.split('/')[2]),admin.id);
else if(/^admin\/articles\/\d+$/.test(p)&&method==='DELETE')data=deleteArticle(Number(p.split('/')[2]),admin.id);
else if(p==='admin/settings'&&method==='GET')data=getSettings();
else if(p==='admin/settings'&&method==='PATCH')data=saveSettings(body,admin.id);
else if(p==='admin/password'&&method==='POST'){const a=db.prepare('SELECT * FROM admins WHERE id=?').get(admin.id);if(!verifyPassword(string(body.current),a.password))fail('INVALID_PASSWORD','Mật khẩu hiện tại không đúng.');const password=string(body.password);if(password.length<12)fail('WEAK_PASSWORD','Mật khẩu mới cần ít nhất 12 ký tự.');db.prepare('UPDATE admins SET password=? WHERE id=?').run(hashPassword(password),admin.id);db.prepare('DELETE FROM sessions WHERE admin_id=?').run(admin.id);audit(admin.id,'PASSWORD_CHANGE','Đổi mật khẩu');data={};}
else fail('NOT_FOUND','Không tìm thấy chức năng.',404);
}else fail('NOT_FOUND','Không tìm thấy chức năng.',404);
const res=NextResponse.json({success:true,data});res.headers.set('Cache-Control','no-store');if(newCart)res.cookies.set('dalifa_cart',token,{httpOnly:true,sameSite:'strict',path:'/',maxAge:2592000});if(loginToken)res.cookies.set('dalifa_session',loginToken,{httpOnly:true,sameSite:'strict',path:'/',maxAge:28800});if(p==='auth/logout'||p==='admin/password')res.cookies.delete('dalifa_session');return res;
}catch(e:any){const conflict=e.message?.includes('UNIQUE constraint');return NextResponse.json({success:false,error:{code:conflict?'DUPLICATE':e.code||'SERVER_ERROR',message:conflict?'SKU hoặc đường dẫn đã tồn tại.':e.status?e.message:'Có lỗi xử lý. Vui lòng thử lại.'}},{status:conflict?409:e.status||500});}}
export const GET=handle;export const POST=handle;export const PATCH=handle;export const DELETE=handle;
