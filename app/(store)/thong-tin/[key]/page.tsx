import { notFound } from 'next/navigation';
import { getSettings } from '@/lib/db.mjs';
export const dynamic = 'force-dynamic';
const PAGES: Record<string, { key: string; title: string }> = {
  'chinh-sach-thanh-toan': { key: 'policy_payment', title: 'Chính sách thanh toán' },
  'chinh-sach-van-chuyen': { key: 'policy_shipping', title: 'Chính sách vận chuyển' },
  'chinh-sach-bao-mat': { key: 'policy_privacy', title: 'Chính sách bảo mật' },
  'chinh-sach-doi-tra': { key: 'policy_return', title: 'Chính sách đổi trả' },
  'he-thong-nha-sach': { key: 'stores_html', title: 'Hệ thống nhà sách' },
  'tuyen-dung': { key: 'recruitment_html', title: 'Tuyển dụng' },
};
export default async function InfoPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const page = PAGES[key];
  if (!page) notFound();
  const html = (getSettings() as any)[page.key] || '';
  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-12 pt-48 pb-16">
      <h1 className="text-3xl font-extrabold text-center mb-8">{page.title}</h1>
      <div className="prose-content" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
