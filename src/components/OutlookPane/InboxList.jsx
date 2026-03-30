const avatarColors = ['bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500', 'bg-rose-500', 'bg-cyan-500'];

const initialsFrom = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export default function InboxList({ emails, selectedEmailId, onSelect }) {
  return (
    <div className="h-[30%] overflow-y-auto border-b border-slate-200 bg-[#f8fafc]">
      {emails.map((email, idx) => {
        const selected = email.id === selectedEmailId;
        return (
          <button
            key={email.id}
            type="button"
            onClick={() => onSelect(email)}
            className={`flex w-full items-start gap-3 border-l-2 px-3 py-2 text-left transition ${
              selected
                ? 'border-[#0078D4] bg-blue-50'
                : 'border-transparent hover:bg-slate-100'
            }`}
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${
                avatarColors[idx % avatarColors.length]
              }`}
            >
              {initialsFrom(email.senderName)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-xs font-semibold text-slate-900">
                  {email.senderName} · <span className="font-normal text-slate-600">{email.company}</span>
                </p>
                <div className="flex items-center gap-2">
                  {email.unread && <span className="h-2 w-2 rounded-full bg-[#0078D4]" />}
                  <span className="text-[11px] text-slate-500">{email.timestamp}</span>
                </div>
              </div>
              <p className="truncate text-xs text-slate-600">{email.subject}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
