'use client';
import {useState,useEffect} from 'react';
import {api} from '@/lib/api';

export const PAGE_TABS:any={
  about:{key:'about_html',title:'Về Dalifabooks',icon:'info'},
  policy_payment:{key:'policy_payment',title:'Chính sách thanh toán',icon:'payments'},
  policy_shipping:{key:'policy_shipping',title:'Chính sách vận chuyển',icon:'local_shipping'},
  policy_privacy:{key:'policy_privacy',title:'Chính sách bảo mật',icon:'shield'},
  policy_return:{key:'policy_return',title:'Chính sách đổi trả',icon:'assignment_return'},
  stores:{key:'stores_html',title:'Hệ thống nhà sách',icon:'store'},
  recruitment:{key:'recruitment_html',title:'Tuyển dụng',icon:'work'},
};

const input='w-full h-11 px-4 rounded-lg bg-surface-container-low border border-surface-container-high focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-on-surface transition-all';
const btn='h-11 px-8 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50';

function slugify(s:string){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');}

type P={onError:(m:string)=>void,onNotice:(m:string)=>void};

export function ContactEditor({onError,onNotice}:P){
  const[v,setV]=useState<any>(null),[busy,setBusy]=useState(false);
  useEffect(()=>{api('admin/settings').then(setV).catch(e=>onError(e.message))},[]);
  if(!v)return <div className="text-on-surface-variant">Đang tải…</div>;
  const fields=[['contact_address','Địa chỉ','location_on'],['contact_phone','Số điện thoại / Hotline','call'],['contact_email','Email liên hệ','mail']];
  return <form className="max-w-2xl bg-surface rounded-2xl shadow-sm border border-surface-container-high overflow-hidden" onSubmit={async e=>{
    e.preventDefault();setBusy(true);onError('');
    try{const body:any={};fields.forEach(([k])=>body[k]=v[k]||'');setV(await api('admin/settings','PATCH',body));onNotice('Đã lưu thông tin liên hệ. Website sẽ cập nhật ngay.')}catch(e:any){onError(e.message)}finally{setBusy(false)}
  }}>
    <div className="px-6 py-4 border-b border-surface-container-high"><h2 className="text-lg font-bold">Thông tin liên hệ</h2><p className="text-sm text-text-muted mt-1">Hiển thị ở đầu trang, chân trang và trang Liên hệ.</p></div>
    <div className="p-6 space-y-5">
      {fields.map(([k,label,icon])=><div key={k}>
        <label className="block text-sm font-semibold mb-2 flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px] text-primary">{icon}</span>{label}</label>
        <input className={input} value={v[k]||''} onChange={e=>setV({...v,[k]:e.target.value})}/>
      </div>)}
      <button disabled={busy} className={btn}>Lưu thay đổi</button>
    </div>
  </form>;
}

export function PageEditor({tab,onError,onNotice}:P&{tab:string}){
  const cfg=PAGE_TABS[tab];
  const[html,setHtml]=useState<string|null>(null),[busy,setBusy]=useState(false),[preview,setPreview]=useState(false);
  useEffect(()=>{setHtml(null);setPreview(false);api('admin/settings').then(s=>setHtml(s[cfg.key]||'')).catch(e=>onError(e.message))},[tab]);
  if(html===null)return <div className="text-on-surface-variant">Đang tải…</div>;
  return <form className="bg-surface rounded-2xl shadow-sm border border-surface-container-high overflow-hidden" onSubmit={async e=>{
    e.preventDefault();setBusy(true);onError('');
    try{await api('admin/settings','PATCH',{[cfg.key]:html});onNotice('Đã lưu nội dung "'+cfg.title+'".')}catch(e:any){onError(e.message)}finally{setBusy(false)}
  }}>
    <div className="px-6 py-4 border-b border-surface-container-high flex items-center justify-between">
      <div><h2 className="text-lg font-bold">{cfg.title}</h2><p className="text-sm text-text-muted mt-1">Nhập nội dung dạng HTML (&lt;p&gt;, &lt;h2&gt;, &lt;ul&gt;, &lt;img&gt;, &lt;a&gt;…).</p></div>
      <div className="flex rounded-lg border border-surface-container-high overflow-hidden text-sm font-semibold">
        <button type="button" onClick={()=>setPreview(false)} className={`px-4 py-2 ${!preview?'bg-primary text-on-primary':'bg-surface text-on-surface-variant'}`}>Soạn thảo</button>
        <button type="button" onClick={()=>setPreview(true)} className={`px-4 py-2 ${preview?'bg-primary text-on-primary':'bg-surface text-on-surface-variant'}`}>Xem trước</button>
      </div>
    </div>
    <div className="p-6">
      {preview?<div className="prose-content min-h-[400px] p-6 rounded-lg border border-surface-container-high" dangerouslySetInnerHTML={{__html:html}}/>
      :<textarea value={html} onChange={e=>setHtml(e.target.value)} spellCheck={false} className="w-full min-h-[480px] p-4 rounded-lg bg-surface-container-low border border-surface-container-high focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-mono text-sm text-on-surface"/>}
      <div className="mt-6"><button disabled={busy} className={btn}>Lưu nội dung</button></div>
    </div>
  </form>;
}

const blankArticle={title:'',slug:'',category:'Tin tức',cover:'',summary:'',content:''};
export function ArticlesManager({onError,onNotice}:P){
  const[rows,setRows]=useState<any[]>([]),[edit,setEdit]=useState<any>(null),[busy,setBusy]=useState(false),[q,setQ]=useState('');
  const load=()=>api('admin/articles').then(setRows).catch(e=>onError(e.message));
  useEffect(()=>{load()},[]);
  async function run(fn:()=>Promise<any>){setBusy(true);onError('');try{await fn()}catch(e:any){onError(e.message)}finally{setBusy(false)}}
  if(edit)return <form className="bg-surface rounded-2xl shadow-sm border border-surface-container-high overflow-hidden" onSubmit={e=>{e.preventDefault();run(async()=>{await api('admin/articles'+(edit.id?'/'+edit.id:''),edit.id?'PATCH':'POST',edit);setEdit(null);await load();onNotice('Đã lưu bài viết.')})}}>
    <div className="px-8 py-5 border-b border-surface-container-high flex items-center gap-3">
      <button type="button" onClick={()=>setEdit(null)} className="w-8 h-8 rounded-full hover:bg-surface-container-low flex items-center justify-center"><span className="material-symbols-outlined text-[20px]">arrow_back</span></button>
      <h2 className="text-lg font-bold">{edit.id?'Sửa bài viết':'Thêm bài viết'}</h2>
    </div>
    <div className="p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2"><label className="block text-sm font-semibold mb-2">Tiêu đề *</label><input required className={input} value={edit.title} onChange={e=>setEdit({...edit,title:e.target.value,slug:edit.id?edit.slug:slugify(e.target.value)})}/></div>
        <div><label className="block text-sm font-semibold mb-2">Đường dẫn URL *</label><input required className={input} value={edit.slug} onChange={e=>setEdit({...edit,slug:e.target.value})}/></div>
        <div><label className="block text-sm font-semibold mb-2">Chuyên mục</label><select className={input} value={edit.category} onChange={e=>setEdit({...edit,category:e.target.value})}><option>Tin tức</option><option>Sự kiện</option></select></div>
        <div className="md:col-span-2"><label className="block text-sm font-semibold mb-2">Ảnh bìa (URL)</label><input className={input} placeholder="https://…" value={edit.cover||''} onChange={e=>setEdit({...edit,cover:e.target.value})}/></div>
        <div className="md:col-span-2"><label className="block text-sm font-semibold mb-2">Mô tả ngắn</label><textarea className="w-full h-24 p-4 rounded-lg bg-surface-container-low border border-surface-container-high focus:ring-2 focus:ring-primary/20 outline-none" value={edit.summary||''} onChange={e=>setEdit({...edit,summary:e.target.value})}/></div>
        <div className="md:col-span-2"><label className="block text-sm font-semibold mb-2">Nội dung (HTML)</label><textarea className="w-full min-h-[320px] p-4 rounded-lg bg-surface-container-low border border-surface-container-high focus:ring-2 focus:ring-primary/20 outline-none font-mono text-sm" value={edit.content||''} onChange={e=>setEdit({...edit,content:e.target.value})}/></div>
      </div>
      <div className="flex gap-4 border-t border-surface-container-high pt-6">
        <button disabled={busy} className={btn}>Lưu bài viết</button>
        <button type="button" onClick={()=>setEdit(null)} className="h-11 px-8 bg-surface text-on-surface-variant font-bold rounded-lg border border-surface-container-high hover:bg-surface-container-low">Hủy bỏ</button>
      </div>
    </div>
  </form>;
  const list=rows.filter(r=>[r.title,r.category].join(' ').toLowerCase().includes(q.toLowerCase()));
  return <div className="space-y-6">
    <div className="flex gap-4 items-center justify-between bg-surface p-4 rounded-2xl shadow-sm border border-surface-container-high">
      <div className="relative flex-1 max-w-md"><span className="absolute left-3 top-2.5 material-symbols-outlined text-text-muted text-[20px]">search</span><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Tìm bài viết…" className="w-full h-10 pl-10 pr-4 rounded-lg bg-surface-container-low border border-surface-container-high outline-none text-sm"/></div>
      <button onClick={()=>setEdit({...blankArticle})} className="h-10 px-6 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">add</span>Thêm bài viết</button>
    </div>
    <div className="bg-surface rounded-2xl shadow-sm border border-surface-container-high overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead><tr className="bg-surface-container-low text-on-surface-variant text-xs uppercase tracking-wider"><th className="px-6 py-4">Bài viết</th><th className="px-6 py-4">Chuyên mục</th><th className="px-6 py-4">Ngày đăng</th><th className="px-6 py-4 text-right">Thao tác</th></tr></thead>
        <tbody className="divide-y divide-surface-container-high">
          {list.map(a=><tr key={a.id} className="hover:bg-surface-container-low/50">
            <td className="px-6 py-4"><div className="font-bold">{a.title}</div><div className="text-sm text-text-muted mt-1">/tin-tuc/{a.slug}</div></td>
            <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${a.category==='Sự kiện'?'bg-purple-100 text-purple-700':'bg-blue-100 text-blue-700'}`}>{a.category}</span></td>
            <td className="px-6 py-4 text-sm text-text-muted">{new Date(a.created+'Z').toLocaleDateString('vi-VN')}</td>
            <td className="px-6 py-4 text-right whitespace-nowrap">
              <button onClick={()=>setEdit({...a})} className="text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg text-sm font-medium">Sửa</button>
              <button disabled={busy} onClick={()=>{if(!confirm('Xóa bài viết "'+a.title+'"?'))return;run(async()=>{await api('admin/articles/'+a.id,'DELETE');await load();onNotice('Đã xóa bài viết.')})}} className="text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg text-sm font-medium">Xóa</button>
            </td></tr>)}
        </tbody>
      </table>
      {!list.length&&<div className="p-12 text-center text-on-surface-variant">Chưa có bài viết nào.</div>}
    </div>
  </div>;
}
