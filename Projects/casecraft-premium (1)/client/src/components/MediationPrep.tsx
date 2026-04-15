import React from 'react';

const mediationScenarios = [
  {
    id: 1,
    title: "Parenting Time Schedule",
    description: "Creating a fair and workable parenting time schedule after separation",
    scenario: "You and your ex-spouse cannot agree on a parenting schedule. They want every other week, but you want a 2-2-3 schedule. How do you approach mediation?",
    tips: [
      "Focus on the child's stability and routine",
      "Be willing to compromise on less important issues",
      "Consider using a parenting coordinator",
      "Document your proposed schedule with work commitments"
    ]
  },
  {
    id: 2,
    title: "Child Support Calculation",
    description: "Disagreement over income calculation and child support amount",
    scenario: "Your ex-spouse underreports their income. How do you present evidence of their actual earnings in mediation?",
    tips: [
      "Gather tax returns, pay stubs, and bank statements",
      "Consider hiring a forensic accountant",
      "Focus on the child's needs, not punishment",
      "Be prepared to negotiate based on actual expenses"
    ]
  },
  {
    id: 3,
    title: "Relocation Dispute",
    description: "One parent wants to move out of state with the child",
    scenario: "Your ex-spouse has received a job offer in another state and wants to relocate with your child. You object. How do you handle this in mediation?",
    tips: [
      "Research Pennsylvania relocation laws",
      "Propose alternative solutions like extended summer visitation",
      "Focus on maintaining the child's relationship with both parents",
      "Consider the child's educational and social ties"
    ]
  },
  {
    id: 4,
    title: "Communication Breakdown",
    description: "High-conflict co-parenting with poor communication",
    scenario: "You and your ex-spouse cannot communicate without arguments. How can mediation help establish healthy communication boundaries?",
    tips: [
      "Use written communication methods only",
      "Consider using co-parenting apps",
      "Establish clear boundaries and protocols",
      "Consider parallel parenting instead of co-parenting"
    ]
  },
  {
    id: 5,
    title: "College Expenses",
    description: "Disagreement over payment of college expenses for a child",
    scenario: "Your child is about to start college, but you and your ex-spouse disagree on who should pay and how much. How do you approach this in mediation?",
    tips: [
      "Review your divorce agreement for college clauses",
      "Consider the child's academic performance and goals",
      "Discuss contribution based on ability to pay",
      "Explore financial aid and scholarship options"
    ]
  }
];

const MediationPrep: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = React.useState<null | typeof mediationScenarios[0]>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-4">Mediation Prep</h1>
        <p className="text-center text-gray-600 mb-12">
          Practice scenarios for successful mediation outcomes
        </p>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Scenario List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Mediation Scenarios</h2>
                <p className="text-gray-600 mb-6">Select a scenario to practice your mediation skills.</p>
                
                <div className="space-y-4">
                  {mediationScenarios.map(scenario => (
                    <button
                      key={scenario.id}
                      onClick={() => setSelectedScenario(scenario)}
                      className={`w-full p-4 rounded-lg text-left ${
                        selectedScenario?.id === scenario.id
                          ? "bg-blue-50 border-2 border-blue-200"
                          : "hover:bg-gray-50 border border-transparent"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-navy-blue">{scenario.title}</h3>
                        <span className="text-sm text-gray-500">{scenario.tips.length} tips</span>
                      </div>
                      <p className="text-gray-600 mt-2">{scenario.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Scenario Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              {selectedScenario ? (
                <div className="p-8">
                  <div className="mb-6">
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                      Scenario {selectedScenario.id}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">{selectedScenario.title}</h2>
                  <p className="text-gray-600 mb-6">{selectedScenario.description}</p>
                  
                  <div className="mb-8">
                    <h3 className="font-bold text-lg mb-4">The Scenario:</h3>
                    <p className="text-gray-800 leading-relaxed">{selectedScenario.scenario}</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-4">Mediation Tips:</h3>
                    <ul className="space-y-3">
                      {selectedScenario.tips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block mr-3 mt-1 text-orange-600">→</span>
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700">
                      Practice This Scenario
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-500">Select a scenario from the left to view details and practice tips.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediationPrep;