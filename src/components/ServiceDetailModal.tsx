import { X, Phone, Clock, UserCheck, CheckCircle, FilePlus } from 'lucide-react';
import { DepartmentId } from '../types';
import { DEPARTMENT_SERVICES } from '../data/mockData';

interface ServiceDetailModalProps {
  departmentId: DepartmentId | null;
  onClose: () => void;
  onFileComplaint: (id: DepartmentId) => void;
  isGujarati: boolean;
}

export function ServiceDetailModal({
  departmentId,
  onClose,
  onFileComplaint,
  isGujarati
}: ServiceDetailModalProps) {
  if (!departmentId) return null;

  const service = DEPARTMENT_SERVICES.find((s) => s.id === departmentId);
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pb-[env(safe-area-inset-bottom,0px)] bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-xl max-h-[90dvh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Mobile Drag Handle */}
        <div className="sm:hidden w-12 h-1.5 bg-stone-300 rounded-full mx-auto mt-2.5 mb-1 shrink-0" />

        {/* Top Header */}
        <div className="px-5 sm:px-6 py-4 bg-gradient-to-r from-stone-50 via-white to-stone-50 border-b border-stone-200/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-orange-600 uppercase">
              {service.category}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-sans">
              {isGujarati ? service.nameGu : service.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            type="button"
            aria-label="Close modal"
            className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors tap-feedback active:scale-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 text-slate-800">
          {/* Summary description */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {isGujarati ? service.descriptionGu : service.description}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200/80">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Clock className="w-3.5 h-3.5 text-orange-600" />
                <span>{isGujarati ? 'સરેરાશ નિવારણ સમય' : 'Avg. Turnaround'}</span>
              </div>
              <p className="text-base font-bold text-slate-900 mt-1">
                {service.avgResolutionDays} {isGujarati ? 'દિવસ (Days)' : 'Days'}
              </p>
            </div>

            <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200/80">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isGujarati ? 'હેલ્પલાઇન નંબર' : 'Toll-Free Helpline'}</span>
              </div>
              <p className="text-sm font-bold text-emerald-700 mt-1 truncate">
                {service.helpline}
              </p>
            </div>
          </div>

          {/* Nodal Officer In-Charge */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#102c57] text-white flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {isGujarati ? 'વિભાગીય નોડલ વડા' : 'District Nodal Head'}
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                {service.headOfficer}
              </p>
              <p className="text-[11px] text-slate-500">
                Collectorate &amp; District Seva Sadan, Vav-Tharad
              </p>
            </div>
          </div>

          {/* Common issues handled */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
              {isGujarati ? 'આ વિભાગમાં નોંધાતી મુખ્ય સમસ્યાઓ:' : 'Common Citizen Grievances Covered:'}
            </h4>
            <div className="space-y-1.5">
              {service.commonIssues.map((issue, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-xl bg-stone-50 text-xs text-slate-700 border border-stone-100"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{issue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with primary CTA */}
        <div className="px-5 sm:px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[48px] px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-stone-100 tap-feedback active:scale-95"
          >
            {isGujarati ? 'બંધ કરો' : 'Close'}
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onFileComplaint(service.id);
            }}
            className="min-h-[48px] flex items-center gap-2 px-5 py-2.5 bg-[#102c57] hover:bg-[#071c35] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all cursor-pointer tap-feedback active:scale-95"
          >
            <FilePlus className="w-4 h-4" />
            <span>
              {isGujarati ? 'આ વિભાગમાં ફરિયાદ નોંધાવો' : `Submit ${service.name} Complaint`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
