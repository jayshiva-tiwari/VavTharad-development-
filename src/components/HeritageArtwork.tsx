export function HeritageArtwork() {
  return (
    <div className="relative w-full overflow-hidden select-none pointer-events-none mt-2 sm:mt-4 rounded-2xl min-h-[170px] sm:min-h-[200px] flex items-end">
      {/* Background warm golden ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#EFE5D3]/90 via-[#F7EFE2]/60 to-transparent" />

      {/* SVG Canvas for Stone Architecture & Temple Shikhara */}
      <svg
        className="absolute inset-0 w-full h-full object-cover object-bottom"
        viewBox="0 0 900 320"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="stoneWarm" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#CBB493" />
            <stop offset="60%" stopColor="#A88B67" />
            <stop offset="100%" stopColor="#876B49" />
          </linearGradient>
          <linearGradient id="templeShikhara" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFC3A0" />
            <stop offset="50%" stopColor="#BFA077" />
            <stop offset="100%" stopColor="#8A6C47" />
          </linearGradient>
          <linearGradient id="pillarShadow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7E603C" />
            <stop offset="50%" stopColor="#BA9F7C" />
            <stop offset="100%" stopColor="#5E4424" />
          </linearGradient>
          <radialGradient id="sunGlow" cx="68%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#FFF1D0" stopOpacity="0.8" />
            <stop offset="45%" stopColor="#F9DFB0" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#F9DFB0" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Golden Sun atmospheric bloom */}
        <circle cx="620" cy="180" r="160" fill="url(#sunGlow)" />

        {/* Distant trees and arid Kutch/Banaskantha shrub landscape */}
        <path
          d="M0 260 Q120 250 240 255 T480 252 T700 255 T900 258 L900 320 L0 320 Z"
          fill="#D6C7AA"
          opacity="0.6"
        />

        {/* Historic Vav / Stepwell Stone Pavilion (Left Architecture) */}
        <g id="vav-pavilion">
          {/* Main horizontal lintel / entablature */}
          <rect x="0" y="145" width="280" height="14" fill="#B39875" />
          <rect x="0" y="140" width="285" height="6" fill="#D3BA97" />
          <rect x="0" y="159" width="275" height="8" fill="#8C7150" />

          {/* Carved frieze details */}
          <path
            d="M5 147 h15 v4 h-15 z M30 147 h15 v4 h-15 z M55 147 h15 v4 h-15 z M80 147 h15 v4 h-15 z M105 147 h15 v4 h-15 z M130 147 h15 v4 h-15 z M155 147 h15 v4 h-15 z M180 147 h15 v4 h-15 z M205 147 h15 v4 h-15 z M230 147 h15 v4 h-15 z M255 147 h15 v4 h-15 z"
            fill="#755B3C"
            opacity="0.7"
          />

          {/* Pillar 1 */}
          <rect x="15" y="167" width="18" height="110" fill="url(#pillarShadow)" />
          {/* Pillar 1 capital & base */}
          <path d="M11 167 L37 167 L33 175 L15 175 Z" fill="#D3BA97" />
          <rect x="11" y="270" width="26" height="12" fill="#755B3C" />

          {/* Pillar 2 */}
          <rect x="65" y="167" width="18" height="110" fill="url(#pillarShadow)" />
          <path d="M61 167 L87 167 L83 175 L65 175 Z" fill="#D3BA97" />
          <rect x="61" y="270" width="26" height="12" fill="#755B3C" />

          {/* Pillar 3 */}
          <rect x="115" y="167" width="18" height="110" fill="url(#pillarShadow)" />
          <path d="M111 167 L137 167 L133 175 L115 175 Z" fill="#D3BA97" />
          <rect x="111" y="270" width="26" height="12" fill="#755B3C" />

          {/* Pillar 4 */}
          <rect x="165" y="167" width="18" height="110" fill="url(#pillarShadow)" />
          <path d="M161 167 L187 167 L183 175 L165 175 Z" fill="#D3BA97" />
          <rect x="161" y="270" width="26" height="12" fill="#755B3C" />

          {/* Pillar 5 */}
          <rect x="215" y="167" width="18" height="110" fill="url(#pillarShadow)" />
          <path d="M211 167 L237 167 L233 175 L215 175 Z" fill="#D3BA97" />
          <rect x="211" y="270" width="26" height="12" fill="#755B3C" />

          {/* Lower stone terrace steps (Vav steps) */}
          <polygon points="0,277 340,277 325,286 0,286" fill="#C4AA87" />
          <polygon points="0,286 325,286 310,296 0,296" fill="#A48967" />
          <polygon points="0,296 310,296 295,307 0,307" fill="#846949" />
          <polygon points="0,307 295,307 280,320 0,320" fill="#695134" />
        </g>

        {/* Stepped Ghat / Central Stepwell terraces leading down */}
        <g id="stepwell-ghat">
          <polygon points="280,268 450,268 440,276 290,276" fill="#BFA37E" />
          <polygon points="290,276 440,276 430,285 300,285" fill="#A88B67" />
          <polygon points="300,285 430,285 420,295 310,295" fill="#917452" />
          <polygon points="310,295 420,295 410,307 320,307" fill="#7A5E3E" />
          <polygon points="320,307 410,307 400,320 330,320" fill="#62492D" />
        </g>

        {/* Majestic Temple Shikhara & Mandir spire (Center-Right) */}
        <g id="temple-shikhara" transform="translate(60, 0)">
          {/* Kalasha and Amalaka atop the spire */}
          {/* Fluttering orange Dhwaja flag */}
          <path d="M536 78 Q550 72 562 76 L550 85 L560 92 Q545 88 536 86 Z" fill="#E65100" />
          <line x1="536" y1="72" x2="536" y2="92" stroke="#8A6C47" strokeWidth="2.5" />

          {/* Kalash urn */}
          <circle cx="536" cy="94" r="4.5" fill="#DAA520" />
          <ellipse cx="536" cy="101" rx="9" ry="4" fill="#C49A50" />

          {/* Stepped Nagara-style ribbed spire (Shikhara) */}
          <path
            d="M536 104 
               L531 118 L541 118 
               L526 136 L546 136 
               L520 156 L552 156 
               L514 178 L558 178 
               L507 202 L565 202 
               L500 230 L572 230 
               L492 260 L580 260 
               Z"
            fill="url(#templeShikhara)"
          />

          {/* Urushringa miniature spires clinging to main shikhara */}
          <path d="M504 185 L518 185 L522 225 L500 225 Z" fill="#9C7D57" />
          <path d="M554 185 L568 185 L572 225 L550 225 Z" fill="#806340" />

          {/* Decorative stone horizontal ribs (Bhumis) */}
          <line x1="530" y1="126" x2="542" y2="126" stroke="#7A5E3E" strokeWidth="1.5" />
          <line x1="524" y1="146" x2="548" y2="146" stroke="#7A5E3E" strokeWidth="1.5" />
          <line x1="517" y1="167" x2="555" y2="167" stroke="#7A5E3E" strokeWidth="1.5" />
          <line x1="510" y1="190" x2="562" y2="190" stroke="#7A5E3E" strokeWidth="1.5" />
          <line x1="504" y1="216" x2="568" y2="216" stroke="#7A5E3E" strokeWidth="2" />
          <line x1="496" y1="245" x2="576" y2="245" stroke="#7A5E3E" strokeWidth="2" />

          {/* Mandapa / temple base plinth */}
          <rect x="475" y="260" width="125" height="30" fill="#B3956F" />
          <rect x="465" y="278" width="145" height="15" fill="#8F714C" />
          <polygon points="460,293 615,293 605,320 470,320" fill="#735634" />
        </g>
      </svg>

      {/* Gujarat Cultural Slogan & Tricolor Ribbon Overlay (as seen in image.png) */}
      <div className="relative z-10 p-4 sm:p-5 pb-3 max-w-lg">
        <div className="flex flex-col">
          <span className="text-xl sm:text-2xl md:text-[28px] font-bold text-slate-800 font-gujarati tracking-wide leading-tight drop-shadow-xs">
            આપણી જમીન
          </span>
          <span className="text-xl sm:text-2xl md:text-[28px] font-bold text-slate-800 font-gujarati tracking-wide leading-tight mt-0.5 drop-shadow-xs">
            આપણી જવાબદારી
          </span>

          {/* Dynamic Tricolor Ribbon underline accent */}
          <div className="mt-2 flex items-center">
            <svg
              className="w-44 sm:w-56 h-4.5"
              viewBox="0 0 200 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Saffron stroke */}
              <path
                d="M2 5 C40 1 80 10 130 5 C160 2 185 8 198 4"
                stroke="#FF9933"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              {/* White stroke */}
              <path
                d="M8 8.5 C46 4.5 86 13.5 136 8.5 C166 5.5 188 11.5 198 8"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Green stroke */}
              <path
                d="M14 12 C52 8 92 17 142 12 C172 9 191 14 198 11.5"
                stroke="#138808"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
