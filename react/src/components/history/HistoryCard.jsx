export default function HistoryCard({ item }) {
  const hematItem = item.hargaEceran - item.hargaPorsiGrosir;
  const persenItem = Math.round((hematItem / item.hargaEceran) * 100);

  return (
    <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700 transition hover:border-blue-500/50">
      <div className="flex items-center gap-3">
        <span className="p-2.5 bg-blue-100 dark:bg-blue-950 rounded-xl text-lg">{item.kategori}</span>
        <div>
          <p className="font-bold text-xs sm:text-sm leading-tight text-slate-900 dark:text-white">{item.nama}</p>
          <p className="text-[10px] text-slate-400 mt-1">Patungan {item.porsi} &bull; {item.tanggal}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-xs sm:text-sm text-emerald-600 dark:text-emerald-400">+Rp {hematItem.toLocaleString('id-ID')}</p>
        <p className="text-[10px] text-slate-400 mt-1">Hemat {persenItem}%</p>
      </div>
    </div>
  );
}
