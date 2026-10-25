export function EmblemLogo() {
  return (
    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
      {/* Official Ashoka Lion Emblem Image uploaded by user */}
      <div className="flex flex-col items-center shrink-0">
        <img
          src="/assets/logo/emlogo.png"
          alt="Emblem of India"
          className="w-8 sm:w-9 md:w-10 h-10 sm:h-11 md:h-12 object-contain"
        />
      </div>

      {/* Subtle hairline vertical divider */}
      <div className="h-7 sm:h-8 md:h-9 w-[1px] bg-slate-300 mx-0.5 sm:mx-1" aria-hidden="true" />

      {/* District Name and Gujarati State Identifier */}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-lg sm:text-2xl md:text-[26px] font-extrabold text-[#102c57] tracking-tight font-sans whitespace-nowrap">
            Vav Tharad
          </span>
          {/* Waving Indian Tricolor Banner Flag */}
          <div className="flex items-center shrink-0" title="National Flag of India">
            <svg
              suppressHydrationWarning
              className="w-5 sm:w-6 md:w-7 h-4 sm:h-5 md:h-5.5 -mt-0.5 drop-shadow-xs"
              viewBox="0 0 36 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Saffron wavy ribbon */}
              <path
                suppressHydrationWarning
                d="M1 4.5 C7 2 13 7.5 19 5 C25 2.5 31 6.5 35 4.5 L35 9.5 C31 11.5 25 7.5 19 10 C13 12.5 7 7 1 9.5 Z"
                fill="#FF9933"
              />
              {/* White wavy ribbon */}
              <path
                suppressHydrationWarning
                d="M1 9.5 C7 7 13 12.5 19 10 C25 7.5 31 11.5 35 9.5 L35 14.5 C31 16.5 25 12.5 19 15 C13 17.5 7 12 1 14.5 Z"
                fill="#FFFFFF"
              />
              {/* Green wavy ribbon */}
              <path
                suppressHydrationWarning
                d="M1 14.5 C7 12 13 17.5 19 15 C25 12.5 31 16.5 35 14.5 L35 19.5 C31 21.5 25 17.5 19 20 C13 22.5 7 17 1 19.5 Z"
                fill="#138808"
              />
              {/* Ashoka Chakra in middle */}
              <circle suppressHydrationWarning cx="18" cy="12.2" r="2" fill="none" stroke="#000088" strokeWidth="0.6" />
              <circle suppressHydrationWarning cx="18" cy="12.2" r="0.5" fill="#000088" />
            </svg>
          </div>
        </div>
        <span className="text-[8px] sm:text-[9.5px] md:text-[11px] font-semibold text-slate-500 uppercase tracking-[0.16em] sm:tracking-[0.22em] mt-0.5 whitespace-nowrap">
          GOVERNMENT OF GUJARAT
        </span>
      </div>
    </div>
  );
}
