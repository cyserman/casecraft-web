import React from 'react';

const terms = [
  {
    term: "Arrearage",
    definition: "The amount of overdue payments owed under a child support or alimony obligation.",
    category: "Child Support"
  },
  {
    term: "Best Interests of the Child",
    definition: "The legal standard used in custody cases to determine what parenting arrangement would most benefit the child.",
    category: "Custody"
  },
  {
    term: "Contempt of Court",
    definition: "Willful disregard or disobedience of a court order, punishable by fines or imprisonment.",
    category: "General Practice"
  },
  {
    term: "Equitable Distribution",
    definition: "The division of marital property in a divorce according to what is fair and just, not necessarily equal.",
    category: "Divorce"
  },
  {
    term: "Grounds for Divorce",
    definition: "Legal reasons cited as the basis for seeking a divorce, such as adultery, abandonment, or irreconcilable differences.",
    category: "Divorce"
  },
  {
    term: "Habitual Residence",
    definition: "The place where a person has established a settled routine for a lengthy period, important in custody jurisdiction cases.",
    category: "Custody"
  },
  {
    term: "Marital Property",
    definition: "Assets acquired during the marriage, subject to equitable distribution upon divorce.",
    category: "Divorce"
  },
  {
    term: "Pendente Lite",
    definition: "Temporary court orders issued during the pendency of a divorce or other litigation.",
    category: "General Practice"
  },
  {
    term: "Quasi-Community Property",
    definition: "Property acquired by either spouse while living in another state that would have been community property if acquired in Pennsylvania.",
    category: "Property Division"
  },
  {
    term: "Spousal Support",
    definition: "Financial support paid by one spouse to the other while the divorce is pending or after the divorce is finalized.",
    category: "Alimony"
  },
  {
    term: "UDCP (Uniform Child Custody Jurisdiction and Enforcement Act)",
    definition: "Pennsylvania law governing which state has jurisdiction in child custody matters.",
    category: "Custody"
  },
  {
    term: "Visitation Rights",
    definition: "The legal right of a non-custodial parent to spend time with their child.",
    category: "Custody"
  },
  {
    term: "Alimony Pendente Lite (APL)",
    definition: "Temporary spousal support paid from the higher-earning spouse to the lower-earning spouse during the divorce process.",
    category: "Alimony"
  },
  {
    term: "Commingling",
    definition: "Mixing separate property with marital property, which may cause the separate property to be treated as marital property.",
    category: "Property Division"
  },
  {
    term: "Equitable",
    definition: "Fair and just, as opposed to equal. Pennsylvania is an equitable distribution state, not a community property state.",
    category: "Property Division"
  },
  {
    term: "Irreconcilable Differences",
    definition: "The no-fault ground for divorce in Pennsylvania, meaning the marriage has broken down and cannot be repaired.",
    category: "Divorce"
  }
];

const LegalTerms: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredTerms = terms.filter(term =>
    term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-4">Legal Terms Dictionary</h1>
        <p className="text-center text-gray-600 mb-12">
          16 essential family law definitions at your fingertips
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Search legal terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTerms.map((term, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-navy-blue">{term.term}</h3>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {term.category}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">{term.definition}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalTerms;