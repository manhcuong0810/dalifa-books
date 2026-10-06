'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/providers';
import { api, money } from '@/lib/api';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, total, refreshCart } = useCart();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!cart.length) return (
    <div className="empty animate-fade">Giỏ hàng trống. <Link href="/danh-muc">Mua sắm</Link></div>
  );

  const checkout = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.target);
    const body = Object.fromEntries(fd);
    try {
      const { orderId } = await api('checkout', 'POST', body);
      await refreshCart();
      router.push(`/thanh-cong?id=${orderId}`);
    } catch (e: any) {
      alert(e.message);
      setLoading(false);
    }
  };

  return (
    <div className="panel animate-fade">
      <h2>Thông tin giao hàng</h2>
      <form onSubmit={checkout} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <input name="name" placeholder="Họ và tên" required />
        <input name="phone" placeholder="Số điện thoại" required />
        <input name="address" placeholder="Địa chỉ giao hàng" required />
        
        <div className="cart-item" style={{ borderTop: '2px dashed var(--bgbestsale)', marginTop: '24px', paddingTop: '24px' }}>
          <h3 style={{ margin: 0 }}>Tổng thanh toán (COD)</h3>
          <h3 style={{ margin: 0, color: 'var(--price)' }}>{money(total)}</h3>
        </div>
        
        <div style={{ textAlign: 'right', marginTop: '16px' }}>
          <button type="submit" className="lg" disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Xác nhận đặt hàng'}
          </button>
        </div>
      </form>
    </div>
  );
}
