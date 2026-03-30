import { useMemo, useState } from 'react';
import EmailBody from './components/OutlookPane/EmailBody';
import InboxList from './components/OutlookPane/InboxList';
import LogToDeal from './components/PipedrivePanel/LogToDeal';
import NewDeal from './components/PipedrivePanel/NewDeal';
import PanelHeader from './components/PipedrivePanel/PanelHeader';
import TabBar from './components/PipedrivePanel/TabBar';
import UpdateStage from './components/PipedrivePanel/UpdateStage';
import { deals, defaultSummary, emails, owners, pipelines } from './data/dummyData';

export default function App() {
  const [selectedEmail, setSelectedEmail] = useState(emails[0]);
  const [activeTab, setActiveTab] = useState('Log to Deal');
  const [tabResetKey, setTabResetKey] = useState(0);

  const summaryForEmail = useMemo(() => {
    if (selectedEmail.id === 1) return defaultSummary;
    return `Email from ${selectedEmail.senderName} re: ${selectedEmail.subject}.`;
  }, [selectedEmail]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setTabResetKey((prev) => prev + 1);
  };

  return (
    <main className="h-screen bg-slate-100 p-3 text-slate-800">
      <div className="mx-auto flex h-full max-w-[1400px] flex-col overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm">
        <header className="border-b border-slate-200 bg-white px-4 py-2 text-sm font-semibold">
          Outlook Add-in Chrome — Midwich Pipedrive Connect
        </header>

        <section className="flex h-full min-h-0">
          <div className="w-[55%] min-w-0 bg-[#f8fafc]">
            <InboxList emails={emails} selectedEmailId={selectedEmail.id} onSelect={setSelectedEmail} />
            <EmailBody email={selectedEmail} />
          </div>

          <div className="w-px bg-slate-200" />

          <div className="w-[45%] min-w-0 bg-[#f9fafb]">
            <PanelHeader email={selectedEmail} />
            <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
            <div className="h-[calc(100%-156px)] overflow-y-auto">
              {activeTab === 'Log to Deal' && <LogToDeal deals={deals} initialSummary={summaryForEmail} resetKey={tabResetKey} />}
              {activeTab === 'New Deal' && (
                <NewDeal email={selectedEmail} pipelines={pipelines} owners={owners} resetKey={tabResetKey} />
              )}
              {activeTab === 'Update Stage' && (
                <UpdateStage deals={deals} stages={pipelines['UK Distribution']} resetKey={tabResetKey} />
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
