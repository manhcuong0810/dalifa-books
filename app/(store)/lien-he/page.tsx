import { getSettings } from '@/lib/db.mjs';
export const dynamic = 'force-dynamic';
export default function ContactPage() {
  const s: any = getSettings();
  const items = [['location_on', 'Địa chỉ', s.contact_address], ['call', 'Điện thoại', s.contact_phone], ['mail', 'Email', s.contact_email]];
  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-12 pt-48 pb-16">
      <h1 className="text-3xl font-extrabold text-center mb-8">Liên hệ với Dalifa Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {items.map(([icon, label, value]) => (
          <div key={label} className="bg-surface-container-low rounded-2xl p-6 text-center">
            <span className="material-symbols-outlined text-primary text-[32px]">{icon}</span>
            <div className="font-bold mt-2">{label}</div>
            <div className="text-on-surface-variant mt-1">{value}</div>
          </div>
        ))}
      </div>
      <form className="flex flex-col gap-4">
        <input placeholder="Họ và tên" className="h-12 px-4 rounded-lg border border-surface-container-high" />
        <input placeholder="Email" className="h-12 px-4 rounded-lg border border-surface-container-high" />
        <textarea placeholder="Nội dung" rows={5} className="p-4 rounded-lg border border-surface-container-high" />
        <button type="button" className="self-start h-12 px-8 rounded-lg bg-primary text-on-primary font-bold">Gửi tin nhắn</button>
      </form>
    </div>
  );
}
