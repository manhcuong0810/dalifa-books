'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { api, money } from '@/lib/api';
import { Cover } from '@/app/components/Cover';
import { useCart } from '@/app/providers';

export default function CatalogPage({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<any> }) {
  const [books, setBooks] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('default');
  const { addToCart } = useCart();
  const resolvedParams = use(params);
  const resolvedSearch = use(searchParams);
  
  const query = resolvedSearch.q || '';
  const slug = resolvedParams.slug;

  useEffect(() => {
    Promise.all([api('products'), api('categories')]).then(([prods, cats]) => {
      setBooks(prods);
      setCategories(cats);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="empty animate-fade">Đang tải dữ liệu...</div>;

  let isAll = slug === 'danh-muc';
  let catObj = categories.find(c => c.slug === slug);
  // Nếu không phải là /danh-muc và không tìm thấy category nào, có thể fallback sang Tất cả hoặc 404
  let categoryName = isAll ? 'Tất cả' : (catObj?.name || 'Tất cả');

  let filtered = books.filter(b => 
    (isAll || b.category === categoryName) &&
    [b.title, b.author, b.isbn, b.sku].join(' ')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
      .includes(query.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase())
  );

  if (sort === 'low') filtered.sort((a, b) => a.price - b.price);
  if (sort === 'high') filtered.sort((a, b) => b.price - a.price);

  return (
    <div className="animate-fade">
      <div className="section-title">
        <div>
          <span className="eyebrow">TỦ SÁCH DALIFA</span>
          <h2>{query ? `Kết quả tìm kiếm cho: "${query}"` : isAll ? 'Khám phá sách' : categoryName}</h2>
        </div>
        <label>Sắp xếp 
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="default">Mới nhất</option>
            <option value="low">Giá tăng dần</option>
            <option value="high">Giá giảm dần</option>
          </select>
        </label>
      </div>

      <div className="grid">
        {filtered.map(b => (
          <article className="book-card" key={b.id}>
            <Link href={'/sach/' + b.slug}>
              <Cover book={b} />
            </Link>
            <span className="muted">{b.category}</span>
            <Link href={'/sach/' + b.slug}>
              <h3>{b.title}</h3>
            </Link>
            <p>{b.author}</p>
            <div className="price">
              {money(b.price)} {b.list_price > b.price && <del>{money(b.list_price)}</del>}
            </div>
            <button className="outline" disabled={b.available === 0} onClick={() => addToCart(b)}>
              {b.available ? 'Thêm vào giỏ' : 'Hết hàng'}
            </button>
          </article>
        ))}
      </div>

      {!filtered.length && <div className="empty">Chưa tìm thấy sách phù hợp.</div>}
    </div>
  );
}
