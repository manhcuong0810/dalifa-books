export function Cover({ book, small = false }: { book: any, small?: boolean }) {
  return (
    <div className={'cover ' + (small ? 'small' : '')} style={{ background: book.color || '#0d4432' }}>
      <span>{book.author}</span>
      <strong>{book.title}</strong>
      <span>DALIFA · SÁCH MẪU</span>
    </div>
  );
}
