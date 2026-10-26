'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { User, LogIn, Globe, LogOut, ChevronDown, FileText, CheckCircle2, X } from 'lucide-react';
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
}: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <header suppressHydrationWarning className="fixed top-0 left-0 right-0 z-40 w-full bg-[#FBF9F5]/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Ashoka Emblem & Vav Tharad Title */}
          <EmblemLogo />

          {/* Right: Language switch + User profile or Auth buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Subtle Language Switcher (Min 44x44px touch target) */}
            <button
              onClick={onToggleLanguage}
              type="button"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white sm:bg-transparent rounded-xl border border-slate-200 sm:border-transparent hover:bg-stone-200/50 transition-colors tap-feedback active:scale-95 cursor-pointer"
              title="Switch Language / ભાષા બદલો"
              aria-label="Toggle Gujarati / English language"
            >
              <Globe className="w-4 h-4 text-orange-600 shrink-0" />
              <span className="font-bold text-xs">
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
                    className="hidden md:flex items-center gap-1.5 px-3.5 py-2.5 min-h-[44px] text-xs font-bold text-slate-800 bg-white hover:bg-stone-50 border border-slate-300 rounded-xl transition-all shadow-xs cursor-pointer tap-feedback active:scale-95"
                  >
                    <FileText className="w-4 h-4 text-[#0B2545]" />
                    <span>{isGujarati ? 'ફરિયાદો' : 'Complaints'}</span>
                  </button>
                )}

                {/* User Profile Trigger Button (Min 44x44px touch target) */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowDropdown((prev) => !prev)}
                    className="min-h-[44px] flex items-center gap-1.5 sm:gap-2 pl-1.5 pr-2.5 sm:pr-3 py-1.5 bg-white hover:bg-stone-50 border border-slate-200 rounded-full transition-all shadow-xs cursor-pointer focus:outline-none tap-feedback active:scale-95"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#0B2545] text-white flex items-center justify-center font-bold text-xs ring-1 ring-blue-200 shrink-0">
                      {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 max-w-[90px] sm:max-w-[130px] truncate">
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {/* DESKTOP Dropdown Menu (Hidden on mobile) */}
                  {showDropdown && (
                    <>
                      <div
                        className="hidden sm:block fixed inset-0 z-40"
                        onClick={() => setShowDropdown(false)}
                        aria-hidden="true"
                      />
                      <div className="hidden sm:block absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                        <div className="px-3 py-2.5 border-b border-stone-100 flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-[#0B2545] text-white flex items-center justify-center font-bold text-sm shrink-0">
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
                    </>
                  )}
                </div>

                {/* Direct Logout Icon Button on mobile (Min 44x44px touch target) */}
                <button
                  type="button"
                  onClick={onLogout}
                  title="Log Out"
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center px-2.5 py-2 text-rose-600 bg-white hover:bg-rose-50 rounded-xl transition-colors border border-rose-200/70 text-xs font-semibold tap-feedback active:scale-95 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline ml-1">{isGujarati ? 'બહાર નીકળો' : 'Logout'}</span>
                </button>
              </div>
            ) : (
              /* Log in / Sign up buttons if not logged in (Min 44x44px touch targets) */
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  type="button"
                  className="min-h-[44px] flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-all shadow-xs cursor-pointer tap-feedback active:scale-95 shrink-0"
                >
                  <User className="w-4 h-4 text-slate-700 shrink-0" strokeWidth={1.8} />
                  <span>{isGujarati ? 'લૉગ ઇન' : 'Log in'}</span>
                </button>

                <button
                  onClick={() => onOpenAuth('signin')}
                  type="button"
                  className="min-h-[44px] flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0B2545] hover:bg-[#133E68] rounded-xl transition-all shadow-xs cursor-pointer tap-feedback active:scale-95 shrink-0"
                >
                  <LogIn className="w-4 h-4 text-white shrink-0" strokeWidth={2} />
                  <span>{isGujarati ? 'સાઇન ઇન' : 'Sign in'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM SHEET DRAWER FOR USER PROFILE (Rendered via portal directly into document.body) */}
      {mounted && currentUser && showDropdown && createPortal(
        <div className="fixed inset-0 z-50 sm:hidden flex items-end justify-center bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
          {/* Backdrop dismiss */}
          <div
            className="fixed inset-0"
            onClick={() => setShowDropdown(false)}
            aria-hidden="true"
          />

          {/* Bottom Sheet Modal */}
          <div className="relative z-10 w-full max-h-[85dvh] overflow-y-auto bg-white rounded-t-3xl shadow-2xl border-t border-stone-200 p-5 pb-[calc(env(safe-area-inset-bottom,0px)+1.5rem)] animate-in slide-in-from-bottom duration-250">
            {/* Drag Handle */}
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-4 shrink-0" />

            <div className="flex items-center gap-3.5 pb-4 border-b border-stone-100">
              <div className="w-12 h-12 rounded-full bg-[#0B2545] text-white flex items-center justify-center font-bold text-lg ring-2 ring-blue-100 shrink-0">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-slate-900 text-base truncate">{currentUser.name}</p>
                <p className="text-xs text-slate-500 truncate">
                  +91 {currentUser.mobile} • {currentUser.taluka || 'Vav-Tharad'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowDropdown(false)}
                aria-label="Close menu"
                className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-slate-500 tap-feedback active:scale-90 shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-3 space-y-2">
              <div className="px-4 py-2.5 text-xs text-emerald-800 bg-emerald-50 rounded-2xl font-semibold flex items-center gap-2 border border-emerald-200/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified Citizen Account • Vav-Tharad</span>
              </div>

              {onOpenComplaints && (
                <button
                  type="button"
                  onClick={() => {
                    setShowDropdown(false);
                    onOpenComplaints();
                  }}
                  className="w-full text-left px-4 py-3 min-h-[48px] rounded-2xl hover:bg-stone-50 font-semibold text-sm text-slate-800 flex items-center justify-between cursor-pointer border border-slate-100 tap-feedback active:scale-98"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#0B2545]" />
                    <span>{isGujarati ? 'તમારી ફરિયાદો (Your Complaints)' : 'Your Complaints'}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 -rotate-90" />
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setShowDropdown(false);
                  onToggleLanguage();
                }}
                className="w-full text-left px-4 py-3 min-h-[48px] rounded-2xl hover:bg-stone-50 font-semibold text-sm text-slate-800 flex items-center justify-between cursor-pointer border border-slate-100 tap-feedback active:scale-98"
              >
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-orange-600" />
                  <span>{isGujarati ? 'Switch to English' : 'ગુજરાતીમાં જુઓ (Switch to Gujarati)'}</span>
                </div>
                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md">
                  {isGujarati ? 'EN' : 'ગુજ'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowDropdown(false);
                  onLogout();
                }}
                className="w-full text-left px-4 py-3 min-h-[48px] rounded-2xl bg-rose-50 hover:bg-rose-100/80 text-rose-700 font-bold text-sm flex items-center justify-between cursor-pointer border border-rose-100 tap-feedback active:scale-98"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5 text-rose-600" />
                  <span>{isGujarati ? 'લૉગ આઉટ (Log Out)' : 'Log Out'}</span>
                </div>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
