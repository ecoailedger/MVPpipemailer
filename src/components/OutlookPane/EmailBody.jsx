export default function EmailBody({ email }) {
  return (
    <div className="flex h-[70%] flex-col bg-white">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-900">{email.subject}</h2>
        <div className="mt-2 space-y-1 text-xs text-slate-600">
          <p>
            <span className="font-medium text-slate-800">From:</span> {email.senderName} &lt;{email.senderEmail}&gt;
          </p>
          <p>
            <span className="font-medium text-slate-800">To:</span> {email.to}
          </p>
          <p>
            <span className="font-medium text-slate-800">CC:</span> {email.cc || '—'}
          </p>
          <p>
            <span className="font-medium text-slate-800">Date:</span> {email.date}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3">
        <pre className="whitespace-pre-wrap text-sm leading-6 text-slate-700">{email.body}</pre>
      </div>

      <div className="flex items-center gap-2 border-t border-slate-200 px-4 py-2 text-xs text-slate-600">
        <button className="rounded bg-slate-100 px-2 py-1 hover:bg-slate-200">Reply</button>
        <button className="rounded bg-slate-100 px-2 py-1 hover:bg-slate-200">Forward</button>
        <button className="rounded bg-slate-100 px-2 py-1 hover:bg-slate-200">...</button>
      </div>
    </div>
  );
}
