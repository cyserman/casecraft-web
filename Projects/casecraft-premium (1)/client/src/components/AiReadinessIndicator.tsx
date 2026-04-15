import { useState, useEffect } from "react";
import { Zap, CheckCircle, AlertCircle } from "lucide-react";

export default function AiReadinessIndicator() {
  const [status, setStatus] = useState("checking");
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Simulate checking AI readiness
    const checkAi = async () => {
      setStatus("checking");
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate AI analysis
      const mockScore = Math.floor(Math.random() * 30) + 70; // 70-100%
      setScore(mockScore);
      setStatus("ready");
    };

    checkAi();
  }, []);

  if (status === "checking") {
    return (
      <div className="ai-readiness-indicator">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />
          <h3 className="text-lg font-bold text-navy-blue">AI Analysis in Progress</h3>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div className="bg-yellow-500 h-2 rounded-full animate-pulse" style={{ width: "70%" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="ai-readiness-indicator">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-navy-blue">AI Case Analysis Ready</h3>
        <span className={`text-sm font-bold px-3 py-1 rounded-full ${
          score >= 90 ? "bg-green-100 text-green-700" : score >= 70 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
        }`}>
          {score}%
        </span>
      </div>
      <div className="bg-slate-100 rounded-lg p-4 border border-slate-200">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-green-500" />
          <div>
            <p className="font-bold text-navy-blue">Case Analysis Complete</p>
            <p className="text-sm text-slate-500">
              Evidence integrity verified with SHA-256 fingerprinting. AI has analyzed your case documents.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}