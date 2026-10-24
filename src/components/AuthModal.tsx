import React, { useState } from 'react';
import { X, Shield, Phone, KeyRound, CheckCircle2, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  mode: 'login' | 'signin';
  onClose: () => void;
  isGujarati: boolean;
}

export function AuthModal({ isOpen, mode, onClose, isGujarati }: AuthModalProps) {
  const [tab, setTab] = useState<'citizen' | 'officer'>('citizen');
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [officerId, setOfficerId] = useState('');
  const [officerPass, setOfficerPass] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      setOtpSent(false);
      setOtp('');
      setLoggedIn(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setOtpSent(true);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      setLoggedIn(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  const handleOfficerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (officerId && officerPass) {
      setLoggedIn(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-stone-50 via-white to-stone-50 border-b border-stone-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#102c57] text-white flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {mode === 'login' ? (isGujarati ? 'લૉગ ઇન' : 'Citizen & Officer Login') : (isGujarati ? 'સાઇન ઇન' : 'Portal Sign In')}
              </h3>
              <p className="text-[11px] text-slate-500">Government of Gujarat — Vav-Tharad</p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-2 p-2 bg-stone-100/70 border-b border-stone-200 text-xs font-bold text-slate-600">
          <button
            type="button"
            onClick={() => setTab('citizen')}
            className={`py-2 rounded-xl transition-all cursor-pointer ${
              tab === 'citizen' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            {isGujarati ? 'નાગરિક (Citizen OTP)' : 'Citizen (Mobile OTP)'}
          </button>
          <button
            type="button"
            onClick={() => setTab('officer')}
            className={`py-2 rounded-xl transition-all cursor-pointer ${
              tab === 'officer' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            {isGujarati ? 'અધિકારી / તલાટી પોર્ટલ' : 'Official / Officer'}
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loggedIn ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                {isGujarati ? 'સફળતાપૂર્વક લૉગિન થયું!' : 'Login Successful!'}
              </h4>
              <p className="text-xs text-slate-500">
                {isGujarati ? 'તમારા ડેશબોર્ડ પર લઈ જઈ રહ્યા છીએ...' : 'Redirecting to citizen workspace...'}
              </p>
            </div>
          ) : tab === 'citizen' ? (
            !otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <p className="text-xs text-slate-600">
                  {isGujarati
                    ? 'તમારા રજિસ્ટર્ડ મોબાઈલ નંબર પર 6 અંકનો વન-ટાઇમ પાસવર્ડ (OTP) મોકલવામાં આવશે.'
                    : 'Enter your 10-digit mobile number to access your grievance history and status updates.'}
                </p>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-400">
                      +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="98250 12345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-12 pr-4 py-2.5 bg-white border border-stone-300 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#102c57]"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={phone.length < 10}
                  className="w-full py-2.5 bg-[#102c57] hover:bg-[#071c35] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-xs disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>{isGujarati ? 'OTP મોકલો' : 'Send OTP via SMS'}</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <p className="text-xs text-slate-600">
                  {isGujarati
                    ? `+91 ${phone} પર OTP મોકલાયો છે. (ટેસ્ટિંગ માટે 123456 દાખલ કરો)`
                    : `OTP sent to +91 ${phone}. (Enter 123456 for demo)`}
                </p>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Enter 6-Digit OTP
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full text-center tracking-widest text-lg font-mono py-2.5 bg-white border border-stone-300 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-[#102c57]"
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-semibold rounded-xl"
                  >
                    Change
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#102c57] hover:bg-[#071c35] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-xs"
                  >
                    Verify &amp; Enter
                  </button>
                </div>
              </form>
            )
          ) : (
            <form onSubmit={handleOfficerLogin} className="space-y-4">
              <p className="text-xs text-slate-600">
                {isGujarati
                  ? 'વાવ-થરાદ તાલુકા વિકાસ અધિકારી (TDO), મામલતદાર અને તલાટી લોગિન.'
                  : 'Authorized government staff, TDO, Mamlatdar & Gram Panchayat portal access.'}
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Employee ID / IFMS Code
                </label>
                <input
                  type="text"
                  placeholder="GUJ-TDO-8910"
                  value={officerId}
                  onChange={(e) => setOfficerId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#102c57]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Official Security Password
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={officerPass}
                    onChange={(e) => setOfficerPass(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#102c57]"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#102c57] hover:bg-[#071c35] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Authorize &amp; Access Officer Desk</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
