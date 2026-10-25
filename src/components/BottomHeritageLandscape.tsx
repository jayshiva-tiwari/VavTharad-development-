export function BottomHeritageLandscape() {
  return (
    <div
      suppressHydrationWarning
      className="relative w-full overflow-hidden pointer-events-none select-none"
      style={{ height: '360px', marginTop: '-120px' }}
      aria-hidden="true"
    >
      {/* Top fade to seamlessly blend with #fdfdfc page background */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#fdfdfc] via-[#fdfdfc]/90 to-transparent z-10" />

      {/* Panoramic SVG Landscape of Indian Temple, Stepwell Colonnade, and Landscape */}
      <svg
        suppressHydrationWarning
        className="w-full h-full object-cover object-bottom"
        viewBox="0 0 1440 360"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="warmSunSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fdfdfc" />
            <stop offset="40%" stopColor="#F8EFE2" />
            <stop offset="80%" stopColor="#ECDBC1" />
            <stop offset="100%" stopColor="#DFCCA9" />
          </linearGradient>

          <radialGradient id="sunAtmosphere" cx="52%" cy="45%" r="40%">
            <stop offset="0%" stopColor="#FFF4D8" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#FDE6BE" stopOpacity="0.6" />
            <stop offset="85%" stopColor="#ECD4A7" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ECD4A7" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="sandstonePillars" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7E603C" />
            <stop offset="30%" stopColor="#BA9E7B" />
            <stop offset="70%" stopColor="#D5BE9E" />
            <stop offset="100%" stopColor="#6C4E2D" />
          </linearGradient>

          <linearGradient id="templeSpireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E5CBA7" />
            <stop offset="40%" stopColor="#BE9D73" />
            <stop offset="80%" stopColor="#96774D" />
            <stop offset="100%" stopColor="#694C27" />
          </linearGradient>

          <linearGradient id="terraceStone" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D2B994" />
            <stop offset="50%" stopColor="#B39770" />
            <stop offset="100%" stopColor="#81643F" />
          </linearGradient>
        </defs>

        {/* Soft golden horizon sky */}
        <rect x="0" y="0" width="1440" height="360" fill="url(#warmSunSky)" />

        {/* Ambient Sun Halo */}
        <circle cx="740" cy="190" r="220" fill="url(#sunAtmosphere)" />

        {/* Distant arid Gujarat landscape & soft tree canopies (Right background) */}
        <g id="distant-trees" opacity="0.65">
          {/* Distant low hills */}
          <path
            d="M520 280 Q680 260 840 270 T1180 265 T1440 270 L1440 360 L520 360 Z"
            fill="#D5C5A8"
          />
          {/* Clustered trees and shrubs on right */}
          <circle cx="920" cy="285" r="18" fill="#88966E" />
          <circle cx="940" cy="280" r="24" fill="#78885E" />
          <circle cx="965" cy="283" r="20" fill="#90A175" />
          <circle cx="1020" cy="290" r="16" fill="#7E8E62" />
          <circle cx="1050" cy="282" r="22" fill="#6E8055" />
          <circle cx="1080" cy="286" r="26" fill="#879969" />
          <circle cx="1120" cy="288" r="18" fill="#7E8E64" />
          <circle cx="1200" cy="292" r="22" fill="#78885C" />
          <circle cx="1240" cy="285" r="28" fill="#697A4F" />
          <circle cx="1280" cy="288" r="24" fill="#7E8E62" />
          <circle cx="1340" cy="292" r="20" fill="#6E8055" />
          <circle cx="1380" cy="286" r="26" fill="#889A6B" />
          <circle cx="1420" cy="289" r="22" fill="#78885C" />
        </g>

        {/* Mid-ground trees framing temple */}
        <g id="temple-trees" opacity="0.8">
          <circle cx="680" cy="275" r="22" fill="#5A6D44" />
          <circle cx="705" cy="270" r="28" fill="#4E6038" />
          <circle cx="735" cy="278" r="20" fill="#5F7348" />
          <circle cx="790" cy="276" r="24" fill="#4B5E36" />
          <circle cx="820" cy="272" r="26" fill="#586B42" />
          <circle cx="850" cy="280" r="18" fill="#6B7F53" />
        </g>

        {/* Stepped Vav Terraces spreading horizontally across center */}
        <g id="stepped-terraces">
          <polygon points="180,285 860,285 840,296 200,296" fill="#BEA17C" />
          <polygon points="200,296 840,296 820,308 220,308" fill="#A88B67" />
          <polygon points="220,308 820,308 800,322 240,322" fill="#937653" />
          <polygon points="240,322 800,322 780,340 260,340" fill="#7E6240" />
          <polygon points="260,340 780,340 760,360 280,360" fill="#6A4F2E" />
        </g>

        {/* Historic Vav Stepwell Stone Pavilion (Far Left) */}
        <g id="stepwell-colonnade">
          {/* Foliage hugging left colonnade */}
          <circle cx="15" cy="195" r="32" fill="#4E633A" />
          <circle cx="45" cy="180" r="28" fill="#5B7146" />
          <circle cx="75" cy="190" r="24" fill="#455832" />

          {/* Roof Entablature & Carved Cornice */}
          <rect x="0" y="200" width="280" height="15" fill="#B49774" />
          <rect x="0" y="195" width="285" height="6" fill="#D7BE9C" />
          <rect x="0" y="215" width="275" height="8" fill="#886D4C" />

          {/* Frieze detailing */}
          <path
            d="M10 203 h12 v4 h-12 z M32 203 h12 v4 h-12 z M54 203 h12 v4 h-12 z M76 203 h12 v4 h-12 z M98 203 h12 v4 h-12 z M120 203 h12 v4 h-12 z M142 203 h12 v4 h-12 z M164 203 h12 v4 h-12 z M186 203 h12 v4 h-12 z M208 203 h12 v4 h-12 z M230 203 h12 v4 h-12 z M252 203 h12 v4 h-12 z"
            fill="#6E5334"
            opacity="0.8"
          />

          {/* Pillars 1 to 5 with sculpted bracket capitals */}
          {/* Pillar 1 */}
          <rect x="18" y="223" width="16" height="92" fill="url(#sandstonePillars)" />
          <path d="M12 223 L40 223 L36 232 L16 232 Z" fill="#D2B895" />
          <rect x="14" y="307" width="24" height="10" fill="#6E5334" />

          {/* Pillar 2 */}
          <rect x="68" y="223" width="16" height="92" fill="url(#sandstonePillars)" />
          <path d="M62 223 L90 223 L86 232 L66 232 Z" fill="#D2B895" />
          <rect x="64" y="307" width="24" height="10" fill="#6E5334" />

          {/* Pillar 3 */}
          <rect x="118" y="223" width="16" height="92" fill="url(#sandstonePillars)" />
          <path d="M112 223 L140 223 L136 232 L116 232 Z" fill="#D2B895" />
          <rect x="114" y="307" width="24" height="10" fill="#6E5334" />

          {/* Pillar 4 */}
          <rect x="168" y="223" width="16" height="92" fill="url(#sandstonePillars)" />
          <path d="M162 223 L190 223 L186 232 L166 232 Z" fill="#D2B895" />
          <rect x="164" y="307" width="24" height="10" fill="#6E5334" />

          {/* Pillar 5 */}
          <rect x="218" y="223" width="16" height="92" fill="url(#sandstonePillars)" />
          <path d="M212 223 L240 223 L236 232 L216 232 Z" fill="#D2B895" />
          <rect x="214" y="307" width="24" height="10" fill="#6E5334" />

          {/* Left Terrace stepped base */}
          <polygon points="0,317 280,317 265,328 0,328" fill="#C4A884" />
          <polygon points="0,328 265,328 250,342 0,342" fill="#A88B67" />
          <polygon points="0,342 250,342 235,360 0,360" fill="#7E6240" />
        </g>

        {/* Majestic Hindu Mandir Shikhara (Temple Spire) rising in golden light */}
        <g id="mandir-shikhara" transform="translate(180, 0)">
          {/* Fluttering Saffron Temple Flag (Dhwaja) */}
          <path
            d="M578 88 Q594 82 610 86 L596 97 L608 105 Q590 100 578 98 Z"
            fill="#e85d22"
          />
          <line x1="578" y1="80" x2="578" y2="105" stroke="#7E5F3B" strokeWidth="3" />

          {/* Kalash and Amalaka (Golden finial crowning the Shikhara) */}
          <circle cx="578" cy="107" r="5" fill="#E6B800" />
          <ellipse cx="578" cy="116" rx="11" ry="5" fill="#C99834" />

          {/* Curvilinear Nagara Shikhara with tiered stone bands */}
          <path
            d="M578 120
               L572 136 L584 136
               L566 156 L590 156
               L559 180 L597 180
               L552 206 L604 206
               L543 234 L613 234
               L533 266 L623 266
               L520 300 L636 300
               Z"
            fill="url(#templeSpireGrad)"
          />

          {/* Side miniature spire offsets (Urushringas) */}
          <path d="M538 215 L552 215 L557 265 L533 265 Z" fill="#9D7D54" />
          <path d="M604 215 L618 215 L623 265 L599 265 Z" fill="#7D5F38" />

          {/* Intricate stone horizontal ridges (Bhumis) */}
          <line x1="570" y1="145" x2="586" y2="145" stroke="#684A28" strokeWidth="1.8" />
          <line x1="563" y1="168" x2="593" y2="168" stroke="#684A28" strokeWidth="1.8" />
          <line x1="556" y1="193" x2="600" y2="193" stroke="#684A28" strokeWidth="1.8" />
          <line x1="548" y1="220" x2="608" y2="220" stroke="#684A28" strokeWidth="2" />
          <line x1="539" y1="249" x2="617" y2="249" stroke="#684A28" strokeWidth="2.2" />
          <line x1="528" y1="282" x2="628" y2="282" stroke="#684A28" strokeWidth="2.5" />

          {/* Plinth & Mandapa platform */}
          <rect x="500" y="300" width="155" height="30" fill="#B3946D" />
          <rect x="490" y="320" width="175" height="18" fill="#8C6E48" />
          <polygon points="485,338 670,338 655,360 500,360" fill="#6A4F2E" />
        </g>
      </svg>

      {/* Gujarat Cultural Slogan & Tricolor Swoosh (Positioned exactly matching image.png) */}
      <div className="absolute left-6 sm:left-12 lg:left-24 bottom-6 sm:bottom-8 z-20 max-w-sm sm:max-w-md">
        <div className="flex flex-col">
          <span className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#102c57] font-gujarati tracking-wide leading-tight drop-shadow-sm">
            આપણી જમીન
          </span>
          <span className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#102c57] font-gujarati tracking-wide leading-tight mt-0.5 drop-shadow-sm">
            આપણી જવાબદારી
          </span>

          {/* Dynamic Indian Tricolor Swoosh flourish underneath */}
          <div className="mt-2 flex items-center">
            <svg
              className="w-48 sm:w-60 h-5"
              viewBox="0 0 240 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Saffron line */}
              <path
                d="M2 5 C50 1 100 11 160 5 C195 2 225 8 238 4"
                stroke="#e85d22"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* White center highlight */}
              <path
                d="M10 9 C58 5 108 15 168 9 C202 6 228 12 238 8.5"
                stroke="#FFFFFF"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              {/* Green line */}
              <path
                d="M18 13 C66 9 116 19 176 13 C210 10 231 16 238 13"
                stroke="#138808"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
