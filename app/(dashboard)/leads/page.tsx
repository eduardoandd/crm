import { Users } from "lucide-react";

export default function LeadsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-64 rounded-xl border border-dashed border-border text-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <Users className="w-5 h-5 text-primary" />
      </div>
      <div>
        <p className="text-sm font-medium">Gestão de Leads</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Implementado na aula M4
        </p>
      </div>
    </div>
  );
}
