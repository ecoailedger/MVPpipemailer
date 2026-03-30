export default function PanelHeader({ email }) {
  return (
    <div className="border-b border-slate-200 bg-white px-4 py-3">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded bg-[#FF5A28] text-sm font-bold text-white">P</div>
        <p className="text-sm font-semibold text-slate-900">Pipedrive Connect</p>
      </div>

      <div className="mt-3 rounded-md border border-slate-200 bg-slate-50 p-3">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold text-slate-900">
            {email.senderName} · {email.company}
          </p>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
            Contact found in Pipedrive
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-600">📧 {email.senderEmail}</p>
        <p className="text-xs text-slate-600">📞 {email.senderPhone}</p>
      </div>
    </div>
  );
}
