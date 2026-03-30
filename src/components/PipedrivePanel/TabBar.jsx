const tabs = ['Log to Deal', 'New Deal', 'Update Stage'];

export default function TabBar({ activeTab, onTabChange }) {
  return (
    <div className="flex gap-1 border-b border-slate-200 bg-white px-3 py-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onTabChange(tab)}
          className={`rounded px-2 py-1 text-xs font-medium transition ${
            activeTab === tab
              ? 'bg-[#FF5A28] text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
