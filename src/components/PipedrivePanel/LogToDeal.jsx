import { useEffect, useState } from 'react';

const types = [
  { label: 'Email', icon: '📧' },
  { label: 'Call', icon: '📞' },
  { label: 'Note', icon: '📝' },
];

export default function LogToDeal({ deals, initialSummary, resetKey }) {
  const [dealId, setDealId] = useState(String(deals[0].id));
  const [activityType, setActivityType] = useState('Email');
  const [summary, setSummary] = useState(initialSummary);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setDealId(String(deals[0].id));
    setActivityType('Email');
    setSummary(initialSummary);
    setSubmitted(false);
  }, [resetKey, deals, initialSummary]);

  const selectedDeal = deals.find((d) => String(d.id) === dealId);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-3 p-3 text-xs">
      <label className="block space-y-1">
        <span className="font-semibold text-slate-700">Select Deal</span>
        <select value={dealId} onChange={(e) => setDealId(e.target.value)} className="w-full rounded border border-slate-300 px-2 py-1.5">
          {deals.map((deal) => (
            <option key={deal.id} value={deal.id}>{deal.name} — {deal.stage} — £{deal.value.toLocaleString()}</option>
          ))}
        </select>
      </label>

      <div className="space-y-1">
        <p className="font-semibold text-slate-700">Activity Type</p>
        <div className="flex gap-2">
          {types.map((type) => (
            <button
              key={type.label}
              type="button"
              onClick={() => setActivityType(type.label)}
              className={`rounded-full border px-3 py-1 ${activityType === type.label ? 'border-[#FF5A28] bg-orange-50 text-[#FF5A28]' : 'border-slate-300 text-slate-600'}`}
            >
              {type.icon} {type.label}
            </button>
          ))}
        </div>
      </div>

      <label className="block space-y-1">
        <span className="font-semibold text-slate-700">Summary</span>
        <textarea rows={5} value={summary} onChange={(e) => setSummary(e.target.value)} className="w-full rounded border border-slate-300 px-2 py-1.5" />
      </label>

      <button type="button" onClick={handleSubmit} className="w-full rounded bg-[#FF5A28] py-2 font-semibold text-white hover:brightness-95">
        Log Activity
      </button>

      {submitted && <div className="rounded bg-emerald-50 p-2 text-emerald-700">✅ Activity logged to {selectedDeal?.name}</div>}
    </div>
  );
}
