import React from "react";
import { Link } from "wouter";
import { ArrowRight, FileText, Scale, Calculator, Download } from "lucide-react";

export default function Resources() {
    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
                        Client Resources
                    </h1>
                    <div className="w-20 h-1 bg-yellow-500 mx-auto mb-6"></div>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Access court dockets, legal tools, and essential documents.
                    </p>
                </div>

                {/* Court Access Section */}
                <section className="mb-20">
                    <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8 flex items-center gap-3">
                        <Scale className="w-6 h-6 text-yellow-600" />
                        Court Access & Dockets
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <a
                            href="https://ujsportal.pacourts.us/CaseSearch"
                            target="_blank"
                            rel="noreferrer"
                            className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md hover:border-yellow-400 transition-all group"
                        >
                            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-yellow-600 transition-colors">PA Unified Judicial System</h3>
                            <p className="text-slate-500 text-sm mb-4">Search for criminal and civil cases across Pennsylvania.</p>
                            <div className="text-yellow-600 font-bold text-sm flex items-center gap-1">
                                Access Portal <ArrowRight className="w-4 h-4" />
                            </div>
                        </a>

                        <a
                            href="https://www.montcopa.org/166/Prothonotary"
                            target="_blank"
                            rel="noreferrer"
                            className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md hover:border-yellow-400 transition-all group"
                        >
                            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-yellow-600 transition-colors">Montgomery County Prothonotary</h3>
                            <p className="text-slate-500 text-sm mb-4">Civil court records and filing information for MontCo.</p>
                            <div className="text-yellow-600 font-bold text-sm flex items-center gap-1">
                                Visit Website <ArrowRight className="w-4 h-4" />
                            </div>
                        </a>

                        <a
                            href="https://www.chesco.org/175/Prothonotary"
                            target="_blank"
                            rel="noreferrer"
                            className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md hover:border-yellow-400 transition-all group"
                        >
                            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-yellow-600 transition-colors">Chester County Prothonotary</h3>
                            <p className="text-slate-500 text-sm mb-4">Civil court records and filing information for Chesco.</p>
                            <div className="text-yellow-600 font-bold text-sm flex items-center gap-1">
                                Visit Website <ArrowRight className="w-4 h-4" />
                            </div>
                        </a>
                    </div>
                </section>

                {/* Tools & Spreadsheets Section */}
                <section>
                    <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8 flex items-center gap-3">
                        <Calculator className="w-6 h-6 text-yellow-600" />
                        Tools & Worksheets
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Asset Distribution */}
                        <div className="bg-slate-900 text-white rounded-xl p-8 shadow-xl">
                            <div className="bg-yellow-500/10 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                                <FileText className="w-6 h-6 text-yellow-500" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Asset Distribution Spreadsheet</h3>
                            <p className="text-slate-300 mb-8">
                                Organize assets and debts for equitable distribution. Includes formulas for calculating net value and proposed splits.
                            </p>
                            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                                <Download className="w-5 h-5" />
                                Download Excel Template
                            </button>
                        </div>

                        {/* Custody Calendar */}
                        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
                            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                                <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Custody Schedule Planner</h3>
                            <p className="text-slate-600 mb-8">
                                Visual calendar templates for 2-2-3, 2-2-5, and week-on/week-off custody schedules.
                            </p>
                            <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                                <Download className="w-5 h-5" />
                                Download PDF Templates
                            </button>
                        </div>

                        {/* Alimony Calculator Link */}
                        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
                            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                                <Calculator className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">APL / Spousal Support Calculator</h3>
                            <p className="text-slate-600 mb-8">
                                Official PA lookup for support guidelines. (Note: These are estimates; consult with Steve for accuracy).
                            </p>
                            <a
                                href="https://www.humanservices.state.pa.us/csws/index.aspx"
                                target="_blank"
                                rel="noreferrer"
                                className="w-full block text-center bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-3 px-6 rounded-lg transition-colors"
                            >
                                Open PA Support Calculator
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
