'use client';

import { use } from 'react';
import Link from 'next/link';

export default function SuccessPage({ searchParams }: { searchParams: Promise<any> }) {
  const params = use(searchParams);
  const orderId = params.id;

  return (
    <div className="panel animate-fade" style={{ maxWidth: '600px', margin: '40px auto', textAlign: 'center' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
      <h2 style={{ color: 'var(--price)' }}>Đặt hàng thành công!</h2>
      <p>Mã đơn hàng của bạn là: <strong>#{orderId}</strong></p>
      <p style={{ color: 'var(--text-color)', marginBottom: '32px' }}>
        Cảm ơn bạn đã tin tưởng Dalifa Books. Chúng tôi sẽ sớm liên hệ để xác nhận đơn hàng.
      </p>
      
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Link href="/" className="button outline">Về trang chủ</Link>
        <Link href="/tra-cuu" className="button">Tra cứu đơn hàng</Link>
      </div>
    </div>
  );
}
