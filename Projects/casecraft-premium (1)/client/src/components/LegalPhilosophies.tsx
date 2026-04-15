import React from 'react';

const philosophies = [
  {
    name: "Legal Realism",
    description: "Law is not a set of abstract principles but a response to social and economic conditions. Legal realists believe that law is what judges actually do, not what they say they do.",
    keyThinkers: ["Oliver Wendell Holmes Jr.", "Karl Llewellyn", "Jerome Frank"],
    focus: "Judicial behavior and social impact"
  },
  {
    name: "Positivism",
    description: "Law is a command of a sovereign backed by sanctions. Legal positivism separates law as it is from law as it ought to be (the 'separation thesis').",
    keyThinkers: ["John Austin", "H.L.A. Hart", "Jeremy Bentham"],
    focus: "Source-based authority"
  },
  {
    name: "Natural Law",
    description: "Law is based on moral principles derived from nature or a divine source. An unjust law is not a true law and need not be obeyed.",
    keyThinkers: ["Thomas Aquinas", "John Locke", "Cicero"],
    focus: "Moral foundations of law"
  },
  {
    name: "Critical Legal Studies",
    description: "Law is indeterminate and used to maintain existing power structures. Legal rules are often used to legitimize existing social arrangements and inequalities.",
    keyThinkers: ["Duncan Kennedy", "Mark Tushnet", "Roberto Unger"],
    focus: "Power dynamics and ideology"
  },
  {
    name: "Feminist Legal Theory",
    description: "Law perpetuates patriarchal values and gender inequality. Examines how law constructs gender and reinforces stereotypes.",
    keyThinkers: ["Catharine MacKinnon", "Robin West", "Martha Fineman"],
    focus: "Gender equality and intersectionality"
  },
  {
    name: "Law and Economics",
    description: "Legal rules should be evaluated based on their efficiency in promoting economic welfare. Assumes individuals act rationally to maximize their utility.",
    keyThinkers: ["Richard Posner", "Gary Becker", "Ronald Coase"],
    focus: "Efficiency and incentives"
  },
  {
    name: "Originalism",
    description: "The meaning of a constitution is fixed at the time of its enactment. Constitutional interpretation should be based on the original understanding of the framers.",
    keyThinkers: ["Antonin Scalia", "Robert Bork", "Clarence Thomas"],
    focus: "Constitutional interpretation"
  },
  {
    name: "Living Constitutionalism",
    description: "The constitution is a living document whose meaning evolves over time to meet changing social needs. Interpretation should consider contemporary values.",
    keyThinkers: ["William Brennan", "Thurgood Marshall", "David Souter"],
    focus: "Adaptability and progress"
  }
];

const LegalPhilosophies: React.FC = () => {
  const [selectedPhilosophy, setSelectedPhilosophy] = React.useState<null | typeof philosophies[0]>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-4">Legal Philosophies</h1>
        <p className="text-center text-gray-600 mb-12">
          Overview of key legal theories and approaches
        </p>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Philosophy List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Legal Philosophy Index</h2>
                <p className="text-gray-600 mb-6">Select a philosophy to learn more about its core concepts.</p>
                
                <div className="space-y-4">
                  {philosophies.map((philosophy, index) => (
                    <button
                      key={philosophy.name}
                      onClick={() => setSelectedPhilosophy(philosophies[index])}
                      className={`w-full p-4 rounded-lg text-left ${
                        selectedPhilosophy?.name === philosophy.name
                          ? "bg-red-50 border-2 border-red-200"
                          : "hover:bg-gray-50 border border-transparent"
                      }`}
                    >
                      <h3 className="font-bold text-navy-blue">{philosophy.name}</h3>
                      <p className="text-gray-600 mt-1">{philosophy.focus}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Philosophy Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              {selectedPhilosophy ? (
                <div className="p-8">
                  <div className="mb-6">
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      {selectedPhilosophy.focus}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">{selectedPhilosophy.name}</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">{selectedPhilosophy.description}</p>
                  
                  <div className="mb-8">
                    <h3 className="font-bold text-lg mb-4">Key Thinkers:</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedPhilosophy.keyThinkers.map((thinker, index) => (
                        <span key={index} className="px-4 py-2 bg-gray-100 rounded-lg text-sm">
                          {thinker}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
                      Compare Philosophies
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-500">Select a philosophy from the left to view details.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPhilosophies;