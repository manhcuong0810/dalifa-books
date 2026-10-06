import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticle } from '@/lib/db.mjs';
export const dynamic = 'force-dynamic';
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a: any = getArticle(slug);
  if (!a) notFound();
  return (
    <article className="max-w-4xl mx-auto px-6 lg:px-12 pt-48 pb-16">
      <Link href="/tin-tuc" className="text-primary text-sm font-semibold">← Tin tức &amp; Sự kiện</Link>
      <div className="mt-4 text-sm font-bold text-primary">{a.category}</div>
      <h1 className="text-3xl font-extrabold mt-1 mb-2">{a.title}</h1>
      <div className="text-sm text-on-surface-variant mb-6">{new Date(a.created + 'Z').toLocaleDateString('vi-VN')}</div>
      {a.cover && <img src={a.cover} alt={a.title} className="w-full rounded-2xl mb-6" />}
      <div className="prose-content" dangerouslySetInnerHTML={{ __html: a.content || '' }} />
    </article>
  );
}
