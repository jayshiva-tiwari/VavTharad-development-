import { Users, ShieldCheck, BarChart3 } from 'lucide-react';

interface FooterProps {
  isGujarati: boolean;
}

export function Footer({ isGujarati }: FooterProps) {
  return (
    <footer className="w-full bg-white border-t border-stone-200 py-3 sm:py-3.5 px-4 sm:px-6 lg:px-8 text-xs text-[#6b7280] relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
        {/* Left Side: "Public services made simple" + Indian Flag color dash */}
        <div className="flex items-center gap-2.5">
          <span className="font-normal text-slate-700">
            {isGujarati ? 'સરકારી સેવાઓ હવે સહજ અને સરળ' : 'Public services made simple'}
          </span>
          <div className="flex items-center gap-0.5" aria-hidden="true" title="Tricolor indicator">
            <span className="w-3.5 h-[3px] bg-[#e85d22] rounded-l-full" />
            <span className="w-3.5 h-[3px] bg-stone-300" />
            <span className="w-3.5 h-[3px] bg-[#138808] rounded-r-full" />
          </div>
        </div>

        {/* Right Side: Three flex items with small gray icons and gray text */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[#6b7280] font-normal text-xs">
          <div className="flex items-center gap-1.5 hover:text-[#102c57] transition-colors">
            <Users className="w-3.5 h-3.5 text-[#6b7280]" />
            <span>{isGujarati ? 'જન હિત સર્વોપરી' : 'People First'}</span>
          </div>

          <div className="flex items-center gap-1.5 hover:text-[#102c57] transition-colors">
            <ShieldCheck className="w-3.5 h-3.5 text-[#6b7280]" />
            <span>{isGujarati ? 'પારદર્શક વહીવટ' : 'Transparent Governance'}</span>
          </div>

          <div className="flex items-center gap-1.5 hover:text-[#102c57] transition-colors">
            <BarChart3 className="w-3.5 h-3.5 text-[#6b7280]" />
            <span>{isGujarati ? 'સશક્ત વાવ-થરાદ' : 'Stronger Vav-Tharad'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
