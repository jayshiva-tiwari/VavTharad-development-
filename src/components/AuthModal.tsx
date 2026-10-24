import React, { useState, useEffect } from 'react';
import {
  X,
  Shield,
  Phone,
  KeyRound,
  CheckCircle2,
  ArrowRight,
  User,
  Sparkles,
  MapPin,
  Lock,
  Building2
} from 'lucide-react';
import { UserSession } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  mode?: 'login' | 'signup' | 'signin';
  isMandatory?: boolean;
  onClose: () => void;
  onSuccess: (session: UserSession) => void;
  isGujarati: boolean;
}

export function AuthModal({
  isOpen,
  mode = 'login',
  isMandatory = false,
  onClose,
  onSuccess,
  isGujarati
}: AuthModalProps) {
  // Main view: 'login' or 'signup'
  const [mainTab, setMainTab] = useState<'login' | 'signup'>(mode === 'signup' ? 'signup' : 'login');

  // Sub-tabs for login: 'citizen' or 'officer'
  const [loginType, setLoginType] = useState<'citizen' | 'officer'>('citizen');

  // Citizen Login State
  const [phone, setPhone] = useState('98250 12345');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  // Officer Login State
  const [officerId, setOfficerId] = useState('GUJ-TDO-8910');
  const [officerPass, setOfficerPass] = useState('VavTharad@2026');

  // Sign Up State
  const [signupName, setSignupName] = useState('Shiva Tiwari');
  const [signupPhone, setSignupPhone] = useState('98250 12345');
  const [signupTaluka, setSignupTaluka] = useState<'Vav' | 'Tharad' | 'Suigam' | 'Bhabhar'>('Tharad');
  const [signupVillage, setSignupVillage] = useState('Main Bazaar, Tharad');
  const [signupOtpSent, setSignupOtpSent] = useState(false);
  const [signupOtp, setSignupOtp] = useState('');

  // Success state
  const [isSuccess, setIsSuccess] = useState(false);
  const [successUser, setSuccessUser] = useState<UserSession | null>(null);

  useEffect(() => {
    if (isOpen) {
      setMainTab(mode === 'signup' ? 'signup' : 'login');
      setIsSuccess(false);
      setOtpSent(false);
      setOtp('');
      setSignupOtpSent(false);
      setSignupOtp('');
    }
  }, [isOpen, mode]);

  if (!isOpen) return null;

  // 1. Citizen Log In: Send OTP
  const handleSendLoginOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.replace(/\D/g, '').length >= 10) {
      setOtpSent(true);
      setOtp('123456'); // Pre-fill sample demo OTP for frictionless user testing
    }
  };

  // 2. Citizen Log In: Verify OTP
  const handleVerifyLoginOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanMobile = phone.replace(/\D/g, '');
    const session: UserSession = {
      name: cleanMobile === '9825012345' ? 'Shiva Tiwari' : `Citizen (${cleanMobile.slice(-4)})`,
      mobile: cleanMobile,
      role: 'citizen',
      taluka: 'Tharad',
      village: 'Vav-Tharad',
      isLoggedIn: true
    };
    triggerSuccess(session);
  };

  // 3. Officer Log In
  const handleOfficerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const session: UserSession = {
      name: 'Dr. R. K. Vaghela (TDO)',
      mobile: '94270 54120',
      role: 'officer',
      taluka: 'Tharad',
      village: 'District Collectorate Office',
      isLoggedIn: true
    };
    triggerSuccess(session);
  };

  // 4. Quick 1-Click Demo Login as Shiva Tiwari
  const handleQuickDemoLogin = () => {
    const session: UserSession = {
      name: 'Shiva Tiwari',
      mobile: '98250 12345',
      role: 'citizen',
      taluka: 'Tharad',
      village: 'Main Bazaar, Tharad',
      isLoggedIn: true
    };
    triggerSuccess(session);
  };

  // 5. Sign Up Submit
  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupOtpSent) {
      setSignupOtpSent(true);
      setSignupOtp('123456');
    } else {
      const session: UserSession = {
        name: signupName.trim() || 'Shiva Tiwari',
        mobile: signupPhone.replace(/\D/g, '') || '9825012345',
        role: 'citizen',
        taluka: signupTaluka,
        village: signupVillage.trim() || 'Vav-Tharad',
        isLoggedIn: true
      };
      triggerSuccess(session);
    }
  };

  // Trigger success state and callback
  const triggerSuccess = (session: UserSession) => {
    setSuccessUser(session);
    setIsSuccess(true);
    setTimeout(() => {
      onSuccess(session);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/75 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-md my-auto flex flex-col shadow-2xl border border-stone-200 overflow-hidden relative">
        {/* Mandatory Gate Notice Banner if first land */}
        {isMandatory && (
          <div className="bg-[#0B2545] text-amber-300 px-4 py-2 text-[11px] font-semibold text-center flex items-center justify-center gap-1.5 border-b border-amber-400/20">
            <Lock className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>
              {isGujarati
                ? 'પોર્ટલનો ઉપયોગ કરવા માટે કૃપા કરીને પ્રથમ લૉગિન અથવા સાઇન અપ કરો'
                : 'Please Log In or Sign Up to enter the Vav-Tharad District Portal'}
            </span>
          </div>
        )}

        {/* Modal Header */}
        <div className="px-5 sm:px-6 py-4 bg-gradient-to-r from-stone-50 via-white to-stone-50 border-b border-stone-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src="/assets/logo/emlogo.png"
              alt="Government Emblem"
              className="w-8 h-9 object-contain shrink-0"
            />
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-extrabold text-[#0B2545] tracking-tight truncate">
                {mainTab === 'login'
                  ? isGujarati
                    ? 'વાવ-થરાદ નાગરિક પોર્ટલ લૉગિન'
                    : 'Vav Tharad Citizen Login'
                  : isGujarati
                  ? 'નવું નાગરિક ખાતું બનાવો'
                  : 'New Citizen Registration'}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium truncate">
                Government of Gujarat • Public Grievance Desk
              </p>
            </div>
          </div>

          {/* Close button ONLY if not a mandatory landing gate */}
          {!isMandatory && (
            <button
              onClick={onClose}
              type="button"
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Main Tab Switch: Log In vs Sign Up */}
        <div className="grid grid-cols-2 p-1.5 bg-stone-100 border-b border-stone-200/80 text-xs sm:text-sm font-bold">
          <button
            type="button"
            onClick={() => {
              setMainTab('login');
              setOtpSent(false);
            }}
            className={`py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mainTab === 'login'
                ? 'bg-white text-[#0B2545] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{isGujarati ? 'લૉગ ઇન (Log In)' : 'Log In'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMainTab('signup');
              setSignupOtpSent(false);
            }}
            className={`py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mainTab === 'signup'
                ? 'bg-white text-[#0B2545] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span>{isGujarati ? 'સાઇન અપ (Sign Up)' : 'Sign Up'}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6">
          {/* 1. SUCCESS STATE */}
          {isSuccess && successUser ? (
            <div className="text-center py-6 sm:py-8 space-y-3.5">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm ring-4 ring-emerald-50 animate-bounce">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-extrabold text-slate-900">
                  {isGujarati ? `સ્વાગત છે, ${successUser.name}!` : `Welcome, ${successUser.name}!`}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  {isGujarati
                    ? 'પ્રવેશ સફળ થયો. વાવ-થરાદ પોર્ટલ ખોલી રહ્યા છીએ...'
                    : 'Access Granted! Entering Vav-Tharad Citizen Portal...'}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[11px] font-semibold text-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Verified Citizen • {successUser.taluka} Block</span>
              </div>
            </div>
          ) : mainTab === 'login' ? (
            /* 2. LOG IN VIEW */
            <div className="space-y-4">
              {/* Quick 1-Click Demo Shortcut */}
              <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-2xl flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0B2545]">
                    <Sparkles className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                    <span>Quick Test Login</span>
                  </div>
                  <p className="text-[11px] text-slate-600 truncate">
                    One-click direct entry as <strong className="text-slate-800">Shiva Tiwari</strong>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="px-3 py-1.5 bg-[#0B2545] hover:bg-[#071c35] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
                >
                  Enter Portal ↗
                </button>
              </div>

              {/* Login Sub-Type (Citizen vs Officer) */}
              <div className="grid grid-cols-2 p-1 bg-stone-100 rounded-xl text-xs font-semibold text-slate-600">
                <button
                  type="button"
                  onClick={() => {
                    setLoginType('citizen');
                    setOtpSent(false);
                  }}
                  className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                    loginType === 'citizen' ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'
                  }`}
                >
                  {isGujarati ? 'નાગરિક (Citizen OTP)' : 'Citizen (Mobile OTP)'}
                </button>
                <button
                  type="button"
                  onClick={() => setLoginType('officer')}
                  className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                    loginType === 'officer' ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'
                  }`}
                >
                  {isGujarati ? 'અધિકારી (Officer)' : 'Officer / Staff'}
                </button>
              </div>

              {loginType === 'citizen' ? (
                /* Citizen Phone / OTP */
                !otpSent ? (
                  <form onSubmit={handleSendLoginOtp} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isGujarati ? 'મોબાઈલ નંબર દાખલ કરો' : 'Registered Mobile Number'}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-400">
                          +91
                        </span>
                        <input
                          type="tel"
                          maxLength={12}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="98250 12345"
                          className="w-full pl-12 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
                          required
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {isGujarati
                          ? 'આપના મોબાઈલ પર 6 અંકનો સુરક્ષિત OTP મોકલવામાં આવશે.'
                          : 'A 6-digit verification OTP will be sent to your number.'}
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#0B2545] hover:bg-[#071c35] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{isGujarati ? 'ઓટીપી મોકલો' : 'Send Verification OTP'}</span>
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyLoginOtp} className="space-y-3.5">
                    <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-between">
                      <span>OTP sent to +91 {phone}</span>
                      <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-emerald-300">
                        Demo: 123456
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isGujarati ? '૬ અંકનો OTP દાખલ કરો' : 'Enter 6-Digit OTP'}
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="123456"
                        className="w-full text-center tracking-widest text-xl font-mono py-2.5 bg-white border border-stone-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
                        required
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setOtpSent(false)}
                        className="px-3.5 py-2.5 bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2.5 bg-[#0B2545] hover:bg-[#071c35] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5 active:scale-98"
                      >
                        <span>{isGujarati ? 'ચકાસો અને પ્રવેશો' : 'Verify & Enter Portal'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )
              ) : (
                /* Officer Login */
                <form onSubmit={handleOfficerLogin} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isGujarati ? 'કર્મચારી ID / IFMS કોડ' : 'Employee ID / IFMS Code'}
                    </label>
                    <input
                      type="text"
                      value={officerId}
                      onChange={(e) => setOfficerId(e.target.value)}
                      placeholder="GUJ-TDO-8910"
                      className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isGujarati ? 'સુરક્ષા પાસવર્ડ' : 'Officer Security Password'}
                    </label>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input
                        type="password"
                        value={officerPass}
                        onChange={(e) => setOfficerPass(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#0B2545] hover:bg-[#071c35] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>{isGujarati ? 'અધિકારી ડેસ્ક પ્રવેશ' : 'Authorize & Enter Desk'}</span>
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* 3. SIGN UP VIEW */
            <form onSubmit={handleSignUpSubmit} className="space-y-3">
              {!signupOtpSent ? (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isGujarati ? 'પૂરું નામ' : 'Citizen Full Name'}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        placeholder="e.g. Shiva Tiwari"
                        className="w-full pl-9 pr-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isGujarati ? 'મોબાઈલ નંબર' : 'Mobile Number'}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2 text-xs font-bold text-slate-400">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={12}
                        value={signupPhone}
                        onChange={(e) => setSignupPhone(e.target.value)}
                        placeholder="98250 12345"
                        className="w-full pl-12 pr-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isGujarati ? 'તાલુકો' : 'Taluka Block'}
                      </label>
                      <select
                        value={signupTaluka}
                        onChange={(e) => setSignupTaluka(e.target.value as any)}
                        className="w-full px-2.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
                      >
                        <option value="Tharad">Tharad (થરાદ)</option>
                        <option value="Vav">Vav (વાવ)</option>
                        <option value="Suigam">Suigam (સુઈગામ)</option>
                        <option value="Bhabhar">Bhabhar (ભાભર)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isGujarati ? 'ગામ / વોર્ડ' : 'Village / Ward'}
                      </label>
                      <input
                        type="text"
                        value={signupVillage}
                        onChange={(e) => setSignupVillage(e.target.value)}
                        placeholder="Main Bazaar"
                        className="w-full px-2.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-2.5 bg-[#0B2545] hover:bg-[#071c35] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                  >
                    <span>{isGujarati ? 'સાઇન અપ કરો અને પ્રવેશો' : 'Sign Up & Enter Portal'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-between">
                    <span>OTP sent to +91 {signupPhone}</span>
                    <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-emerald-300">
                      Demo: 123456
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isGujarati ? '૬ અંકનો OTP દાખલ કરો' : 'Confirm Registration OTP'}
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={signupOtp}
                      onChange={(e) => setSignupOtp(e.target.value)}
                      placeholder="123456"
                      className="w-full text-center tracking-widest text-xl font-mono py-2 bg-white border border-stone-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
                      required
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSignupOtpSent(false)}
                      className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-semibold rounded-xl"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-[#0B2545] hover:bg-[#071c35] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <span>Complete &amp; Enter</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}

          {/* Footer Security Badge */}
          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald-600" />
              <span>Official Gujarat e-Governance Portal</span>
            </span>
            <span>Vav-Tharad District</span>
          </div>
        </div>
      </div>
    </div>
  );
}
