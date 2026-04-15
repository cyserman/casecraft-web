import { useState, useEffect } from "react";
import { Timeline, TimelineItem } from "@/components/ui/timeline";
import { Calendar, ChevronRight, Clock } from "lucide-react";

interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  tags?: string[];
}

export default function CaseTimeline() {
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);

  useEffect(() => {
    // Fetch timeline data from API
    const fetchData = async () => {
      const response = await fetch("/api/timeline");
      const data = await response.json();
      setTimeline(data);
    };
    fetchData();
  }, []);

  return (
    <div className="glass-panel-lg p-6 rounded-xl">
      <div className="flex items-center gap-4 mb-6">
        <Calendar className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-serif font-bold text-navy-blue">Case Timeline</h2>
      </div>

      <Timeline>
        {timeline.map((item) => (
          <TimelineItem key={item.id}>
            <div className="flex items-center gap-4 mb-2">
              <Clock className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-500">{item.date}</span>
            </div>
            <h3 className="font-bold text-navy-blue mb-2">{item.title}</h3>
            <p className="text-charcoal-gray">{item.description}</p>
            <div className="flex gap-2 mt-2">
              {item.tags?.map((tag, idx) => (
                <span key={idx} className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                  {tag}
                </span>
              ))}
            </div>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
}