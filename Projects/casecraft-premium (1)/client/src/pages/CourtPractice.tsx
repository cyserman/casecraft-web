import { ArrowRight, BarChart3, Clock, Lock, Zap, FileText, Bookmark, Brain, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import ObjectionPractice from "@/components/ObjectionPractice";
import LegalTerms from "@/components/LegalTerms";
import TermQuiz from "@/components/TermQuiz";
import MediationPrep from "@/components/MediationPrep";
import LegalPhilosophies from "@/components/LegalPhilosophies";

const CourtPractice: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-4">Court Practice</h1>
        <p className="text-center text-gray-600 mb-12">
          Interactive legal training tools to prepare you for family court
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="text-center mb-8">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Practice
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-4">Select a Practice Area</h2>
            <p className="text-gray-600 mb-8">
              Choose from our interactive legal training tools to enhance your courtroom skills.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-bold text-navy-blue">Objection Practice</h3>
                    <p className="text-sm text-gray-600">12 scenarios</p>
                  </div>
                  <Link href="/court-practice/objection-practice">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                      Start
                    </button>
                  </Link>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-bold text-navy-blue">Legal Terms Dictionary</h3>
                    <p className="text-sm text-gray-600">16 terms</p>
                  </div>
                  <Link href="/court-practice/legal-terms">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                      Start
                    </button>
                  </Link>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-bold text-navy-blue">Term Quiz</h3>
                    <p className="text-sm text-gray-600">Flashcards & quizzes</p>
                  </div>
                  <Link href="/court-practice/term-quiz">
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                      Start
                    </button>
                  </Link>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-bold text-navy-blue">Mediation Prep</h3>
                    <p className="text-sm text-gray-600">5 scenarios</p>
                  </div>
                  <Link href="/court-practice/mediation-prep">
                    <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700">
                      Start
                    </button>
                  </Link>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-bold text-navy-blue">Legal Philosophies</h3>
                    <p className="text-sm text-gray-600">8 theories</p>
                  </div>
                  <Link href="/court-practice/legal-philosophies">
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                      Start
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourtPractice;