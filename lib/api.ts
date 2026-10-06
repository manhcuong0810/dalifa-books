export async function api(path: string, method = 'GET', body?: any) {
  const r = await fetch('/api/v1/' + path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    ...(body ? { body: JSON.stringify(body) } : {})
  });
  const j = await r.json();
  if (!j.success) throw Error(j.error.message);
  return j.data;
}

export const money = (n: number) => n.toLocaleString('vi-VN') + 'đ';
