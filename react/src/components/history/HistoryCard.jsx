export default function HistoryCard({ item }) {
  const hematItem = item.hargaEceran - item.hargaPorsiGrosir;
  const persenItem = Math.round((hematItem / item.hargaEceran) * 100);

  return (
    <div className="flex items-center justify-between p-3.5 rounded-xl bg-bg-subtle border border-border-subtle transition hover:border-primary-soft">
      <div className="flex items-center gap-3">
        <span className="p-2.5 bg-primary-soft rounded-xl text-lg">{item.kategori}</span>
        <div>
          <p className="font-bold text-xs sm:text-sm leading-tight text-text-heading">{item.nama}</p>
          <p className="text-[10px] text-text-muted mt-1">Patungan {item.porsi} &bull; {item.tanggal}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-xs sm:text-sm text-success-text">+Rp {hematItem.toLocaleString('id-ID')}</p>
        <p className="text-[10px] text-text-muted mt-1">Hemat {persenItem}%</p>
      </div>
    </div>
  );
}
