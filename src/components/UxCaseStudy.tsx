import React from 'react';

export type PrototypeScreenId = 'login' | 'dashboard' | 'assignments' | 'details' | 'confirmation';

interface UxCaseStudyProps {
  onSelectScreen: (screen: PrototypeScreenId) => void;
}

export const UxCaseStudy: React.FC<UxCaseStudyProps> = ({ onSelectScreen }) => {
  return (
    <section
      id="case-study"
      aria-labelledby="case-study-main-heading"
      className="mt-16 pt-12 border-t border-slate-300 space-y-12"
    >
      {/* Case Study Header */}
      <div className="max-w-4xl">
        <p className="text-xs font-mono text-slate-600 mb-2">
          UX Portfolio Case Study · Task 06 · Research &amp; Architectural Documentation
        </p>
        <h2
          id="case-study-main-heading"
          className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 text-balance mb-4"
        >
          UX Case Study: Designing a Transparent, Low-Anxiety Coursework Submission Flow
        </h2>
        <p className="text-base text-slate-700 leading-relaxed font-serif">
          This case study documents the end-to-end interaction design process for{' '}
          <strong className="font-semibold text-slate-900">StudentFlow</strong>, a student education portal focused on
          deadline clarity, pre-flight deliverable validation, and verifiable submission receipts. In accordance with
          research integrity standards, all proto-personas, behavioral hypotheses, and sample academic data are
          explicitly labeled as unvalidated design assumptions pending formal usability testing.
        </p>
      </div>

      {/* Case Study Table of Contents */}
      <nav
        aria-label="Case Study Sections"
        className="bg-white border border-slate-200 rounded-lg p-5 no-print"
      >
        <p className="text-xs font-semibold text-slate-900 mb-3">
          Case Study Index (Click to jump to section)
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-2 gap-x-6 text-sm">
          <a href="#cs-01-overview" className="text-blue-700 hover:underline whitespace-nowrap truncate">
            01. Project Overview
          </a>
          <a href="#cs-02-problem" className="text-blue-700 hover:underline whitespace-nowrap truncate">
            02. Problem Statement
          </a>
          <a href="#cs-03-users" className="text-blue-700 hover:underline whitespace-nowrap truncate">
            03. Target Users (Proto-Personas)
          </a>
          <a href="#cs-04-goals" className="text-blue-700 hover:underline whitespace-nowrap truncate">
            04. Design Goals
          </a>
          <a href="#cs-05-decisions" className="text-blue-700 hover:underline whitespace-nowrap truncate">
            05. Key Design Decisions
          </a>
          <a href="#user-flow" className="text-blue-700 hover:underline whitespace-nowrap truncate">
            06. Main User Flow
          </a>
          <a href="#cs-07-accessibility" className="text-blue-700 hover:underline whitespace-nowrap truncate">
            07. Accessibility Considerations
          </a>
          <a href="#cs-08-limitations" className="text-blue-700 hover:underline whitespace-nowrap truncate">
            08. Limitations &amp; Future Work
          </a>
        </div>
      </nav>

      {/* 01. Project Overview & 02. Problem Statement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 print-avoid-break">
        <article id="cs-01-overview" className="bg-white border border-slate-200 rounded-lg p-6 md:p-8">
          <p className="text-xs font-mono text-slate-500 mb-1">Section 01 of 08</p>
          <h3 className="text-xl font-bold text-slate-900 mb-3">01. Project Overview</h3>
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            <strong>StudentFlow</strong> is a high-fidelity interactive front-end prototype created for Task 06 to
            demonstrate how a restrained, task-focused design system can simplify university coursework management.
            Rather than replicating sprawling administrative Learning Management Systems (LMS), StudentFlow focuses on
            the core student journey: authenticating, triaging upcoming deadlines, reviewing assignment criteria,
            validating deliverables before upload, and obtaining an immutable confirmation receipt.
          </p>
          <dl className="border-t border-slate-200 pt-4 space-y-2.5 text-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <dt className="font-semibold text-slate-900">Project Scope</dt>
              <dd className="text-slate-600">5 Interactive Screens + End-to-End Submission Flow</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-t border-slate-100 pt-2">
              <dt className="font-semibold text-slate-900">Role &amp; Discipline</dt>
              <dd className="text-slate-600">UX Architecture, Interaction Design, Accessibility Engineering</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-t border-slate-100 pt-2">
              <dt className="font-semibold text-slate-900">Technical Environment</dt>
              <dd className="text-slate-600">Client-Side Interactive Prototype (No Live Backend / Database)</dd>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-t border-slate-100 pt-2">
              <dt className="font-semibold text-slate-900">Data Classification</dt>
              <dd className="text-slate-600">100% Fictional Sample Content (Explicitly Labeled)</dd>
            </div>
          </dl>
        </article>

        <article id="cs-02-problem" className="bg-white border border-slate-200 rounded-lg p-6 md:p-8">
          <p className="text-xs font-mono text-slate-500 mb-1">Section 02 of 08</p>
          <h3 className="text-xl font-bold text-slate-900 mb-3">02. Problem Statement</h3>
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            University students enrolled in multiple concurrent courses must track dozens of deliverables with varying file
            format constraints, grading rubrics, and submission cutoffs. Legacy education portals frequently introduce
            three preventable friction points:
          </p>
          <ol className="space-y-3 text-sm text-slate-700 list-decimal list-inside">
            <li>
              <strong className="text-slate-900">Fragmented Deadline Visibility:</strong> Course deliverables are buried
              inside per-course syllabus pages or module trees, forcing students to manually cross-reference due dates.
            </li>
            <li>
              <strong className="text-slate-900">Disconnected Rubrics &amp; Silent Upload Failures:</strong> Grading
              criteria are separated from the submission form, and file format or Academic Integrity errors are only
              revealed after page reloads.
            </li>
            <li>
              <strong className="text-slate-900">Post-Submission Uncertainty:</strong> After clicking submit, students
              often see a transient banner without a persistent receipt number, timestamp, or file verification hash,
              driving unnecessary repeat submissions and emails to instructors.
            </li>
          </ol>
        </article>
      </div>

      {/* 03. Target Users (Unvalidated Proto-Personas) */}
      <article id="cs-03-users" className="bg-white border border-slate-200 rounded-lg p-6 md:p-8 print-avoid-break">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-4">
          <div>
            <p className="text-xs font-mono text-slate-500 mb-1">Section 03 of 08</p>
            <h3 className="text-xl font-bold text-slate-900">03. Target Users &amp; Proto-Personas</h3>
          </div>
          <p className="text-xs font-mono text-slate-600">
            Research Status: Unvalidated Proto-Personas (Assumptions Pending User Interviews)
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-md p-4 mb-6 text-xs text-slate-700 leading-relaxed">
          <strong className="text-slate-900">Methodological Transparency Notice:</strong> The two proto-personas below
          were synthesized from secondary academic literature on LMS usability and heuristic assumptions. They have{' '}
          <strong>not yet been validated</strong> through primary ethnographic interviews or diary studies with real
          students.
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-slate-200 rounded-md p-5">
            <p className="text-xs font-mono text-blue-700 mb-1">
              Proto-Persona 01 · Unvalidated Design Assumption
            </p>
            <h4 className="text-base font-bold text-slate-900 mb-1">
              Maya Lin — Full-Time Undergraduate Student
            </h4>
            <p className="text-xs text-slate-600 mb-4">
              Age 20 · Junior in B.S. Human-Computer Interaction · Enrolled in 4 courses (16.0 credits)
            </p>
            <div className="space-y-3 text-sm text-slate-700 border-t border-slate-200 pt-3">
              <p>
                <strong className="text-slate-900">Assumed Context &amp; Behaviors:</strong> Works across studio design
                projects, programming labs, and statistical problem sets. Frequently switches between desktop lab
                machines and a personal laptop.
              </p>
              <p>
                <strong className="text-slate-900">Assumed Pain Points:</strong> Worries about overlooking a multi-part
                deliverable requirement or uploading an older draft PDF when rushing before an 11:59 PM deadline.
              </p>
              <p>
                <strong className="text-slate-900">Core Needs in StudentFlow:</strong> A single priority deadline card
                on the dashboard, side-by-side rubric inspection during file upload, and an explicit SHA-256 / file
                name confirmation screen.
              </p>
            </div>
          </div>

          <div className="border border-slate-200 rounded-md p-5">
            <p className="text-xs font-mono text-blue-700 mb-1">
              Proto-Persona 02 · Unvalidated Design Assumption
            </p>
            <h4 className="text-base font-bold text-slate-900 mb-1">
              Marcus Vance — Part-Time Working &amp; Commuter Student
            </h4>
            <p className="text-xs text-slate-600 mb-4">
              Age 26 · Evening Degree Candidate · Works 25 hrs/week · Keyboard-first &amp; mobile/tablet reader
            </p>
            <div className="space-y-3 text-sm text-slate-700 border-t border-slate-200 pt-3">
              <p>
                <strong className="text-slate-900">Assumed Context &amp; Behaviors:</strong> Reviews assignment
                instructions during transit on smaller viewports and completes submissions late in the evening using
                keyboard navigation.
              </p>
              <p>
                <strong className="text-slate-900">Assumed Pain Points:</strong> Low-contrast UI text, decorative
                animations that slow down navigation, and cryptic form validation errors that do not explain how to fix
                an invalid input.
              </p>
              <p>
                <strong className="text-slate-900">Core Needs in StudentFlow:</strong> High-contrast typography,
                predictable keyboard focus order, ability to save a draft note, and a printable/downloadable PDF receipt
                for personal records.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* 04. Design Goals & 05. Key Design Decisions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 print-avoid-break">
        <article id="cs-04-goals" className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-6 md:p-8">
          <p className="text-xs font-mono text-slate-500 mb-1">Section 04 of 08</p>
          <h3 className="text-xl font-bold text-slate-900 mb-3">04. Design Goals</h3>
          <p className="text-xs text-slate-500 mb-4">
            Target criteria guiding the architecture of the 5 prototype screens:
          </p>
          <ul className="space-y-4 text-sm text-slate-700">
            <li className="border-b border-slate-100 pb-3">
              <strong className="block text-slate-900">01. Zero-Ambiguity Deadline Triage</strong>
              Surface the next urgent deliverable immediately upon login on the Student Dashboard with direct 1-click
              access to its submission workspace.
            </li>
            <li className="border-b border-slate-100 pb-3">
              <strong className="block text-slate-900">02. Context-Preserving Submission</strong>
              Keep assignment instructions, accepted file formats, and the point-by-point grading rubric visible on the
              same screen as the file upload and reflection form.
            </li>
            <li className="border-b border-slate-100 pb-3">
              <strong className="block text-slate-900">03. Constructive Pre-Flight Validation</strong>
              Validate email format, file format extensions, minimum reflection note length, and academic honor code
              acknowledgment before allowing submission, providing clear remediation copy.
            </li>
            <li>
              <strong className="block text-slate-900">04. Verifiable Completion &amp; Printability</strong>
              Provide a structured receipt with a unique ID, timestamp, and print stylesheet so students can save a PDF
              record of their submission.
            </li>
          </ul>
        </article>

        <article id="cs-05-decisions" className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 md:p-8">
          <p className="text-xs font-mono text-slate-500 mb-1">Section 05 of 08</p>
          <h3 className="text-xl font-bold text-slate-900 mb-3">05. Key Design Decisions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold text-slate-600 bg-slate-50">
                  <th className="py-2.5 px-3">Screen &amp; Feature</th>
                  <th className="py-2.5 px-3">Design Decision</th>
                  <th className="py-2.5 px-3">UX Rationale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr>
                  <td className="py-3 px-3 font-medium text-slate-900 whitespace-nowrap">02. Dashboard</td>
                  <td className="py-3 px-3">Priority Next-Due Spotlight above course table</td>
                  <td className="py-3 px-3">
                    Reduces cognitive load by separating urgent action items (due within 48 hours) from general course
                    browsing.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-medium text-slate-900 whitespace-nowrap">03. Assignments</td>
                  <td className="py-3 px-3">Unboxed semantic status text + tabular due dates</td>
                  <td className="py-3 px-3">
                    Avoids decorative colored pills that rely on hue alone; pairs explicit text labels with vertically
                    aligned tabular numerals.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-medium text-slate-900 whitespace-nowrap">04. Submission</td>
                  <td className="py-3 px-3">
                    2-column split + live Submission Readiness Progress bar &amp; step checklist
                  </td>
                  <td className="py-3 px-3">
                    Eliminates tab-switching while providing immediate visual feedback on task completion as students
                    attach a valid file, write a 20+ character reflection, and accept the Honor Code.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-medium text-slate-900 whitespace-nowrap">05. Confirmation</td>
                  <td className="py-3 px-3">Immutable Receipt Table + Revision Trigger</td>
                  <td className="py-3 px-3">
                    Directly addresses post-submission anxiety by displaying the exact file name, size, timestamp, and
                    receipt ID (#SF-2026-1103-8942).
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
      </div>

      {/* 06. Main User Flow */}
      <article id="user-flow" className="bg-white border border-slate-200 rounded-lg p-6 md:p-8 print-avoid-break">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-6">
          <div>
            <p className="text-xs font-mono text-slate-500 mb-1">Section 06 of 08</p>
            <h3 className="text-xl font-bold text-slate-900">06. Main User Flow Architecture</h3>
          </div>
          <p className="text-xs text-slate-600 no-print">
            Click any step below to open that screen directly in the interactive prototype above.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              step: 'Step 01',
              id: 'login' as PrototypeScreenId,
              title: 'Login / Sign Up',
              action: 'Enter university email & password (or create account).',
              validation: 'Checks valid @domain email & 8+ char password.',
              next: 'Advances to Dashboard',
            },
            {
              step: 'Step 02',
              id: 'dashboard' as PrototypeScreenId,
              title: 'Student Dashboard',
              action: 'Review 4-course KPI summary & Priority Next-Due Spotlight.',
              validation: 'Displays live counts of pending vs. submitted tasks.',
              next: 'Advances to Assignments or Details',
            },
            {
              step: 'Step 03',
              id: 'assignments' as PrototypeScreenId,
              title: 'Assignments List',
              action: 'Filter by course (HCI-304, CS-210, etc.) or submission status.',
              validation: 'Shows explicit text states & due dates in tabular numerals.',
              next: 'Selects task for Details',
            },
            {
              step: 'Step 04',
              id: 'details' as PrototypeScreenId,
              title: 'Details & Submission',
              action: 'Inspect 100-pt rubric, attach deliverable file, write reflection, accept Honor Code.',
              validation: 'Blocks empty files, unsupported extensions (.exe), or short notes (<20 chars).',
              next: 'Submits to Confirmation',
            },
            {
              step: 'Step 05',
              id: 'confirmation' as PrototypeScreenId,
              title: 'Confirmation Receipt',
              action: 'Verify Receipt ID, timestamp, file hash, or print PDF copy.',
              validation: 'Updates global state across Dashboard & Assignments table.',
              next: 'Loop complete / Resubmit option',
            },
          ].map((node) => (
            <div
              key={node.step}
              className="border border-slate-200 rounded-md p-4 flex flex-col justify-between bg-slate-50"
            >
              <div>
                <p className="text-xs font-mono font-semibold text-blue-700 mb-1">{node.step}</p>
                <h4 className="text-sm font-bold text-slate-900 mb-2">{node.title}</h4>
                <p className="text-xs text-slate-700 mb-2">
                  <strong className="text-slate-900">User Action:</strong> {node.action}
                </p>
                <p className="text-xs text-slate-600 mb-3">
                  <strong className="text-slate-800">System Rule:</strong> {node.validation}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
                <span className="text-xs font-mono text-slate-500">{node.next}</span>
                <button
                  type="button"
                  onClick={() => {
                    onSelectScreen(node.id);
                    window.scrollTo({ top: 0, behavior: 'auto' });
                  }}
                  className="text-xs font-semibold text-blue-700 hover:underline whitespace-nowrap shrink-0 no-print"
                >
                  Open Screen &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </article>

      {/* 07. Accessibility Considerations & 08. Limitations and Future Improvements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 print-avoid-break">
        <article id="cs-07-accessibility" className="bg-white border border-slate-200 rounded-lg p-6 md:p-8">
          <p className="text-xs font-mono text-slate-500 mb-1">Section 07 of 08</p>
          <h3 className="text-xl font-bold text-slate-900 mb-3">07. Accessibility Considerations (WCAG 2.1 AA)</h3>
          <ul className="space-y-3 text-sm text-slate-700">
            <li>
              <strong className="text-slate-900">Verified Contrast Ratios:</strong> Primary body text (
              <code className="font-mono text-xs">#0F172A</code> on <code className="font-mono text-xs">#FFFFFF</code>)
              achieves <span className="font-mono tabular-nums font-semibold">19.3:1</span>; secondary text (
              <code className="font-mono text-xs">#334155</code>) achieves{' '}
              <span className="font-mono tabular-nums font-semibold">10.4:1</span>; primary blue action buttons (
              <code className="font-mono text-xs">#FFFFFF</code> on <code className="font-mono text-xs">#1D4ED8</code>)
              achieve <span className="font-mono tabular-nums font-semibold">6.7:1</span> (exceeding the 4.5:1 AA
              requirement).
            </li>
            <li>
              <strong className="text-slate-900">Programmatic Form Labels &amp; Error Association:</strong> Every input
              control includes an explicit <code className="font-mono text-xs">&lt;label htmlFor&gt;</code>,{' '}
              <code className="font-mono text-xs">aria-invalid</code> state, and error descriptions linked via{' '}
              <code className="font-mono text-xs">aria-describedby</code> and <code className="font-mono text-xs">role=&quot;alert&quot;</code>.
            </li>
            <li>
              <strong className="text-slate-900">Visible Keyboard Focus Indicators:</strong> All interactive controls
              enforce a high-visibility <code className="font-mono text-xs">2px solid #1D4ED8</code> focus outline with
              a <code className="font-mono text-xs">2px</code> offset.
            </li>
            <li>
              <strong className="text-slate-900">Non-Color State Signaling &amp; Zero Motion:</strong> Assignment status
              is never communicated by color alone—every row uses explicit text descriptors (e.g.,{' '}
              <em>Action Required · Due in 2 days</em>). All CSS animations and transitions are disabled to respect
              vestibular sensitivity and cognitive focus.
            </li>
          </ul>
        </article>

        <article id="cs-08-limitations" className="bg-white border border-slate-200 rounded-lg p-6 md:p-8">
          <p className="text-xs font-mono text-slate-500 mb-1">Section 08 of 08</p>
          <h3 className="text-xl font-bold text-slate-900 mb-3">08. Limitations &amp; Future Improvements</h3>
          <div className="space-y-4 text-sm text-slate-700">
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Current Technical &amp; Research Limitations</h4>
              <ul className="list-disc list-inside space-y-1.5">
                <li>
                  <strong>No Live Backend or Database Persistence:</strong> This prototype runs strictly in local client
                  memory. Refreshing the browser resets state to the initial sample dataset unless saved locally.
                </li>
                <li>
                  <strong>Simulated File Storage &amp; Checksums:</strong> File attachments read local file metadata
                  (filename and byte size) in the browser but do not upload files to a cloud server.
                </li>
                <li>
                  <strong>Unvalidated Research Assumptions:</strong> Proto-personas and task completion hypotheses have
                  not yet been tested with a representative university cohort.
                </li>
              </ul>
            </div>
            <div className="border-t border-slate-200 pt-3">
              <h4 className="font-semibold text-slate-900 mb-1">Future Validation &amp; Product Roadmap</h4>
              <ul className="list-disc list-inside space-y-1.5">
                <li>
                  Conduct moderated think-aloud usability sessions with 8–10 undergraduate and part-time students to
                  measure task completion time and error recovery rates.
                </li>
                <li>
                  Audit screen-reader navigation workflows with NVDA and VoiceOver users across the 5-step submission
                  journey.
                </li>
                <li>
                  Add side-by-side version history comparing earlier draft uploads against final submissions.
                </li>
              </ul>
            </div>
          </div>
        </article>
      </div>

      {/* Design System & Reusable Component Rules */}
      <article id="design-system" className="bg-white border border-slate-200 rounded-lg p-6 md:p-8 print-avoid-break">
        <p className="text-xs font-mono text-slate-500 mb-1">Appendix · Design System Specification</p>
        <h3 className="text-xl font-bold text-slate-900 mb-4">
          Restrained Blue &amp; Neutral Design System (60-30-10 Token Architecture)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="border border-slate-200 rounded-md p-4">
            <h4 className="font-bold text-slate-900 mb-2">01. Color Palette &amp; Contrast</h4>
            <ul className="space-y-2 text-xs text-slate-700 font-mono">
              <li className="flex items-center justify-between">
                <span>Canvas (60%): #F8FAFC</span>
                <span className="w-5 h-5 bg-slate-50 border border-slate-300 inline-block" aria-hidden="true" />
              </li>
              <li className="flex items-center justify-between">
                <span>Surface (30%): #FFFFFF / #E2E8F0</span>
                <span className="w-5 h-5 bg-white border border-slate-300 inline-block" aria-hidden="true" />
              </li>
              <li className="flex items-center justify-between">
                <span>Primary Ink: #0F172A (19.3:1)</span>
                <span className="w-5 h-5 bg-slate-900 inline-block" aria-hidden="true" />
              </li>
              <li className="flex items-center justify-between">
                <span>Primary Accent (10%): #1D4ED8</span>
                <span className="w-5 h-5 bg-blue-700 inline-block" aria-hidden="true" />
              </li>
              <li className="flex items-center justify-between">
                <span>Semantic Error: #B91C1C</span>
                <span className="w-5 h-5 bg-red-700 inline-block" aria-hidden="true" />
              </li>
              <li className="flex items-center justify-between">
                <span>Semantic Confirmed: #15803D</span>
                <span className="w-5 h-5 bg-green-700 inline-block" aria-hidden="true" />
              </li>
            </ul>
          </div>

          <div className="border border-slate-200 rounded-md p-4">
            <h4 className="font-bold text-slate-900 mb-2">02. Typography Pairing (2+1 Rule)</h4>
            <ul className="space-y-2 text-xs text-slate-700">
              <li>
                <strong className="text-slate-900">UI &amp; Display Sans:</strong>{' '}
                <span className="font-sans">Plus Jakarta Sans (400, 500, 600, 700)</span> — Used for navigation, form
                labels, tables, and headings.
              </li>
              <li>
                <strong className="text-slate-900">Editorial Case Study Prose:</strong>{' '}
                <span className="font-serif">Source Serif 4 (400, 600)</span> — Used for long-form case study leads and
                reflective reading comfort.
              </li>
              <li>
                <strong className="text-slate-900">Tabular Data &amp; Receipts:</strong>{' '}
                <span className="font-mono tabular-nums">IBM Plex Mono (tabular-nums)</span> — Enforced on all dates,
                point totals, GPA metrics, and receipt IDs.
              </li>
            </ul>
          </div>

          <div className="border border-slate-200 rounded-md p-4">
            <h4 className="font-bold text-slate-900 mb-2">03. Component &amp; Restraint Rules</h4>
            <ul className="space-y-2 text-xs text-slate-700">
              <li>
                <strong className="text-slate-900">Single-Elevation Containers:</strong> Flat white panels with{' '}
                <code className="font-mono">1px solid #E2E8F0</code> borders; zero nested card-in-card clutter.
              </li>
              <li>
                <strong className="text-slate-900">Unboxed Metadata:</strong> Course codes, dates, and status labels use
                clean typographic separators (<code className="font-mono">·</code>) rather than decorative pill badges.
              </li>
              <li>
                <strong className="text-slate-900">Zero Motion or Gradients:</strong> No decorative transitions,
                gradients, or non-functional icons.
              </li>
            </ul>
          </div>
        </div>
      </article>
    </section>
  );
};
