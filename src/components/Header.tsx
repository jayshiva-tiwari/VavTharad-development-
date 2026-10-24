import { User, LogIn, Globe } from 'lucide-react';
import { EmblemLogo } from './EmblemLogo';

interface HeaderProps {
  isGujarati: boolean;
  onToggleLanguage: () => void;
  onOpenAuth: (mode: 'login' | 'signin') => void;
}

export function Header({ isGujarati, onToggleLanguage, onOpenAuth }: HeaderProps) {
  return (
    <header className="w-full bg-[#FBF9F5] border-b border-stone-200/70 sticky top-0 z-30 transition-shadow duration-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Ashoka Emblem & Vav Tharad Title */}
        <EmblemLogo />

        {/* Right: Language switch + Login + Sign in */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={onToggleLanguage}
            type="button"
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs md:text-sm font-semibold text-slate-700 bg-stone-100/90 hover:bg-stone-200/90 rounded-xl transition-colors cursor-pointer border border-stone-200/80 active:scale-95"
            title="Switch Language / ભાષા બદલો"
            aria-label="Toggle Gujarati / English language"
          >
            <Globe className="w-3.5 h-3.5 text-orange-600 shrink-0" />
            <span className={isGujarati ? 'font-gujarati font-bold text-orange-700' : 'text-slate-800'}>
              {isGujarati ? 'EN' : 'ગુજ'}
            </span>
            <span className="hidden md:inline text-slate-400">/</span>
            <span className="hidden md:inline text-slate-500">
              {isGujarati ? 'English' : 'ગુજરાતી'}
            </span>
          </button>

          {/* Log in Button */}
          <button
            onClick={() => onOpenAuth('login')}
            type="button"
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 md:px-4 py-1.5 sm:py-2 md:py-2.5 text-[11px] sm:text-xs md:text-sm font-semibold text-slate-800 bg-white hover:bg-stone-50 border border-slate-300 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
          >
            <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600 shrink-0" />
            <span className="hidden xs:inline">{isGujarati ? 'લૉગ ઇન' : 'Log in'}</span>
          </button>

          {/* Sign in Button */}
          <button
            onClick={() => onOpenAuth('signin')}
            type="button"
            className="flex items-center gap-1.5 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 text-[11px] sm:text-xs md:text-sm font-semibold text-white bg-[#0B2545] hover:bg-[#071c35] rounded-xl transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
          >
            <LogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
            <span>{isGujarati ? 'સાઇન ઇન' : 'Sign in'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
