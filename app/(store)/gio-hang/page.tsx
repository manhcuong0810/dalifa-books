'use client';

import Link from 'next/link';
import { useCart } from '@/app/providers';
import { api, money } from '@/lib/api';

export default function CartPage() {
  const { cart, setCart, total } = useCart();

  const updateCart = async (id: number, qty: number) => {
    if (qty < 1) {
      await api('cart/items/' + id, 'DELETE');
      setCart(cart.filter((i: any) => i.id !== id));
      return;
    }
    const newCart = await api('cart/items', 'POST', { productId: id, quantity: qty });
    setCart(newCart);
  };

  if (!cart.length) return (
    <div className="empty animate-fade">
      <div className="eyebrow" style={{ marginBottom: '16px' }}>Giỏ hàng của bạn đang trống</div>
      <Link href="/danh-muc" className="button">Tiếp tục mua sắm</Link>
    </div>
  );

  return (
    <div className="panel animate-fade">
      <h2>Giỏ hàng của bạn</h2>
      {cart.map((i: any) => (
        <div className="cart-item" key={i.id}>
          <strong>{i.title}</strong>
          <div>
            <button onClick={() => updateCart(i.id, i.quantity - 1)}>-</button>
            <span style={{ margin: '0 12px', fontWeight: 'bold' }}>{i.quantity}</span>
            <button onClick={() => updateCart(i.id, i.quantity + 1)}>+</button>
          </div>
          <strong style={{ minWidth: '100px', textAlign: 'right' }}>{money(i.price * i.quantity)}</strong>
        </div>
      ))}
      <div className="cart-item" style={{ borderTop: '2px dashed var(--bgbestsale)', marginTop: '24px', paddingTop: '24px' }}>
        <h3 style={{ margin: 0 }}>Tổng cộng</h3>
        <h3 style={{ margin: 0, color: 'var(--price)' }}>{money(total)}</h3>
      </div>
      <div style={{ textAlign: 'right', marginTop: '32px' }}>
        <Link href="/thanh-toan" className="button lg">Tiến hành đặt hàng</Link>
      </div>
    </div>
  );
}
