import { useState } from "react";
import { Calendar, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function ParentingPlan() {
  const [scheduleType, setScheduleType] = useState("50-50");
  const [generatedPlan, setGeneratedPlan] = useState("");

  const generatePlan = (type: string) => {
    setScheduleType(type);
    let plan = "";

    switch (type) {
      case "50-50":
        plan = `**Custody Schedule (50/50 - 2-2-3):**\n\n- **Week 1:**\n  - Monday/Tuesday: With Parent A\n  - Wednesday/Thursday: With Parent B\n  - Friday/Saturday/Sunday: With Parent A\n- **Week 2:**\n  - Monday/Tuesday: With Parent B\n  - Wednesday/Thursday: With Parent A\n  - Friday/Saturday/Sunday: With Parent B\n\n*Holidays alternated annually.*`;
        break;
      case "weekend":
        plan = `**Custody Schedule (Primary/Partial):**\n\n- **Weekdays:** Reside with Primary Parent.\n- **Weekends:** Alternate weekends with Partial Custody Parent (Friday 5PM to Sunday 6PM).\n- **Mid-Week:** One dinner visit (Wednesday 5PM-8PM) for Partial Custody Parent.\n\n*Ideal for school consistency.*`;
        break;
      case "long-distance":
        plan = `**Custody Schedule (Long Distance):**\n\n- **School Year:** Primary custody with Parent A. Parent B has one weekend per month (if feasible).\n- **Summer:** Parent B has 6-8 weeks of consecutive custody.\n- **Breaks:** Alternating Spring/Winter breaks.\n\n*Requires reliable travel arrangements.*`;
        break;
      default:
        plan = "";
    }
    setGeneratedPlan(plan);
  };

  return (
    <div className="glass-panel p-6 border-l-4 border-blue-500">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-blue-500" />
        <h3 className="font-serif font-bold text-lg text-white">Plan Architect</h3>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-slate-400 text-xs uppercase tracking-wider mb-2 block">Custody Structure</Label>
          <Select defaultValue="50-50" onValueChange={generatePlan}>
            <SelectTrigger className="w-full bg-slate-900/50 border-slate-700 text-white">
              <SelectValue placeholder="Select Strategy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="50-50">50/50 Shared (2-2-3)</SelectItem>
              <SelectItem value="weekend">Every Other Weekend</SelectItem>
              <SelectItem value="long-distance">Long Distance / Summer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 min-h-[120px] text-sm text-slate-300 relative border border-slate-800">
           {generatedPlan ? (
             <div className="whitespace-pre-wrap font-mono text-xs">{generatedPlan}</div>
           ) : (
             <div className="flex items-center justify-center h-full text-slate-600 italic">
               Select a strategy to generate a court-ready schedule snippet.
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
