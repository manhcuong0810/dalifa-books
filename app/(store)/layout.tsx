import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { getCategories } from '@/lib/db.mjs';

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  const categories = getCategories();

  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}
