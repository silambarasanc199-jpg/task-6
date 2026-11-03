export interface RubricCriterion {
  id: string;
  criterion: string;
  description: string;
  points: number;
}

export interface AssignmentItem {
  id: string;
  courseCode: string;
  courseTitle: string;
  instructor: string;
  title: string;
  taskNumber: string;
  dueDate: string;
  dueTime: string;
  urgencyLabel: string;
  points: number;
  weightPercent: number;
  status: 'action_required' | 'draft_saved' | 'submitted' | 'graded';
  statusLabel: string;
  acceptedFormats: string[];
  maxFileSizeMb: number;
  estimatedEffort: string;
  overview: string;
  instructions: string[];
  deliverables: string[];
  rubric: RubricCriterion[];
  submissionRecord?: {
    receiptId: string;
    submittedAt: string;
    fileName: string;
    fileSize: string;
    checksum: string;
    artifactUrl?: string;
    reflectionNote: string;
    honorCodeAccepted: boolean;
    gradeScore?: number;
    instructorFeedback?: string;
  };
}

export interface CourseSummary {
  code: string;
  title: string;
  instructor: string;
  schedule: string;
  room: string;
  credits: string;
  currentStanding: string;
  letterGrade: string;
  nextAssignmentId: string;
  nextDueSummary: string;
}

export const SAMPLE_STUDENT = {
  fullName: 'Maya Lin',
  studentId: 'NB-2026-0419',
  email: 'maya.lin@northbridge.edu',
  program: 'B.S. Human-Computer Interaction',
  academicYear: 'Junior (Year 3)',
  semester: 'Fall Semester 2026',
  advisor: 'Prof. Julian Vance (Sample)',
  cumulativeGpa: '3.85 / 4.00',
  creditsEnrolled: '16.0 Credits',
  dataNotice: 'Sample Student Profile — Fictional data for prototype evaluation only',
};

export const INITIAL_COURSES: CourseSummary[] = [
  {
    code: 'HCI-304',
    title: 'Interaction Design Studio II',
    instructor: 'Dr. Elena Rostova (Sample)',
    schedule: 'Tue / Thu · 10:30 AM – 12:20 PM',
    room: 'Design Hall 302',
    credits: '4.0',
    currentStanding: '94.2%',
    letterGrade: 'A',
    nextAssignmentId: 'asn-hci-04',
    nextDueSummary: 'Task 04 due Nov 05, 11:59 PM',
  },
  {
    code: 'CS-210',
    title: 'Data Structures & Algorithms',
    instructor: 'Prof. Marcus Thorne (Sample)',
    schedule: 'Mon / Wed / Fri · 09:00 AM – 09:50 AM',
    room: 'Gates Engineering 114',
    credits: '4.0',
    currentStanding: '91.0%',
    letterGrade: 'A-',
    nextAssignmentId: 'asn-cs-05',
    nextDueSummary: 'Lab 05 due Nov 08, 11:59 PM',
  },
  {
    code: 'DES-205',
    title: 'Information Architecture & Systems',
    instructor: 'Prof. Claire Sterling (Sample)',
    schedule: 'Mon / Wed · 02:00 PM – 03:50 PM',
    room: 'Media Lab 208',
    credits: '4.0',
    currentStanding: '96.5%',
    letterGrade: 'A',
    nextAssignmentId: 'asn-des-03',
    nextDueSummary: 'Audit due Nov 12, 05:00 PM',
  },
  {
    code: 'STAT-201',
    title: 'Applied Quantitative Research Methods',
    instructor: 'Dr. Arisudan Nair (Sample)',
    schedule: 'Tue / Thu · 01:30 PM – 02:50 PM',
    room: 'Science Center 401',
    credits: '4.0',
    currentStanding: '89.4%',
    letterGrade: 'B+',
    nextAssignmentId: 'asn-stat-03',
    nextDueSummary: 'Problem Set 03 Submitted',
  },
];

export const INITIAL_ASSIGNMENTS: AssignmentItem[] = [
  {
    id: 'asn-hci-04',
    courseCode: 'HCI-304',
    courseTitle: 'Interaction Design Studio II',
    instructor: 'Dr. Elena Rostova (Sample)',
    title: 'Usability Testing & Heuristic Evaluation Report',
    taskNumber: 'Task 04',
    dueDate: 'Nov 05, 2026',
    dueTime: '11:59 PM EST',
    urgencyLabel: 'Due in 2 days',
    points: 100,
    weightPercent: 20,
    status: 'action_required',
    statusLabel: 'Action Required · Due in 2 days',
    acceptedFormats: ['.pdf', '.docx', '.zip'],
    maxFileSizeMb: 25,
    estimatedEffort: '6–8 hours',
    overview:
      'Conduct a structured heuristic evaluation of a student course registration workflow using Jakob Nielsen’s 10 Usability Heuristics, followed by three moderated think-aloud sessions with peer participants. Synthesize usability violations by severity rating (0–4) and propose wireframed remediation patterns.',
    instructions: [
      'Evaluate the target registration flow independently against all 10 usability heuristics before conducting participant sessions.',
      'Document at least 8 distinct usability findings in a structured table including heuristic violated, location in flow, severity rating (0–4), and screenshot evidence.',
      'Conduct 3 formative think-aloud usability tests (15 minutes each) using a standardized task script and consent notice.',
      'Provide high-priority design recommendations for all Severity 3 and Severity 4 issues, clearly labeling any unvalidated design assumptions.',
    ],
    deliverables: [
      'Single compiled PDF report (8–12 pages, accessible tagged headings, maximum 25 MB).',
      'Appendix containing anonymized participant task completion matrix and raw observation notes.',
      'Brief self-reflection note (minimum 20 characters) in the submission portal summarizing your highest-severity finding.',
    ],
    rubric: [
      {
        id: 'rub-1',
        criterion: '01. Heuristic Violation Analysis & Severity Rigor',
        description:
          'Identifies specific, non-trivial usability issues mapped accurately to Nielsen’s heuristics with justified 0–4 severity ratings.',
        points: 30,
      },
      {
        id: 'rub-2',
        criterion: '02. Think-Aloud Protocol & Empirical Synthesis',
        description:
          'Clear task script, ethical consent documentation, and objective synthesis of participant friction points without leading questions.',
        points: 30,
      },
      {
        id: 'rub-3',
        criterion: '03. Actionable Remediation & Interface Proposals',
        description:
          'Concrete before/after layout changes that directly resolve root usability causes while respecting accessibility constraints.',
        points: 25,
      },
      {
        id: 'rub-4',
        criterion: '04. Editorial Clarity, Accessibility & Attribution',
        description:
          'Logical document hierarchy, tabular numeric alignment, explicit labeling of assumptions, and WCAG-compliant contrast in diagrams.',
        points: 15,
      },
    ],
  },
  {
    id: 'asn-cs-05',
    courseCode: 'CS-210',
    courseTitle: 'Data Structures & Algorithms',
    instructor: 'Prof. Marcus Thorne (Sample)',
    title: 'Balanced Binary Search Trees & AVL Rotations Lab',
    taskNumber: 'Lab 05',
    dueDate: 'Nov 08, 2026',
    dueTime: '11:59 PM EST',
    urgencyLabel: 'Due in 5 days',
    points: 100,
    weightPercent: 15,
    status: 'draft_saved',
    statusLabel: 'Draft Saved · Due in 5 days',
    acceptedFormats: ['.zip', '.pdf', '.tar.gz'],
    maxFileSizeMb: 15,
    estimatedEffort: '5–7 hours',
    overview:
      'Implement a self-balancing AVL tree in TypeScript or C++ supporting O(log n) insertion, deletion, and range queries, accompanied by an asymptotic complexity verification report.',
    instructions: [
      'Implement single left/right rotations and double left-right/right-left rotations with invariant height updates.',
      'Include unit tests covering degenerate sorted insertions (n = 10,000 keys) and boundary deletion cases.',
      'Attach your source archive (.zip) and complexity analysis summary (.pdf).',
    ],
    deliverables: [
      'Archive containing source code, unit test suite, and README build instructions.',
      'Benchmark comparison table showing tree height before and after balancing.',
    ],
    rubric: [
      {
        id: 'cs-rub-1',
        criterion: '01. Correctness of Rotations & Balance Invariants',
        description: 'Passes all automated stress tests while maintaining height balance factor in {-1, 0, 1}.',
        points: 45,
      },
      {
        id: 'cs-rub-2',
        criterion: '02. Time & Space Complexity Analysis',
        description: 'Rigorous proof of O(log n) worst-case operation bounds with empirical timing tables.',
        points: 35,
      },
      {
        id: 'cs-rub-3',
        criterion: '03. Code Modularity & Edge-Case Test Coverage',
        description: 'Clean memory/reference handling and comprehensive unit tests for empty and single-node trees.',
        points: 20,
      },
    ],
    submissionRecord: {
      receiptId: 'DRAFT-LOCAL-2026',
      submittedAt: 'Saved Nov 02, 2026 · 04:15 PM EST',
      fileName: 'Maya_Lin_CS210_AVL_Draft.zip',
      fileSize: '1.1 MB',
      checksum: 'Pending final submission',
      artifactUrl: 'https://github.northbridge.edu/mlin/cs210-avl-lab',
      reflectionNote: 'Completed single and double rotation unit tests; finalizing empirical benchmark section.',
      honorCodeAccepted: true,
    },
  },
  {
    id: 'asn-des-03',
    courseCode: 'DES-205',
    courseTitle: 'Information Architecture & Systems',
    instructor: 'Prof. Claire Sterling (Sample)',
    title: 'Navigation Taxonomy & Card Sorting Synthesis',
    taskNumber: 'Project 03',
    dueDate: 'Nov 12, 2026',
    dueTime: '05:00 PM EST',
    urgencyLabel: 'Due in 9 days',
    points: 100,
    weightPercent: 25,
    status: 'action_required',
    statusLabel: 'Action Required · Due in 9 days',
    acceptedFormats: ['.pdf', '.docx'],
    maxFileSizeMb: 20,
    estimatedEffort: '8–10 hours',
    overview:
      'Analyze open and closed card-sorting similarity matrices for a municipal public library portal and propose a revised 3-tier site architecture.',
    instructions: [
      'Synthesize dendrogram clusters from 12 sample card-sorting sessions.',
      'Compare existing site navigation labels against user-generated mental models.',
      'Produce an annotated sitemap diagram and breadcrumb specification.',
    ],
    deliverables: [
      'IA Synthesis Deck & Sitemap Specification (.pdf).',
      'Labeling glossary defining primary and secondary navigation terms.',
    ],
    rubric: [
      {
        id: 'des-rub-1',
        criterion: '01. Card Sort Matrix & Dendrogram Interpretation',
        description: 'Accurate interpretation of agreement scores and resolution of ambiguous category labels.',
        points: 40,
      },
      {
        id: 'des-rub-2',
        criterion: '02. Sitemap Hierarchy & Wayfinding Clarity',
        description: 'Balanced breadth vs. depth with clear, mutually exclusive category nomenclature.',
        points: 40,
      },
      {
        id: 'des-rub-3',
        criterion: '03. Documentation & Accessibility Annotations',
        description: 'Includes landmark roles, skip-link paths, and keyboard tab order notes.',
        points: 20,
      },
    ],
  },
  {
    id: 'asn-stat-03',
    courseCode: 'STAT-201',
    courseTitle: 'Applied Quantitative Research Methods',
    instructor: 'Dr. Arisudan Nair (Sample)',
    title: 'Confidence Intervals & Hypothesis Testing Problem Set',
    taskNumber: 'Problem Set 03',
    dueDate: 'Nov 01, 2026',
    dueTime: '11:59 PM EST',
    urgencyLabel: 'Submitted on time',
    points: 50,
    weightPercent: 10,
    status: 'submitted',
    statusLabel: 'Submitted · Receipt #SF-2026-1101-4410',
    acceptedFormats: ['.pdf'],
    maxFileSizeMb: 10,
    estimatedEffort: '4 hours',
    overview:
      'Compute two-sample t-tests, confidence intervals, and statistical power calculations for comparative UX task completion timing datasets.',
    instructions: [
      'Show all degrees of freedom, test statistics, and p-value interpretations clearly.',
      'State null and alternative hypotheses prior to computing test metrics.',
    ],
    deliverables: ['Compiled statistical analysis PDF with embedded R/Python verification tables.'],
    rubric: [
      {
        id: 'stat-rub-1',
        criterion: '01. Hypothesis Formulation & Assumptions Check',
        description: 'Verifies normality and variance homogeneity prior to parametric test selection.',
        points: 20,
      },
      {
        id: 'stat-rub-2',
        criterion: '02. Quantitative Accuracy & Effect Size Reporting',
        description: 'Accurate confidence intervals and Cohen’s d calculation with tabular precision.',
        points: 30,
      },
    ],
    submissionRecord: {
      receiptId: 'SF-2026-1101-4410',
      submittedAt: 'Nov 01, 2026 · 08:42 PM EST',
      fileName: 'Maya_Lin_STAT201_PS03.pdf',
      fileSize: '1.8 MB',
      checksum: 'sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b',
      reflectionNote:
        'Verified Welch two-sample t-test calculations in R and cross-checked 95% confidence interval bounds.',
      honorCodeAccepted: true,
    },
  },
  {
    id: 'asn-hci-03',
    courseCode: 'HCI-304',
    courseTitle: 'Interaction Design Studio II',
    instructor: 'Dr. Elena Rostova (Sample)',
    title: 'Contextual Inquiry & Task Flow Modeling',
    taskNumber: 'Task 03',
    dueDate: 'Oct 22, 2026',
    dueTime: '11:59 PM EST',
    urgencyLabel: 'Graded · 94 / 100',
    points: 100,
    weightPercent: 15,
    status: 'graded',
    statusLabel: 'Graded · 94 / 100 (A)',
    acceptedFormats: ['.pdf'],
    maxFileSizeMb: 25,
    estimatedEffort: '6 hours',
    overview:
      'Model current-state student study room booking workflows using hierarchical task analysis (HTA) and sequence models.',
    instructions: [
      'Map physical and digital artifacts used during group study coordination.',
      'Highlight breakdown points and manual workarounds.',
    ],
    deliverables: ['Contextual Inquiry Synthesis & Sequence Diagrams (.pdf).'],
    rubric: [
      {
        id: 'hci3-1',
        criterion: '01. Field Observation Depth',
        description: 'Captures concrete environmental constraints and artifact handoffs.',
        points: 50,
      },
      {
        id: 'hci3-2',
        criterion: '02. Sequence & Task Flow Accuracy',
        description: 'Clear decision nodes, error recovery loops, and explicit assumption tags.',
        points: 50,
      },
    ],
    submissionRecord: {
      receiptId: 'SF-2026-1022-3108',
      submittedAt: 'Oct 22, 2026 · 09:14 PM EST',
      fileName: 'Maya_Lin_HCI304_Task03_Models.pdf',
      fileSize: '3.2 MB',
      checksum: 'sha256:4b227777d4dd1fc61c6f884f48641d02b4d121d3fd',
      reflectionNote:
        'Focused on how students cross-reference library availability across three separate browser tabs.',
      honorCodeAccepted: true,
      gradeScore: 94,
      instructorFeedback:
        'Exemplary sequence modeling and honest labeling of sample size constraints. Your breakdown analysis directly sets up Task 04.',
    },
  },
];
