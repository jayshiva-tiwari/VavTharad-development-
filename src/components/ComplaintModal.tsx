import React, { useState } from 'react';
import { X, CheckCircle, Upload, AlertCircle, FileText, ArrowRight, ArrowLeft, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Complaint, DepartmentId, TalukaName, UserSession } from '../types';
import { DEPARTMENT_SERVICES, TALUKAS } from '../data/mockData';

interface ComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplaintSubmitted: (complaint: Complaint) => void;
  initialDepartmentId?: DepartmentId;
  isGujarati: boolean;
  currentUser?: UserSession | null;
}

export function ComplaintModal({
  isOpen,
  onClose,
  onComplaintSubmitted,
  initialDepartmentId,
  isGujarati,
  currentUser
}: ComplaintModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [departmentId, setDepartmentId] = useState<DepartmentId>(initialDepartmentId || 'drinking-water');
  const [taluka, setTaluka] = useState<TalukaName>('Tharad');
  const [village, setVillage] = useState<string>('Tharad Kasba');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'Normal' | 'Urgent' | 'Emergency'>('Normal');
  const [citizenName, setCitizenName] = useState('');
  const [citizenMobile, setCitizenMobile] = useState('');
  const [fileName, setFileName] = useState('');
  const [createdComplaint, setCreatedComplaint] = useState<Complaint | null>(null);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset or initialize when opened
  React.useEffect(() => {
    if (isOpen) {
      if (initialDepartmentId) {
        setDepartmentId(initialDepartmentId);
      }
      if (currentUser) {
        setCitizenName(currentUser.name || 'Shiva Tiwari');
        setCitizenMobile(currentUser.mobile || '9825012345');
        if (currentUser.taluka && ['Tharad', 'Vav', 'Suigam', 'Bhabhar'].includes(currentUser.taluka)) {
          setTaluka(currentUser.taluka as TalukaName);
        }
      }
      setStep(1);
      setCreatedComplaint(null);
      setErrors({});
    }
  }, [isOpen, initialDepartmentId, currentUser]);

  if (!isOpen) return null;

  const currentVillages = TALUKAS.find((t) => t.name === taluka)?.villages || [];

  const handleTalukaChange = (newTaluka: TalukaName) => {
    setTaluka(newTaluka);
    const found = TALUKAS.find((t) => t.name === newTaluka);
    if (found && found.villages.length > 0) {
      setVillage(found.villages[0]);
    }
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!subject.trim()) {
      errs.subject = isGujarati ? 'કૃપા કરી વિષય દાખલ કરો' : 'Please enter complaint subject';
    } else if (subject.trim().length < 5) {
      errs.subject = isGujarati ? 'વિષય ઓછામાં ઓછા 5 અક્ષરનો હોવો જોઈએ' : 'Subject must be at least 5 characters';
    }
    if (!description.trim()) {
      errs.description = isGujarati ? 'કૃપા કરી વિગતવાર વર્ણન આપો' : 'Please provide complaint details';
    } else if (description.trim().length < 15) {
      errs.description = isGujarati ? 'વર્ણન ઓછામાં ઓછા 15 અક્ષરનું હોવું જોઈએ' : 'Description must be at least 15 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!citizenName.trim()) {
      errs.name = isGujarati ? 'કૃપા કરી તમારું નામ લખો' : 'Please enter your full name';
    }
    if (!citizenMobile.trim()) {
      errs.mobile = isGujarati ? 'કૃપા કરી મોબાઇલ નંબર લખો' : 'Please enter mobile number';
    } else if (!/^[6-9]\d{9}$/.test(citizenMobile.replace(/\s+/g, ''))) {
      errs.mobile = isGujarati ? 'માન્ય 10 અંકનો મોબાઈલ નંબર દાખલ કરો' : 'Enter valid 10-digit Indian mobile number';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    const selectedDept = DEPARTMENT_SERVICES.find((d) => d.id === departmentId);
    const randomId = `VT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = `${now.getDate()} Oct 2026, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newComplaint: Complaint = {
      id: randomId,
      departmentId,
      departmentName: selectedDept?.name || 'Public Service',
      subject,
      description,
      taluka,
      village,
      citizenName,
      citizenMobile: `+91 ${citizenMobile.trim()}`,
      createdAt: formattedDate,
      status: 'Submitted',
      priority,
      attachmentName: fileName || undefined,
      assignedOfficer: {
        name: selectedDept?.headOfficer.split(',')[0] || 'District Officer',
        designation: selectedDept?.headOfficer.split(',')[1] || 'Nodal Grievance Officer',
        phone: '+91 94270 ' + Math.floor(10000 + Math.random() * 90000),
        office: `${taluka} Taluka Seva Sadan, Gujarat`
      },
      timeline: [
        {
          status: 'Submitted',
          date: formattedDate,
          title: 'Grievance Registered',
          titleGu: 'ફરિયાદ સફળતાપૂર્વક નોંધાઈ',
          description: `Grievance submitted by ${citizenName}. SMS confirmation sent to ${citizenMobile}.`,
          descriptionGu: `${citizenName} દ્વારા ફરિયાદ નોંધાઈ. SMS મોકલાયો.`,
          completed: true,
          current: true
        },
        {
          status: 'Officer Assigned',
          date: 'Scheduled within 4 hrs',
          title: 'Officer Allocation',
          titleGu: 'સંબંધિત અધિકારીની ફાળવણી',
          description: `Will be routed to ${taluka} Taluka nodal officer for ${selectedDept?.name}.`,
          descriptionGu: `${taluka} તાલુકા નોડલ અધિકારીને મોકલવામાં આવશે.`,
          completed: false
        },
        {
          status: 'Site Inspection',
          date: 'Pending',
          title: 'Field Verification',
          titleGu: 'સ્થળ નિરીક્ષણ અને ચકાસણી',
          description: `Field team will visit ${village} for on-site assessment.`,
          descriptionGu: `${village} ખાતે સ્થળ તપાસ કરાશે.`,
          completed: false
        },
        {
          status: 'In Progress',
          date: 'Pending',
          title: 'Redressal Action',
          titleGu: 'નિરાકરણ પ્રક્રિયા',
          description: 'Departmental work order and ground action.',
          descriptionGu: 'વિભાગીય કામગીરી હાથ ધરાશે.',
          completed: false
        },
        {
          status: 'Resolved',
          date: `Target: within ${selectedDept?.avgResolutionDays || 3} days`,
          title: 'Final Resolution',
          titleGu: 'સંપૂર્ણ નિરાકરણ',
          description: 'Citizen satisfaction confirmation & formal closure.',
          descriptionGu: 'નાગરિક સંતોષ પુષ્ટિ અને કેસ પૂર્ણ.',
          completed: false
        }
      ]
    };

    setCreatedComplaint(newComplaint);
    onComplaintSubmitted(newComplaint);
    setStep(4);

    // Fire celebratory confetti for government transparency achievement
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const handleCopyId = () => {
    if (createdComplaint) {
      navigator.clipboard.writeText(createdComplaint.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pb-[env(safe-area-inset-bottom,0px)] bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-2xl max-h-[92dvh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Mobile Drag Indicator Handle */}
        <div className="sm:hidden w-12 h-1.5 bg-stone-300 rounded-full mx-auto mt-2.5 mb-1 shrink-0" />

        {/* Top Header */}
        <div className="px-5 sm:px-6 py-4 bg-gradient-to-r from-stone-50 via-white to-stone-50 border-b border-stone-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#102c57] text-white flex items-center justify-center font-bold shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-bold text-slate-900">
                {isGujarati ? 'ઓનલાઇન ફરિયાદ નોંધાવો' : 'Submit a Grievance'}
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500">
                {isGujarati ? 'વાવ-થરાદ વહીવટી તંત્ર, ગુજરાત સરકાર' : 'Vav-Tharad District Administration'}
              </p>
            </div>
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

        {/* Step Indicator (if not completed) */}
        {step < 4 && (
          <div className="px-6 pt-4 pb-2 bg-white">
            <div className="flex items-center justify-between max-w-md mx-auto text-xs font-semibold">
              <span className={step >= 1 ? 'text-[#102c57]' : 'text-slate-400'}>
                1. {isGujarati ? 'વિભાગ પસંદ કરો' : 'Department'}
              </span>
              <span className="text-slate-300">→</span>
              <span className={step >= 2 ? 'text-[#102c57]' : 'text-slate-400'}>
                2. {isGujarati ? 'ફરિયાદ વિગત' : 'Grievance'}
              </span>
              <span className="text-slate-300">→</span>
              <span className={step >= 3 ? 'text-[#102c57]' : 'text-slate-400'}>
                3. {isGujarati ? 'નાગરિક માહિતી' : 'Your Details'}
              </span>
            </div>
            <div className="w-full bg-stone-100 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#102c57] h-full transition-all duration-300 rounded-full"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-800">
          {/* STEP 1: Department & Location */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  {isGujarati ? '૧. સંબંધિત સરકારી વિભાગ પસંદ કરો' : '1. Select Concerned Department'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto p-1 border border-stone-200 rounded-xl">
                  {DEPARTMENT_SERVICES.map((dept) => (
                    <button
                      key={dept.id}
                      type="button"
                      onClick={() => setDepartmentId(dept.id)}
                      className={`p-3 rounded-xl text-left border transition-all flex items-center justify-between text-xs sm:text-sm font-medium ${
                        departmentId === dept.id
                          ? 'border-[#102c57] bg-[#102c57]/5 text-[#102c57] font-bold shadow-xs'
                          : 'border-stone-200/80 hover:bg-stone-50 text-slate-700'
                      }`}
                    >
                      <span className={isGujarati ? 'font-gujarati' : ''}>
                        {isGujarati ? dept.nameGu : dept.name}
                      </span>
                      {departmentId === dept.id && (
                        <CheckCircle className="w-4 h-4 text-[#102c57] shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location: Taluka and Village */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {isGujarati ? 'તાલુકો' : 'Taluka'}
                  </label>
                  <select
                    value={taluka}
                    onChange={(e) => handleTalukaChange(e.target.value as TalukaName)}
                    className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-base sm:text-sm font-medium focus:ring-2 focus:ring-[#102c57] focus:outline-none"
                  >
                    {TALUKAS.map((t) => (
                      <option key={t.name} value={t.name}>
                        {t.name} {isGujarati ? `(${t.nameGu})` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {isGujarati ? 'ગામ / વોર્ડ' : 'Village / Ward / Area'}
                  </label>
                  <select
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-base sm:text-sm font-medium focus:ring-2 focus:ring-[#102c57] focus:outline-none"
                  >
                    {currentVillages.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Grievance Content & Priority */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isGujarati ? 'ફરિયાદનો મુખ્ય વિષય (ટૂંકમાં)' : 'Grievance Subject'}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder={
                    isGujarati
                      ? 'દા.ત., પાણીની પાઈપલાઈન લીકેજ / લાઈટ બંધ'
                      : 'e.g. Drinking water pipeline leak near school'
                  }
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    if (errors.subject) setErrors({ ...errors, subject: '' });
                  }}
                  className={`w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border text-base sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#102c57] ${
                    errors.subject ? 'border-red-400 bg-red-50/30' : 'border-stone-300 bg-white'
                  }`}
                />
                {errors.subject && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isGujarati ? 'વિગતવાર વર્ણન અને સ્થળ' : 'Detailed Description & Landmark'}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder={
                    isGujarati
                      ? 'કૃપા કરી સમસ્યા ક્યારથી છે, કઈ જગ્યાએ છે અને કેવી અસર થઈ રહી છે તે જણાવો...'
                      : 'Please specify the exact location, landmark, duration of the problem and impact...'
                  }
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (errors.description) setErrors({ ...errors, description: '' });
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#102c57] ${
                    errors.description ? 'border-red-400 bg-red-50/30' : 'border-stone-300 bg-white'
                  }`}
                />
                {errors.description && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Priority Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {isGujarati ? 'તાકીદનું સ્તર (Priority)' : 'Urgency Level'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Normal', 'Urgent', 'Emergency'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setPriority(lvl)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                        priority === lvl
                          ? lvl === 'Emergency'
                            ? 'bg-red-600 text-white border-red-600'
                            : lvl === 'Urgent'
                            ? 'bg-amber-600 text-white border-amber-600'
                            : 'bg-[#102c57] text-white border-[#102c57]'
                          : 'bg-stone-50 text-slate-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {lvl === 'Normal' && (isGujarati ? 'સામાન્ય (Normal)' : 'Normal')}
                      {lvl === 'Urgent' && (isGujarati ? 'તાકીદનું (Urgent)' : 'Urgent')}
                      {lvl === 'Emergency' && (isGujarati ? 'કટોકટી (Emergency)' : 'Emergency')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Document upload simulation */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isGujarati ? 'ફોટો અથવા દસ્તાવેજ પુરાવો (વૈકલ્પિક)' : 'Photo / Document Evidence (Optional)'}
                </label>
                <div className="border-2 border-dashed border-stone-300 rounded-2xl p-4 text-center hover:bg-stone-50 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFileName(e.target.files[0].name);
                      }
                    }}
                  />
                  <div className="flex flex-col items-center">
                    <Upload className="w-6 h-6 text-slate-400 mb-1" />
                    <span className="text-xs font-medium text-slate-700">
                      {fileName ? (
                        <span className="text-emerald-700 font-bold">✓ {fileName}</span>
                      ) : isGujarati ? (
                        'ફોટો અપલોડ કરવા ક્લિક કરો (JPG, PNG, PDF)'
                      ) : (
                        'Click to attach photo or file (JPG, PNG, PDF)'
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Citizen Info */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/80 text-xs text-amber-900 leading-relaxed">
                ℹ️ {isGujarati
                  ? 'તમારો મોબાઈલ નંબર સુરક્ષિત છે. તેના પર ફરિયાદ સ્થિતિના SMS અપડેટ્સ મોકલવામાં આવશે.'
                  : 'Your phone number will receive SMS notifications at every stage of the grievance resolution.'}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isGujarati ? 'અરજદારનું પૂરું નામ' : 'Citizen Full Name'}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  autoComplete="name"
                  placeholder={isGujarati ? 'દા.ત., રમેશભાઈ પટેલ' : 'e.g. Rameshbhai Patel'}
                  value={citizenName}
                  onChange={(e) => {
                    setCitizenName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  className={`w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border text-base sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#102c57] ${
                    errors.name ? 'border-red-400 bg-red-50/30' : 'border-stone-300 bg-white'
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isGujarati ? 'મોબાઇલ નંબર (SMS અપડેટ માટે)' : '10-Digit Mobile Number (for SMS Tracking)'}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3.5 text-xs font-bold text-slate-500">+91</span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={10}
                    placeholder="98250 12345"
                    value={citizenMobile}
                    onChange={(e) => {
                      setCitizenMobile(e.target.value);
                      if (errors.mobile) setErrors({ ...errors, mobile: '' });
                    }}
                    className={`w-full min-h-[48px] pl-12 pr-3.5 py-2.5 rounded-xl border text-base sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#102c57] ${
                      errors.mobile ? 'border-red-400 bg-red-50/30' : 'border-stone-300 bg-white'
                    }`}
                  />
                </div>
                {errors.mobile && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.mobile}
                  </p>
                )}
              </div>

              {/* Summary Box */}
              <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200 text-xs space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span className="font-medium text-slate-500">{isGujarati ? 'વિભાગ:' : 'Department:'}</span>
                  <span className="font-bold text-slate-800">
                    {DEPARTMENT_SERVICES.find((d) => d.id === departmentId)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-slate-500">{isGujarati ? 'વિસ્તાર:' : 'Location:'}</span>
                  <span className="font-bold text-slate-800">{village}, {taluka}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-slate-500">{isGujarati ? 'વિષય:' : 'Subject:'}</span>
                  <span className="font-bold text-slate-800 truncate max-w-[260px]">{subject}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Confirmation with Tracking ID */}
          {step === 4 && createdComplaint && (
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {isGujarati ? 'ફરિયાદ સફળતાપૂર્વક નોંધાઈ ગઈ છે!' : 'Grievance Submitted Successfully!'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  {isGujarati
                    ? 'તમારો ફરિયાદ ટ્રેકિંગ નંબર નીચે મુજબ છે. આ નંબર સાચવી રાખો.'
                    : 'Your grievance has been auto-routed to the concerned taluka officer. Keep this ID for tracking.'}
                </p>
              </div>

              {/* Tracking ID badge */}
              <div className="bg-stone-50 border-2 border-stone-300 rounded-2xl p-4 max-w-sm mx-auto flex items-center justify-between shadow-xs">
                <div className="text-left">
                  <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                    Complaint Tracking ID
                  </span>
                  <p className="text-xl sm:text-2xl font-mono font-extrabold text-[#102c57]">
                    {createdComplaint.id}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="px-3 py-2 bg-white hover:bg-stone-100 text-slate-700 border border-stone-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-xs text-slate-500 max-w-sm mx-auto">
                {isGujarati
                  ? `એસ.એમ.એસ. પુષ્ટિ ${createdComplaint.citizenMobile} પર મોકલવામાં આવી છે.`
                  : `SMS notification dispatched to ${createdComplaint.citizenMobile}. Expected response in ${
                      DEPARTMENT_SERVICES.find((d) => d.id === createdComplaint.departmentId)?.avgResolutionDays || 3
                    } business days.`}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3">
          {step > 1 && step < 4 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
              className="min-h-[48px] px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 rounded-xl hover:bg-stone-100 flex items-center gap-1.5 tap-feedback active:scale-95 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              {isGujarati ? 'પાછા જાઓ' : 'Back'}
            </button>
          ) : (
            <div />
          )}

          {step === 1 && (
            <button
              type="button"
              onClick={() => setStep(2)}
              className="min-h-[48px] flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#102c57] hover:bg-[#071c35] text-white text-xs sm:text-sm font-bold shadow-xs cursor-pointer ml-auto tap-feedback active:scale-95 transition-all"
            >
              <span>{isGujarati ? 'આગળ વધો' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {step === 2 && (
            <button
              type="button"
              onClick={() => {
                if (validateStep2()) setStep(3);
              }}
              className="min-h-[48px] flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#102c57] hover:bg-[#071c35] text-white text-xs sm:text-sm font-bold shadow-xs cursor-pointer tap-feedback active:scale-95 transition-all"
            >
              <span>{isGujarati ? 'નાગરિક માહિતી દાખલ કરો' : 'Next: Citizen Info'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {step === 3 && (
            <button
              type="button"
              onClick={handleSubmit}
              className="min-h-[48px] flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold shadow-xs cursor-pointer tap-feedback active:scale-95 transition-all"
            >
              <span>{isGujarati ? 'ફરિયાદ સબમિટ કરો' : 'Submit Grievance'}</span>
              <CheckCircle className="w-4 h-4" />
            </button>
          )}

          {step === 4 && (
            <button
              type="button"
              onClick={onClose}
              className="min-h-[48px] px-6 py-2.5 rounded-xl bg-[#102c57] hover:bg-[#071c35] text-white text-xs sm:text-sm font-bold shadow-xs cursor-pointer ml-auto tap-feedback active:scale-95 transition-all"
            >
              {isGujarati ? 'પૂર્ણ કરો' : 'Done & Track Later'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
