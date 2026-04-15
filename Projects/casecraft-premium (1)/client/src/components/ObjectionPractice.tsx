import React from 'react';
import { Link } from "wouter";

const ObjectionPractice: React.FC = () => {
  const scenarios = [
    {
      id: 1,
      title: "Hearsay Objection",
      description: "Objecting to out-of-court statements offered for the truth of the matter asserted",
      scenario: "The ex-spouse's attorney calls a neighbor to testify that the ex-spouse told her the child was afraid of the other parent.",
      correctAnswer: "Object to hearsay as the statement is being offered to prove the child's state of mind."
    },
    {
      id: 2,
      title: "Relevance Objection",
      description: "Objecting to evidence that is not relevant to the case",
      scenario: "The opposing counsel asks about the other parent's dating life 5 years ago.",
      correctAnswer: "Object on grounds of relevance as this information is not probative of parenting fitness."
    },
    {
      id: 3,
      title: "Leading Question",
      description: "Objecting when an attorney asks leading questions of their own witness",
      scenario: "The attorney asks their witness: 'You were at home with the children that night, weren't you?'",
      correctAnswer: "Object to leading question as it suggests the answer to the witness."
    },
    {
      id: 4,
      title: "Asked and Answered",
      description: "Objecting when a question has already been asked and answered",
      scenario: "The attorney repeatedly asks the same question in slightly different ways after it has already been answered.",
      correctAnswer: "Object to asked and answered to prevent harassment and waste of time."
    },
    {
      id: 5,
      title: "Speculation",
      description: "Objecting when a witness offers conjecture rather than factual knowledge",
      scenario: "The witness says: 'I think he was angry based on how he looked at me.'",
      correctAnswer: "Object to speculation as the witness is testifying about their thoughts, not facts."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-4">Objection Practice</h1>
        <p className="text-center text-gray-600 mb-12">
          12 Pennsylvania family court scenarios to master courtroom objections
        </p>

        <div className="max-w-4xl mx-auto">
          {scenarios.map((scenario) => (
            <div key={scenario.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
              <div className="p-6">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Scenario {scenario.id}
                </span>
                <h2 className="mt-4 text-2xl font-bold">{scenario.title}</h2>
                <p className="mt-2 text-gray-600">{scenario.description}</p>
              </div>
              <div className="p-6">
                <p className="text-gray-800 font-medium mb-4">Scenario:</p>
                <p className="text-gray-700 mb-6">{scenario.scenario}</p>
                <div className="flex gap-4">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    Object
                  </button>
                  <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300">
                    Allow
                  </button>
                </div>
              </div>
              <div className="p-6 bg-gray-50 rounded-b-xl">
                <p className="text-gray-600 text-sm">Correct response: {scenario.correctAnswer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ObjectionPractice;