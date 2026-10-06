'use client';
import {useState,useEffect} from 'react';
import {api, money} from '@/lib/api';
import {ArticlesManager,ContactEditor,PageEditor,PAGE_TABS} from './components/ContentManagers';
const CONTENT_TABS=['articles','contact',...Object.keys(PAGE_TABS)];

const statuses:any={PENDING:'Chờ xác nhận',CONFIRMED:'Đã xác nhận',PACKING:'Đóng gói',SHIPPING:'Đang giao',DELIVERED:'Giao thành công',CANCELLED:'Đã hủy'};
const statusColors:any={PENDING:'bg-yellow-100 text-yellow-800',CONFIRMED:'bg-blue-100 text-blue-800',PACKING:'bg-indigo-100 text-indigo-800',SHIPPING:'bg-purple-100 text-purple-800',DELIVERED:'bg-green-100 text-green-800',CANCELLED:'bg-red-100 text-red-800'};
const next:any={PENDING:['CONFIRMED','CANCELLED'],CONFIRMED:['PACKING','CANCELLED'],PACKING:['SHIPPING','CANCELLED'],SHIPPING:['DELIVERED'],DELIVERED:[],CANCELLED:[]};
const blank={title:'',author:'',category:'Văn học',sku:'',slug:'',isbn:'',price:0,list_price:0,stock:0,description:'',status:'ACTIVE'};

export default function Admin(){
  const[user,setUser]=useState<any>(null),[loading,setLoading]=useState(true),[tab,setTab]=useState('dashboard'),[rows,setRows]=useState<any[]>([]),[dashboard,setDashboard]=useState<any>(null),[edit,setEdit]=useState<any>(null),[detail,setDetail]=useState<any>(null),[error,setError]=useState(''),[notice,setNotice]=useState(''),[query,setQuery]=useState(''),[filter,setFilter]=useState('ALL'),[busy,setBusy]=useState(false);

  useEffect(()=>{api('admin/me').then(setUser).catch(()=>{}).finally(()=>setLoading(false))},[]);

  async function refresh(){
    if(tab==='dashboard')setDashboard(await api('admin/dashboard'));
    else if(tab!=='password'&&!CONTENT_TABS.includes(tab))setRows(await api('admin/'+tab));
  }

  useEffect(()=>{
    setRows([]);setEdit(null);setDetail(null);setQuery('');setFilter('ALL');
    if(user)refresh().catch(e=>setError(e.message));
  },[tab,user]);

  async function run(fn:()=>Promise<any>){
    setBusy(true);setError('');setNotice('');
    try{await fn()}catch(e:any){setError(e.message)}finally{setBusy(false)}
  }

  if(loading) return <main className="min-h-screen flex items-center justify-center bg-surface-container-low"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></main>;

  if(!user) return (
    <main className="min-h-screen flex items-center justify-center bg-surface-container-low px-4">
      <div className="max-w-md w-full bg-surface rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-primary px-6 py-8 text-center">
          <a href="/" className="inline-block text-2xl font-bold text-on-primary">DALIFA<span className="font-light">BOOKS ADMIN</span></a>
        </div>
        <form className="p-8" onSubmit={e=>{
          e.preventDefault();
          const f=new FormData(e.currentTarget);
          run(async()=>setUser(await api('auth/login','POST',Object.fromEntries(f))))
        }}>
          <h1 className="text-xl font-bold text-on-surface mb-6 text-center">Đăng nhập quản trị</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Email</label>
              <input type="email" name="email" autoComplete="username" required className="w-full h-11 px-4 rounded-lg bg-surface-container-low border border-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary/50 text-on-surface"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Mật khẩu</label>
              <input type="password" name="password" autoComplete="current-password" required className="w-full h-11 px-4 rounded-lg bg-surface-container-low border border-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary/50 text-on-surface"/>
            </div>
            {error && <div role="alert" className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
            <button disabled={busy} className="w-full h-11 bg-primary hover:bg-primary/90 text-on-primary font-bold rounded-lg transition-colors disabled:opacity-50">Đăng nhập</button>
          </div>
          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-primary hover:underline">← Về cửa hàng</a>
          </div>
        </form>
      </div>
    </main>
  );

  const filtered=rows.filter(r=>(filter==='ALL'||r.status===filter)&&[r.title,r.sku,r.code,r.phone,r.recipient].join(' ').toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="flex h-screen bg-surface-container-low font-body-md text-on-surface overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-surface-container-high flex flex-col shadow-sm z-10">
        <div className="h-16 flex items-center px-6 border-b border-surface-container-high">
          <a href="/" className="text-xl font-bold text-primary">DALIFA<span className="font-light text-on-surface">BOOKS</span></a>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {[['dashboard','Tổng quan','dashboard'],['products','Sản phẩm','inventory_2'],['orders','Đơn hàng','receipt_long'],['inventory','Lịch sử kho','history'],['articles','Tin tức - Sự kiện','newspaper'],['contact','Thông tin liên hệ','contact_phone'],...Object.entries(PAGE_TABS).map(([k,v]:any)=>[k,v.title,v.icon]),['password','Đổi mật khẩu','lock']].map(([id,label,icon])=>(
            <button key={id} onClick={()=>setTab(id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${tab===id?'bg-primary-container text-on-primary font-bold':'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}`}>
              <span className="material-symbols-outlined text-[20px]">{icon}</span>
              {label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-surface-container-high space-y-2">
          <a href="/" target="_blank" className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[18px]">storefront</span> Xem cửa hàng
          </a>
          <button onClick={()=>run(async()=>{await api('auth/logout','POST',{});setUser(null)})} className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-error hover:bg-error/10 transition-colors">
            <span className="material-symbols-outlined text-[18px]">logout</span> Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-surface border-b border-surface-container-high flex items-center justify-between px-8 shrink-0">
          <h1 className="text-xl font-bold text-on-surface">{({dashboard:'Tổng quan',products:'Quản lý Sản phẩm',orders:'Quản lý Đơn hàng',inventory:'Lịch sử kho',password:'Bảo mật tài khoản',articles:'Tin tức - Sự kiện',contact:'Thông tin liên hệ'} as any)[tab]||PAGE_TABS[tab]?.title}</h1>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">person</span>
            </span>
            <span className="text-sm font-medium text-on-surface-variant">{user.email}</span>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {error && <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 flex items-center gap-3"><span className="material-symbols-outlined">error</span>{error}</div>}
            {notice && <div className="p-4 bg-green-50 text-green-700 rounded-xl border border-green-100 flex items-center gap-3"><span className="material-symbols-outlined">check_circle</span>{notice}</div>}

            {tab==='articles'&&<ArticlesManager onError={setError} onNotice={setNotice}/>}
            {tab==='contact'&&<ContactEditor onError={setError} onNotice={setNotice}/>}
            {PAGE_TABS[tab]&&<PageEditor tab={tab} onError={setError} onNotice={setNotice}/>}

            {/* Dashboard */}
            {tab==='dashboard'&&dashboard&&<>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[['Doanh thu (Đã giao)',money(dashboard.revenue),'payments','text-green-600 bg-green-100'],['Tổng số đơn hàng',dashboard.orders,'shopping_cart','text-blue-600 bg-blue-100'],['Đơn chờ xác nhận',dashboard.pending,'pending_actions','text-orange-600 bg-orange-100']].map(([label,value,icon,colorClass])=>(
                  <div className="bg-surface rounded-2xl p-6 shadow-sm border border-surface-container-high flex items-center gap-5" key={label}>
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${colorClass}`}>
                      <span className="material-symbols-outlined text-[28px]">{icon}</span>
                    </div>
                    <div>
                      <div className="text-sm text-on-surface-variant mb-1">{label}</div>
                      <div className="text-2xl font-bold text-on-surface">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-surface rounded-2xl shadow-sm border border-surface-container-high overflow-hidden mt-6">
                <div className="px-6 py-4 border-b border-surface-container-high flex items-center gap-2 bg-red-50/30">
                  <span className="material-symbols-outlined text-red-500">warning</span>
                  <h2 className="font-bold text-on-surface">Sách sắp hết hàng (Dưới 6 cuốn)</h2>
                </div>
                <div className="p-6">
                  {dashboard.lowStock.length ? (
                    <ul className="divide-y divide-surface-container-high">
                      {dashboard.lowStock.map((b:any)=>(
                        <li key={b.id} className="py-3 flex justify-between items-center">
                          <span className="font-medium text-on-surface">{b.title} <span className="text-sm text-text-muted">({b.sku})</span></span>
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold">Còn {b.available}</span>
                        </li>
                      ))}
                    </ul>
                  ) : <p className="text-on-surface-variant">Tuyệt vời, kho hàng của bạn vẫn đang đầy ắp!</p>}
                </div>
              </div>
            </>}

            {/* Toolbar for Products & Orders */}
            {['products','orders'].includes(tab)&&!edit&&<div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-surface p-4 rounded-2xl shadow-sm border border-surface-container-high">
              <div className="flex-1 w-full flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <span className="absolute left-3 top-2.5 material-symbols-outlined text-text-muted text-[20px]">search</span>
                  <input aria-label="Tìm kiếm" value={query} onChange={e=>setQuery(e.target.value)} placeholder={tab==='products'?'Tìm tên sách, SKU…':'Tìm mã đơn, tên khách, số điện thoại…'} className="w-full h-10 pl-10 pr-4 rounded-lg bg-surface-container-low border border-surface-container-high focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm text-on-surface"/>
                </div>
                <select aria-label="Trạng thái" value={filter} onChange={e=>setFilter(e.target.value)} className="h-10 px-4 rounded-lg bg-surface-container-low border border-surface-container-high focus:ring-2 focus:ring-primary/20 outline-none text-sm text-on-surface">
                  <option value="ALL">Tất cả trạng thái</option>
                  {Object.entries(tab==='products'?{ACTIVE:'Đang bán',ARCHIVED:'Lưu trữ'}:statuses).map(([id,label])=><option key={id} value={id}>{String(label)}</option>)}
                </select>
              </div>
              {tab==='products'&&<button onClick={()=>setEdit({...blank})} className="h-10 px-6 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 transition-colors shrink-0 flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">add</span>Thêm sách</button>}
            </div>}

            {/* Products Table */}
            {tab==='products'&&!edit&&<div className="bg-surface rounded-2xl shadow-sm border border-surface-container-high overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low text-on-surface-variant text-xs uppercase tracking-wider">
                      <th className="px-6 py-4 font-semibold">Sách / SKU</th>
                      <th className="px-6 py-4 font-semibold">Giá bán</th>
                      <th className="px-6 py-4 font-semibold text-center">Tồn thực</th>
                      <th className="px-6 py-4 font-semibold text-center">Khả dụng</th>
                      <th className="px-6 py-4 font-semibold text-center">Trạng thái</th>
                      <th className="px-6 py-4 font-semibold text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-high">
                    {filtered.map(b=>(
                      <tr key={b.id} className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-on-surface">{b.title}</div>
                          <div className="text-sm text-text-muted mt-1">{b.sku} &bull; {b.author}</div>
                        </td>
                        <td className="px-6 py-4 font-medium text-primary">{money(b.price)}</td>
                        <td className="px-6 py-4 text-center">{b.stock} <span className="text-xs text-text-muted ml-1" title="Đang giữ">(-{b.reserved})</span></td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${b.available > 5 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{b.available}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${b.status==='ACTIVE'?'bg-blue-50 text-blue-700 border border-blue-200':'bg-gray-100 text-gray-600 border border-gray-200'}`}>{b.status==='ACTIVE'?'Đang bán':'Lưu trữ'}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={()=>setEdit({...b})} className="text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">Sửa</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!filtered.length&&<div className="p-12 text-center text-on-surface-variant flex flex-col items-center gap-2"><span className="material-symbols-outlined text-[48px] text-surface-container-high">inventory_2</span><p>Không có sản phẩm phù hợp.</p></div>}
            </div>}

            {/* Product Edit Form */}
            {tab==='products'&&edit&&<form className="bg-surface rounded-2xl shadow-sm border border-surface-container-high overflow-hidden" onSubmit={e=>{
              e.preventDefault();
              run(async()=>{
                await api('admin/products'+(edit.id?'/'+edit.id:''),edit.id?'PATCH':'POST',edit);
                setEdit(null);await refresh();setNotice('Đã lưu thông tin sản phẩm thành công.');
              })
            }}>
              <div className="px-8 py-5 border-b border-surface-container-high flex items-center gap-3">
                <button type="button" onClick={()=>setEdit(null)} className="w-8 h-8 rounded-full hover:bg-surface-container-low flex items-center justify-center text-on-surface-variant transition-colors"><span className="material-symbols-outlined text-[20px]">arrow_back</span></button>
                <h2 className="text-lg font-bold text-on-surface">{edit.id?'Cập nhật Sách':'Thêm Sách mới'}</h2>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  {[['title','Tên sách','text'],['author','Tác giả','text'],['category','Danh mục','text'],['sku','Mã SKU','text'],['slug','Đường dẫn URL','text'],['isbn','Mã ISBN','text'],['price','Giá bán (VNĐ)','number'],['list_price','Giá bìa (VNĐ)','number'],['stock','Số lượng nhập kho','number']].map(([key,label,type])=>(
                    <div key={key}>
                      <label className="block text-sm font-semibold text-on-surface mb-2">{label} {key!=='isbn'&&<span className="text-red-500">*</span>}</label>
                      <input required={key!=='isbn'} type={type} min="0" value={edit[key]} onChange={e=>setEdit({...edit,[key]:type==='number'?Number(e.target.value):e.target.value})} className="w-full h-11 px-4 rounded-lg bg-surface-container-low border border-surface-container-high focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-on-surface transition-all"/>
                    </div>
                  ))}
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-on-surface mb-2">Giới thiệu sách <span className="text-red-500">*</span></label>
                  <textarea required value={edit.description} onChange={e=>setEdit({...edit,description:e.target.value})} className="w-full h-32 p-4 rounded-lg bg-surface-container-low border border-surface-container-high focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-on-surface transition-all resize-y"/>
                </div>
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-on-surface mb-2">Trạng thái hiển thị</label>
                  <select value={edit.status} onChange={e=>setEdit({...edit,status:e.target.value})} className="w-full md:w-1/3 h-11 px-4 rounded-lg bg-surface-container-low border border-surface-container-high focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-on-surface transition-all">
                    <option value="ACTIVE">Đang bán (Hiển thị trên web)</option>
                    <option value="ARCHIVED">Lưu trữ (Ẩn khỏi web)</option>
                  </select>
                </div>
                <div className="flex gap-4 border-t border-surface-container-high pt-6">
                  <button disabled={busy} className="h-11 px-8 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50">Lưu thông tin</button>
                  <button type="button" onClick={()=>setEdit(null)} className="h-11 px-8 bg-surface text-on-surface-variant font-bold rounded-lg border border-surface-container-high hover:bg-surface-container-low transition-colors">Hủy bỏ</button>
                </div>
              </div>
            </form>}

            {/* Orders Table */}
            {tab==='orders'&&!detail&&<div className="bg-surface rounded-2xl shadow-sm border border-surface-container-high overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low text-on-surface-variant text-xs uppercase tracking-wider">
                      <th className="px-6 py-4 font-semibold">Mã đơn & Thời gian</th>
                      <th className="px-6 py-4 font-semibold">Khách hàng</th>
                      <th className="px-6 py-4 font-semibold">Tổng tiền</th>
                      <th className="px-6 py-4 font-semibold text-center">Trạng thái</th>
                      <th className="px-6 py-4 font-semibold text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-high">
                    {filtered.map(o=>(
                      <tr key={o.id} className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-primary">{o.code}</div>
                          <div className="text-sm text-text-muted mt-1">{new Date(o.created+'Z').toLocaleString('vi-VN')}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-on-surface">{o.recipient}</div>
                          <div className="text-sm text-text-muted mt-1">{o.phone}</div>
                        </td>
                        <td className="px-6 py-4 font-bold text-on-surface">{money(o.total)}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[o.status]}`}>{statuses[o.status]}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={()=>run(async()=>setDetail(await api('admin/orders/'+o.id)))} className="text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">Chi tiết</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!filtered.length&&<div className="p-12 text-center text-on-surface-variant flex flex-col items-center gap-2"><span className="material-symbols-outlined text-[48px] text-surface-container-high">receipt_long</span><p>Chưa có đơn hàng phù hợp.</p></div>}
            </div>}

            {/* Order Detail View */}
            {tab==='orders'&&detail&&<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-surface rounded-2xl shadow-sm border border-surface-container-high overflow-hidden">
                  <div className="px-6 py-4 border-b border-surface-container-high flex items-center justify-between">
                    <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">Chi tiết đơn hàng <span className="text-primary">#{detail.code}</span></h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[detail.status]}`}>{statuses[detail.status]}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider mb-4">Sản phẩm đã đặt</h3>
                    <ul className="divide-y divide-surface-container-high border-t border-b border-surface-container-high mb-6">
                      {detail.items.map((i:any)=>(
                        <li key={i.id} className="py-4 flex justify-between items-center">
                          <div className="flex-1">
                            <div className="font-semibold text-on-surface">{i.title}</div>
                            <div className="text-sm text-text-muted mt-1">{money(i.price)} × {i.quantity}</div>
                          </div>
                          <div className="font-bold text-on-surface">{money(i.price*i.quantity)}</div>
                        </li>
                      ))}
                    </ul>
                    <div className="space-y-3 text-sm text-on-surface-variant">
                      <div className="flex justify-between"><span>Tạm tính</span><span>{money(detail.total + detail.discount - detail.shipping)}</span></div>
                      <div className="flex justify-between text-red-600"><span>Voucher giảm giá</span><span>- {money(detail.discount)}</span></div>
                      <div className="flex justify-between"><span>Phí giao hàng</span><span>+ {money(detail.shipping)}</span></div>
                      <div className="flex justify-between text-lg font-bold text-on-surface pt-4 border-t border-surface-container-high mt-4">
                        <span>Tổng thanh toán</span><span className="text-primary">{money(detail.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-surface rounded-2xl shadow-sm border border-surface-container-high overflow-hidden">
                  <div className="px-6 py-4 border-b border-surface-container-high">
                    <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Cập nhật trạng thái</h3>
                  </div>
                  <div className="p-6">
                    {next[detail.status].length ? (
                      <div className="flex flex-wrap gap-3">
                        {next[detail.status].map((s:string)=>(
                          <button key={s} disabled={busy} onClick={()=>{
                            if(s==='CANCELLED'&&!confirm('Bạn có chắc muốn hủy đơn này và trả lại tồn kho không? Hành động này không thể hoàn tác!'))return;
                            run(async()=>{
                              setDetail(await api('admin/orders/'+detail.id+'/status','PATCH',{status:s}));
                              await refresh();setNotice('Đã cập nhật trạng thái đơn hàng thành công.');
                            });
                          }} className={`px-6 py-2.5 rounded-lg font-bold transition-colors disabled:opacity-50 ${s==='CANCELLED'?'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200':'bg-primary text-on-primary hover:bg-primary/90'}`}>
                            {s==='CANCELLED' ? 'Hủy đơn hàng' : `Chuyển sang: ${statuses[s]}`}
                          </button>
                        ))}
                      </div>
                    ) : <p className="text-sm text-text-muted italic">Đơn hàng đã ở trạng thái cuối, không thể cập nhật thêm.</p>}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-surface rounded-2xl shadow-sm border border-surface-container-high overflow-hidden">
                  <div className="px-6 py-4 border-b border-surface-container-high">
                    <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider flex items-center justify-between">
                      Thông tin nhận hàng
                      <button type="button" onClick={()=>setDetail(null)} className="lg:hidden text-text-muted hover:text-on-surface transition-colors"><span className="material-symbols-outlined">close</span></button>
                    </h3>
                  </div>
                  <div className="p-6 space-y-4 text-sm">
                    <div>
                      <div className="text-text-muted mb-1">Người nhận</div>
                      <div className="font-semibold text-on-surface">{detail.recipient}</div>
                    </div>
                    <div>
                      <div className="text-text-muted mb-1">Số điện thoại</div>
                      <div className="font-semibold text-on-surface">{detail.phone}</div>
                    </div>
                    <div>
                      <div className="text-text-muted mb-1">Địa chỉ giao hàng</div>
                      <div className="font-semibold text-on-surface leading-relaxed">{detail.address}</div>
                    </div>
                    <div>
                      <div className="text-text-muted mb-1">Ghi chú của khách</div>
                      <div className="p-3 bg-surface-container-low rounded-lg italic text-on-surface-variant">{detail.note||'Không có ghi chú.'}</div>
                    </div>
                    <div className="pt-4 border-t border-surface-container-high">
                      <button type="button" onClick={()=>setDetail(null)} className="w-full py-2 bg-surface-container-low hover:bg-surface-container-high text-on-surface font-semibold rounded-lg transition-colors">Quay lại danh sách</button>
                    </div>
                  </div>
                </div>

                <div className="bg-surface rounded-2xl shadow-sm border border-surface-container-high overflow-hidden">
                  <div className="px-6 py-4 border-b border-surface-container-high">
                    <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Lịch sử xử lý</h3>
                  </div>
                  <div className="p-6">
                    <div className="relative pl-4 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-surface-container-high">
                      {detail.history.map((h:any)=>(
                        <div key={h.id} className="relative">
                          <span className="absolute -left-[19px] top-1 w-3 h-3 rounded-full bg-primary border-2 border-surface"></span>
                          <div className="font-bold text-on-surface text-sm mb-0.5">{statuses[h.status]}</div>
                          <div className="text-xs text-text-muted">{new Date(h.created+'Z').toLocaleString('vi-VN')}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>}

            {/* Inventory History Table */}
            {tab==='inventory'&&<div className="bg-surface rounded-2xl shadow-sm border border-surface-container-high overflow-hidden">
              <div className="px-6 py-4 border-b border-surface-container-high bg-surface-container-low/50">
                <p className="text-sm text-on-surface-variant">Lịch sử xuất/nhập/giữ/điều chỉnh kho hàng (500 giao dịch gần nhất).</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low text-on-surface-variant text-xs uppercase tracking-wider">
                      <th className="px-6 py-4 font-semibold">Thời gian</th>
                      <th className="px-6 py-4 font-semibold">Thao tác</th>
                      <th className="px-6 py-4 font-semibold">Sách / SKU</th>
                      <th className="px-6 py-4 font-semibold text-center">Số lượng</th>
                      <th className="px-6 py-4 font-semibold">Ghi chú</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-high">
                    {rows.map(r=>(
                      <tr key={r.id} className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">{new Date(r.created+'Z').toLocaleString('vi-VN')}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                            r.kind==='IMPORT'?'bg-blue-100 text-blue-700':
                            r.kind==='SALE'?'bg-green-100 text-green-700':
                            r.kind==='RESERVE'?'bg-orange-100 text-orange-700':
                            r.kind==='RELEASE'?'bg-purple-100 text-purple-700':
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {r.kind==='IMPORT'&&<span className="material-symbols-outlined text-[14px]">download</span>}
                            {r.kind==='SALE'&&<span className="material-symbols-outlined text-[14px]">sell</span>}
                            {r.kind==='RESERVE'&&<span className="material-symbols-outlined text-[14px]">lock</span>}
                            {r.kind==='RELEASE'&&<span className="material-symbols-outlined text-[14px]">lock_open</span>}
                            {r.kind==='ADJUST'&&<span className="material-symbols-outlined text-[14px]">build</span>}
                            {({IMPORT:'Nhập mới',ADJUST:'Điều chỉnh',RESERVE:'Giữ hàng',RELEASE:'Trả hàng giữ',SALE:'Xuất bán'} as any)[r.kind]}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-on-surface text-sm line-clamp-1" title={r.title}>{r.title}</div>
                          <div className="text-xs text-text-muted mt-0.5">{r.sku}</div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`font-bold ${r.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>{r.quantity > 0 ? '+'+r.quantity : r.quantity}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-text-muted">{r.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!rows.length&&<div className="p-12 text-center text-on-surface-variant flex flex-col items-center gap-2"><span className="material-symbols-outlined text-[48px] text-surface-container-high">history</span><p>Chưa có giao dịch kho nào.</p></div>}
            </div>}

            {/* Password Change Form */}
            {tab==='password'&&<div className="max-w-md bg-surface rounded-2xl shadow-sm border border-surface-container-high overflow-hidden">
              <div className="px-6 py-4 border-b border-surface-container-high">
                <h2 className="text-lg font-bold text-on-surface">Đổi mật khẩu quản trị</h2>
                <p className="text-sm text-text-muted mt-1">Sử dụng mật khẩu mạnh có chứa chữ số và ký tự đặc biệt.</p>
              </div>
              <form className="p-6 space-y-5" onSubmit={e=>{
                e.preventDefault();
                const f=new FormData(e.currentTarget);
                run(async()=>{
                  await api('admin/password','POST',Object.fromEntries(f));
                  setUser(null);
                })
              }}>
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-2">Mật khẩu hiện tại</label>
                  <input name="current" type="password" required autoComplete="current-password" className="w-full h-11 px-4 rounded-lg bg-surface-container-low border border-surface-container-high focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-on-surface transition-all"/>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-2">Mật khẩu mới</label>
                  <input name="password" type="password" minLength={12} required autoComplete="new-password" placeholder="Tối thiểu 12 ký tự" className="w-full h-11 px-4 rounded-lg bg-surface-container-low border border-surface-container-high focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-on-surface transition-all"/>
                </div>
                <div className="pt-2">
                  <button disabled={busy} className="w-full h-11 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">save</span> Lưu và đăng nhập lại
                  </button>
                </div>
              </form>
            </div>}

          </div>
        </div>
      </main>
    </div>
  );
}
