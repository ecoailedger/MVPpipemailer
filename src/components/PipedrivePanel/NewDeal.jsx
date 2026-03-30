import { useEffect, useState } from 'react';

export default function NewDeal({ email, pipelines, owners, resetKey }) {
  const pipelineNames = Object.keys(pipelines);
  const defaultPipeline = pipelineNames[0];

  const [title, setTitle] = useState(`Avocor — ${email.dealTopic}`);
  const [pipeline, setPipeline] = useState(defaultPipeline);
  const [stage, setStage] = useState(pipelines[defaultPipeline][0]);
  const [value, setValue] = useState('');
  const [closeDate, setCloseDate] = useState('');
  const [owner, setOwner] = useState(owners[0]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setTitle(`Avocor — ${email.dealTopic}`);
    setPipeline(defaultPipeline);
    setStage(pipelines[defaultPipeline][0]);
    setValue('');
    setCloseDate('');
    setOwner(owners[0]);
    setSubmitted(false);
  }, [email, resetKey, defaultPipeline, owners, pipelines]);

  const stages = pipelines[pipeline];

  useEffect(() => {
    setStage(stages[0]);
  }, [pipeline, stages]);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-3 p-3 text-xs">
      <label className="block space-y-1"><span className="font-semibold text-slate-700">Deal Title</span><input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded border border-slate-300 px-2 py-1.5" /></label>
      <div className="grid grid-cols-2 gap-2">
        <label className="block space-y-1"><span className="font-semibold text-slate-700">Pipeline</span><select value={pipeline} onChange={(e) => setPipeline(e.target.value)} className="w-full rounded border border-slate-300 px-2 py-1.5">{pipelineNames.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="block space-y-1"><span className="font-semibold text-slate-700">Stage</span><select value={stage} onChange={(e) => setStage(e.target.value)} className="w-full rounded border border-slate-300 px-2 py-1.5">{stages.map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <label className="block space-y-1"><span className="font-semibold text-slate-700">Deal Value (£)</span><input value={value} onChange={(e) => setValue(e.target.value)} placeholder="0.00" type="number" className="w-full rounded border border-slate-300 px-2 py-1.5" /></label>
        <label className="block space-y-1"><span className="font-semibold text-slate-700">Expected Close Date</span><input value={closeDate} onChange={(e) => setCloseDate(e.target.value)} type="date" className="w-full rounded border border-slate-300 px-2 py-1.5" /></label>
      </div>
      <label className="block space-y-1"><span className="font-semibold text-slate-700">Owner</span><select value={owner} onChange={(e) => setOwner(e.target.value)} className="w-full rounded border border-slate-300 px-2 py-1.5">{owners.map((item) => <option key={item}>{item}</option>)}</select></label>

      <button type="button" onClick={handleSubmit} className="w-full rounded bg-[#FF5A28] py-2 font-semibold text-white hover:brightness-95">Create Deal</button>

      {submitted && <div className="rounded bg-emerald-50 p-2 text-emerald-700">✅ Deal created — {title || 'Avocor Q2 Extended Warranty'}</div>}
    </div>
  );
}
