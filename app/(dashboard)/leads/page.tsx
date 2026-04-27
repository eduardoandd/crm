import { LeadsTable } from "@/components/leads/leads-table";
import { MOCK_LEADS } from "@/lib/mock-data";

export const metadata = { title: "Leads — PipeFlow" };

export default function LeadsPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Leads</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          {MOCK_LEADS.length} leads cadastrados
        </p>
      </div>

      <LeadsTable initialLeads={MOCK_LEADS} />
    </div>
  );
}
