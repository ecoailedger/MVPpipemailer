import { useEffect, useMemo, useState } from 'react';

export default function UpdateStage({ deals, stages, resetKey }) {
  const [dealId, setDealId] = useState(String(deals[0].id));
  const [currentStage, setCurrentStage] = useState(deals[0].stage);
  const [targetStage, setTargetStage] = useState(deals[0].stage);
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setDealId(String(deals[0].id));
    setCurrentStage(deals[0].stage);
    setTargetStage(deals[0].stage);
    setNote('');
    setSubmitted(false);
  }, [resetKey, deals]);

  const selectedDeal = useMemo(() => deals.find((deal) => String(deal.id) === dealId), [dealId, deals]);

  useEffect(() => {
    if (!selectedDeal) return;
    setCurrentStage(selectedDeal.stage);
    setTargetStage(selectedDeal.stage);
  }, [selectedDeal]);

  const currentIndex = stages.indexOf(currentStage);
  const targetIndex = stages.indexOf(targetStage);

  const handleSubmit = () => {
    setCurrentStage(targetStage);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-3 p-3 text-xs">
      <label className="block space-y-1"><span className="font-semibold text-slate-700">Select Deal</span><select value={dealId} onChange={(e) => setDealId(e.target.value)} className="w-full rounded border border-slate-300 px-2 py-1.5">{deals.map((deal) => <option key={deal.id} value={deal.id}>{deal.name}</option>)}</select></label>

      <div className="rounded border border-orange-200 bg-orange-50 px-2 py-1 text-[#FF5A28]">Current Stage: {currentStage}</div>

      <div className="space-y-2">
        <p className="font-semibold text-slate-700">Move to Stage</p>
        <div className="flex flex-wrap items-center gap-1">
          {stages.map((stage, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            const isTarget = index === targetIndex;
            const canSelect = index >= currentIndex;
            return (
              <button
                key={stage}
                type="button"
                disabled={!canSelect}
                onClick={() => setTargetStage(stage)}
                className={`rounded px-2 py-1 transition ${isCurrent ? 'bg-[#FF5A28] text-white' : isCompleted ? 'bg-slate-200 text-slate-500' : isTarget ? 'bg-orange-100 text-[#FF5A28] ring-1 ring-[#FF5A28]' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'} ${!canSelect ? 'cursor-not-allowed opacity-70' : ''}`}
              >
                {stage}
              </button>
            );
          })}
        </div>
      </div>

      <label className="block space-y-1"><span className="font-semibold text-slate-700">Add note (optional)</span><textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Reason for stage change..." rows={4} className="w-full rounded border border-slate-300 px-2 py-1.5" /></label>

      <button type="button" onClick={handleSubmit} className="w-full rounded bg-[#FF5A28] py-2 font-semibold text-white hover:brightness-95">Update Stage</button>

      {submitted && <div className="rounded bg-emerald-50 p-2 text-emerald-700">✅ {selectedDeal?.name} moved to {targetStage}</div>}
    </div>
  );
}
