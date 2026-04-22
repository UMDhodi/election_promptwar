// lib/data.ts — Centralized data store for How India Votes

export interface ElectionStage {
  id: number;
  icon: string;
  title: string;
  role: 'eci' | 'voter' | 'candidate' | 'all';
  roleLabel: string;
  duration: string;
  description: string;
  facts: string[];
}

export interface TimelineEvent {
  date: string;
  title: string;
  desc: string;
  phase: string;
  type: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface GlossaryTerm {
  term: string;
  abbr: string;
  category: 'ECI' | 'Technology' | 'Law' | 'Process';
  definition: string;
}

export const ELECTION_STAGES: ElectionStage[] = [
  {
    id: 0,
    icon: '📋',
    title: 'Electoral Roll Preparation',
    role: 'eci',
    roleLabel: 'ECI',
    duration: 'Ongoing / Year-round',
    description:
      'The foundation of every election is an accurate electoral roll a list of every citizen eligible to vote. The Election Commission of India (ECI), through Booth Level Officers (BLOs), conducts annual revision exercises to add new voters (18+), delete deceased/relocated voters, and correct entries. This is carried out under the Representation of the People Act, 1950. Each Assembly Constituency (AC) has its own roll, and the aggregate forms the parliamentary roll. Digital updates are possible via the Voter Service Portal. The "Special Summary Revision" (October–January) is the key annual exercise.',
    facts: [
      '🗂️ Over 96.8 crore (968 million) voters registered for 2024 elections',
      '👮 ~1.3 million Booth Level Officers manage grassroots registration',
      '🏛️ Any citizen who turns 18 before January 1 of the qualifying year can register',
      '📱 Voter ID (EPIC) or 12 alternate documents accepted on poll day',
    ],
  },
  {
    id: 1,
    icon: '📣',
    title: 'Election Schedule Announcement',
    role: 'eci',
    roleLabel: 'ECI',
    duration: '~4-6 weeks before Phase 1',
    description:
      'The ECI announces the election schedule by issuing a formal press notification specifying the number of phases, dates of polling for each phase, schedule for nominations, scrutiny, withdrawals, and counting. The announcement triggers the Model Code of Conduct (MCC) immediately. The schedule is determined by consulting the Home Ministry (for security force deployment), state governments, weather, festivals, harvest seasons, and board exam calendars. Multi-phase elections allow security forces to redeploy across the country.',
    facts: [
      '📅 2024 election announced March 16, spanning 7 phases from April 19 to June 1',
      '⚡ Model Code of Conduct kicks in the moment the schedule is announced',
      '🔒 ECI is constitutionally independent no government can influence the schedule',
      '🌦️ Phases designed around weather, festivals, and board exam calendars',
    ],
  },
  {
    id: 2,
    icon: '🖊️',
    title: 'Filing of Nominations',
    role: 'candidate',
    roleLabel: 'Candidate',
    duration: '7-14 days after notification',
    description:
      'Any citizen who meets the eligibility criteria can file nomination papers before the Returning Officer (RO). For Lok Sabha: minimum age 25, must be a registered voter in India, not a government servant, not convicted under specific offenses. Candidates must submit Form 2B (nomination), Form 26 (asset affidavit), and pay a security deposit ₹25,000 for general candidates, ₹12,500 for SC/ST. The affidavit must disclose criminal antecedents, educational qualifications, and detailed assets/liabilities.',
    facts: [
      '💰 Security deposit: ₹25,000 for general, ₹12,500 for SC/ST candidates',
      '⚖️ Full asset & criminal record disclosure mandatory (Form 26)',
      '🏛️ 8,360 candidates contested in 2024 Lok Sabha elections',
      '📋 Candidates can file up to 4 nomination papers for the same seat',
    ],
  },
  {
    id: 3,
    icon: '🔍',
    title: 'Scrutiny & Withdrawal',
    role: 'eci',
    roleLabel: 'ECI',
    duration: '2-3 days post nomination deadline',
    description:
      'The Returning Officer meticulously examines all nomination papers for completeness, accuracy, and eligibility. Objections can be raised by candidates or their agents. After scrutiny, candidates have a 2-day window to withdraw their candidature. Withdrawal is irrevocable once submitted. The RO then assigns ballot numbers and ensures electoral symbols are allotted national/state parties get reserved symbols, independents draw from the ECI\'s free-symbol pool.',
    facts: [
      '🔎 Returning Officers check eligibility, paperwork, criminal history disclosures',
      '⏱️ Candidates have 2 days to withdraw after scrutiny withdrawal is final',
      '🎯 NOTA (None of the Above) appears as the last option on every EVM ballot',
      '📜 Symbol allotment is done meticulously no two parties share a symbol',
    ],
  },
  {
    id: 4,
    icon: '📢',
    title: 'Election Campaign',
    role: 'candidate',
    roleLabel: 'Candidate',
    duration: 'Nomination to 48hr before poll',
    description:
      'Candidates and parties campaign for votes through rallies, door-to-door visits, digital advertising, and media appearances. All campaign expenditure is strictly monitored. Lok Sabha candidates cannot spend more than ₹95 lakh in most states. The ECI deploys flying squads and surveillance teams to catch expenditure violations. Paid news detection is a key MCC enforcement area. Campaigning freezes 48 hours before voting day (Silence Period).',
    facts: [
      '💵 Lok Sabha spending limit: ₹95 lakh per candidate in most states',
      '🚁 ECI deploys expenditure observers and flying squads in every constituency',
      '🚫 Campaigning freezes 48 hours before polling day (Silence Period)',
      '📺 Political ads on TV must be pre-certified by the Media Certification Committee',
    ],
  },
  {
    id: 5,
    icon: '⚖️',
    title: 'Model Code of Conduct',
    role: 'all',
    roleLabel: 'All Parties',
    duration: 'From announcement to result',
    description:
      'The Model Code of Conduct (MCC) is a set of guidelines issued by the ECI based on consensus among political parties since 1971. It governs the conduct of parties, candidates, and the ruling government from the moment of election announcement until results. Key provisions: No new government schemes; no use of government machinery for political work; no hate speech, communal appeals, or vote-buying; polling booths within 100m are a silence zone.',
    facts: [
      '📜 MCC has no statutory backing but is enforced through moral authority + FIRs',
      '🏛️ Ruling government cannot announce new schemes during MCC period',
      '👥 Evolved from a 6-point code in 1960 to a comprehensive 7-chapter document',
      '🚨 Serious violations can lead to ECI recommending deregistration of a party',
    ],
  },
  {
    id: 6,
    icon: '🗳️',
    title: 'Polling Day',
    role: 'voter',
    roleLabel: 'Voter',
    duration: '7am - 6pm (or extended)',
    description:
      'On polling day, eligible voters go to their assigned polling booth to cast votes using the Electronic Voting Machine (EVM). Each booth is managed by a Presiding Officer and polling officers. The process: voter arrives → identity check against roll → left index finger marked with indelible ink → ballot slip issued → voter enters compartment → presses button on Ballot Unit → VVPAT prints a slip (visible 7 seconds) → slip drops into locked VVPAT box. Central Armed Police Forces (CAPF) are deployed for security.',
    facts: [
      '🌑 Indelible ink (Silver nitrate-based) lasts 2-3 weeks prevents double voting',
      '♿ 85+ and PwD voters can get home voting facility (postal ballot)',
      '📍 No voter should travel more than 2km to reach their polling booth',
      '🔢 Average EVM handles 400–1,200 voters per day',
    ],
  },
  {
    id: 7,
    icon: '📊',
    title: 'Vote Counting',
    role: 'eci',
    roleLabel: 'ECI',
    duration: 'Result day morning',
    description:
      'Counting begins at 8am on the declared result day at designated Counting Centres. All EVMs are transported under strict security from polling booths. Candidates and their counting agents are present. Postal ballots are counted first. Then EVM counting begins round by round. Each round covers all booths in a segment. The Returning Officer declares the result after all rounds. India uses First Past the Post (FPTP) system.',
    facts: [
      '🏛️ India uses FPTP highest votes wins, regardless of majority',
      '📮 Postal ballots counted first can swing close results significantly',
      '🔒 EVMs stored in double-locked strongrooms with 24/7 CCTV & CAPF guard',
      '🎯 Counting agents can raise disputes if EVM count differs from form 17C',
    ],
  },
  {
    id: 8,
    icon: '📢',
    title: 'Results Declaration',
    role: 'eci',
    roleLabel: 'ECI',
    duration: 'Hours after counting begins',
    description:
      'As rounds are counted, the RO publishes lead tables. Once all rounds are tallied, the Returning Officer announces the winner by declaring the result sheet (Form 20). The winner is issued a Certificate of Election (Form 22). If the margin is very thin, candidates can request a recount. After all 543 constituencies declare, the ECI compiles national results. The MCC ceases after results.',
    facts: [
      '📋 Winner receives Form 22 Certificate of Election from Returning Officer',
      '💸 Security deposit forfeited if candidate polls < 1/6th of valid votes',
      '🔄 Recount can be requested RO must verify the demand is genuine',
      '📡 results.eci.gov.in shows live constituency counts on result day',
    ],
  },
  {
    id: 9,
    icon: '🏛️',
    title: 'Government Formation',
    role: 'all',
    roleLabel: 'Constitutional',
    duration: 'Within 2-4 weeks of results',
    description:
      'After results, the single largest party or pre-election alliance with majority (272+ seats) forms the government. The President invites the leader to prove majority on the floor of the House. If no party has majority, negotiations begin for coalition support. The new MPs take oath in Parliament. The new Lok Sabha is constituted. The 18th Lok Sabha was constituted on June 24, 2024.',
    facts: [
      '🔢 272 seats needed in a 543-seat Lok Sabha for simple majority',
      '🤝 NDA won 293 seats in 2024; BJP alone won 240 (short of solo majority)',
      '🏛️ President has constitutional role in government formation if result is hung',
      '📅 18th Lok Sabha constituted and met for first time on June 24, 2024',
    ],
  },
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    date: 'March 16, 2024',
    title: 'Election Schedule Announced',
    desc: 'ECI Chief Rajiv Kumar announces 7-phase Lok Sabha election schedule. Model Code of Conduct comes into effect immediately.',
    phase: 'announcement',
    type: 'announcement',
  },
  {
    date: 'April 19, 2024',
    title: 'Phase 1 Polling',
    desc: '102 constituencies across 21 states/UTs vote. Includes Arunachal Pradesh, Sikkim, Tamil Nadu, Rajasthan, Uttarakhand. ~66.14% turnout.',
    phase: '1',
    type: '1',
  },
  {
    date: 'April 26, 2024',
    title: 'Phase 2 Polling',
    desc: '88 constituencies in 13 states vote. Kerala, Karnataka, Maharashtra, UP, MP included. ~66.71% turnout.',
    phase: '2',
    type: '2',
  },
  {
    date: 'May 7, 2024',
    title: 'Phase 3 Polling',
    desc: '94 constituencies in 12 states vote. Goa, Gujarat, Karnataka, MP, Chhattisgarh, West Bengal participate. ~65.68% turnout.',
    phase: '3',
    type: '3',
  },
  {
    date: 'May 13, 2024',
    title: 'Phase 4 Polling',
    desc: '96 constituencies vote. Andhra Pradesh, J&K, Jharkhand, MP, Maharashtra, UP included. ~69.16% AP-led surge.',
    phase: '4',
    type: '4',
  },
  {
    date: 'May 20, 2024',
    title: 'Phase 5 Polling',
    desc: '49 constituencies including Maharashtra, Rajasthan, J&K, UP, West Bengal. ~62.2% turnout.',
    phase: '5',
    type: '5',
  },
  {
    date: 'May 25, 2024',
    title: 'Phase 6 Polling',
    desc: '58 constituencies in 7 states. Bihar, Haryana, J&K, Delhi, UP, West Bengal, Odisha. ~63.37% average.',
    phase: '6',
    type: '6',
  },
  {
    date: 'June 1, 2024',
    title: 'Phase 7 Polling Final Day',
    desc: 'Last 57 constituencies vote. Bihar, Himachal Pradesh, J&K, Odisha, Punjab, UP, West Bengal. Election concludes.',
    phase: '7',
    type: '7',
  },
  {
    date: 'June 4, 2024',
    title: 'Counting Day & Results',
    desc: 'All 543 constituencies count simultaneously. NDA wins 293 seats (BJP 240). INDIA alliance gets 234. BJP short of solo majority.',
    phase: 'results',
    type: 'results',
  },
  {
    date: 'June 7, 2024',
    title: 'Narendra Modi Sworn In for 3rd Term',
    desc: 'PM Modi sworn in at Rashtrapati Bhavan with NDA coalition cabinet. Marks formation of NDA-III government.',
    phase: 'results',
    type: 'results',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the minimum age to vote in Indian elections?',
    options: ['16 years', '18 years', '21 years', '25 years'],
    correct: 1,
    explanation:
      'The minimum voting age in India is 18 years, as per the 61st Constitutional Amendment Act of 1988, which lowered it from 21 to 18 years to enfranchise youth.',
  },
  {
    id: 2,
    question: 'How many seats does a party need to win an outright majority in the 543-seat Lok Sabha?',
    options: ['250 seats', '271 seats', '272 seats', '300 seats'],
    correct: 2,
    explanation:
      '272 seats constitute a simple majority in a 543-seat Lok Sabha (50% + 1 of total seats). This is the "magic number" for forming a government without coalition dependence.',
  },
  {
    id: 3,
    question: 'What does VVPAT stand for in the context of Indian elections?',
    options: [
      'Voter Verifiable Paper Audit Trail',
      'Vote Verification Paper Authentic Track',
      'Voter Validated Poll Authentication Terminal',
      'Verified Vote Print Audit Technology',
    ],
    correct: 0,
    explanation:
      'VVPAT (Voter Verifiable Paper Audit Trail) is a printer attached to the EVM that prints a paper slip showing the candidate voted for, visible to the voter for 7 seconds before dropping into a sealed box.',
  },
  {
    id: 4,
    question: "What happens to a candidate's security deposit if they poll less than 1/6th of total valid votes?",
    options: [
      'It is refunded with 10% penalty',
      'It is forfeited to the Consolidated Fund of India',
      'It is donated to the Election Commission',
      'It goes to the winning candidate',
    ],
    correct: 1,
    explanation:
      "Under Section 158 of the Representation of the People Act, 1951, a candidate's security deposit (₹25,000 for general, ₹12,500 for SC/ST) is forfeited to the Consolidated Fund of India if they poll less than 1/6th of total valid votes.",
  },
  {
    id: 5,
    question: 'When does the Model Code of Conduct (MCC) come into effect?',
    options: [
      'When nominations close',
      'The day of polling',
      'The moment the election schedule is announced',
      '48 hours before polling',
    ],
    correct: 2,
    explanation:
      'The MCC comes into effect immediately upon announcement of the election schedule. It governs the conduct of political parties, candidates, and government until the results are declared.',
  },
  {
    id: 6,
    question: 'India uses which voting system for Lok Sabha elections?',
    options: [
      'Proportional Representation',
      'First Past the Post (FPTP)',
      'Single Transferable Vote',
      'Two-Round System',
    ],
    correct: 1,
    explanation:
      'India uses the First Past the Post (FPTP) system the candidate with the most votes in a constituency wins, regardless of whether they have an absolute majority.',
  },
  {
    id: 7,
    question: 'Which constitutional body is responsible for conducting elections to Parliament and State Legislatures?',
    options: [
      'Union Public Service Commission',
      'Supreme Court of India',
      'Election Commission of India',
      'Ministry of Law and Justice',
    ],
    correct: 2,
    explanation:
      'The Election Commission of India (ECI), established under Article 324 of the Constitution, is the independent constitutional body responsible for superintendence, direction, and control of elections.',
  },
  {
    id: 8,
    question: 'How many phases were there in the 2024 Indian General Election (18th Lok Sabha)?',
    options: ['5 phases', '6 phases', '7 phases', '9 phases'],
    correct: 2,
    explanation:
      'The 2024 General Election was conducted in 7 phases from April 19 to June 1, 2024. Results were declared on June 4, 2024. Multi-phase approach ensures adequate security force deployment across all states.',
  },
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Election Commission of India',
    abbr: 'ECI',
    category: 'ECI',
    definition:
      'An independent constitutional body established under Article 324, responsible for superintendence, direction, and control of all elections to Parliament, State Legislatures, and offices of President and Vice-President.',
  },
  {
    term: 'Electronic Voting Machine',
    abbr: 'EVM',
    category: 'Technology',
    definition:
      'A standalone electronic device used to record votes in Indian elections since 1999 (nationwide). Consists of a Control Unit and Ballot Unit, operates on a 7.5V battery, and can store up to 2,000 votes per Control Unit.',
  },
  {
    term: 'Voter Verifiable Paper Audit Trail',
    abbr: 'VVPAT',
    category: 'Technology',
    definition:
      'An independent printer attached to the EVM Ballot Unit that prints a paper slip showing candidate details (name, symbol, serial number). Visible to the voter for 7 seconds through a transparent window before dropping into a sealed box.',
  },
  {
    term: 'Model Code of Conduct',
    abbr: 'MCC',
    category: 'Law',
    definition:
      'A set of guidelines evolved through consensus among political parties since 1971, enforced by the ECI from election announcement to result declaration. Governs conduct of parties, candidates, and ruling government. Has no statutory backing but enforced through FIRs.',
  },
  {
    term: 'Representation of the People Act',
    abbr: 'RPA 1951',
    category: 'Law',
    definition:
      'The principal legislation governing the conduct of elections in India. Defines qualifications/disqualifications for election, offences related to elections, corrupt practices, election petitions, and the mechanism for challenging election results.',
  },
  {
    term: 'Returning Officer',
    abbr: 'RO',
    category: 'Process',
    definition:
      'A senior government official (typically District Collector or equivalent) designated by the ECI for each constituency to supervise the entire election process from accepting nominations to declaring results.',
  },
  {
    term: 'None of the Above',
    abbr: 'NOTA',
    category: 'Process',
    definition:
      'Introduced in 2013 after a Supreme Court order in PUCL v. Union of India. Appears as the last option on every EVM ballot. NOTA votes are counted but do not affect the winner the candidate with the most positive votes still wins.',
  },
  {
    term: 'Electoral Photo Identity Card',
    abbr: 'EPIC',
    category: 'ECI',
    definition:
      'The government-issued voter ID card containing name, photo, address, and unique EPIC number. Primary identity proof for voting, though ECI accepts 12 alternate photo identity documents (passport, Aadhaar, driving licence, etc.).',
  },
  {
    term: 'First Past the Post',
    abbr: 'FPTP',
    category: 'Law',
    definition:
      "India's electoral system for Lok Sabha and State Assembly elections. The candidate polling the most votes in a constituency wins, regardless of whether they secured more than 50% of votes. Also called plurality voting.",
  },
  {
    term: 'Booth Level Officer',
    abbr: 'BLO',
    category: 'ECI',
    definition:
      'A grassroots government official responsible for maintaining the electoral roll for a specific polling booth area. Conducts house-to-house verification, adds new voters, removes deceased/relocated voters, and updates information during revision exercises.',
  },
  {
    term: 'Postal Ballot',
    abbr: 'PB',
    category: 'Process',
    definition:
      'A voting mechanism allowing certain categories of voters service voters (armed forces, central services), senior citizens (85+), differently-abled persons, and essential service workers on duty — to vote by post without visiting a polling booth.',
  },
  {
    term: 'Indelible Ink',
    abbr: 'Ink',
    category: 'Technology',
    definition:
      'Silver nitrate-based ink applied to the left index finger of voters to prevent impersonation and double voting. It turns black on exposure to light and lasts 2–3 weeks. Manufactured by Mysore Paints & Varnish Ltd. Used since 1962.',
  },
  {
    term: 'Election Petition',
    abbr: 'EP',
    category: 'Law',
    definition:
      'A legal challenge to an election result filed in the High Court by a defeated candidate or elector within 45 days of the declaration of results. Grounds include corrupt practices, bribery, undue influence, or disqualification of the winning candidate.',
  },
  {
    term: 'Presiding Officer',
    abbr: 'PO',
    category: 'Process',
    definition:
      'The senior poll official in charge of a polling booth on election day. Responsible for conducting the poll, maintaining order, operating the Control Unit, issuing ballot slips, and preparing the paperwork.',
  },
];
