import React, { useState } from 'react';
import {
  X,
  Search,
  CheckCircle2,
  Clock,
  Phone,
  Printer,
  Star,
  MapPin,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Complaint } from '../types';

interface StatusTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  complaints: Complaint[];
  initialSearchQuery?: string;
  isGujarati: boolean;
}

export function StatusTrackerModal({
  isOpen,
  onClose,
  complaints,
  initialSearchQuery = '',
  isGujarati
}: StatusTrackerModalProps) {
  const [searchId, setSearchId] = useState(initialSearchQuery);
  const [activeComplaint, setActiveComplaint] = useState<Complaint | null>(null);
  const [feedbackRating, setFeedbackRating] = useState<number>(0);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);

  React.useEffect(() => {
    if (isOpen) {
      const targetQuery = initialSearchQuery.trim();
      setSearchId(targetQuery);
      if (targetQuery) {
        const found = complaints.find(
          (c) => c.id.toLowerCase() === targetQuery.toLowerCase()
        );
        setActiveComplaint(found || null);
      } else if (complaints.length > 0) {
        // default to first active complaint
        setActiveComplaint(complaints[0]);
        setSearchId(complaints[0].id);
      }
      setFeedbackRating(0);
      setFeedbackSubmitted(false);
    }
  }, [isOpen, initialSearchQuery, complaints]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchId.trim().toUpperCase();
    const found = complaints.find(
      (c) =>
        c.id.toUpperCase() === query ||
        c.subject.toLowerCase().includes(query.toLowerCase()) ||
        c.village.toLowerCase().includes(query.toLowerCase())
    );
    setActiveComplaint(found || null);
  };

  const handleSelectQuick = (c: Complaint) => {
    setSearchId(c.id);
    setActiveComplaint(c);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-stone-50 via-white to-stone-50 border-b border-stone-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#102c57] text-white flex items-center justify-center font-bold">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {isGujarati ? 'ફરિયાદ સ્થિતિ તપાસો (Live Tracking)' : 'Track Grievance Status'}
              </h2>
              <p className="text-xs text-slate-500">
                {isGujarati ? 'વાવ-થરાદ પારદર્શક ફરિયાદ નિવારણ વ્યવસ્થા' : 'Real-time timeline & officer assignment'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Bar inside modal */}
        <div className="p-4 sm:p-6 bg-stone-50 border-b border-stone-200/70">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={isGujarati ? 'ફરિયાદ ID દાખલ કરો (દા.ત. VT-2026-4401)' : 'Enter Complaint ID (e.g. VT-2026-4401)'}
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-300 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#102c57]"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#102c57] hover:bg-[#071c35] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-xs"
            >
              {isGujarati ? 'શોધો' : 'Search'}
            </button>
          </form>

          {/* Quick Click Demo Grievances */}
          <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 shrink-0 font-medium">
              {isGujarati ? 'તાજેતરની ફરિયાદો:' : 'Recent cases:'}
            </span>
            {complaints.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => handleSelectQuick(c)}
                className={`px-2.5 py-1 rounded-lg border font-mono font-medium transition-colors shrink-0 ${
                  activeComplaint?.id === c.id
                    ? 'bg-[#102c57] text-white border-[#102c57]'
                    : 'bg-white text-slate-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {c.id} · {c.village}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeComplaint ? (
            <>
              {/* Complaint Overview Card */}
              <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200/80">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-mono font-extrabold text-[#102c57]">
                        {activeComplaint.id}
                      </span>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          activeComplaint.status === 'Resolved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : activeComplaint.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {activeComplaint.status}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium mt-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {activeComplaint.createdAt}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-stone-300 rounded-xl hover:bg-stone-100 transition-colors self-start sm:self-auto"
                  >
                    <Printer className="w-3.5 h-3.5 text-slate-500" />
                    <span>{isGujarati ? 'રસીદ પ્રિન્ટ કરો' : 'Print Acknowledgment'}</span>
                  </button>
                </div>

                <div className="pt-3 space-y-2">
                  <h4 className="text-base font-bold text-slate-900">
                    {activeComplaint.subject}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {activeComplaint.description}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-xs text-slate-500">
                    <div>
                      <span className="block text-slate-400 font-medium">Department</span>
                      <span className="font-semibold text-slate-800">{activeComplaint.departmentName}</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 font-medium">Location</span>
                      <span className="font-semibold text-slate-800 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-red-500" />
                        {activeComplaint.village}, {activeComplaint.taluka}
                      </span>
                    </div>
                    <div>
                      <span className="block text-slate-400 font-medium">Complainant</span>
                      <span className="font-semibold text-slate-800">{activeComplaint.citizenName}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Timeline */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span>{isGujarati ? 'નિવારણ સમયરેખા (Action Timeline)' : 'Grievance Resolution Timeline'}</span>
                </h4>

                <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-stone-200">
                  {activeComplaint.timeline.map((event, idx) => (
                    <div key={idx} className="relative flex items-start gap-3 pl-1">
                      {/* Step Circle */}
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                          event.completed
                            ? 'bg-emerald-600 text-white'
                            : event.current
                            ? 'bg-orange-500 text-white ring-4 ring-orange-100'
                            : 'bg-stone-200 text-stone-500'
                        }`}
                      >
                        {event.completed ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <span className="text-[10px] font-bold">{idx + 1}</span>
                        )}
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 bg-stone-50/80 rounded-xl p-3 border border-stone-200/60">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <span
                            className={`text-xs sm:text-sm font-bold ${
                              event.completed ? 'text-slate-900' : event.current ? 'text-orange-900' : 'text-slate-500'
                            }`}
                          >
                            {isGujarati ? event.titleGu : event.title}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium">
                            {event.date}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          {isGujarati ? event.descriptionGu : event.description}
                        </p>
                        {event.officer && (
                          <span className="inline-block mt-1 text-[11px] font-medium text-[#102c57] bg-[#102c57]/10 px-2 py-0.5 rounded">
                            Assigned to: {event.officer}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nodal Officer Contact Card */}
              <div className="bg-[#102c57]/5 rounded-2xl p-4.5 border border-[#102c57]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#102c57] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    GOV
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      {isGujarati ? 'નિયુક્ત નોડલ અધિકારી' : 'Assigned Government Officer'}
                    </span>
                    <h5 className="text-sm font-bold text-slate-900">
                      {activeComplaint.assignedOfficer.name}
                    </h5>
                    <p className="text-xs text-slate-600">
                      {activeComplaint.assignedOfficer.designation} · {activeComplaint.assignedOfficer.office}
                    </p>
                  </div>
                </div>

                <a
                  href={`tel:${activeComplaint.assignedOfficer.phone}`}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs shrink-0 self-start sm:self-auto"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Officer ({activeComplaint.assignedOfficer.phone})</span>
                </a>
              </div>

              {/* Citizen Feedback Form if Resolved */}
              {activeComplaint.status === 'Resolved' && (
                <div className="bg-emerald-50/60 rounded-2xl p-4.5 border border-emerald-200">
                  <h5 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2">
                    {isGujarati ? 'નાગરિક સંતોષ પ્રતિસાદ (Citizen Feedback)' : 'Citizen Redressal Feedback'}
                  </h5>
                  {feedbackSubmitted ? (
                    <p className="text-xs text-emerald-800 font-semibold">
                      ✓ {isGujarati ? 'તમારા પ્રતિસાદ બદલ આભાર! આપનું મૂલ્યાંકન સબમિટ થઈ ગયું છે.' : 'Thank you! Your feedback has been recorded by the District Collectorate.'}
                    </p>
                  ) : (
                    <div>
                      <p className="text-xs text-slate-600 mb-2">
                        {isGujarati ? 'શું તમે આ કામગીરીથી સંતુષ્ટ છો? કૃપા કરી રેટિંગ આપો:' : 'Are you satisfied with the resolution speed and officer response?'}
                      </p>
                      <div className="flex items-center gap-1.5 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setFeedbackRating(star)}
                            className="p-1 hover:scale-110 transition-transform"
                          >
                            <Star
                              className={`w-5 h-5 ${
                                star <= feedbackRating
                                  ? 'text-amber-500 fill-amber-500'
                                  : 'text-stone-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        disabled={feedbackRating === 0}
                        onClick={() => setFeedbackSubmitted(true)}
                        className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold disabled:opacity-50 transition-colors"
                      >
                        Submit Feedback
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 space-y-3">
              <AlertCircle className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="text-base font-bold text-slate-800">
                {isGujarati ? 'કોઈ ફરિયાદ મળી નથી' : 'No Grievance Found'}
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {isGujarati
                  ? 'કૃપા કરી દાખલ કરેલ ID ફરીથી તપાસો અથવા ઉપર આપેલ તાજેતરની ફરિયાદ પસંદ કરો.'
                  : 'Check the complaint ID format or click one of the recent case numbers above.'}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
