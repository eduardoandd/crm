import { Kanban } from "lucide-react";

export default function PipelinePage() {
  return (
    <div className="flex flex-col items-center justify-center h-64 rounded-xl border border-dashed border-border text-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <Kanban className="w-5 h-5 text-primary" />
      </div>
      <div>
        <p className="text-sm font-medium">Pipeline Kanban</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Implementado na aula M5
        </p>
      </div>
    </div>
  );
}
