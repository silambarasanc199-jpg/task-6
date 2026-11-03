import React, { useState } from 'react';
import {
  AssignmentItem,
  INITIAL_ASSIGNMENTS,
  INITIAL_COURSES,
  SAMPLE_STUDENT,
} from './data/sampleData';
import { UxCaseStudy, PrototypeScreenId } from './components/UxCaseStudy';
import { downloadStandaloneHtmlFile } from './utils/exportStandaloneHtml';

export default function App() {
  // Navigation & Prototype View Mode
  const [activeScreen, setActiveScreen] = useState<PrototypeScreenId>('login');
  const [showAllScreensStacked, setShowAllScreensStacked] = useState<boolean>(false);

  // Student Session State (Sample Data)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [studentProfile, setStudentProfile] = useState(SAMPLE_STUDENT);

  // Screen 1: Login / Sign Up State & Validation
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [emailInput, setEmailInput] = useState<string>('maya.lin@northbridge.edu');
  const [passwordInput, setPasswordInput] = useState<string>('StudentFlow2026');
  const [fullNameInput, setFullNameInput] = useState<string>('Maya Lin');
  const [studentIdInput, setStudentIdInput] = useState<string>('NB-2026-0419');
  const [programInput, setProgramInput] = useState<string>('B.S. Human-Computer Interaction');
  const [authErrors, setAuthErrors] = useState<{
    email?: string;
    password?: string;
    fullName?: string;
    studentId?: string;
  }>({});

  // Assignments State & Filtering (Screen 3)
  const [assignments, setAssignments] = useState<AssignmentItem[]>(INITIAL_ASSIGNMENTS);
  const [statusFilter, setStatusFilter] = useState<'all' | 'action_required' | 'submitted' | 'graded'>('all');
  const [courseFilter, setCourseFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected Assignment for Screen 4 (Details & Submission) & Screen 5 (Confirmation)
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string>('asn-hci-04');

  // Screen 4: Submission Form State & Validation
  const [fileNameInput, setFileNameInput] = useState<string>('Maya_Lin_HCI304_Task04_Report.pdf');
  const [fileSizeInput, setFileSizeInput] = useState<string>('2.4 MB');
  const [artifactUrlInput, setArtifactUrlInput] = useState<string>(
    'https://figma.com/proto/northbridge-hci304-registration-study'
  );
  const [reflectionInput, setReflectionInput] = useState<string>(
    'Conducted heuristic evaluation across all 10 Nielsen principles and synthesized three moderated think-aloud sessions focusing on course schedule conflict recovery.'
  );
  const [honorCodeChecked, setHonorCodeChecked] = useState<boolean>(true);
  const [submissionErrors, setSubmissionErrors] = useState<{
    file?: string;
    url?: string;
    reflection?: string;
    honorCode?: string;
  }>({});
  const [draftSavedNotice, setDraftSavedNotice] = useState<string | null>(null);

  const selectedAssignment =
    assignments.find((item) => item.id === selectedAssignmentId) || assignments[0];

  // Real-time Submission Form Progress Calculation (Screen 04)
  const cleanFileForProgress = fileNameInput.trim();
  const isFileStepValid =
    cleanFileForProgress.length > 0 &&
    selectedAssignment.acceptedFormats.some((ext) =>
      cleanFileForProgress.toLowerCase().endsWith(ext.toLowerCase())
    );
  const cleanReflectionForProgress = reflectionInput.trim();
  const isReflectionStepValid = cleanReflectionForProgress.length >= 20;
  const isHonorStepValid = honorCodeChecked;
  const cleanUrlForProgress = artifactUrlInput.trim();
  const isOptionalUrlValid =
    cleanUrlForProgress === '' || /^https?:\/\/.+\..+/i.test(cleanUrlForProgress);

  const requiredStepsCompleted =
    (isFileStepValid ? 1 : 0) +
    (isReflectionStepValid ? 1 : 0) +
    (isHonorStepValid ? 1 : 0);
  const totalRequiredSteps = 3;
  const rawProgressPercent = Math.round((requiredStepsCompleted / totalRequiredSteps) * 100);
  const submissionProgressPercent =
    rawProgressPercent === 100 && !isOptionalUrlValid ? 90 : rawProgressPercent;

  // Derived Dashboard Counts
  const dueSoonCount = assignments.filter(
    (a) => a.status === 'action_required' || a.status === 'draft_saved'
  ).length;
  const completedCount = assignments.filter(
    (a) => a.status === 'submitted' || a.status === 'graded'
  ).length;

  // Screen Navigation Helper
  const navigateToScreen = (screen: PrototypeScreenId, assignmentId?: string) => {
    if (assignmentId) {
      setSelectedAssignmentId(assignmentId);
      const target = assignments.find((a) => a.id === assignmentId);
      if (target) {
        if (target.submissionRecord) {
          setFileNameInput(target.submissionRecord.fileName);
          setFileSizeInput(target.submissionRecord.fileSize);
          setArtifactUrlInput(target.submissionRecord.artifactUrl || '');
          setReflectionInput(target.submissionRecord.reflectionNote);
          setHonorCodeChecked(target.submissionRecord.honorCodeAccepted);
        } else {
          setFileNameInput(`Maya_Lin_${target.courseCode.replace('-', '')}_${target.taskNumber.replace(' ', '')}.pdf`);
          setFileSizeInput('2.4 MB');
          setArtifactUrlInput('');
          setReflectionInput(
            `Completed all deliverables for ${target.courseCode} ${target.taskNumber} in accordance with the grading rubric criteria.`
          );
          setHonorCodeChecked(true);
        }
      }
    }
    setSubmissionErrors({});
    setDraftSavedNotice(null);
    setActiveScreen(screen);
  };

  // Screen 1 Validation & Submit
  const validateAndSubmitAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: {
      email?: string;
      password?: string;
      fullName?: string;
      studentId?: string;
    } = {};

    const trimmedEmail = emailInput.trim();
    if (!trimmedEmail) {
      errors.email = 'Institutional email address is required (for example, maya.lin@northbridge.edu).';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errors.email =
        'Enter a valid email address including an "@" symbol and university domain (e.g., name@northbridge.edu).';
    }

    if (!passwordInput) {
      errors.password = 'Password is required to access your student portal.';
    } else if (passwordInput.length < 8) {
      errors.password = 'Password must be at least 8 characters long. Click "Fill Sample Credentials" to test.';
    }

    if (authMode === 'signup') {
      if (!fullNameInput.trim() || fullNameInput.trim().length < 2) {
        errors.fullName = 'Enter your full legal or preferred student name.';
      }
      if (!studentIdInput.trim() || !/^NB-\d{4}-\d{4}$/i.test(studentIdInput.trim())) {
        errors.studentId = 'Student ID must follow the format NB-YYYY-XXXX (for example, NB-2026-0419).';
      }
    }

    setAuthErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsAuthenticated(true);
      if (authMode === 'signup') {
        setStudentProfile({
          ...studentProfile,
          fullName: fullNameInput.trim(),
          studentId: studentIdInput.trim().toUpperCase(),
          email: trimmedEmail,
          program: programInput,
        });
      } else {
        setStudentProfile({
          ...studentProfile,
          email: trimmedEmail,
        });
      }
      setActiveScreen('dashboard');
    }
  };

  const triggerSampleAuthInvalid = () => {
    setEmailInput('maya.lin-invalid-email');
    setPasswordInput('short');
    if (authMode === 'signup') {
      setFullNameInput('');
      setStudentIdInput('12345');
    }
    setAuthErrors({
      email: 'Enter a valid email address including an "@" symbol and university domain (e.g., name@northbridge.edu).',
      password: 'Password must be at least 8 characters long. Click "Fill Sample Credentials" to test.',
      ...(authMode === 'signup'
        ? {
            fullName: 'Enter your full legal or preferred student name.',
            studentId: 'Student ID must follow the format NB-YYYY-XXXX (for example, NB-2026-0419).',
          }
        : {}),
    });
  };

  const fillSampleAuthCredentials = () => {
    setEmailInput('maya.lin@northbridge.edu');
    setPasswordInput('StudentFlow2026');
    setFullNameInput('Maya Lin');
    setStudentIdInput('NB-2026-0419');
    setAuthErrors({});
  };

  // Screen 4 File Input & Validation
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileNameInput(file.name);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      setFileSizeInput(`${sizeMb === '0.00' ? '0.15' : sizeMb} MB`);
      setSubmissionErrors((prev) => ({ ...prev, file: undefined }));
      setDraftSavedNotice(null);
    }
  };

  const validateSubmissionForm = (): boolean => {
    const errors: {
      file?: string;
      url?: string;
      reflection?: string;
      honorCode?: string;
    } = {};

    const cleanFile = fileNameInput.trim();
    if (!cleanFile) {
      errors.file = `Attach a deliverable file before submitting. Accepted formats for ${selectedAssignment.courseCode}: ${selectedAssignment.acceptedFormats.join(', ')}.`;
    } else {
      const lower = cleanFile.toLowerCase();
      const matchesFormat = selectedAssignment.acceptedFormats.some((ext) =>
        lower.endsWith(ext.toLowerCase())
      );
      if (!matchesFormat) {
        errors.file = `Unsupported file format ("${cleanFile}"). Please attach a file ending in ${selectedAssignment.acceptedFormats.join(' or ')}.`;
      }
    }

    const cleanUrl = artifactUrlInput.trim();
    if (cleanUrl && !/^https?:\/\/.+\..+/i.test(cleanUrl)) {
      errors.url = 'Optional link must be a valid URL starting with https:// or http:// (or leave blank).';
    }

    const cleanReflection = reflectionInput.trim();
    if (!cleanReflection) {
      errors.reflection = 'A brief student reflection note is required by your instructor (minimum 20 characters).';
    } else if (cleanReflection.length < 20) {
      errors.reflection = `Reflection note is too short (${cleanReflection.length} characters entered). Please provide at least 20 characters summarizing your submission.`;
    }

    if (!honorCodeChecked) {
      errors.honorCode =
        'You must check the Academic Integrity Honor Code declaration before submitting coursework.';
    }

    setSubmissionErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveDraft = () => {
    setDraftSavedNotice(
      `Draft saved in prototype session at ${new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}. Not yet submitted for grading.`
    );
    setAssignments((prev) =>
      prev.map((item) =>
        item.id === selectedAssignment.id && item.status === 'action_required'
          ? {
              ...item,
              status: 'draft_saved',
              statusLabel: `Draft Saved · ${item.urgencyLabel}`,
              submissionRecord: {
                receiptId: 'DRAFT-LOCAL-2026',
                submittedAt: 'Draft Saved · Nov 03, 2026',
                fileName: fileNameInput.trim() || 'Untitled_Draft.pdf',
                fileSize: fileSizeInput,
                checksum: 'Pending final submission',
                artifactUrl: artifactUrlInput.trim() || undefined,
                reflectionNote: reflectionInput.trim(),
                honorCodeAccepted: honorCodeChecked,
              },
            }
          : item
      )
    );
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDraftSavedNotice(null);
    if (!validateSubmissionForm()) {
      return;
    }

    const receiptNumber = `SF-2026-1103-${Math.floor(1000 + Math.random() * 9000)}`;
    const timestamp = 'Nov 03, 2026 · 02:18 PM EST';

    setAssignments((prev) =>
      prev.map((item) =>
        item.id === selectedAssignment.id
          ? {
              ...item,
              status: 'submitted',
              statusLabel: `Submitted · Receipt #${receiptNumber}`,
              urgencyLabel: 'Submitted on time',
              submissionRecord: {
                receiptId: receiptNumber,
                submittedAt: timestamp,
                fileName: fileNameInput.trim(),
                fileSize: fileSizeInput,
                checksum: 'sha256:8f4e2c91a7b3d501e6c82a49f0b17d3e92a1c4b8',
                artifactUrl: artifactUrlInput.trim() || undefined,
                reflectionNote: reflectionInput.trim(),
                honorCodeAccepted: true,
              },
            }
          : item
      )
    );

    setActiveScreen('confirmation');
  };

  const triggerSampleSubmissionErrors = () => {
    setFileNameInput('unsupported_archive.exe');
    setArtifactUrlInput('not-a-valid-url');
    setReflectionInput('Too brief');
    setHonorCodeChecked(false);
    setDraftSavedNotice(null);
    setSubmissionErrors({
      file: `Unsupported file format ("unsupported_archive.exe"). Please attach a file ending in ${selectedAssignment.acceptedFormats.join(' or ')}.`,
      url: 'Optional link must be a valid URL starting with https:// or http:// (or leave blank).',
      reflection:
        'Reflection note is too short (9 characters entered). Please provide at least 20 characters summarizing your submission.',
      honorCode:
        'You must check the Academic Integrity Honor Code declaration before submitting coursework.',
    });
  };

  const fillValidSampleSubmission = () => {
    const defaultExt = selectedAssignment.acceptedFormats[0] || '.pdf';
    setFileNameInput(
      `Maya_Lin_${selectedAssignment.courseCode.replace('-', '')}_${selectedAssignment.taskNumber.replace(' ', '')}${defaultExt}`
    );
    setFileSizeInput('2.4 MB');
    setArtifactUrlInput('https://figma.com/proto/northbridge-hci304-registration-study');
    setReflectionInput(
      'Conducted heuristic evaluation across all 10 Nielsen principles and synthesized three moderated think-aloud sessions focusing on course schedule conflict recovery.'
    );
    setHonorCodeChecked(true);
    setSubmissionErrors({});
  };

  const resetEntirePrototype = () => {
    setAssignments(INITIAL_ASSIGNMENTS);
    setStudentProfile(SAMPLE_STUDENT);
    setIsAuthenticated(false);
    setSelectedAssignmentId('asn-hci-04');
    fillSampleAuthCredentials();
    fillValidSampleSubmission();
    setStatusFilter('all');
    setCourseFilter('ALL');
    setSearchQuery('');
    setActiveScreen('login');
  };

  // Filtered Assignments for Screen 3
  const filteredAssignments = assignments.filter((item) => {
    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'action_required'
        ? item.status === 'action_required' || item.status === 'draft_saved'
        : item.status === statusFilter;
    const matchesCourse = courseFilter === 'ALL' ? true : item.courseCode === courseFilter;
    const matchesSearch =
      searchQuery.trim() === ''
        ? true
        : item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.courseTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCourse && matchesSearch;
  });

  // Helper to determine if a screen should be visible
  const isScreenVisible = (screenId: PrototypeScreenId) => {
    return showAllScreensStacked || activeScreen === screenId;
  };

  const screenSteps: { id: PrototypeScreenId; index: string; label: string }[] = [
    { id: 'login', index: '01', label: 'Login / Sign Up' },
    { id: 'dashboard', index: '02', label: 'Student Dashboard' },
    { id: 'assignments', index: '03', label: 'Assignments List' },
    { id: 'details', index: '04', label: 'Assignment Details & Submit' },
    { id: 'confirmation', index: '05', label: 'Submission Confirmation' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Skip Link for Keyboard Accessibility */}
      <a
        href="#prototype-workspace"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-blue-700 focus:text-white focus:px-4 focus:py-2 focus:rounded-md text-sm font-semibold"
      >
        Skip to Interactive Prototype Workspace
      </a>

      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
        >
          StudentFlow
        </a>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav
          aria-label="Primary Portfolio Navigation"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
        >
          <a
            href="#prototype-workspace"
            className="hover:text-slate-900 hover:underline whitespace-nowrap shrink-0"
          >
            Prototype
          </a>
          <a
            href="#case-study"
            className="hover:text-slate-900 hover:underline whitespace-nowrap shrink-0"
          >
            Case Study
          </a>
          <a
            href="#user-flow"
            className="hover:text-slate-900 hover:underline whitespace-nowrap shrink-0"
          >
            User Flow
          </a>
          <a
            href="#design-system"
            className="hover:text-slate-900 hover:underline whitespace-nowrap shrink-0"
          >
            Design System
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0 no-print">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 rounded-md hover:bg-blue-800 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Print / Save PDF
          </button>
        </div>
      </header>

      <main id="top" className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 py-8 md:py-10">
        {/* Portfolio Title & Transparent Prototype Disclaimer */}
        <section aria-labelledby="document-title" className="mb-8 pb-6 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-600 mb-2">
            <span>Task 06 Deliverable</span>
            <span aria-hidden="true">·</span>
            <span>Interactive High-Fidelity Prototype &amp; UX Portfolio Case Study</span>
            <span aria-hidden="true">·</span>
            <span>Sample Data Only (No Live Backend)</span>
          </div>

          <h1
            id="document-title"
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 text-balance mb-3"
          >
            StudentFlow — Task 06: High-Fidelity Prototype &amp; UX Case Study
          </h1>

          <p className="text-sm sm:text-base text-slate-700 max-w-3xl leading-relaxed mb-5">
            An interactive 5-screen student education portal prototype and UX case study illustrating a streamlined
            coursework submission journey:{' '}
            <strong className="font-semibold text-slate-900">
              Login &rarr; Dashboard &rarr; Assignments &rarr; Assignment Details &rarr; Submit &rarr; Confirmation
            </strong>
            . All student records, grades, and proto-personas are fictional sample data clearly labeled for portfolio
            evaluation.
          </p>

          {/* Workspace Utility Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200 rounded-lg p-3.5 no-print">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-700 mr-1">Prototype View Mode:</span>
              <div className="inline-flex p-1 bg-slate-100 rounded-md border border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAllScreensStacked(false)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded whitespace-nowrap shrink-0 cursor-pointer ${
                    !showAllScreensStacked
                      ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Interactive Step-by-Step (1 Screen)
                </button>
                <button
                  type="button"
                  onClick={() => setShowAllScreensStacked(true)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded whitespace-nowrap shrink-0 cursor-pointer ${
                    showAllScreensStacked
                      ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Show All 5 Screens Stacked (Review Mode)
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={downloadStandaloneHtmlFile}
                className="px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
              >
                Download Single-File HTML (.html)
              </button>
              <button
                type="button"
                onClick={resetEntirePrototype}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
              >
                Reset Prototype Data
              </button>
            </div>
          </div>
        </section>

        {/* =====================================================================
            INTERACTIVE PROTOTYPE SECTION (5 POLISHED SCREENS)
           ===================================================================== */}
        <section id="prototype-workspace" aria-labelledby="prototype-section-heading">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h2 id="prototype-section-heading" className="text-lg font-bold text-slate-900">
                Interactive Prototype — StudentFlow Education Portal
              </h2>
              <p className="text-xs text-slate-600">
                Click through the primary user flow inside each screen, or use the screen selector bar below to jump
                directly to any of the 5 screens.
              </p>
            </div>
            <div className="text-xs font-mono text-slate-600">
              Active Screen: {screenSteps.find((s) => s.id === activeScreen)?.index}.{' '}
              {screenSteps.find((s) => s.id === activeScreen)?.label}
            </div>
          </div>

          {/* 5-Screen Journey Stepper Bar */}
          <nav
            aria-label="Prototype Screen Journey Navigation"
            className="bg-slate-200/70 border border-slate-300 rounded-lg p-1.5 mb-6 overflow-x-auto no-print"
          >
            <ol className="flex items-center gap-1.5 min-w-max">
              {screenSteps.map((step, idx) => {
                const isCurrent = activeScreen === step.id && !showAllScreensStacked;
                return (
                  <li key={step.id} className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAllScreensStacked(false);
                        navigateToScreen(step.id);
                      }}
                      aria-current={isCurrent ? 'step' : undefined}
                      className={`px-3.5 py-2 rounded-md text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer ${
                        isCurrent
                          ? 'bg-blue-700 text-white'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      <span className="font-mono mr-1.5">{step.index}.</span>
                      {step.label}
                    </button>
                    {idx < screenSteps.length - 1 && (
                      <span aria-hidden="true" className="text-slate-400 text-xs px-0.5">
                        &rarr;
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* Portal Window Frame */}
          <div className="space-y-10">
            {/* -----------------------------------------------------------------
                SCREEN 01: LOGIN / SIGN UP
               ----------------------------------------------------------------- */}
            {isScreenVisible('login') && (
              <article
                id="screen-01-login"
                aria-labelledby="screen-01-heading"
                className="bg-white border border-slate-300 rounded-lg overflow-hidden print-avoid-break"
              >
                {/* Portal Simulated Top Bar */}
                <div className="bg-slate-900 text-white px-6 py-3 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="font-semibold text-white">Screen 01 of 05: Login / Sign Up</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-300">Northbridge University StudentFlow Portal (Sample)</span>
                  </div>
                  <div className="text-slate-300 font-mono">
                    Prototype Environment · No Real Credentials Stored
                  </div>
                </div>

                <div className="p-6 sm:p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Portal Context & Demo Instructions */}
                  <div className="lg:col-span-5 space-y-5">
                    <div>
                      <p className="text-xs font-mono text-blue-700 font-semibold mb-1">
                        Northbridge University · Academic Portal
                      </p>
                      <h3 id="screen-01-heading" className="text-2xl font-bold text-slate-900 mb-2">
                        Sign in to manage your coursework and deadlines
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Access your enrolled courses, review grading rubrics, validate assignment files prior to
                        upload, and download timestamped submission receipts.
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-md p-4 space-y-2 text-xs text-slate-700">
                      <p className="font-semibold text-slate-900">
                        Evaluator Quick-Test Controls (Sample Data)
                      </p>
                      <p>
                        This screen includes live client-side validation for institutional email addresses, minimum
                        password length, and student ID formatting.
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2 no-print">
                        <button
                          type="button"
                          onClick={fillSampleAuthCredentials}
                          className="px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-semibold text-slate-800 hover:bg-slate-100 whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          Fill Sample Credentials
                        </button>
                        <button
                          type="button"
                          onClick={triggerSampleAuthInvalid}
                          className="px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-semibold text-red-700 hover:bg-red-50 whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          Test Validation Errors
                        </button>
                      </div>
                    </div>

                    <dl className="border-t border-slate-200 pt-4 text-xs text-slate-600 space-y-1.5">
                      <div className="flex justify-between">
                        <dt className="font-medium text-slate-800">Sample Student Email:</dt>
                        <dd className="font-mono">maya.lin@northbridge.edu</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium text-slate-800">Sample Student ID:</dt>
                        <dd className="font-mono">NB-2026-0419</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium text-slate-800">Academic Term:</dt>
                        <dd>Fall Semester 2026 (Sample)</dd>
                      </div>
                    </dl>
                  </div>

                  {/* Right Column: Interactive Sign In / Sign Up Form */}
                  <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-lg p-6 sm:p-8">
                    {/* Mode Switcher Tabs */}
                    <div
                      role="tablist"
                      aria-label="Authentication Mode"
                      className="grid grid-cols-2 gap-2 p-1 bg-slate-200/80 rounded-md mb-6"
                    >
                      <button
                        type="button"
                        role="tab"
                        aria-selected={authMode === 'signin'}
                        onClick={() => {
                          setAuthMode('signin');
                          setAuthErrors({});
                        }}
                        className={`py-2 px-4 text-xs font-semibold rounded whitespace-nowrap shrink-0 cursor-pointer ${
                          authMode === 'signin'
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Existing Student Sign In
                      </button>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={authMode === 'signup'}
                        onClick={() => {
                          setAuthMode('signup');
                          setAuthErrors({});
                        }}
                        className={`py-2 px-4 text-xs font-semibold rounded whitespace-nowrap shrink-0 cursor-pointer ${
                          authMode === 'signup'
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Create Student Account (Sign Up)
                      </button>
                    </div>

                    {/* Error Summary Banner if invalid */}
                    {Object.keys(authErrors).length > 0 && (
                      <div
                        role="alert"
                        aria-live="assertive"
                        className="mb-5 p-4 bg-red-50 border border-red-300 rounded-md text-xs text-red-900"
                      >
                        <p className="font-bold mb-1">
                          Unable to proceed — please resolve the following {Object.keys(authErrors).length} form{' '}
                          {Object.keys(authErrors).length === 1 ? 'issue' : 'issues'}:
                        </p>
                        <ul className="list-disc list-inside space-y-0.5">
                          {authErrors.fullName && <li>{authErrors.fullName}</li>}
                          {authErrors.studentId && <li>{authErrors.studentId}</li>}
                          {authErrors.email && <li>{authErrors.email}</li>}
                          {authErrors.password && <li>{authErrors.password}</li>}
                        </ul>
                      </div>
                    )}

                    <form onSubmit={validateAndSubmitAuth} noValidate className="space-y-4">
                      {authMode === 'signup' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="auth-fullname"
                              className="block text-xs font-semibold text-slate-900 mb-1.5"
                            >
                              Full Student Name <span className="text-red-700">*</span>
                            </label>
                            <input
                              id="auth-fullname"
                              type="text"
                              value={fullNameInput}
                              onChange={(e) => setFullNameInput(e.target.value)}
                              aria-invalid={Boolean(authErrors.fullName)}
                              aria-describedby={authErrors.fullName ? 'err-auth-fullname' : undefined}
                              placeholder="e.g., Maya Lin"
                              className={`w-full px-3 py-2 text-sm bg-white border rounded-md ${
                                authErrors.fullName ? 'border-red-600' : 'border-slate-300'
                              }`}
                            />
                            {authErrors.fullName && (
                              <p id="err-auth-fullname" className="mt-1 text-xs text-red-700 font-medium">
                                {authErrors.fullName}
                              </p>
                            )}
                          </div>

                          <div>
                            <label
                              htmlFor="auth-studentid"
                              className="block text-xs font-semibold text-slate-900 mb-1.5"
                            >
                              University Student ID <span className="text-red-700">*</span>
                            </label>
                            <input
                              id="auth-studentid"
                              type="text"
                              value={studentIdInput}
                              onChange={(e) => setStudentIdInput(e.target.value)}
                              aria-invalid={Boolean(authErrors.studentId)}
                              aria-describedby={authErrors.studentId ? 'err-auth-studentid' : 'hint-studentid'}
                              placeholder="NB-2026-0419"
                              className={`w-full px-3 py-2 text-sm font-mono bg-white border rounded-md ${
                                authErrors.studentId ? 'border-red-600' : 'border-slate-300'
                              }`}
                            />
                            <p id="hint-studentid" className="mt-1 text-xs text-slate-500">
                              Format: NB-YYYY-XXXX
                            </p>
                            {authErrors.studentId && (
                              <p id="err-auth-studentid" className="mt-1 text-xs text-red-700 font-medium">
                                {authErrors.studentId}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      <div>
                        <label
                          htmlFor="auth-email"
                          className="block text-xs font-semibold text-slate-900 mb-1.5"
                        >
                          University Email Address <span className="text-red-700">*</span>
                        </label>
                        <input
                          id="auth-email"
                          type="email"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          aria-invalid={Boolean(authErrors.email)}
                          aria-describedby={authErrors.email ? 'err-auth-email' : 'hint-auth-email'}
                          placeholder="name@northbridge.edu"
                          className={`w-full px-3 py-2 text-sm bg-white border rounded-md ${
                            authErrors.email ? 'border-red-600' : 'border-slate-300'
                          }`}
                        />
                        <p id="hint-auth-email" className="mt-1 text-xs text-slate-500">
                          Use your institutional @northbridge.edu email address.
                        </p>
                        {authErrors.email && (
                          <p id="err-auth-email" className="mt-1 text-xs text-red-700 font-medium">
                            {authErrors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="auth-password"
                          className="block text-xs font-semibold text-slate-900 mb-1.5"
                        >
                          Portal Password <span className="text-red-700">*</span>
                        </label>
                        <input
                          id="auth-password"
                          type="password"
                          value={passwordInput}
                          onChange={(e) => setPasswordInput(e.target.value)}
                          aria-invalid={Boolean(authErrors.password)}
                          aria-describedby={authErrors.password ? 'err-auth-password' : 'hint-auth-password'}
                          className={`w-full px-3 py-2 text-sm bg-white border rounded-md ${
                            authErrors.password ? 'border-red-600' : 'border-slate-300'
                          }`}
                        />
                        <p id="hint-auth-password" className="mt-1 text-xs text-slate-500">
                          Minimum 8 characters required.
                        </p>
                        {authErrors.password && (
                          <p id="err-auth-password" className="mt-1 text-xs text-red-700 font-medium">
                            {authErrors.password}
                          </p>
                        )}
                      </div>

                      {authMode === 'signup' && (
                        <div>
                          <label
                            htmlFor="auth-program"
                            className="block text-xs font-semibold text-slate-900 mb-1.5"
                          >
                            Academic Degree Program
                          </label>
                          <select
                            id="auth-program"
                            value={programInput}
                            onChange={(e) => setProgramInput(e.target.value)}
                            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md"
                          >
                            <option value="B.S. Human-Computer Interaction">
                              B.S. Human-Computer Interaction
                            </option>
                            <option value="B.S. Computer Science & Engineering">
                              B.S. Computer Science &amp; Engineering
                            </option>
                            <option value="B.A. Information Architecture & Design">
                              B.A. Information Architecture &amp; Design
                            </option>
                            <option value="M.S. Applied Data Science">M.S. Applied Data Science</option>
                          </select>
                        </div>
                      )}

                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                        <button
                          type="submit"
                          className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          {authMode === 'signin'
                            ? 'Sign In to Student Dashboard \u2192'
                            : 'Create Account & Continue \u2192'}
                        </button>
                        <span className="text-xs text-slate-500">
                          Step 01 of 05 &rarr; Advances to Student Dashboard
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
              </article>
            )}

            {/* -----------------------------------------------------------------
                SCREEN 02: STUDENT DASHBOARD
               ----------------------------------------------------------------- */}
            {isScreenVisible('dashboard') && (
              <article
                id="screen-02-dashboard"
                aria-labelledby="screen-02-heading"
                className="bg-white border border-slate-300 rounded-lg overflow-hidden print-break-before print-avoid-break"
              >
                {/* Portal Top Header Bar */}
                <div className="bg-slate-900 text-white px-6 py-3 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-semibold">Screen 02 of 05: Student Dashboard</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-300">
                      {studentProfile.fullName} ({studentProfile.studentId})
                    </span>
                  </div>
                  <div className="flex items-center gap-4 no-print">
                    <button
                      type="button"
                      onClick={() => navigateToScreen('dashboard')}
                      className="text-white underline font-semibold cursor-pointer"
                    >
                      Dashboard
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateToScreen('assignments')}
                      className="text-slate-300 hover:text-white hover:underline cursor-pointer"
                    >
                      Assignments ({assignments.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAuthenticated(false);
                        navigateToScreen('login');
                      }}
                      className="text-slate-300 hover:text-white hover:underline cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-8">
                  {/* Student Context Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                    <div>
                      <p className="text-xs font-mono text-slate-500 mb-1">
                        {studentProfile.semester} · {studentProfile.program} · [Sample Student Record]
                      </p>
                      <h3 id="screen-02-heading" className="text-2xl font-bold text-slate-900">
                        Welcome back, {studentProfile.fullName}
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 no-print">
                      <button
                        type="button"
                        onClick={() => navigateToScreen('assignments')}
                        className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Go to Assignments List &rarr;
                      </button>
                      <button
                        type="button"
                        onClick={() => navigateToScreen('login')}
                        className="px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        &larr; Back to Login
                      </button>
                    </div>
                  </div>

                  {/* 4-Column Academic KPI Strip (Single Bordered Grid, No Nested Card Clutter) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200 rounded-lg divide-y sm:divide-y-0 sm:divide-x divide-slate-200 bg-slate-50">
                    <div className="p-4">
                      <p className="text-xs font-medium text-slate-600 mb-1">Enrolled Courses</p>
                      <p className="text-2xl font-bold text-slate-900 font-mono tabular-nums">4 Courses</p>
                      <p className="text-xs text-slate-500 mt-1 font-mono tabular-nums">
                        {studentProfile.creditsEnrolled} · Full-Time
                      </p>
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-medium text-slate-600 mb-1">Action Required / Pending</p>
                      <p className="text-2xl font-bold text-blue-700 font-mono tabular-nums">
                        {dueSoonCount} {dueSoonCount === 1 ? 'Task' : 'Tasks'}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">Next cutoff: Nov 05, 11:59 PM</p>
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-medium text-slate-600 mb-1">Completed Deliverables</p>
                      <p className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                        {completedCount} of {assignments.length}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 font-mono tabular-nums">
                        {Math.round((completedCount / assignments.length) * 100)}% Active Queue Complete
                      </p>
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-medium text-slate-600 mb-1">Cumulative Standing (Sample)</p>
                      <p className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                        {studentProfile.cumulativeGpa}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">Academic Good Standing</p>
                    </div>
                  </div>

                  {/* Focal Anchor: Priority Next Due Assignment Spotlight */}
                  <div className="border border-blue-200 bg-blue-50/50 rounded-lg p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="space-y-2 max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-blue-800 font-semibold">
                          <span>Priority Next Deadline</span>
                          <span aria-hidden="true">·</span>
                          <span>HCI-304 Interaction Design Studio II</span>
                          <span aria-hidden="true">·</span>
                          <span>Due Nov 05, 2026 at 11:59 PM EST</span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-900">
                          Task 04: Usability Testing &amp; Heuristic Evaluation Report
                        </h4>
                        <p className="text-sm text-slate-700">
                          Worth <span className="font-mono tabular-nums font-semibold">100 points (20% of grade)</span>.
                          Requires a compiled PDF report and a brief self-reflection note. Current status:{' '}
                          <strong className="font-semibold text-slate-900">
                            {assignments.find((a) => a.id === 'asn-hci-04')?.statusLabel}
                          </strong>
                          .
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 shrink-0 no-print">
                        <button
                          type="button"
                          onClick={() => navigateToScreen('details', 'asn-hci-04')}
                          className="px-4 py-2.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          Open Assignment &amp; Submit Work &rarr;
                        </button>
                        <button
                          type="button"
                          onClick={() => navigateToScreen('assignments')}
                          className="px-4 py-2.5 text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-100 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          View All Assignments
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Enrolled Courses & Upcoming Deliverables Table */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-base font-bold text-slate-900">
                        Enrolled Courses &amp; Next Deliverables (Fall 2026 — Sample Data)
                      </h4>
                      <span className="text-xs text-slate-500 font-mono">4 Active Courses</span>
                    </div>
                    <div className="overflow-x-auto border border-slate-200 rounded-lg">
                      <table className="w-full text-left border-collapse text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                            <th className="py-3 px-4">Course Code &amp; Title</th>
                            <th className="py-3 px-4">Schedule &amp; Instructor</th>
                            <th className="py-3 px-4">Current Grade</th>
                            <th className="py-3 px-4">Next Deliverable</th>
                            <th className="py-3 px-4 text-right no-print">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {INITIAL_COURSES.map((course) => (
                            <tr key={course.code} className="hover:bg-slate-50">
                              <td className="py-3.5 px-4">
                                <span className="font-mono font-semibold text-slate-900">{course.code}</span>
                                <span className="mx-1.5 text-slate-400" aria-hidden="true">
                                  ·
                                </span>
                                <span className="font-medium text-slate-900">{course.title}</span>
                              </td>
                              <td className="py-3.5 px-4 text-xs text-slate-600">
                                <div>{course.schedule}</div>
                                <div className="text-slate-500">{course.instructor}</div>
                              </td>
                              <td className="py-3.5 px-4 font-mono tabular-nums text-xs text-slate-800">
                                {course.currentStanding} ({course.letterGrade})
                              </td>
                              <td className="py-3.5 px-4 text-xs text-slate-700 font-mono tabular-nums">
                                {course.nextDueSummary}
                              </td>
                              <td className="py-3.5 px-4 text-right no-print">
                                <button
                                  type="button"
                                  onClick={() => navigateToScreen('details', course.nextAssignmentId)}
                                  className="text-xs font-semibold text-blue-700 hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                                >
                                  Open Deliverable &rarr;
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* -----------------------------------------------------------------
                SCREEN 03: ASSIGNMENTS LIST
               ----------------------------------------------------------------- */}
            {isScreenVisible('assignments') && (
              <article
                id="screen-03-assignments"
                aria-labelledby="screen-03-heading"
                className="bg-white border border-slate-300 rounded-lg overflow-hidden print-break-before print-avoid-break"
              >
                {/* Portal Header Bar */}
                <div className="bg-slate-900 text-white px-6 py-3 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-semibold">Screen 03 of 05: Assignments List</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-300">Coursework Directory &amp; Status Tracker</span>
                  </div>
                  <div className="flex items-center gap-4 no-print">
                    <button
                      type="button"
                      onClick={() => navigateToScreen('dashboard')}
                      className="text-slate-300 hover:text-white hover:underline cursor-pointer"
                    >
                      Dashboard
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateToScreen('assignments')}
                      className="text-white underline font-semibold cursor-pointer"
                    >
                      Assignments ({assignments.length})
                    </button>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  {/* Breadcrumb & Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
                    <div>
                      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 mb-1">
                        <ol className="flex items-center gap-1.5">
                          <li>
                            <button
                              type="button"
                              onClick={() => navigateToScreen('dashboard')}
                              className="hover:underline text-blue-700 cursor-pointer"
                            >
                              Student Dashboard
                            </button>
                          </li>
                          <li aria-hidden="true">/</li>
                          <li className="text-slate-800 font-medium">Assignments List</li>
                        </ol>
                      </nav>
                      <h3 id="screen-03-heading" className="text-2xl font-bold text-slate-900">
                        Coursework &amp; Assignments Directory
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 no-print">
                      <button
                        type="button"
                        onClick={() => navigateToScreen('dashboard')}
                        className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        &larr; Back to Dashboard
                      </button>
                      <button
                        type="button"
                        onClick={() => navigateToScreen('details', 'asn-hci-04')}
                        className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Open Priority Assignment &rarr;
                      </button>
                    </div>
                  </div>

                  {/* Interactive Filter & Search Controls */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-50 border border-slate-200 rounded-lg p-4 no-print">
                    <div className="md:col-span-5">
                      <label htmlFor="filter-status-group" className="block text-xs font-semibold text-slate-800 mb-1.5">
                        Filter by Submission Status
                      </label>
                      <div
                        id="filter-status-group"
                        role="group"
                        aria-label="Filter assignments by status"
                        className="inline-flex flex-wrap gap-1 p-1 bg-slate-200/70 rounded-md"
                      >
                        {[
                          { id: 'all', label: `All (${assignments.length})` },
                          { id: 'action_required', label: `Pending (${dueSoonCount})` },
                          {
                            id: 'submitted',
                            label: `Submitted (${assignments.filter((a) => a.status === 'submitted').length})`,
                          },
                          {
                            id: 'graded',
                            label: `Graded (${assignments.filter((a) => a.status === 'graded').length})`,
                          },
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            type="button"
                            onClick={() =>
                              setStatusFilter(tab.id as 'all' | 'action_required' | 'submitted' | 'graded')
                            }
                            className={`px-2.5 py-1 text-xs font-semibold rounded whitespace-nowrap shrink-0 cursor-pointer ${
                              statusFilter === tab.id
                                ? 'bg-white text-blue-700 shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="course-filter-select" className="block text-xs font-semibold text-slate-800 mb-1.5">
                        Filter by Course
                      </label>
                      <select
                        id="course-filter-select"
                        value={courseFilter}
                        onChange={(e) => setCourseFilter(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                      >
                        <option value="ALL">All Enrolled Courses (4)</option>
                        <option value="HCI-304">HCI-304 · Interaction Design</option>
                        <option value="CS-210">CS-210 · Data Structures</option>
                        <option value="DES-205">DES-205 · Info Architecture</option>
                        <option value="STAT-201">STAT-201 · Quant Methods</option>
                      </select>
                    </div>

                    <div className="md:col-span-4">
                      <label htmlFor="assignment-search-input" className="block text-xs font-semibold text-slate-800 mb-1.5">
                        Search by Deliverable or Course Code
                      </label>
                      <input
                        id="assignment-search-input"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="e.g., Heuristic, AVL, STAT-201..."
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                      />
                    </div>
                  </div>

                  {/* Assignments Table */}
                  {filteredAssignments.length === 0 ? (
                    <div className="border border-slate-200 rounded-lg p-8 text-center space-y-3">
                      <p className="text-sm font-semibold text-slate-900">
                        No assignments match your current filter criteria.
                      </p>
                      <p className="text-xs text-slate-600">
                        Try clearing the search query or switching the status filter back to &quot;All&quot;.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setStatusFilter('all');
                          setCourseFilter('ALL');
                          setSearchQuery('');
                        }}
                        className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 rounded-md cursor-pointer"
                      >
                        Reset Filters
                      </button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto border border-slate-200 rounded-lg">
                      <table className="w-full text-left border-collapse text-sm">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                            <th className="py-3 px-4">Deliverable &amp; Course</th>
                            <th className="py-3 px-4">Due Date &amp; Cutoff</th>
                            <th className="py-3 px-4">Points &amp; Weight</th>
                            <th className="py-3 px-4">Submission Status (Non-Color Text State)</th>
                            <th className="py-3 px-4 text-right no-print">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {filteredAssignments.map((asn) => (
                            <tr key={asn.id} className="hover:bg-slate-50">
                              <td className="py-4 px-4">
                                <div className="text-xs font-mono text-slate-600 mb-0.5">
                                  {asn.courseCode} · {asn.taskNumber} · {asn.courseTitle}
                                </div>
                                <div className="font-bold text-slate-900">{asn.title}</div>
                                <div className="text-xs text-slate-500 mt-0.5">
                                  Instructor: {asn.instructor} · Formats: {asn.acceptedFormats.join(', ')}
                                </div>
                              </td>
                              <td className="py-4 px-4 font-mono tabular-nums text-xs text-slate-800 whitespace-nowrap">
                                <div className="font-semibold">{asn.dueDate}</div>
                                <div className="text-slate-500">{asn.dueTime}</div>
                              </td>
                              <td className="py-4 px-4 font-mono tabular-nums text-xs text-slate-800 whitespace-nowrap">
                                <div className="font-semibold">{asn.points} pts</div>
                                <div className="text-slate-500">{asn.weightPercent}% of grade</div>
                              </td>
                              <td className="py-4 px-4 text-xs">
                                {asn.status === 'action_required' && (
                                  <span className="font-semibold text-red-800">
                                    [Action Required] {asn.urgencyLabel}
                                  </span>
                                )}
                                {asn.status === 'draft_saved' && (
                                  <span className="font-semibold text-blue-800">
                                    [Draft Saved] {asn.urgencyLabel}
                                  </span>
                                )}
                                {asn.status === 'submitted' && (
                                  <span className="font-semibold text-green-800">
                                    [Submitted] Receipt #{asn.submissionRecord?.receiptId}
                                  </span>
                                )}
                                {asn.status === 'graded' && (
                                  <span className="font-semibold text-slate-900">
                                    [Graded] Score: {asn.submissionRecord?.gradeScore} / {asn.points}
                                  </span>
                                )}
                              </td>
                              <td className="py-4 px-4 text-right whitespace-nowrap no-print">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    type="button"
                                    onClick={() => navigateToScreen('details', asn.id)}
                                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-md cursor-pointer whitespace-nowrap shrink-0 ${
                                      asn.status === 'action_required' || asn.status === 'draft_saved'
                                        ? 'bg-blue-700 text-white hover:bg-blue-800'
                                        : 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-100'
                                    }`}
                                  >
                                    {asn.status === 'action_required' || asn.status === 'draft_saved'
                                      ? 'Review & Submit \u2192'
                                      : 'Inspect Brief'}
                                  </button>
                                  {(asn.status === 'submitted' || asn.status === 'graded') && (
                                    <button
                                      type="button"
                                      onClick={() => navigateToScreen('confirmation', asn.id)}
                                      className="px-3 py-1.5 text-xs font-medium text-blue-700 hover:underline cursor-pointer whitespace-nowrap shrink-0"
                                    >
                                      Receipt &rarr;
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </article>
            )}

            {/* -----------------------------------------------------------------
                SCREEN 04: ASSIGNMENT DETAILS AND SUBMISSION
               ----------------------------------------------------------------- */}
            {isScreenVisible('details') && (
              <article
                id="screen-04-details"
                aria-labelledby="screen-04-heading"
                className="bg-white border border-slate-300 rounded-lg overflow-hidden print-break-before print-avoid-break"
              >
                {/* Portal Header Bar */}
                <div className="bg-slate-900 text-white px-6 py-3 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-semibold">
                      Screen 04 of 05: Assignment Details &amp; Submission
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-300">
                      {selectedAssignment.courseCode} ({selectedAssignment.taskNumber})
                    </span>
                  </div>
                  <div className="flex items-center gap-4 no-print">
                    <button
                      type="button"
                      onClick={() => navigateToScreen('dashboard')}
                      className="text-slate-300 hover:text-white hover:underline cursor-pointer"
                    >
                      Dashboard
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateToScreen('assignments')}
                      className="text-slate-300 hover:text-white hover:underline cursor-pointer"
                    >
                      Assignments List
                    </button>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  {/* Breadcrumb & Deliverable Selector */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200">
                    <div>
                      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 mb-1">
                        <ol className="flex flex-wrap items-center gap-1.5">
                          <li>
                            <button
                              type="button"
                              onClick={() => navigateToScreen('dashboard')}
                              className="hover:underline text-blue-700 cursor-pointer"
                            >
                              Dashboard
                            </button>
                          </li>
                          <li aria-hidden="true">/</li>
                          <li>
                            <button
                              type="button"
                              onClick={() => navigateToScreen('assignments')}
                              className="hover:underline text-blue-700 cursor-pointer"
                            >
                              Assignments
                            </button>
                          </li>
                          <li aria-hidden="true">/</li>
                          <li className="text-slate-800 font-medium">
                            {selectedAssignment.courseCode}: {selectedAssignment.taskNumber}
                          </li>
                        </ol>
                      </nav>
                      <h3 id="screen-04-heading" className="text-2xl font-bold text-slate-900">
                        {selectedAssignment.courseCode} · {selectedAssignment.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 font-mono tabular-nums">
                        Instructor: {selectedAssignment.instructor} · Due: {selectedAssignment.dueDate} at{' '}
                        {selectedAssignment.dueTime} · Max Score: {selectedAssignment.points} pts (
                        {selectedAssignment.weightPercent}% of Course Grade) · [Sample Assignment Brief]
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0 no-print">
                      <label htmlFor="switch-assignment-select" className="text-xs font-medium text-slate-600">
                        Switch Deliverable:
                      </label>
                      <select
                        id="switch-assignment-select"
                        value={selectedAssignment.id}
                        onChange={(e) => navigateToScreen('details', e.target.value)}
                        className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-md font-medium"
                      >
                        {assignments.map((a) => (
                          <option key={a.id} value={a.id}>
                            {a.courseCode} — {a.taskNumber}: {a.title.slice(0, 32)}...
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Two-Column Split: Left = Brief & Rubric, Right = Submission Form */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column (7 cols): Brief, Deliverable Checklist, Grading Rubric */}
                    <div className="lg:col-span-7 space-y-6">
                      <div>
                        <h4 className="text-base font-bold text-slate-900 mb-2">
                          01. Assignment Overview &amp; Context
                        </h4>
                        <p className="text-sm text-slate-700 leading-relaxed">{selectedAssignment.overview}</p>
                      </div>

                      <div className="border-t border-slate-200 pt-5">
                        <h4 className="text-base font-bold text-slate-900 mb-2">
                          02. Step-by-Step Instructions
                        </h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700">
                          {selectedAssignment.instructions.map((inst, index) => (
                            <li key={index} className="leading-relaxed">
                              {inst}
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div className="border-t border-slate-200 pt-5">
                        <h4 className="text-base font-bold text-slate-900 mb-2">
                          03. Required Deliverables &amp; Format Constraints
                        </h4>
                        <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-700 mb-3">
                          {selectedAssignment.deliverables.map((del, index) => (
                            <li key={index}>{del}</li>
                          ))}
                        </ul>
                        <p className="text-xs font-mono text-slate-600 bg-slate-50 border border-slate-200 rounded p-2.5">
                          Accepted File Extensions: {selectedAssignment.acceptedFormats.join(', ')} · Maximum File Size:{' '}
                          {selectedAssignment.maxFileSizeMb} MB · Estimated Effort: {selectedAssignment.estimatedEffort}
                        </p>
                      </div>

                      <div className="border-t border-slate-200 pt-5">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-base font-bold text-slate-900">04. Grading Rubric</h4>
                          <span className="text-xs font-mono tabular-nums font-semibold text-slate-700">
                            Total: {selectedAssignment.points} Points
                          </span>
                        </div>
                        <div className="border border-slate-200 rounded-md overflow-hidden">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
                                <th className="py-2.5 px-3">Evaluation Criterion</th>
                                <th className="py-2.5 px-3">Performance Expectations</th>
                                <th className="py-2.5 px-3 text-right whitespace-nowrap">Max Points</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 text-slate-700">
                              {selectedAssignment.rubric.map((row) => (
                                <tr key={row.id}>
                                  <td className="py-3 px-3 font-semibold text-slate-900">{row.criterion}</td>
                                  <td className="py-3 px-3 leading-relaxed">{row.description}</td>
                                  <td className="py-3 px-3 text-right font-mono tabular-nums font-semibold text-slate-900 whitespace-nowrap">
                                    {row.points} pts
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Right Column (5 cols): Interactive Validated Submission Workspace */}
                    <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-5">
                      <div className="border-b border-slate-200 pb-3">
                        <p className="text-xs font-mono text-blue-700 font-semibold">
                          Deliverable Submission Workspace
                        </p>
                        <h4 className="text-lg font-bold text-slate-900">
                          Submit Work for {selectedAssignment.courseCode}
                        </h4>
                      </div>

                      {/* Real-Time Visual Form Progress Indicator */}
                      <div
                        aria-label="Submission Form Completion Progress"
                        className="bg-white border border-slate-200 rounded-md p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-slate-900">
                            Submission Readiness Progress
                          </span>
                          <span className="text-xs font-mono tabular-nums font-semibold text-blue-700">
                            {requiredStepsCompleted} of {totalRequiredSteps} Required Steps ·{' '}
                            {submissionProgressPercent}%
                          </span>
                        </div>

                        {/* Progress Bar Track & Fill */}
                        <div
                          role="progressbar"
                          aria-label="Assignment submission form completion"
                          aria-valuenow={submissionProgressPercent}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          className="w-full h-2.5 bg-slate-200 rounded overflow-hidden border border-slate-300"
                        >
                          <div
                            className={`h-full ${
                              submissionProgressPercent === 100 ? 'bg-green-700' : 'bg-blue-700'
                            }`}
                            style={{ width: `${submissionProgressPercent}%` }}
                          />
                        </div>

                        {/* Step-by-Step Field Completion Breakdown */}
                        <ul className="space-y-1.5 text-xs border-t border-slate-100 pt-2.5">
                          <li className="flex items-center justify-between gap-2">
                            <span className={isFileStepValid ? 'text-slate-900 font-medium' : 'text-slate-600'}>
                              01. Valid File Format ({selectedAssignment.acceptedFormats.join(', ')})
                            </span>
                            <span
                              className={`font-mono tabular-nums font-semibold ${
                                isFileStepValid ? 'text-green-800' : 'text-red-700'
                              }`}
                            >
                              {isFileStepValid ? '[Complete]' : '[Incomplete]'}
                            </span>
                          </li>
                          <li className="flex items-center justify-between gap-2">
                            <span className={isReflectionStepValid ? 'text-slate-900 font-medium' : 'text-slate-600'}>
                              02. Student Reflection (20+ chars)
                            </span>
                            <span
                              className={`font-mono tabular-nums font-semibold ${
                                isReflectionStepValid ? 'text-green-800' : 'text-red-700'
                              }`}
                            >
                              {isReflectionStepValid
                                ? `[Complete · ${cleanReflectionForProgress.length} chars]`
                                : `[${cleanReflectionForProgress.length}/20 chars]`}
                            </span>
                          </li>
                          <li className="flex items-center justify-between gap-2">
                            <span className={isHonorStepValid ? 'text-slate-900 font-medium' : 'text-slate-600'}>
                              03. Honor Code Declaration
                            </span>
                            <span
                              className={`font-mono tabular-nums font-semibold ${
                                isHonorStepValid ? 'text-green-800' : 'text-red-700'
                              }`}
                            >
                              {isHonorStepValid ? '[Complete]' : '[Incomplete]'}
                            </span>
                          </li>
                          {!isOptionalUrlValid && (
                            <li className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                              <span className="text-red-800 font-medium">
                                Optional URL Format Check
                              </span>
                              <span className="font-mono text-red-700 font-semibold">
                                [Fix URL or Clear]
                              </span>
                            </li>
                          )}
                        </ul>
                      </div>

                      {/* Quick-Test Validation Helper Bar */}
                      <div className="bg-white border border-slate-200 rounded p-3 space-y-2 text-xs no-print">
                        <p className="font-semibold text-slate-900">
                          Evaluator Form State Controls:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={fillValidSampleSubmission}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded font-semibold text-slate-800 whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            Populate Valid Sample File (100%)
                          </button>
                          <button
                            type="button"
                            onClick={triggerSampleSubmissionErrors}
                            className="px-2.5 py-1 bg-red-50 hover:bg-red-100 border border-red-200 rounded font-semibold text-red-800 whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            Test Validation Errors (0%)
                          </button>
                        </div>
                      </div>

                      {/* Draft Saved Confirmation Banner */}
                      {draftSavedNotice && (
                        <div
                          role="status"
                          aria-live="polite"
                          className="p-3 bg-blue-50 border border-blue-300 rounded-md text-xs text-blue-950 font-medium"
                        >
                          {draftSavedNotice}
                        </div>
                      )}

                      {/* Accessible Validation Error Summary */}
                      {Object.keys(submissionErrors).length > 0 && (
                        <div
                          role="alert"
                          aria-live="assertive"
                          className="p-4 bg-red-50 border border-red-300 rounded-md text-xs text-red-900 space-y-1.5"
                        >
                          <p className="font-bold">
                            Submission blocked — please fix {Object.keys(submissionErrors).length} validation{' '}
                            {Object.keys(submissionErrors).length === 1 ? 'error' : 'errors'}:
                          </p>
                          <ul className="list-disc list-inside space-y-1">
                            {submissionErrors.file && <li>{submissionErrors.file}</li>}
                            {submissionErrors.url && <li>{submissionErrors.url}</li>}
                            {submissionErrors.reflection && <li>{submissionErrors.reflection}</li>}
                            {submissionErrors.honorCode && <li>{submissionErrors.honorCode}</li>}
                          </ul>
                        </div>
                      )}

                      <form onSubmit={handleFinalSubmit} noValidate className="space-y-4">
                        {/* File Attachment Input */}
                        <div>
                          <label
                            htmlFor="sub-file-name"
                            className="block text-xs font-semibold text-slate-900 mb-1"
                          >
                            01. Deliverable File Name / Upload <span className="text-red-700">*</span>
                          </label>
                          <p id="hint-sub-file" className="text-xs text-slate-600 mb-2">
                            Allowed extensions:{' '}
                            <span className="font-mono font-semibold">
                              {selectedAssignment.acceptedFormats.join(', ')}
                            </span>{' '}
                            (Max {selectedAssignment.maxFileSizeMb} MB).
                          </p>
                          <input
                            id="sub-file-name"
                            type="text"
                            value={fileNameInput}
                            onChange={(e) => setFileNameInput(e.target.value)}
                            aria-invalid={Boolean(submissionErrors.file)}
                            aria-describedby={submissionErrors.file ? 'err-sub-file' : 'hint-sub-file'}
                            placeholder="e.g., Maya_Lin_HCI304_Report.pdf"
                            className={`w-full px-3 py-2 text-xs font-mono bg-white border rounded-md ${
                              submissionErrors.file ? 'border-red-600' : 'border-slate-300'
                            }`}
                          />
                          <div className="mt-2 flex items-center justify-between gap-2 no-print">
                            <label
                              htmlFor="local-file-picker"
                              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded cursor-pointer whitespace-nowrap shrink-0"
                            >
                              Or Browse Local File...
                            </label>
                            <input
                              id="local-file-picker"
                              type="file"
                              onChange={handleFileInputChange}
                              className="sr-only"
                            />
                            <span className="text-xs font-mono text-slate-500 tabular-nums">
                              Detected Size: {fileSizeInput}
                            </span>
                          </div>
                          {submissionErrors.file && (
                            <p id="err-sub-file" className="mt-1.5 text-xs text-red-700 font-medium">
                              {submissionErrors.file}
                            </p>
                          )}
                        </div>

                        {/* Supplementary Prototype / Repo URL */}
                        <div>
                          <label
                            htmlFor="sub-artifact-url"
                            className="block text-xs font-semibold text-slate-900 mb-1"
                          >
                            02. Supplementary Repository or Prototype URL (Optional)
                          </label>
                          <input
                            id="sub-artifact-url"
                            type="url"
                            value={artifactUrlInput}
                            onChange={(e) => setArtifactUrlInput(e.target.value)}
                            aria-invalid={Boolean(submissionErrors.url)}
                            aria-describedby={submissionErrors.url ? 'err-sub-url' : undefined}
                            placeholder="https://..."
                            className={`w-full px-3 py-2 text-xs bg-white border rounded-md ${
                              submissionErrors.url ? 'border-red-600' : 'border-slate-300'
                            }`}
                          />
                          {submissionErrors.url && (
                            <p id="err-sub-url" className="mt-1 text-xs text-red-700 font-medium">
                              {submissionErrors.url}
                            </p>
                          )}
                        </div>

                        {/* Reflection Note */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label
                              htmlFor="sub-reflection-note"
                              className="block text-xs font-semibold text-slate-900"
                            >
                              03. Student Reflection &amp; Self-Assessment <span className="text-red-700">*</span>
                            </label>
                            <span className="text-xs font-mono tabular-nums text-slate-500">
                              {reflectionInput.trim().length} / 20 min chars
                            </span>
                          </div>
                          <textarea
                            id="sub-reflection-note"
                            rows={4}
                            value={reflectionInput}
                            onChange={(e) => setReflectionInput(e.target.value)}
                            aria-invalid={Boolean(submissionErrors.reflection)}
                            aria-describedby={
                              submissionErrors.reflection ? 'err-sub-reflection' : 'hint-sub-reflection'
                            }
                            placeholder="Summarize key findings, methodology decisions, or notes for the grading instructor..."
                            className={`w-full px-3 py-2 text-xs bg-white border rounded-md leading-relaxed ${
                              submissionErrors.reflection ? 'border-red-600' : 'border-slate-300'
                            }`}
                          />
                          <p id="hint-sub-reflection" className="mt-1 text-xs text-slate-500">
                            Minimum 20 characters required. Included on your submission receipt.
                          </p>
                          {submissionErrors.reflection && (
                            <p id="err-sub-reflection" className="mt-1 text-xs text-red-700 font-medium">
                              {submissionErrors.reflection}
                            </p>
                          )}
                        </div>

                        {/* Academic Integrity Checkbox */}
                        <div className="pt-1">
                          <label
                            htmlFor="sub-honor-checkbox"
                            className="flex items-start gap-2.5 text-xs text-slate-800 cursor-pointer"
                          >
                            <input
                              id="sub-honor-checkbox"
                              type="checkbox"
                              checked={honorCodeChecked}
                              onChange={(e) => setHonorCodeChecked(e.target.checked)}
                              aria-invalid={Boolean(submissionErrors.honorCode)}
                              aria-describedby={submissionErrors.honorCode ? 'err-sub-honor' : undefined}
                              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-700"
                            />
                            <span className="leading-relaxed">
                              <strong>Academic Integrity Declaration (Required):</strong> I certify that this
                              submission is my own original academic work and that all external sources or assumptions
                              are properly cited in accordance with the Northbridge University Honor Code.
                            </span>
                          </label>
                          {submissionErrors.honorCode && (
                            <p id="err-sub-honor" className="mt-1.5 text-xs text-red-700 font-medium">
                              {submissionErrors.honorCode}
                            </p>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center gap-3">
                          <button
                            type="submit"
                            className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            Submit Assignment for Grading &rarr;
                          </button>
                          <button
                            type="button"
                            onClick={handleSaveDraft}
                            className="px-4 py-2.5 text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-100 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            Save Draft
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* -----------------------------------------------------------------
                SCREEN 05: SUBMISSION CONFIRMATION
               ----------------------------------------------------------------- */}
            {isScreenVisible('confirmation') && (
              <article
                id="screen-05-confirmation"
                aria-labelledby="screen-05-heading"
                className="bg-white border border-slate-300 rounded-lg overflow-hidden print-break-before print-avoid-break"
              >
                {/* Portal Header Bar */}
                <div className="bg-slate-900 text-white px-6 py-3 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-semibold">Screen 05 of 05: Submission Confirmation</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-300">Immutable Verification Receipt</span>
                  </div>
                  <div className="text-slate-300 font-mono">
                    Receipt ID: {selectedAssignment.submissionRecord?.receiptId || 'SF-2026-1103-8942'}
                  </div>
                </div>

                <div className="p-6 sm:p-8 md:p-10 max-w-4xl mx-auto space-y-6">
                  {/* Reassuring Confirmation Banner */}
                  <div
                    role="status"
                    aria-live="polite"
                    className="bg-green-50 border border-green-300 rounded-lg p-5"
                  >
                    <p className="text-xs font-mono uppercase tracking-wider text-green-900 font-semibold mb-1">
                      Submission Status: Verified &amp; Logged (Prototype Simulation)
                    </p>
                    <h3 id="screen-05-heading" className="text-2xl font-bold text-slate-900 mb-1">
                      Your coursework submission has been recorded
                    </h3>
                    <p className="text-sm text-slate-700">
                      A confirmation receipt has been generated for{' '}
                      <strong className="font-semibold text-slate-900">
                        {selectedAssignment.courseCode} ({selectedAssignment.taskNumber}): {selectedAssignment.title}
                      </strong>
                      . Retain the Receipt ID below for your academic records.
                    </p>
                  </div>

                  {/* Structured Receipt Table */}
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        Official Submission Verification Receipt [Sample Data]
                      </span>
                      <span className="text-xs font-mono tabular-nums text-blue-700 font-semibold">
                        Receipt #{selectedAssignment.submissionRecord?.receiptId || 'SF-2026-1103-8942'}
                      </span>
                    </div>

                    <dl className="divide-y divide-slate-200 text-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-3 py-3.5 px-5 gap-2">
                        <dt className="font-semibold text-slate-700">Student Name &amp; ID</dt>
                        <dd className="sm:col-span-2 text-slate-900 font-mono">
                          {studentProfile.fullName} · {studentProfile.studentId} ({studentProfile.email})
                        </dd>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 py-3.5 px-5 gap-2">
                        <dt className="font-semibold text-slate-700">Course &amp; Deliverable</dt>
                        <dd className="sm:col-span-2 text-slate-900 font-medium">
                          {selectedAssignment.courseCode} · {selectedAssignment.taskNumber}: {selectedAssignment.title}
                        </dd>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 py-3.5 px-5 gap-2">
                        <dt className="font-semibold text-slate-700">Submission Timestamp</dt>
                        <dd className="sm:col-span-2 text-slate-900 font-mono tabular-nums">
                          {selectedAssignment.submissionRecord?.submittedAt || 'Nov 03, 2026 · 02:18 PM EST'} (On Time
                          — Prior to {selectedAssignment.dueDate} Cutoff)
                        </dd>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 py-3.5 px-5 gap-2">
                        <dt className="font-semibold text-slate-700">Attached Deliverable File</dt>
                        <dd className="sm:col-span-2 text-slate-900 font-mono tabular-nums">
                          {selectedAssignment.submissionRecord?.fileName || fileNameInput} (
                          {selectedAssignment.submissionRecord?.fileSize || fileSizeInput})
                        </dd>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 py-3.5 px-5 gap-2">
                        <dt className="font-semibold text-slate-700">Integrity Verification Hash</dt>
                        <dd className="sm:col-span-2 text-slate-600 font-mono text-xs break-all">
                          {selectedAssignment.submissionRecord?.checksum ||
                            'sha256:8f4e2c91a7b3d501e6c82a49f0b17d3e92a1c4b8'}{' '}
                          (Simulated Checksum)
                        </dd>
                      </div>
                      {(selectedAssignment.submissionRecord?.artifactUrl || artifactUrlInput) && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 py-3.5 px-5 gap-2">
                          <dt className="font-semibold text-slate-700">Supplementary Artifact URL</dt>
                          <dd className="sm:col-span-2 text-blue-700 font-mono text-xs break-all">
                            {selectedAssignment.submissionRecord?.artifactUrl || artifactUrlInput}
                          </dd>
                        </div>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-3 py-3.5 px-5 gap-2">
                        <dt className="font-semibold text-slate-700">Student Reflection Note</dt>
                        <dd className="sm:col-span-2 text-slate-700 leading-relaxed">
                          &ldquo;{selectedAssignment.submissionRecord?.reflectionNote || reflectionInput}&rdquo;
                        </dd>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 py-3.5 px-5 gap-2">
                        <dt className="font-semibold text-slate-700">Honor Code Declaration</dt>
                        <dd className="sm:col-span-2 text-green-800 font-medium">
                          Confirmed &amp; Digitally Signed by {studentProfile.fullName}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {/* Next Journey Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2 no-print">
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => navigateToScreen('dashboard')}
                        className="px-4 py-2.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Return to Student Dashboard
                      </button>
                      <button
                        type="button"
                        onClick={() => navigateToScreen('assignments')}
                        className="px-4 py-2.5 text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-100 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        View Updated Assignments List
                      </button>
                      <button
                        type="button"
                        onClick={() => navigateToScreen('details', selectedAssignment.id)}
                        className="px-4 py-2.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        &larr; Submit a New Revision
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="px-4 py-2.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Print Receipt as PDF
                    </button>
                  </div>
                </div>
              </article>
            )}
          </div>
        </section>

        {/* =====================================================================
            UX CASE STUDY SECTION (ALL 8 SECTIONS + DESIGN SYSTEM)
           ===================================================================== */}
        <UxCaseStudy
          onSelectScreen={(screenId) => {
            setShowAllScreensStacked(false);
            navigateToScreen(screenId);
          }}
        />
      </main>

      {/* Quiet Portfolio Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-6 px-6 text-xs text-slate-600">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <strong>StudentFlow — Task 06: High-Fidelity Prototype &amp; UX Case Study</strong> · Front-End Portfolio
            Artifact (Sample Data Only · No Live Backend)
          </div>
          <div className="flex items-center gap-4 no-print">
            <a href="#top" className="text-blue-700 hover:underline">
              Back to Top &uarr;
            </a>
            <button
              type="button"
              onClick={downloadStandaloneHtmlFile}
              className="text-blue-700 hover:underline cursor-pointer"
            >
              Download Single-File HTML
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="text-blue-700 hover:underline cursor-pointer"
            >
              Print / Export PDF
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
