'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { api, money } from '@/lib/api';
import { Cover } from '@/app/components/Cover';
import { useCart } from '@/app/providers';

export default function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const unwrappedParams = use(params);

  useEffect(() => {
    api('products').then(data => {
      const found = data.find((b: any) => b.slug === unwrappedParams.slug);
      setBook(found);
      setLoading(false);
    });
  }, [unwrappedParams.slug]);

  if (loading) return <div className="empty animate-fade">Đang tải dữ liệu...</div>;
  if (!book) return <div className="empty">Không tìm thấy sách này. <Link href="/">Về trang chủ</Link></div>;

  return (
    <div className="detail animate-fade">
      <Link href="/danh-muc" className="muted" style={{ display: 'inline-block', marginBottom: '16px' }}>← Quay lại</Link>
      
      <div className="cover-wrapper">
        <Cover book={book} />
      </div>
      <div className="info">
        <div className="eyebrow">{book.category}</div>
        <h2>{book.title}</h2>
        <p className="muted">Tác giả: <strong>{book.author}</strong></p>
        
        <div className="price-block">
          <div className="price" style={{ fontSize: '2em' }}>{money(book.price)}</div>
          {book.list_price > book.price && (
            <div className="muted" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <del>{money(book.list_price)}</del> 
              <span style={{ color: 'var(--price)' }}>
                -{Math.round((1 - book.price/book.list_price)*100)}%
              </span>
            </div>
          )}
        </div>

        <p className="desc">{book.description}</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: 'var(--bgbestsale)', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
          <div><strong>Mã (SKU):</strong> {book.sku}</div>
          <div><strong>ISBN:</strong> {book.isbn}</div>
          <div><strong>Năm xuất bản:</strong> {book.pub_year}</div>
          <div><strong>Tồn kho:</strong> {book.available} quyển</div>
        </div>

        <button 
          className="lg" 
          disabled={book.available === 0} 
          onClick={() => addToCart(book)}
          style={{ width: '100%', maxWidth: '300px' }}
        >
          {book.available ? 'Thêm vào giỏ' : 'Hết hàng'}
        </button>
      </div>
    </div>
  );
}
