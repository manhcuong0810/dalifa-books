import { notFound } from 'next/navigation';
import { getSettings, getStores, getJobs } from '@/lib/db.mjs';
export const dynamic = 'force-dynamic';
const PAGES: Record<string, { key: string; title: string }> = {
  'chinh-sach-thanh-toan': { key: 'policy_payment', title: 'Chính sách thanh toán' },
  'chinh-sach-van-chuyen': { key: 'policy_shipping', title: 'Chính sách vận chuyển' },
  'chinh-sach-bao-mat': { key: 'policy_privacy', title: 'Chính sách bảo mật' },
  'chinh-sach-doi-tra': { key: 'policy_return', title: 'Chính sách đổi trả' },
  'he-thong-nha-sach': { key: '', title: 'Hệ thống nhà sách' },
  'tuyen-dung': { key: '', title: 'Tuyển dụng' },
};
export default async function InfoPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const page = PAGES[key];
  if (!page) notFound();
  const html = page.key ? (getSettings() as any)[page.key] || '' : '';
  const stores: any[] = key === 'he-thong-nha-sach' ? getStores() : [];
  const jobs: any[] = key === 'tuyen-dung' ? getJobs() : [];
  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-12 pt-48 pb-16">
      <h1 className="text-3xl font-extrabold text-center mb-8">{page.title}</h1>
      {page.key && <div className="prose-content" dangerouslySetInnerHTML={{ __html: html }} />}
      {key === 'he-thong-nha-sach' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {stores.map(s => (
            <div key={s.id} className="bg-surface-container-low rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-3">{s.name}</h3>
              <p className="flex gap-2 text-on-surface-variant"><span className="material-symbols-outlined text-primary text-[20px]">location_on</span>{s.address}</p>
              {s.phone && <p className="flex gap-2 text-on-surface-variant mt-2"><span className="material-symbols-outlined text-primary text-[20px]">call</span>{s.phone}</p>}
              {s.hours && <p className="flex gap-2 text-on-surface-variant mt-2"><span className="material-symbols-outlined text-primary text-[20px]">schedule</span>{s.hours}</p>}
              {s.map_url && <a href={s.map_url} target="_blank" rel="noreferrer" className="inline-block mt-3 text-primary font-semibold text-sm">Xem bản đồ →</a>}
            </div>
          ))}
          {!stores.length && <p className="text-center text-on-surface-variant md:col-span-2">Đang cập nhật.</p>}
        </div>
      )}
      {key === 'tuyen-dung' && (
        <div className="space-y-4">
          {jobs.map(j => (
            <details key={j.id} className="bg-surface-container-low rounded-2xl p-6 group">
              <summary className="cursor-pointer list-none">
                <h3 className="font-bold text-lg">{j.title}</h3>
                <p className="text-sm text-on-surface-variant mt-1">{[j.location, j.salary, j.job_type, j.deadline && 'Hạn nộp: ' + j.deadline].filter(Boolean).join(' · ')}</p>
              </summary>
              <div className="prose-content mt-4" dangerouslySetInnerHTML={{ __html: j.description }} />
            </details>
          ))}
          {!jobs.length && <p className="text-center text-on-surface-variant">Hiện chưa có tin tuyển dụng nào.</p>}
        </div>
      )}
    </div>
  );
}
