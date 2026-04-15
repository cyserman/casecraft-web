import { useState } from "react";
import { X, Plus, CheckCircle } from "lucide-react";

interface StickyNote {
  id: string;
  content: string;
  color: string;
  createdAt: string;
}

export default function StickyNotes() {
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if (!newNote.trim()) return;

    const note = {
      id: Date.now().toString(),
      content: newNote,
      color: getRandomStickyColor(),
      createdAt: new Date().toLocaleDateString(),
    };

    setNotes([...notes, note]);
    setNewNote("");
  };

  const removeNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const getRandomStickyColor = () => {
    const colors = [
      "bg-yellow-200",
      "bg-pink-200",
      "bg-blue-200",
      "bg-green-200",
      "bg-purple-200",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="sticky-notes">
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a note..."
          className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          onClick={addNote}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-bold transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`sticky-note p-4 rounded-lg shadow-lg min-h-32 ${note.color}`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm text-slate-500">
                {new Date(note.createdAt).toLocaleDateString()}
              </span>
              <button
                onClick={() => removeNote(note.id)}
                className="text-slate-500 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-sm">{note.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}