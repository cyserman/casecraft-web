import React, { useState, useEffect } from 'react';
import { Link } from "wouter";

const EmotionalTracker: React.FC = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    emotion: '',
    intensity: 5,
    trigger: '',
    physicalSensation: '',
    notes: ''
  });
  const [filteredEntries, setFilteredEntries] = useState(entries);

  const emotions = [
    'Angry', 'Anxious', 'Calm', 'Confused', 'Depressed', 'Energized', 
    'Frustrated', 'Guilty', 'Hopeful', 'Overwhelmed', 'Sad', 'Stressed', 
    'Vulnerable', 'Worried', 'Empowered', 'Resolute', 'Determined'
  ];

  useEffect(() => {
    // Load existing entries from localStorage
    const saved = localStorage.getItem('casecraft_emotional_log');
    if (saved) {
      setEntries(JSON.parse(saved));
      setFilteredEntries(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Save entries to localStorage
    localStorage.setItem('casecraft_emotional_log', JSON.stringify(entries));
    setFilteredEntries(entries);
  }, [entries]);

  const addEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.emotion) return;

    const entry = {
      id: Date.now(),
      ...newEntry,
      date: newEntry.date,
      time: newEntry.time
    };

    setEntries([entry, ...entries]);
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      emotion: '',
      intensity: 5,
      trigger: '',
      physicalSensation: '',
      notes: ''
    });
  };

  const deleteEntry = (id: number) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const filterEntries = (date: string) => {
    if (!date) return;
    setFilteredEntries(entries.filter(entry => entry.date === date));
  };

  // Get insights from entries
  const totalEntries = entries.length;
  const recentEntries = entries.slice(0, 7);
  const avgIntensity = entries.length > 0 
    ? entries.reduce((sum, entry) => sum + entry.intensity, 0) / entries.length 
    : 0;

  const emotionCounts = recentEntries.length > 0 
    ? recentEntries.reduce((counts, entry) => {
        counts[entry.emotion] = (counts[entry.emotion] || 0) + 1;
        return counts;
      }, {} as Record<string, number>)
    : {};

  const topEmotion = Object.keys(emotionCounts).reduce((a, b) => 
    emotionCounts[a] > emotionCounts[b] ? a : b, '');

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-navy-blue mb-4">Emotional Management Tracker</h1>
            <p className="text-gray-600">
              Monitor your emotional state during litigation to maintain clarity and identify triggers.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-navy-blue mb-2">Total Entries</h3>
              <p className="text-3xl font-bold">{totalEntries}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-navy-blue mb-2">Avg Intensity</h3>
              <p className="text-3xl font-bold">{avgIntensity.toFixed(1)}/10</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-navy-blue mb-2">Top Emotion (7 days)</h3>
              <p className="text-2xl font-bold">{topEmotion || 'N/A'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* New Entry Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold mb-6">Log Emotional State</h2>
              <form onSubmit={addEntry} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      value={newEntry.date}
                      onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <input
                      type="time"
                      value={newEntry.time}
                      onChange={(e) => setNewEntry({...newEntry, time: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary Emotion</label>
                  <select
                    value={newEntry.emotion}
                    onChange={(e) => setNewEntry({...newEntry, emotion: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select emotion...</option>
                    {emotions.map(emotion => (
                      <option key={emotion} value={emotion}>{emotion}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Intensity (1-10)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newEntry.intensity}
                    onChange={(e) => setNewEntry({...newEntry, intensity: parseInt(e.target.value)})}
                    className="w-full"
                  />
                  <div className="text-center text-gray-500 text-sm mt-1">
                    {newEntry.intensity}/10
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trigger / Situation
                  </label>
                  <input
                    type="text"
                    value={newEntry.trigger}
                    onChange={(e) => setNewEntry({...newEntry, trigger: e.target.value})}
                    placeholder="What triggered this emotion?"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Physical Sensation
                  </label>
                  <input
                    type="text"
                    value={newEntry.physicalSensation}
                    onChange={(e) => setNewEntry({...newEntry, physicalSensation: e.target.value})}
                    placeholder="Where did you feel it in your body?"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={newEntry.notes}
                    onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
                    placeholder="Additional context..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  Save Entry
                </button>
              </form>
            </div>

            {/* Entries List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Emotional Log</h2>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                  onChange={(e) => filterEntries(e.target.value)}
                >
                  <option value="">All dates</option>
                  {Array.from(new Set(entries.map(entry => entry.date).sort().reverse())).map(date => (
                    <option key={date} value={date}>{date}</option>
                  ))}
                </select>
              </div>

              {filteredEntries.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p>No entries yet. Start logging to track your emotional patterns.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredEntries.map(entry => (
                    <div key={entry.id} className="border-b border-gray-100 pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                              entry.emotion === 'Calm' || entry.emotion === 'Empowered' 
                                ? 'bg-green-100 text-green-800' 
                                : entry.emotion === 'Angry' || entry.emotion === 'Frustrated'
                                ? 'bg-red-100 text-red-800'
                                : entry.emotion === 'Anxious' || entry.emotion === 'Worried'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                            }'}>{entry.emotion}</span>
                            <span className="text-sm text-gray-500">
                              {entry.date} {entry.time}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            Trigger: {entry.trigger || 'N/A'}
                          </p>
                          <p className="text-sm text-gray-500">
                            Physical: {entry.physicalSensation || 'N/A'}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteEntry(entry.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                      {entry.notes && (
                        <p className="mt-2 text-sm text-gray-700 italic pl-4">
                          "{entry.notes}"
                        </p>
                      )}
                      <div className="mt-2 flex gap-2">
                        <div className="text-xs bg-gray-100 px-2 py-1 rounded">
                          Intensity: {entry.intensity}/10
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Insights */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Emotional Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-navy-blue mb-2">Patterns Detected</h3>
                <p className="text-gray-600">
                  {topEmotion ? `You've been feeling ${topEmotion} most frequently.` : 'No clear pattern yet.'}
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-navy-blue mb-2">Intensity Alert</h3>
                <p className="text-gray-600">
                  {avgIntensity > 6 
                    ? 'Your average emotional intensity is high. Consider stress-reduction techniques.' 
                    : 'Your emotional intensity is within a manageable range.'}
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-navy-blue mb-2">Next Steps</h3>
                <p className="text-gray-600">
                  Review entries with high intensity to identify triggers. Consider discussing patterns with your attorney.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionalTracker;