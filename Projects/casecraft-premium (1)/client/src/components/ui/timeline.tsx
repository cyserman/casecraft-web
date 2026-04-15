import { ReactNode } from "react";

export function Timeline({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gradient-to-b from-yellow-500 via-yellow-400 to-yellow-300" />
      <div className="ml-8">{children}</div>
    </div>
  );
}

export function TimelineItem({ children }: { children: ReactNode }) {
  return <div className="relative mb-6">{children}</div>;
}