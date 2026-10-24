import { Complaint, DepartmentService, TalukaName } from '../types';

export const TALUKAS: { name: TalukaName; nameGu: string; villages: string[] }[] = [
  {
    name: 'Tharad',
    nameGu: 'થરાદ',
    villages: ['Tharad Kasba', 'Ganj Bazaar', 'Piluda', 'Lodrani', 'Del', 'Khanpur', 'Morad', 'Vara', 'Khengarpura', 'Doodhava']
  },
  {
    name: 'Vav',
    nameGu: 'વાવ',
    villages: ['Vav Kasba', 'Dhima', 'Morikha', 'Tithgam', 'Bhatvar', 'Dethali', 'Rakhad', 'Vavdi', 'Kundaliya', 'Kumbharkha']
  },
  {
    name: 'Suigam',
    nameGu: 'સુઈગામ',
    villages: ['Suigam Kasba', 'Radhaness', 'Benap', 'Asara', 'Lakhani Nes', 'Kanpur', 'Koreti', 'Uchpa']
  },
  {
    name: 'Bhabhar',
    nameGu: 'ભાભર',
    villages: ['Bhabhar Kasba', 'Sanva', 'Chhatrala', 'Mitha', 'Barka', 'Vavdi-Bhabhar', 'Kaprupur']
  }
];

export const DEPARTMENT_SERVICES: DepartmentService[] = [
  {
    id: 'drinking-water',
    name: 'Drinking Water',
    nameGu: 'પીવાનું પાણી',
    category: 'Water Supply & Sanitation',
    helpline: '1916 (GWSSB Toll Free)',
    headOfficer: 'Er. Rajesh K. Patel, Executive Engineer (Water Supply)',
    avgResolutionDays: 2,
    description: 'Narmada canal pipeline maintenance, village sump water supply, motor breakdown repair, and RO water purification plant grievances.',
    descriptionGu: 'નર્મદા કેનાલ પાઈપલાઈન મરામત, ગામ સંપ પાણી પુરવઠો, મોટર બ્રેકડાઉન અને આર.ઓ. પ્લાન્ટની ફરિયાદો.',
    commonIssues: [
      'Low water pressure in residential ward',
      'Underground pipeline burst / leakages',
      'Chlorination & drinking water contamination',
      'Borewell motor failure in Gram Panchayat',
      'Water tanker distribution irregularities'
    ]
  },
  {
    id: 'health',
    name: 'Health',
    nameGu: 'આરોગ્ય',
    category: 'Public Health & Medical Services',
    helpline: '108 (Emergency) / 104 (Health Help)',
    headOfficer: 'Dr. Nitin M. Shah, Chief District Medical Officer',
    avgResolutionDays: 1,
    description: 'Community Health Centers (CHC), Primary Health Centers (PHC), doctor availability, medicine inventory, maternal healthcare, and emergency ambulance services.',
    descriptionGu: 'સામુદાયિક આરોગ્ય કેન્દ્ર (CHC), પ્રાથમિક આરોગ્ય કેન્દ્ર (PHC), ડોક્ટરની ઉપલબ્ધતા અને દવાઓની સેવાઓ.',
    commonIssues: [
      'Doctor / Medical Officer unannounced absence',
      'Essential medicine stockout at PHC',
      '108 Ambulance response delay in rural border belts',
      'Vaccination schedule gaps for newborns',
      'Sanitation issues inside clinic premises'
    ]
  },
  {
    id: 'agriculture',
    name: 'Agriculture',
    nameGu: 'ખેતીવાડી',
    category: 'Farmers Welfare & Co-operatives',
    helpline: '1800-180-1551 (Kisan Call Center)',
    headOfficer: 'Shri Arvindbhai Chaudhari, District Agriculture Officer',
    avgResolutionDays: 4,
    description: 'PM-KISAN subsidies, crop damage survey (Kharif/Rabi), seed and fertilizer distribution, drip irrigation assistance, and APMC market yards.',
    descriptionGu: 'પીએમ-કિસાન સહાય, પાક નુકસાન સર્વે, ખાતર અને બિયારણ વિતરણ, ટપક સિંચાઈ સહાય.',
    commonIssues: [
      'Urea / DAP fertilizer shortage or black marketing',
      'Delay in PM-KISAN installment disbursement',
      'Canal minor breach water flooding fields',
      'Soil testing report pending at Taluka lab',
      'Crop insurance (PMFBY) claim processing delay'
    ]
  },
  {
    id: 'animal-husbandry',
    name: 'Animal Husbandry',
    nameGu: 'પશુપાલન',
    category: 'Veterinary Services & Dairy Development',
    helpline: '1962 (Karuna Animal Ambulance)',
    headOfficer: 'Dr. V. B. Rabari, Deputy Director of Animal Husbandry',
    avgResolutionDays: 2,
    description: 'Veterinary dispensaries, mobile animal clinic vans, cattle disease vaccination (Lumpy/Foot & Mouth), artificial insemination, and fodder depots.',
    descriptionGu: 'પશુ દવાખાના, ફરતા પશુ ચિકિત્સા વાન, પશુ રસીકરણ અને ઘાસચારા વિતરણ સહાય.',
    commonIssues: [
      'Mobile veterinary van not visiting scheduled village',
      'Foot-and-Mouth / Lumpy disease outbreak reporting',
      'Shortage of anti-venom & emergency cattle medicine',
      'Subsidized fodder distribution grievance',
      'Veterinary doctor unavailable during emergency'
    ]
  },
  {
    id: 'complaint-officials',
    name: 'Complaint Against Officials',
    nameGu: 'અધિકારીઓ સામે ફરિયાદ',
    category: 'Administrative Vigilance & Anti-Corruption',
    helpline: '1064 (Anti-Corruption Bureau)',
    headOfficer: 'Collector & District Magistrate, Vav-Tharad Inspection Cell',
    avgResolutionDays: 7,
    description: 'Confidential reporting of bribery, dereliction of official duty, harassment, undue delays, or misconduct by government personnel.',
    descriptionGu: 'લાંચ-રૂશ્વત, ફરજમાં બેદરકારી, અયોગ્ય વિલંબ કે સરકારી કર્મચારીઓ સામે ગુપ્ત ફરિયાદ.',
    commonIssues: [
      'Demand for unauthorized fees / bribery for public work',
      'Willful delay in issuing caste / income certificate',
      'Rude behavior or refusal to accept citizen application',
      'Conflict of interest in government procurement',
      'Non-compliance with Right to Information (RTI)'
    ]
  },
  {
    id: 'panchayat',
    name: 'District/Taluka/Gram Panchayat',
    nameGu: 'જિલ્લા/તાલુકા/ગ્રામ પંચાયત',
    category: 'Panchayat Raj & Rural Administration',
    helpline: '02742-252230 (District Panchayat Office)',
    headOfficer: 'Taluka Development Officer (TDO), Vav & Tharad',
    avgResolutionDays: 5,
    description: 'Gram Panchayat governance, Talati-cum-Mantri services, property tax records, birth/death registration, village resolutions, and community land issues.',
    descriptionGu: 'ગ્રામ પંચાયત વહીવટ, તલાટી-કમ-મંત્રી સેવાઓ, જન્મ-મરણ નોંધણી અને ગ્રામસભા ઠરાવો.',
    commonIssues: [
      'Talati not present on designated village office days',
      'Encroachment on Gauchar (grazing) land or village commons',
      'Dispute over Gram Panchayat property assessment',
      'Delay in issuance of Pedhinama (family tree certificate)',
      'Gram Sabha meeting notification not announced publicly'
    ]
  },
  {
    id: 'development-works',
    name: 'Development Works',
    nameGu: 'વિકાસ કાર્યો',
    category: 'Infrastructure & Public Works (R&B)',
    helpline: '1800-233-5500 (R&B Department)',
    headOfficer: 'Executive Engineer, Roads & Buildings Division',
    avgResolutionDays: 6,
    description: 'Village approach road paving, culvert construction, community hall repairs, flood protection walls, and street lighting installations.',
    descriptionGu: 'ગામના એપ્રોચ રોડ, પુલિયા નિર્માણ, સામુદાયિક ભવન સમારકામ અને સ્ટ્રીટ લાઈટ કામગીરી.',
    commonIssues: [
      'Damaged / potholed road between village and state highway',
      'Streetlight fixtures non-functional for over 2 weeks',
      'Substandard material used in new RCC paver road',
      'Incomplete drainage culvert causing waterlogging',
      'Pending construction of cremation ground / community shed'
    ]
  },
  {
    id: 'cleanliness',
    name: 'Cleanliness',
    nameGu: 'સ્વચ્છતા',
    category: 'Swachh Bharat Mission (Grameen)',
    helpline: '1969 (Swachhata Helpline)',
    headOfficer: 'District Coordinator, Swachh Bharat Mission',
    avgResolutionDays: 2,
    description: 'Solid waste collection, village door-to-door tractor service, open drain desilting, community toilet maintenance, and waste segregation centers.',
    descriptionGu: 'ઘન કચરા નિકાલ, ડોર-ટુ-ડોર કચરા વાન, ગંદી ગટર સફાઈ અને સામૂહિક શૌચાલય જાળવણી.',
    commonIssues: [
      'Overflowing open drains in residential streets',
      'Garbage piling up near public school or temple gate',
      'Door-to-door sanitation tractor irregular attendance',
      'Public toilet block locked or without running water',
      'Dead animal carcass removal delay'
    ]
  },
  {
    id: 'education',
    name: 'Education',
    nameGu: 'શિક્ષણ',
    category: 'Primary & Secondary Education',
    helpline: '1800-233-7965 (Education Helpdesk)',
    headOfficer: 'Taluka Primary Education Officer (TPEO)',
    avgResolutionDays: 3,
    description: 'Government primary schools, teacher attendance, Mid-Day Meal (PM-POSHAN) quality, classroom infrastructure, textbooks, and girl child scholarships.',
    descriptionGu: 'સરકારી પ્રાથમિક શાળાઓ, શિક્ષકોની હાજરી, મધ્યાહન ભોજન ગુણવત્તા અને શાળા સુવિધાઓ.',
    commonIssues: [
      'Teacher shortage in border village school',
      'Poor hygiene or quality issues in Mid-Day Meal',
      'Damaged school boundary wall or classroom roof leak',
      'Unavailability of drinking water facility in school',
      'Delay in textbook or uniform distribution'
    ]
  },
  {
    id: 'anganwadi',
    name: 'Anganwadi',
    nameGu: 'આંગણવાડી',
    category: 'Women & Child Development (ICDS)',
    helpline: '181 (Abhayam Women Helpline)',
    headOfficer: 'Child Development Project Officer (CDPO), Vav-Tharad',
    avgResolutionDays: 2,
    description: 'Nutritious ration (Take Home Ration - Balbhog/Matrumangalam) distribution, pre-school learning for children under 6, pregnant mother tracking, and adolescent kits.',
    descriptionGu: 'પોષણયુક્ત આહાર વિતરણ (બાલભોગ/માતૃવંદના), પૂર્વ-પ્રાથમિક શિક્ષણ અને સગર્ભા માતાઓની સંભાળ.',
    commonIssues: [
      'Irregular distribution of Balbhog nutritional packets',
      'Anganwadi worker / helper irregular center opening hours',
      'Substandard or delayed supply of pre-school kits',
      'Non-working weighing scale for infant growth monitoring',
      'Water or sanitation deficiency at Anganwadi center'
    ]
  }
];

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'VT-2026-4401',
    departmentId: 'drinking-water',
    departmentName: 'Drinking Water',
    subject: 'Major leakage in primary Narmada branch pipeline near Dhima temple road',
    description: 'The underground Narmada drinking water supply line has ruptured near Dhima temple turn. Potable water is flooding the street for the past 36 hours while ward no. 3 and 4 have zero supply.',
    taluka: 'Vav',
    village: 'Dhima',
    citizenName: 'Bhikhabhai B. Patel',
    citizenMobile: '+91 98254 39102',
    createdAt: '14 Oct 2026, 09:30 AM',
    status: 'In Progress',
    priority: 'Urgent',
    assignedOfficer: {
      name: 'Er. Suresh R. Prajapati',
      designation: 'Assistant Engineer, GWSSB Vav Sub-Division',
      phone: '+91 94270 12845',
      office: 'GWSSB Sub-Division Office, Court Road, Vav'
    },
    timeline: [
      {
        status: 'Submitted',
        date: '14 Oct 2026, 09:30 AM',
        title: 'Grievance Registered',
        titleGu: 'ફરિયાદ સફળતાપૂર્વક નોંધાઈ',
        description: 'Citizen registered grievance online with photo proof of pipeline burst.',
        descriptionGu: 'નાગરિકે પાઈપલાઈન લીકેજના ફોટો પુરાવા સાથે ઓનલાઈન ફરિયાદ દાખલ કરી.',
        completed: true
      },
      {
        status: 'Officer Assigned',
        date: '14 Oct 2026, 11:15 AM',
        title: 'Assigned to Assistant Engineer',
        titleGu: 'મદદનીશ ઈજનેરને સોંપાઈ',
        description: 'Auto-routed to GWSSB Vav Maintenance team. Lead engineer assigned.',
        descriptionGu: 'GWSSB વાવ મેન્ટેનન્સ ટીમને સોંપાઈ. મુખ્ય ઈજનેર નિયુક્ત.',
        officer: 'Er. Suresh R. Prajapati',
        completed: true
      },
      {
        status: 'Site Inspection',
        date: '15 Oct 2026, 10:00 AM',
        title: 'Site Verified & Excavation Approved',
        titleGu: 'સ્થળ તપાસણી અને ખોદકામ મંજૂર',
        description: 'Field inspection completed. 200mm PVC joint fracture identified. Excavation JCB dispatched.',
        descriptionGu: 'સ્થળ નિરીક્ષણ પૂર્ણ. ૨૦૦mm પીવીસી જોઈન્ટ ક્ષતિગ્રસ્ત જણાયેલ. મશીનરી રવાના.',
        completed: true
      },
      {
        status: 'In Progress',
        date: '15 Oct 2026, 02:45 PM',
        title: 'Pipe Replacement Underway',
        titleGu: 'પાઈપ બદલવાની કામગીરી ચાલુ',
        description: 'Replacement heavy-duty pipe section brought from Palanpur depot. Welding in progress.',
        descriptionGu: 'પાલનપુર ડેપોમાંથી નવી પાઇપ લાવવામાં આવી. જોઈન્ટ ફિટિંગ ચાલુ છે.',
        completed: false,
        current: true
      },
      {
        status: 'Resolved',
        date: 'Expected 16 Oct 2026',
        title: 'Pressure Testing & Supply Restoration',
        titleGu: 'દબાણ પરીક્ષણ અને પાણી પુરવઠો પુનઃશરૂ',
        description: 'Full water supply resumption after pressure testing and bacteriological clearance.',
        descriptionGu: 'દબાણ પરીક્ષણ પૂર્ણ થયા બાદ વોર્ડ ૩ અને ૪ માં પાણી પુરવઠો પૂર્વવત થશે.',
        completed: false
      }
    ]
  },
  {
    id: 'VT-2026-3829',
    departmentId: 'development-works',
    departmentName: 'Development Works',
    subject: 'Malfunctioning LED streetlights and dangerous wiring in Tharad Ganj Bazaar',
    description: '14 street poles along the main agricultural market entry gate had burned out ballasts, creating dark zones for vegetable traders arriving at 4 AM.',
    taluka: 'Tharad',
    village: 'Ganj Bazaar',
    citizenName: 'Maheshkumar K. Soni',
    citizenMobile: '+91 97120 48201',
    createdAt: '10 Oct 2026, 04:15 PM',
    status: 'Resolved',
    priority: 'Normal',
    assignedOfficer: {
      name: 'Shri Dilipbhai Makwana',
      designation: 'Nagar Palika Electrical Supervisor, Tharad',
      phone: '+91 98980 54321',
      office: 'Tharad Nagarpalika Bhavan, Station Road'
    },
    timeline: [
      {
        status: 'Submitted',
        date: '10 Oct 2026, 04:15 PM',
        title: 'Grievance Registered',
        titleGu: 'ફરિયાદ નોંધાઈ',
        description: 'Citizen registered lighting outage report for Ganj Bazaar.',
        descriptionGu: 'ગંજ બજારના લાઈટિંગ ફોલ્ટ માટે ફરિયાદ દાખલ.',
        completed: true
      },
      {
        status: 'Officer Assigned',
        date: '11 Oct 2026, 09:30 AM',
        title: 'Assigned to Electrical Wing',
        titleGu: 'વીજ શાખાને કામગીરી સોંપાઈ',
        description: 'Work order #EL-882 issued to Nagar Palika electrical crew.',
        descriptionGu: 'નગરપાલિકા ઈલેક્ટ્રીકલ ટીમને વર્ક ઓર્ડર આપવામાં આવ્યો.',
        completed: true
      },
      {
        status: 'Site Inspection',
        date: '11 Oct 2026, 03:00 PM',
        title: 'Pole Inspection Completed',
        titleGu: 'પોલ તપાસણી સંપન્ન',
        description: 'Faulty circuit breaker and 14 damaged 72W LED luminaires catalogued.',
        descriptionGu: 'ખરાબ સર્કિટ બ્રેકર અને ૧૪ એલઈડી લાઈટો બદલવાની યાદી તૈયાર.',
        completed: true
      },
      {
        status: 'In Progress',
        date: '12 Oct 2026, 11:00 AM',
        title: 'Fixtures Installed',
        titleGu: 'નવી લાઈટોનું ફિટિંગ',
        description: 'All 14 luminaires replaced with energy-efficient IP66 waterproof units.',
        descriptionGu: 'વોટરપ્રૂફ નવી ૧૪ એલઈડી લાઈટો લગાવવામાં આવી.',
        completed: true
      },
      {
        status: 'Resolved',
        date: '12 Oct 2026, 07:30 PM',
        title: 'Grievance Successfully Resolved',
        titleGu: 'ફરિયાદનું સંપૂર્ણ નિરાકરણ',
        description: 'Night inspection completed. Market road illuminated. Complainant confirmed resolution.',
        descriptionGu: 'રાત્રિના સમયે નિરીક્ષણ કરી પ્રકાશ વ્યવસ્થા ચકાસવામાં આવી. નાગરિક દ્વારા પુષ્ટિ.',
        completed: true
      }
    ],
    resolutionRemarks: 'All 14 LED fixtures replaced under annual municipal maintenance warranty. Citizen verified on mobile.'
  },
  {
    id: 'VT-2026-5120',
    departmentId: 'animal-husbandry',
    departmentName: 'Animal Husbandry',
    subject: 'Emergency cattle vaccination and antibiotic stock shortage in Suigam veterinary center',
    description: 'Herd owners in Suigam border region reported fever and foot lesions in over 30 milch cows. Local dispensary had exhausted seasonal antibiotic stock.',
    taluka: 'Suigam',
    village: 'Suigam Kasba',
    citizenName: 'Govindbhai Rabari',
    citizenMobile: '+91 99041 87632',
    createdAt: '15 Oct 2026, 08:20 AM',
    status: 'Officer Assigned',
    priority: 'Urgent',
    assignedOfficer: {
      name: 'Dr. J. P. Chaudhary',
      designation: 'Taluka Veterinary Officer, Suigam',
      phone: '+91 94285 66720',
      office: 'Veterinary Hospital, Main Highway, Suigam'
    },
    timeline: [
      {
        status: 'Submitted',
        date: '15 Oct 2026, 08:20 AM',
        title: 'Emergency Medical Alert',
        titleGu: 'કટોકટી પશુ તબીબી અરજી',
        description: 'Livestock distress report submitted by Maldhari cooperative member.',
        descriptionGu: 'માલધારી મંડળી દ્વારા પશુ સ્વાસ્થ્ય અંગે તાત્કાલિક અરજી.',
        completed: true
      },
      {
        status: 'Officer Assigned',
        date: '15 Oct 2026, 09:10 AM',
        title: 'Dr. Chaudhary Mobilized',
        titleGu: 'પશુ ચિકિત્સક અધિકારી નિયુક્ત',
        description: 'Mobile Karuna ambulance van diverted to Suigam border hamlets with fresh serum consignment.',
        descriptionGu: 'કરુણા એમ્બ્યુલન્સ વાનને તાત્કાલિક દવાનો જથ્થો લઈને રવાના કરવામાં આવી.',
        completed: true,
        current: true
      },
      {
        status: 'Site Inspection',
        date: 'Scheduled 15 Oct, 04:00 PM',
        title: 'Camp Inspection & Blood Serum Sampling',
        titleGu: 'તપાસ કેમ્પ અને સેમ્પલિંગ',
        description: 'Blood samples and clinical screening of herd cattle.',
        descriptionGu: 'પશુઓનું ક્લિનિકલ સ્ક્રીનિંગ અને લોહીના સેમ્પલ લેવાશે.',
        completed: false
      },
      {
        status: 'In Progress',
        date: 'Pending',
        title: 'Vaccination Drive',
        titleGu: 'સામૂહિક રસીકરણ ઝુંબેશ',
        description: 'Mass ring vaccination of neighboring dairy herds.',
        descriptionGu: 'આસપાસના પશુપાલકોના પશુઓ માટે રિંગ વેક્સિનેશન.',
        completed: false
      },
      {
        status: 'Resolved',
        date: 'Pending',
        title: 'Redressal Closure',
        titleGu: 'નિરાકરણ',
        description: 'Closure report after clinical recovery confirmation.',
        descriptionGu: 'તમામ પશુઓ સ્વસ્થ થયાની ચકાસણી બાદ નિકાલ.',
        completed: false
      }
    ]
  }
];
