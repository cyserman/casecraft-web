import React, { useState } from 'react';
import { Link } from "wouter";

const MotionGenerator: React.FC = () => {
  const [motionType, setMotionType] = useState('');
  const [caseCaption, setCaseCaption] = useState('TFirey v. Firey, Docket No. 2024-28980, Montgomery County Court of Common Pleas');
  const [reliefRequested, setReliefRequested] = useState('');
  const [grounds, setGrounds] = useState('');
  const [supportingFacts, setSupportingFacts] = useState('');
  const [generatedDocuments, setGeneratedDocuments] = useState<any[]>([]);

  const motionTemplates = [
    { id: 'discovery', name: 'Discovery Motion', description: 'Compel discovery, resolve discovery disputes' },
    { id: 'pfa_modification', name: 'PFA Modification', description: 'Modify or vacate Protection From Abuse order' },
    { id: 'custody', name: 'Custody Motion', description: 'Modify custody arrangement or file emergency petition' },
    { id: 'emergency', name: 'Emergency Relief', description: 'Request immediate court intervention' },
    { id: 'sanctions', name: 'Sanctions Motion', description: 'Request sanctions for opposing party misconduct' },
    { id: 'docket_control', name: 'Docket Control', description: 'Request case management conference' },
  ];

  const generateDocument = () => {
    if (!motionType || !reliefRequested || !grounds) return;

    const documentTitle = `Motion for ${motionType === 'discovery' ? 'Discovery Relief' : 
      motionType === 'pfa_modification' ? 'Modification of PFA' :
      motionType === 'custody' ? 'Custody Modification' :
      motionType === 'emergency' ? 'Emergency Relief' :
      motionType === 'sanctions' ? 'Sanctions' :
      'Docket Control'}`;

    const body = `${documentTitle}

Comes now ${caseCaption.split(' v. ')[0]} ("Movant"), pursuant to Pennsylvania Rule of Civil Procedure ${motionType === 'discovery' ? '4019.2' : 
  motionType === 'pfa_modification' ? '1915.2' :
  motionType === 'custody' ? '1915.2' :
  motionType === 'emergency' ? '1915.1' :
  motionType === 'sanctions' ? '4019.1' : '211'} and the Local Rules of the Montgomery County Court of Common Pleas, and respectfully moves this Court for ${reliefRequested}. 

1. Introduction
Movant is the [plaintiff/defendant] in the above-captioned matter. This Motion arises out of [briefly state nature of dispute].

2. Grounds for Relief
The grounds for this motion are as follows:
${grounds}

3. Supporting Facts
The factual basis for this motion consists of the following:
${supportingFacts}

4. Relief Requested
Wherefore, Movant requests this Honorable Court to grant ${reliefRequested} and for such other and further relief as the Court deems just and proper.

Date: ${new Date().toLocaleDateString()}
Respectfully submitted,

[YOUR NAME]
Pro Se Litigant
[YOUR ADDRESS]
[YOUR PHONE]
[YOUR EMAIL]

Certificate of Service
I hereby certify that on this date, I caused a true and correct copy of this Motion to be served via Certified Mail, Return Receipt Requested, and via email upon the opposing party at their last known address and email.

[YOUR SIGNATURE]
`;

    const document = {
      id: Date.now(),
      title: documentTitle,
      body: body,
      date: new Date().toLocaleDateString(),
      type: motionType
    };

    setGeneratedDocuments([document, ...generatedDocuments]);
  };

  const printDocument = (doc: any) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${doc.title}</title>
          <style>
            body { font-family: Times New Roman, serif; margin: 40px; line-height: 1.5; }
            h1 { text-align: center; }
            .signature { margin-top: 50px; }
          </style>
        </head>
        <body>
          <h1>${doc.title}</h1>
          <p>${doc.body}</p>
          <div className="signature">
            <p>Respectfully submitted,</p>
            <p>Dated: ${new Date().toLocaleDateString()}</p>
            <br />
            <p>_________________________</p>
            <p>[YOUR NAME]</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Motion Generator</h1>
          <p className="text-center text-gray-600 mb-12">
            Generate properly formatted motions for Montgomery County Court
          </p>

          {/* Motion Selection */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Select Motion Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {motionTemplates.map(template => (
                <div 
                  key={template.id}
                  onClick={() => setMotionType(template.id)}
                  className={`cursor-pointer p-4 rounded-lg border ${
                    motionType === template.id 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h3 className="font-bold text-navy-blue">{template.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Document Generation Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Generate Document</h2>
            <form onSubmit={generateDocument} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Case Caption
                </label>
                <input
                  type="text"
                  value={caseCaption}
                  onChange={(e) => setCaseCaption(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relief Requested (e.g., "Compel Plaintiff to respond to Interrogatories within 10 days")
                </label>
                <input
                  type="text"
                  value={reliefRequested}
                  onChange={(e) => setReliefRequested(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grounds (Cite relevant rules and facts)
                </label>
                <textarea
                  value={grounds}
                  onChange={(e) => setGrounds(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Supporting Facts
                </label>
                <textarea
                  value={supportingFacts}
                  onChange={(e) => setSupportingFacts(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!motionType}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Generate Motion
              </button>
            </form>
          </div>

          {/* Generated Documents */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold mb-6">Generated Documents</h2>
            {generatedDocuments.length === 0 ? (
              <p className="text-gray-500">No documents generated yet.</p>
            ) : (
              <div className="space-y-4">
                {generatedDocuments.map(doc => (
                  <div key={doc.id} className="border-l-4 border-blue-500 pl-4 py-2">
                    <h3 className="font-bold text-navy-blue">{doc.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">Generated: {doc.date}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => printDocument(doc)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                      >
                        Print / Save PDF
                      </button>
                      <button
                        onClick={() => navigator.clipboard.writeText(doc.body)}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm hover:bg-gray-300"
                      >
                        Copy Text
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Filing Instructions */}
          <div className="mt-12 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-6">
            <h3 className="text-xl font-bold text-yellow-900 mb-2">Montgomery County Filing Checklist</h3>
            <p className="text-yellow-900 mb-4">Before filing, ensure you complete these steps:</p>
            <ol className="text-yellow-900 list-decimal list-inside space-y-2">
              <li>Verify you have the correct filing fee or IFP waiver</li>
              <li>Make 2 copies of the document (one for court, one for service)</li>
              <li>Service opposing counsel via Certified Mail RRR and email</li>
              <li>File a Certificate of Service with the Prothonotary</li>
              <li>Submit original to Prothonotary with filing fee</li>
              <li>Keep a copy for your records</li>
            </ol>
            <p className="text-sm text-yellow-900 mt-4">
              ⚠️ Emergency petitions must be filed in person at the Norristown courthouse, NOT via e-filing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotionGenerator;