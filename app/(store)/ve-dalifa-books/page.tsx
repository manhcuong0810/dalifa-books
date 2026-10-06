import { getSettings } from '@/lib/db.mjs';
export const dynamic = 'force-dynamic';
export default function AboutPage() {
  const html = (getSettings() as any).about_html || '';
  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-12 pt-48 pb-16">
      <h1 className="text-3xl font-extrabold text-center mb-8">Về Dalifa Books</h1>
      <div className="prose-content" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
