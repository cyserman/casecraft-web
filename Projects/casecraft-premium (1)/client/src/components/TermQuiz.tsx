import React from 'react';

const terms = [
  {
    term: "Arrearage",
    definition: "The amount of overdue payments owed under a child support or alimony obligation."
  },
  {
    term: "Best Interests of the Child",
    definition: "The legal standard used in custody cases to determine what parenting arrangement would most benefit the child."
  },
  {
    term: "Contempt of Court",
    definition: "Willful disregard or disobedience of a court order, punishable by fines or imprisonment."
  },
  {
    term: "Equitable Distribution",
    definition: "The division of marital property in a divorce according to what is fair and just, not necessarily equal."
  },
  {
    term: "Grounds for Divorce",
    definition: "Legal reasons cited as the basis for seeking a divorce, such as adultery, abandonment, or irreconcilable differences."
  },
  {
    term: "Marital Property",
    definition: "Assets acquired during the marriage, subject to equitable distribution upon divorce."
  },
  {
    term: "Pendente Lite",
    definition: "Temporary court orders issued during the pendency of a divorce or other litigation."
  },
  {
    term: "Spousal Support",
    definition: "Financial support paid by one spouse to the other while the divorce is pending or after the divorce is finalized."
  },
  {
    term: "UDCP (Uniform Child Custody Jurisdiction and Enforcement Act)",
    definition: "Pennsylvania law governing which state has jurisdiction in child custody matters."
  },
  {
    term: "Visitation Rights",
    definition: "The legal right of a non-custodial parent to spend time with their child."
  },
  {
    term: "Alimony Pendente Lite (APL)",
    definition: "Temporary spousal support paid from the higher-earning spouse to the lower-earning spouse during the divorce process."
  },
  {
    term: "Commingling",
    definition: "Mixing separate property with marital property, which may cause the separate property to be treated as marital property."
  },
  {
    term: "Equitable",
    definition: "Fair and just, as opposed to equal. Pennsylvania is an equitable distribution state, not a community property state."
  },
  {
    term: "Irreconcilable Differences",
    definition: "The no-fault ground for divorce in Pennsylvania, meaning the marriage has broken down and cannot be repaired."
  },
  {
    term: "Hearsay",
    definition: "An out-of-court statement offered to prove the truth of the matter asserted, generally inadmissible as evidence."
  },
  {
    term: "Leading Question",
    definition: "A question that suggests the answer to the witness, usually objectionable during direct examination."
  }
];

const TermQuiz: React.FC = () => {
  const [flashcards, setFlashcards] = React.useState(() => {
    return terms.map(term => ({
      term: term.term,
      definition: term.definition,
      isFlipped: false
    }));
  });

  const [currentCardIndex, setCurrentCardIndex] = React.useState(0);

  const flipCard = () => {
    setFlashcards(prev => {
      const newCards = [...prev];
      newCards[currentCardIndex].isFlipped = !newCards[currentCardIndex].isFlipped;
      return newCards;
    });
  };

  const nextCard = () => {
    setCurrentCardIndex(prev => (prev + 1) % flashcards.length);
  };

  const resetQuiz = () => {
    setFlashcards(() => terms.map(term => ({
      term: term.term,
      definition: term.definition,
      isFlipped: false
    })));
    setCurrentCardIndex(0);
  };

  const currentCard = flashcards[currentCardIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-4">Term Quiz</h1>
        <p className="text-center text-gray-600 mb-12">
          Test your knowledge with interactive flashcards and quizzes
        </p>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <div className="text-center mb-6">
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                Flashcard {currentCardIndex + 1} of {flashcards.length}
              </span>
            </div>
            
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl mb-8">
              <div className="text-center p-8">
                <h2 className="text-2xl font-bold text-navy-blue mb-4">
                  {currentCard.isFlipped ? currentCard.definition : currentCard.term}
                </h2>
                <button 
                  onClick={flipCard}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
                >
                  {currentCard.isFlipped ? "Show Term" : "Show Definition"}
                </button>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button 
                onClick={flipCard}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
              >
                Flip Card
              </button>
              <button 
                onClick={nextCard}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Next Card
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <button 
              onClick={resetQuiz}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
            >
              Restart Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermQuiz;