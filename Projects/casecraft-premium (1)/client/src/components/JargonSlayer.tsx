import { useState } from "react";
import { Search, Zap, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Pre-seeded database for Pennsylvania Criminal/Family Law
const LEGAL_TERMS: Record<string, string> = {
    "ard": "Accelerated Rehabilitative Disposition. A program for first-time offenders (usually DUI) that allows you to earn a dismissal of charges and expungement of your record.",
    "preliminary hearing": "The first major court date where the Commonwealth must prove a crime *likely* happened and you *likely* did it. NOT a trial. We often use this to lock in testimony or get charges dismissed.",
    "psi": "Pre-Sentence Investigation. A background check run by probation before sentencing to give the judge a fuller picture of your life.",
    "custody conference": "A non-binding meeting with a court conciliator to try and reach an agreement before seeing a judge.",
    "pfad": "Protection From Abuse Docket. A civil order that prevents contact. Violation is a criminal offense.",
    "summary offense": "The lowest level of crime in PA (like a traffic ticket or disorderly conduct). Usually results in a fine, but can carry up to 90 days in jail.",
    "misdemeanor": "More serious than a summary, less than a felony. Class 1 is up to 5 years. Class 2 is up to 2 years. Class 3 is up to 1 year.",
    "felony": "The most serious class of crime. Can result in significant prison time and loss of rights (like owning a firearm).",
    "miranda rights": "You only have these if you are in CUSTODY and being INTERROGATED. Police don't have to read them just to arrest you.",
    "bifurcation": "Splitting a divorce case into two parts: granting the divorce decree first, and dealing with money/property later.",
};

export default function JargonSlayer() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState<string | null>(null);

    const handleSearch = (term: string) => {
        setQuery(term);
        if (!term) {
            setResult(null);
            return;
        }

        const lowerTerm = term.toLowerCase();
        // Exact match or partial match
        const match = Object.keys(LEGAL_TERMS).find((key) => key.includes(lowerTerm) || lowerTerm.includes(key));

        if (match) {
            setResult(LEGAL_TERMS[match]);
        } else {
            setResult("Term not found in our tactical database. Contact Steve for a direct translation.");
        }
    };

    return (
        <div className="glass-panel p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <h3 className="font-serif font-bold text-lg text-white">Jargon Slayer</h3>
                </div>
                {result && (
                    <Button variant="ghost" size="sm" onClick={() => { setQuery(""); setResult(null); }} className="text-slate-400 hover:text-white">
                        <X className="w-4 h-4" />
                    </Button>
                )}
            </div>

            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Type a legal term (e.g., ARD, PSI)..."
                    className="pl-9 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:ring-yellow-500"
                />
            </div>

            {result && query && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                    <p className="text-yellow-400 font-bold mb-1 text-sm uppercase tracking-wide">Translation:</p>
                    <p className="text-slate-200 leading-relaxed text-sm">{result}</p>
                </div>
            )}

            {!result && !query && (
                <p className="text-slate-500 text-xs italic">
                    Instant translation of common Chester/Montco court terms.
                </p>
            )}
        </div>
    );
}
