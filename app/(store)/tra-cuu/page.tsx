'use client';

import { useState } from 'react';
import { api, money } from '@/lib/api';

export default function LookupPage() {
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  const lookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await api(`orders?phone=${phone}`);
      setOrders(data);
    } catch (e: any) {
      alert('Lỗi: ' + e.message);
    }
    setLoading(false);
  };

  return (
    <div className="panel animate-fade" style={{ maxWidth: '600px', margin: '40px auto' }}>
      <h2 style={{ textAlign: 'center' }}>Tra cứu đơn hàng</h2>
      <p style={{ textAlign: 'center', color: 'var(--text-color)', marginBottom: '24px' }}>
        Nhập số điện thoại của bạn để xem lịch sử mua hàng.
      </p>
      
      <form onSubmit={lookup} style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
        <input 
          placeholder="Số điện thoại" 
          value={phone} 
          onChange={e => setPhone(e.target.value)} 
          required 
          style={{ flex: 1 }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Đang tìm...' : 'Tra cứu'}
        </button>
      </form>

      {orders && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {orders.length === 0 && <p style={{ textAlign: 'center' }}>Không tìm thấy đơn hàng nào.</p>}
          {orders.map(o => (
            <div key={o.id} style={{ background: 'var(--bgbestsale)', padding: '16px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <strong>Đơn #{o.id}</strong>
                <span className="muted">{new Date(o.created_at).toLocaleString('vi-VN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Trạng thái: <b>{o.status}</b></span>
                <span style={{ color: 'var(--price)', fontWeight: 'bold' }}>{money(o.total)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
