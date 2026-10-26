import { useState } from 'react';
import { User, LogIn, Globe, LogOut, ChevronDown, FileText, CheckCircle2 } from 'lucide-react';
import { EmblemLogo } from './EmblemLogo';
import { UserSession } from '../types';

interface HeaderProps {
  isGujarati: boolean;
  onToggleLanguage: () => void;
  onOpenAuth: (mode: 'login' | 'signup' | 'signin') => void;
  currentUser: UserSession | null;
  onLogout: () => void;
  onOpenComplaints?: () => void;
  onOpenNextJsModal?: () => void;
}

export function Header({
  isGujarati,
  onToggleLanguage,
  onOpenAuth,
  currentUser,
  onLogout,
  onOpenComplaints,
  onOpenNextJsModal
}: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header suppressHydrationWarning className="w-full bg-[#FBF9F5]/95 backdrop-blur-md border-b border-stone-200/80 sticky top-0 z-50 transition-shadow duration-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Ashoka Emblem & Vav Tharad Title */}
        <EmblemLogo />

        {/* Right: Language switch + User profile or Auth buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Subtle Language Switcher */}
          <button
            onClick={onToggleLanguage}
            type="button"
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-stone-200/50 transition-colors cursor-pointer"
            title="Switch Language / ભાષા બદલો"
            aria-label="Toggle Gujarati / English language"
          >
            <Globe className="w-3.5 h-3.5 text-orange-600 shrink-0" />
            <span className="font-semibold text-xs">
              {isGujarati ? 'EN' : 'ગુજ'}
            </span>
          </button>

          {/* Conditional: If User is Logged In */}
          {currentUser && currentUser.isLoggedIn ? (
            <div className="flex items-center gap-2">
              {/* Optional Complaints Button on Header */}
              {onOpenComplaints && (
                <button
                  type="button"
                  onClick={onOpenComplaints}
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 sm:py-2 text-xs font-bold text-slate-800 bg-white hover:bg-stone-50 border border-slate-300 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  <FileText className="w-3.5 h-3.5 text-[#0B2545]" />
                  <span>{isGujarati ? 'ફરિયાદો' : 'Complaints'}</span>
                </button>
              )}

              {/* User Profile Pill */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="flex items-center gap-1.5 sm:gap-2 pl-1.5 pr-2.5 sm:pr-3 py-1 sm:py-1.5 bg-white hover:bg-stone-50 border border-slate-200 rounded-full transition-all shadow-xs cursor-pointer focus:outline-none active:scale-95"
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0B2545] text-white flex items-center justify-center font-bold text-xs ring-1 ring-blue-200">
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 max-w-[100px] sm:max-w-[130px] truncate">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-50 text-xs">
                    <div className="px-3 py-2.5 border-b border-stone-100 flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-[#0B2545] text-white flex items-center justify-center font-bold text-sm">
                        {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 text-sm truncate">{currentUser.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">
                          +91 {currentUser.mobile} • {currentUser.taluka || 'Vav-Tharad'}
                        </p>
                      </div>
                    </div>

                    <div className="py-1 space-y-0.5">
                      <div className="px-3 py-1.5 text-[11px] text-emerald-700 bg-emerald-50 rounded-xl font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified Citizen Account</span>
                      </div>

                      {onOpenComplaints && (
                        <button
                          type="button"
                          onClick={() => {
                            setShowDropdown(false);
                            onOpenComplaints();
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-stone-50 font-medium text-slate-700 flex items-center justify-between cursor-pointer"
                        >
                          <span>{isGujarati ? 'તમારી ફરિયાદો' : 'Your Complaints'}</span>
                          <FileText className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setShowDropdown(false);
                          onLogout();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-rose-50 text-rose-600 font-bold flex items-center justify-between cursor-pointer"
                      >
                        <span>{isGujarati ? 'લૉગ આઉટ' : 'Log Out'}</span>
                        <LogOut className="w-3.5 h-3.5 text-rose-500" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Logout Icon Button on mobile */}
              <button
                type="button"
                onClick={onLogout}
                title="Log Out"
                className="p-1.5 sm:px-2.5 sm:py-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-rose-200/70 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isGujarati ? 'બહાર નીકળો' : 'Logout'}</span>
              </button>
            </div>
          ) : (
            /* Log in / Sign up buttons if not logged in */
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                type="button"
                className="flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
              >
                <User className="w-4 h-4 text-slate-700 shrink-0" strokeWidth={1.8} />
                <span>{isGujarati ? 'લૉગ ઇન' : 'Log in'}</span>
              </button>

              <button
                onClick={() => onOpenAuth('signin')}
                type="button"
                className="flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0B2545] hover:bg-[#133E68] rounded-lg transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
              >
                <LogIn className="w-4 h-4 text-white shrink-0" strokeWidth={2} />
                <span>{isGujarati ? 'સાઇન ઇન' : 'Sign in'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
