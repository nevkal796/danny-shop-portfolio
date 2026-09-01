// ─────────────────────────────────────────────────────────────
//  ALL SITE CONTENT LIVES HERE.
//  Sourced from Daniel_Karun_resume.pdf unless marked otherwise.
//  Anything marked ← NEEDS DANIEL is not in the resume and must be
//  confirmed by him before this goes live.
// ─────────────────────────────────────────────────────────────

export const identity = {
  first: 'DANIEL',
  last: 'KARUN',
  discipline: 'AEROSPACE ENGINEERING',
  // ← NEEDS DANIEL: his own one-liner. This only restates the resume.
  tagline: 'Aerospace structures and materials.',
  shopNo: 'NO. 01',
}

export const contact = {
  email: 'danielkarun@gmail.com',
  // Resume prints "linkedin.com/in/danielkarun" but the embedded hyperlink
  // points at the URL below. ← NEEDS DANIEL: which one is live?
  linkedin: 'https://www.linkedin.com/in/daniel-karun-234710276',
  // Resume lists (475)-218-7698. Deliberately not published — a personal
  // mobile on a public page invites spam. ← NEEDS DANIEL if he wants it up.
  resumeHref: '/resume.pdf',
  resumeFilename: 'Daniel-Karun-Resume.pdf',
}

// ── HOBBIES ────────────────────────────────────────────────
// Places came from your original brief, not the resume.
// ← NEEDS DANIEL: the one-line notes are written by me and describe him.
// He should replace them with his own words or cut them.
export const hobbies = [
  { place: 'THE VOLLEYBALL COURT', note: '' },
  { place: 'THE GYM', note: '' },
  { place: 'THE LIBRARY', note: '' },
  { place: "ANDY'S", note: 'Frozen custard. Non-negotiable.' },
  { place: 'CHURCH', note: '' },
  { place: 'HOME', note: '' },
]

// ── ABOUT ──────────────────────────────────────────────────
// Drafted strictly from resume facts. ← NEEDS DANIEL to approve/reword.
export const about = {
  heading: 'ABOUT THE OPERATOR',
  body: [
    'Aerospace engineering student at Texas A&M, graduating May 2028.',
    'Structures and Materials Lead on TAMU SAE Aero, running a 12-member team through the structural aircraft design cycle in SolidWorks and Ansys.',
    'Most of the work is structures: FEA, composites, topology optimisation and weight reduction, and making sure a part can actually be manufactured and assembled.',
  ],
}

// ── PROJECTS (BUILD BAY) ───────────────────────────────────
// The resume lists exactly ONE project. The three aerospace projects that
// were here before were placeholders I invented and have been removed.
export const projects = [
  {
    id: 'teeth',
    no: 'P-01',
    title: 'T.E.E.T.H',
    subtitle: 'AI-assisted dental X-ray platform',
    scale: '—',
    date: 'JULY 2026',
    rev: '1',
    tolerance: '',
    materials: [
      'React.js',
      'Next.js',
      'Node.js',
      'PyTorch',
      'OpenCV',
      'PostgreSQL',
      'AWS',
      'Docker',
    ],
    summary:
      'An AI-assisted dental X-ray platform for dentist triage and patient education.',
    contributions: [
      'Defined the MVP and roadmap for TEETH',
      'Partnered with an engineer to scope a PyTorch/OpenCV CNN pipeline and a dentist annotation feedback loop',
      'Interviewed 10+ dentists to identify triage and patient-communication bottlenecks, prioritising the highest-impact needs',
      'Prioritised imaging, annotation and communication features using review time, accuracy and patient engagement metrics',
    ],
    // ← NEEDS DANIEL: the exploded view needs component names. These are the
    // stated stack, but confirm this is how he wants the system broken down.
    parts: [],
  },
]

// ── SKILLS (TOOL WALL) ─────────────────────────────────────
// Grouped exactly as the resume groups them.
// level is intentionally null: the resume states no proficiency ratings and
// I will not invent them. ← NEEDS DANIEL if he wants the gauges filled in.
export const skillGroups = [
  {
    group: 'CORE COMPETENCIES',
    tools: [
      { name: 'Tradeoff Analysis', icon: 'chip', level: null },
      { name: 'Data Analysis', icon: 'laptop', level: null },
      { name: 'Mechanics of Materials', icon: 'clamp', level: null },
      { name: 'Statics & Structural Dynamics', icon: 'torque', level: null },
      { name: 'GD&T', icon: 'micrometer', level: null },
      { name: 'Topology Optimization', icon: 'caliper', level: null },
      { name: 'FMEA', icon: 'screwdriver', level: null },
    ],
  },
  {
    group: 'TOOLS / SOFTWARE',
    tools: [
      { name: 'Finite Element Analysis', icon: 'clamp', level: null },
      { name: 'SolidWorks', icon: 'caliper', level: null },
      { name: 'Fusion 360', icon: 'micrometer', level: null },
      { name: 'ANSYS', icon: 'chip', level: null },
      { name: 'Femap', icon: 'wrench', level: null },
      { name: 'Jupyter Notebook', icon: 'laptop', level: null },
      { name: 'Linux', icon: 'screwdriver', level: null },
    ],
  },
  {
    group: 'LANGUAGES',
    tools: [
      { name: 'Python', icon: 'laptop', level: null },
      { name: 'Java', icon: 'laptop', level: null },
      { name: 'JavaScript', icon: 'laptop', level: null },
      { name: 'C / C++', icon: 'chip', level: null },
      { name: 'Verilog', icon: 'chip', level: null },
      { name: 'Assembly', icon: 'chip', level: null },
      { name: 'MATLAB & Simulink', icon: 'laptop', level: null },
    ],
  },
]

// ── EXPERIENCE (OFFICE POSTERS) ────────────────────────────
export const experience = [
  {
    role: 'STRUCTURES AND MATERIALS LEAD',
    org: 'TAMU SAE Aero · Remote',
    period: 'FEBRUARY 2026 — PRESENT',
    bullets: [
      'Led a 12-member team through the structural aircraft design cycle using SolidWorks parametric modelling and Ansys FEA',
      'Guided a SolidWorks sprint review to resolve DFM and assembly issues, accelerating delivery by 1.57 weeks (9.09%)',
      'Validated structural and aerodynamic tradeoffs to reach a 70.6% payload weight ratio of 51 lb maximum take-off weight',
      'Developing and validating lightweight fixed aluminium landing gear optimised for high damping to resist impact loads',
    ],
  },
  {
    role: 'STRUCTURES AND MATERIALS ENGINEER',
    org: 'TAMU SAE Aero · Remote',
    period: 'MAY 2025 — PRESENT',
    bullets: [
      'Redesigned the h-stab to maintain aerodynamic control, limiting geometric twist to 1.57 degrees through FEA iteration',
      'Validated composite material combinations via FEA, refining mesh and boundary loads to achieve a 2.86 margin of safety',
      'Optimised internal structures using FEA, reducing empty weight by 13.6% to 15 lb to maximise payload',
      'Developed assembly jig structures to maintain manufacturing quality, reducing OOT errors and streamlining the build process',
    ],
  },
  {
    role: 'ROBOTICS TECHNOLOGY LEAD',
    org: 'Sunnyvale Robotics · Dallas, TX',
    period: 'JUL 2024 — SEP 2024',
    bullets: [
      'Led the end-to-end roadmap for autonomous robot design, fabrication, testing and competition execution',
      'Prioritised chassis durability and field performance through Fusion 360 analysis, earning the "Most Robust Robot" award',
      'Worked with the software team, accelerating the software delivery pipeline by 12% to ensure seamless hardware integration',
      'Defined performance goals across durability, autonomous reliability, task completion and 3-minute run consistency',
    ],
  },
]

// ── LEADERSHIP ─────────────────────────────────────────────
// New section from the resume. ← NEEDS DANIEL / YOU: not yet placed
// anywhere in the shop. See the question about where this lives.
export const leadership = [
  {
    role: 'EXECUTIVE OFFICER',
    org: 'Texas A&M University SAE Aero',
    period: 'JAN 2024 — PRESENT',
    bullets: [
      'Managed corporate relations for a 150+ member club, facilitating opportunities and connections for students',
      'Promoted aerospace engineering by designing initiatives and resources tailored to student development',
      'Created product roadmaps and plans to facilitate project workflow for students designing and testing aircraft',
    ],
  },
  {
    role: 'LEADER',
    org: 'Texas A&M University Thrive Intervarsity',
    period: 'JAN 2024 — PRESENT',
    bullets: [
      'Led planning of campus-wide events and gatherings for South Asian students, driving community engagement',
      'Conducted outreach initiatives and collaborated with other student organisations to expand presence on campus',
    ],
  },
]

// ── EDUCATION (FRAMED, OFFICE WALL) ────────────────────────
export const education = {
  degree: 'B.S. AEROSPACE ENGINEERING',
  school: 'Texas A&M University — College of Engineering',
  period: 'EXPECTED MAY 2028',
  detail: 'College Station, TX',
  // Resume states no honours. The previous "Dean's List" was invented and
  // has been removed. ← NEEDS DANIEL if he has any to list.
  honours: [],
  // Listed verbatim from the resume. Note "Nonmettalic Metals" appears to
  // be a typo in the source — see question.
  coursework: [
    'Aerospace Engineering Mechanics',
    'Linear Algebra',
    'Manufacturing / Assembly Process',
    'Nonmettalic Metals',
  ],
}

// ── SHOP ZONES (drives the floor-plan nav + interior) ──────
export const zones = [
  { id: 'projects', label: 'BUILD BAY', path: '/projects', nav: 'PROJECTS' },
  { id: 'skills', label: 'TOOL WALL', path: '/skills', nav: 'SKILLS' },
  { id: 'experience', label: 'OFFICE', path: '/experience', nav: 'EXPERIENCE' },
  { id: 'education', label: 'OFFICE', path: '/education', nav: 'EDUCATION' },
  { id: 'about', label: 'OFFICE', path: '/about', nav: 'ABOUT' },
  { id: 'contact', label: 'FRONT DESK', path: '/contact', nav: 'CONTACT' },
]
