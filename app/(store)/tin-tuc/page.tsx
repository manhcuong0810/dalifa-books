import Link from 'next/link';
import { getArticles } from '@/lib/db.mjs';
export const dynamic = 'force-dynamic';
export default async function NewsPage({ searchParams }: { searchParams: Promise<any> }) {
  const params = await searchParams;
  const category = params.cat || 'Tất cả';
  const all: any[] = getArticles();
  const filtered = category === 'Tất cả' ? all : all.filter(a => a.category === category);
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-48 pb-16">
      <h1 className="text-3xl font-extrabold mb-6">{category === 'Tất cả' ? 'Tin tức & Sự kiện' : category}</h1>
      <div className="flex gap-2 mb-8">
        {['Tất cả', 'Tin tức', 'Sự kiện'].map(c => (
          <Link key={c} href={c === 'Tất cả' ? '/tin-tuc' : '/tin-tuc?cat=' + encodeURIComponent(c)} className={`px-4 py-2 rounded-full text-sm font-semibold ${c === category ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface-variant'}`}>{c}</Link>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(a => (
          <Link key={a.id} href={'/tin-tuc/' + a.slug} className="bg-surface-container-low rounded-2xl overflow-hidden hover:shadow-lg transition-shadow block">
            {a.cover && <img src={a.cover} alt={a.title} className="w-full h-48 object-cover" />}
            <div className="p-6">
              <span className="text-primary font-bold text-sm">{a.category}</span>
              <h3 className="text-lg font-bold my-2">{a.title}</h3>
              <p className="text-on-surface-variant text-sm">{a.summary}</p>
              <span className="inline-block mt-3 text-primary font-bold text-sm">Đọc tiếp →</span>
            </div>
          </Link>
        ))}
      </div>
      {!filtered.length && <div className="text-center text-on-surface-variant py-12">Không có bài viết nào.</div>}
    </div>
  );
}
