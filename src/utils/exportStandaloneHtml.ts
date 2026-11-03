export function downloadStandaloneHtmlFile(): void {
  const htmlContent = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>StudentFlow — Task 06: High-Fidelity Prototype &amp; UX Case Study</title>
  <style>
    :root {
      --bg-canvas: #f8fafc;
      --bg-surface: #ffffff;
      --bg-subtle: #f1f5f9;
      --text-primary: #0f172a;
      --text-secondary: #334155;
      --text-muted: #475569;
      --border-color: #cbd5e1;
      --border-subtle: #e2e8f0;
      --accent-blue: #1d4ed8;
      --accent-blue-hover: #1e40af;
      --accent-blue-soft: #eff6ff;
      --status-error: #b91c1c;
      --status-error-bg: #fef2f2;
      --status-success: #15803d;
      --status-success-bg: #f0fdf4;
      --font-sans: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      --font-serif: "Source Serif 4", Georgia, serif;
      --font-mono: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
    }
    * { box-sizing: border-box; animation: none !important; transition: none !important; }
    body {
      margin: 0;
      font-family: var(--font-sans);
      background: var(--bg-canvas);
      color: var(--text-primary);
      line-height: 1.6;
      font-size: 15px;
    }
    :focus-visible {
      outline: 2px solid var(--accent-blue) !important;
      outline-offset: 2px !important;
    }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
    .topbar {
      background: var(--bg-surface);
      border-bottom: 1px solid var(--border-subtle);
      padding: 16px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 32px;
    }
    .brand { font-weight: 700; font-size: 18px; color: var(--text-primary); text-decoration: none; white-space: nowrap; }
    .nav-links { display: flex; gap: 24px; }
    .nav-links a { color: var(--text-secondary); text-decoration: none; font-size: 14px; font-weight: 500; white-space: nowrap; }
    .nav-links a:hover { color: var(--accent-blue); text-decoration: underline; }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 600;
      border-radius: 6px;
      border: 1px solid transparent;
      cursor: pointer;
      font-family: inherit;
      white-space: nowrap;
      text-decoration: none;
    }
    .btn-primary { background: var(--accent-blue); color: #ffffff; }
    .btn-primary:hover { background: var(--accent-blue-hover); }
    .btn-secondary { background: var(--bg-surface); color: var(--text-primary); border-color: var(--border-color); }
    .btn-secondary:hover { background: var(--bg-subtle); }
    .panel {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 24px;
    }
    .stepper {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 12px;
      background: var(--bg-subtle);
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .step-btn {
      padding: 8px 14px;
      font-size: 13px;
      font-weight: 600;
      border-radius: 6px;
      border: 1px solid transparent;
      background: transparent;
      color: var(--text-secondary);
      cursor: pointer;
    }
    .step-btn.active {
      background: var(--bg-surface);
      color: var(--accent-blue);
      border-color: var(--border-color);
    }
    .screen { display: none; }
    .screen.active { display: block; }
    .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; }
    .grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
    .field { margin-bottom: 16px; }
    .field label { display: block; font-weight: 600; font-size: 14px; margin-bottom: 6px; color: var(--text-primary); }
    .field input[type="text"], .field input[type="email"], .field input[type="password"], .field input[type="url"], .field select, .field textarea {
      width: 100%;
      padding: 10px 12px;
      font-size: 14px;
      border: 1px solid var(--border-color);
      border-radius: 6px;
      font-family: inherit;
      background: #ffffff;
      color: var(--text-primary);
    }
    .error-msg {
      color: var(--status-error);
      background: var(--status-error-bg);
      border: 1px solid #fecaca;
      padding: 10px 12px;
      border-radius: 6px;
      font-size: 13px;
      margin-top: 6px;
      display: none;
    }
    .error-msg.visible { display: block; }
    table { width: 100%; border-collapse: collapse; font-size: 14px; }
    th, td { text-align: left; padding: 12px; border-bottom: 1px solid var(--border-subtle); vertical-align: top; }
    th { font-weight: 600; color: var(--text-secondary); background: var(--bg-subtle); }
    .tabular { font-variant-numeric: tabular-nums; font-family: var(--font-mono); font-size: 13px; }
    .meta-line { font-size: 13px; color: var(--text-muted); margin-bottom: 12px; }
    @media print {
      .no-print { display: none !important; }
      .screen { display: block !important; page-break-after: always; }
      body { background: #ffffff; }
    }
  </style>
</head>
<body>
  <header class="topbar">
    <a href="#top" class="brand">StudentFlow</a>
    <nav class="nav-links no-print" aria-label="Primary Sections">
      <a href="#prototype">Prototype</a>
      <a href="#case-study">Case Study</a>
      <a href="#user-flow">User Flow</a>
      <a href="#accessibility">Accessibility</a>
    </nav>
    <button type="button" class="btn btn-primary no-print" onclick="window.print()">Print / Save PDF</button>
  </header>

  <main class="container" id="top">
    <section style="padding: 32px 0 16px;">
      <p class="meta-line">UX Portfolio Deliverable · Task 06 · Sample Prototype Environment (No Live Backend)</p>
      <h1 style="font-size: 30px; margin: 0 0 12px;">StudentFlow — Task 06: High-Fidelity Prototype &amp; UX Case Study</h1>
      <p style="color: var(--text-secondary); max-width: 75ch; margin: 0;">
        An interactive, accessible 5-screen student education portal prototype and UX case study demonstrating the core submission workflow:
        Login &rarr; Dashboard &rarr; Assignments &rarr; Assignment Details &amp; Submission &rarr; Confirmation.
      </p>
    </section>

    <section id="prototype" aria-labelledby="proto-heading">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:12px;">
        <h2 id="proto-heading" style="font-size: 20px; margin: 0;">Interactive 5-Screen Prototype</h2>
        <span class="meta-line" style="margin:0;">Sample Data Notice: Fictional student records for Maya Lin (ID: NB-2026-0419)</span>
      </div>

      <nav class="stepper no-print" aria-label="Prototype Screen Switcher">
        <button type="button" class="step-btn active" id="tab-1" onclick="showScreen(1)">01. Login / Sign Up</button>
        <button type="button" class="step-btn" id="tab-2" onclick="showScreen(2)">02. Student Dashboard</button>
        <button type="button" class="step-btn" id="tab-3" onclick="showScreen(3)">03. Assignments List</button>
        <button type="button" class="step-btn" id="tab-4" onclick="showScreen(4)">04. Assignment Details &amp; Submit</button>
        <button type="button" class="step-btn" id="tab-5" onclick="showScreen(5)">05. Confirmation</button>
      </nav>

      <!-- SCREEN 1: LOGIN -->
      <article class="panel screen active" id="screen-1">
        <p class="meta-line">Screen 01 of 05 · Institutional Authentication</p>
        <h3 style="margin-top:0;">Sign In to StudentFlow Portal</h3>
        <p style="color:var(--text-secondary);">Use your university email address or populate the sample student credentials below.</p>
        <form onsubmit="handleLogin(event)" novalidate style="max-width: 480px;">
          <div class="field">
            <label for="login-email">University Email Address (Required)</label>
            <input type="email" id="login-email" value="maya.lin@northbridge.edu" required />
            <div id="err-email" class="error-msg" role="alert">Enter a valid institutional email containing '@' (e.g., maya.lin@northbridge.edu).</div>
          </div>
          <div class="field">
            <label for="login-password">Portal Password (Required, minimum 8 characters)</label>
            <input type="password" id="login-password" value="StudentFlow2026" required />
            <div id="err-password" class="error-msg" role="alert">Password must be at least 8 characters long.</div>
          </div>
          <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:20px;">
            <button type="submit" class="btn btn-primary">Sign In to Dashboard &rarr;</button>
            <button type="button" class="btn btn-secondary" onclick="fillSampleLogin()">Reset Sample Credentials</button>
          </div>
        </form>
      </article>

      <!-- SCREEN 2: DASHBOARD -->
      <article class="panel screen" id="screen-2">
        <p class="meta-line">Screen 02 of 05 · Student Dashboard · Maya Lin (B.S. HCI · Sample Profile)</p>
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:20px;">
          <h3 style="margin:0;">Fall 2026 Academic Overview</h3>
          <div style="display:flex; gap:8px;">
            <button type="button" class="btn btn-primary" onclick="showScreen(3)">View Assignments List &rarr;</button>
            <button type="button" class="btn btn-secondary" onclick="showScreen(1)">Sign Out</button>
          </div>
        </div>
        <div class="grid-4" style="margin-bottom:24px;">
          <div class="panel" style="margin:0; padding:16px;">
            <div class="meta-line">Enrolled Courses</div>
            <div class="tabular" style="font-size:22px; font-weight:700;">4 Courses</div>
            <div class="meta-line" style="margin:4px 0 0;">16.0 Credits · Fall 2026</div>
          </div>
          <div class="panel" style="margin:0; padding:16px;">
            <div class="meta-line">Due Within 7 Days</div>
            <div class="tabular" style="font-size:22px; font-weight:700;" id="dash-due-count">2 Pending</div>
            <div class="meta-line" style="margin:4px 0 0;">Next: Nov 05, 11:59 PM</div>
          </div>
          <div class="panel" style="margin:0; padding:16px;">
            <div class="meta-line">Term Submissions</div>
            <div class="tabular" style="font-size:22px; font-weight:700;" id="dash-sub-count">11 / 14</div>
            <div class="meta-line" style="margin:4px 0 0;">On-time completion</div>
          </div>
          <div class="panel" style="margin:0; padding:16px;">
            <div class="meta-line">Cumulative Standing</div>
            <div class="tabular" style="font-size:22px; font-weight:700;">3.85 / 4.00</div>
            <div class="meta-line" style="margin:4px 0 0;">Sample GPA Metric</div>
          </div>
        </div>
        <div class="panel" style="background:var(--accent-blue-soft); border-color:#bfdbfe;">
          <p class="meta-line" style="color:var(--accent-blue); font-weight:600;">Priority Next Deadline · HCI-304 Interaction Design Studio II</p>
          <h4 style="margin:0 0 8px; font-size:18px;">Task 04: Usability Testing &amp; Heuristic Evaluation Report</h4>
          <p style="margin:0 0 16px; color:var(--text-secondary);">Due Nov 05, 2026 at 11:59 PM EST · 100 Points (20% of course grade) · Accepted formats: PDF, DOCX, ZIP</p>
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button type="button" class="btn btn-primary" onclick="showScreen(4)">Open Assignment &amp; Submit Work &rarr;</button>
            <button type="button" class="btn btn-secondary" onclick="showScreen(3)">Browse All Coursework</button>
          </div>
        </div>
      </article>

      <!-- SCREEN 3: ASSIGNMENTS LIST -->
      <article class="panel screen" id="screen-3">
        <p class="meta-line">Screen 03 of 05 · Coursework &amp; Deadlines Directory</p>
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:16px;">
          <h3 style="margin:0;">All Assignments (Fall 2026 — Sample Data)</h3>
          <button type="button" class="btn btn-secondary" onclick="showScreen(2)">&larr; Back to Dashboard</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Course &amp; Deliverable</th>
              <th>Due Date</th>
              <th>Weight</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>HCI-304 · Task 04: Usability Testing &amp; Heuristic Evaluation Report</strong><br/><span class="meta-line">Dr. Elena Rostova (Sample)</span></td>
              <td class="tabular">Nov 05, 2026 · 11:59 PM</td>
              <td class="tabular">100 pts (20%)</td>
              <td id="row-status-hci04">Action Required · Due in 2 days</td>
              <td><button type="button" class="btn btn-primary" onclick="showScreen(4)">Review &amp; Submit &rarr;</button></td>
            </tr>
            <tr>
              <td><strong>CS-210 · Lab 05: Balanced Binary Search Trees &amp; AVL Rotations</strong><br/><span class="meta-line">Prof. Marcus Thorne (Sample)</span></td>
              <td class="tabular">Nov 08, 2026 · 11:59 PM</td>
              <td class="tabular">100 pts (15%)</td>
              <td>Draft Saved · Due in 5 days</td>
              <td><button type="button" class="btn btn-secondary" onclick="showScreen(4)">Edit Submission</button></td>
            </tr>
            <tr>
              <td><strong>STAT-201 · Problem Set 03: Confidence Intervals &amp; T-Tests</strong><br/><span class="meta-line">Dr. Arisudan Nair (Sample)</span></td>
              <td class="tabular">Nov 01, 2026 · 11:59 PM</td>
              <td class="tabular">50 pts (10%)</td>
              <td>Submitted · Receipt #SF-2026-1101-4410</td>
              <td><button type="button" class="btn btn-secondary" onclick="showScreen(5)">View Receipt</button></td>
            </tr>
          </tbody>
        </table>
      </article>

      <!-- SCREEN 4: ASSIGNMENT DETAILS & SUBMISSION -->
      <article class="panel screen" id="screen-4">
        <p class="meta-line">Screen 04 of 05 · Assignment Brief, Rubric &amp; Validated Submission</p>
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:16px;">
          <h3 style="margin:0;">HCI-304 · Task 04: Usability Testing &amp; Heuristic Evaluation Report</h3>
          <button type="button" class="btn btn-secondary" onclick="showScreen(3)">&larr; Back to Assignments List</button>
        </div>
        <div class="grid-2">
          <div>
            <h4 style="margin-top:0;">Instructions &amp; Deliverable Specification</h4>
            <p style="color:var(--text-secondary);">Conduct a heuristic evaluation of a student course registration flow against Nielsen’s 10 Usability Heuristics and synthesize findings from 3 moderated think-aloud sessions.</p>
            <ul>
              <li>Single compiled PDF report (maximum 25 MB, tagged headings).</li>
              <li>Severity ratings (0–4) for at least 8 findings with remediation wireframes.</li>
              <li>Self-reflection note (minimum 20 characters) summarizing key takeaways.</li>
            </ul>
            <h4>Grading Rubric (100 Points Total)</h4>
            <table>
              <thead><tr><th>Criterion</th><th>Points</th></tr></thead>
              <tbody>
                <tr><td>01. Heuristic Violation Analysis &amp; Severity Rigor</td><td class="tabular">30 pts</td></tr>
                <tr><td>02. Think-Aloud Protocol &amp; Empirical Synthesis</td><td class="tabular">30 pts</td></tr>
                <tr><td>03. Actionable Remediation Proposals</td><td class="tabular">25 pts</td></tr>
                <tr><td>04. Editorial Clarity &amp; Accessibility</td><td class="tabular">15 pts</td></tr>
              </tbody>
            </table>
          </div>
          <div>
            <h4 style="margin-top:0;">Submit Deliverable</h4>
            <div style="border:1px solid var(--border-subtle); border-radius:6px; padding:12px; margin-bottom:16px; background:var(--bg-canvas);">
              <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:600; margin-bottom:6px;">
                <span>Submission Readiness Progress</span>
                <span class="tabular" id="prog-label">3 of 3 Required Steps · 100%</span>
              </div>
              <div role="progressbar" aria-label="Assignment submission form completion" id="prog-bar-wrap" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%; height:10px; background:#e2e8f0; border:1px solid var(--border-color); border-radius:4px; overflow:hidden;">
                <div id="prog-bar-fill" style="height:100%; width:100%; background:var(--status-success);"></div>
              </div>
            </div>
            <form onsubmit="handleSubmission(event)" novalidate>
              <div class="field">
                <label for="sub-file">Selected Deliverable File (Required: .pdf, .docx, or .zip)</label>
                <input type="text" id="sub-file" value="Maya_Lin_HCI304_Report.pdf" oninput="updateProgress()" required />
                <div id="err-file" class="error-msg" role="alert">Attach a valid deliverable file (.pdf, .docx, or .zip) before submitting.</div>
              </div>
              <div class="field">
                <label for="sub-notes">Student Reflection &amp; Self-Assessment Note (Required, min 20 chars)</label>
                <textarea id="sub-notes" rows="4" oninput="updateProgress()" required>Evaluated the registration flow across all 10 heuristics and validated Severity 3 deadline confusion with 3 student participants.</textarea>
                <div id="err-notes" class="error-msg" role="alert">Please enter a reflection note of at least 20 characters for the instructor.</div>
              </div>
              <div class="field">
                <label style="display:flex; gap:8px; align-items:flex-start; font-weight:500;">
                  <input type="checkbox" id="sub-honor" checked onchange="updateProgress()" style="margin-top:4px;" />
                  <span>I confirm that this submission is my own original academic work in accordance with the university honor code. (Required)</span>
                </label>
                <div id="err-honor" class="error-msg" role="alert">You must accept the Academic Integrity Declaration to submit coursework.</div>
              </div>
              <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:16px;">
                <button type="submit" class="btn btn-primary">Submit Assignment &rarr;</button>
                <button type="button" class="btn btn-secondary" onclick="triggerEmptyValidation()">Test Validation Errors</button>
              </div>
            </form>
          </div>
        </div>
      </article>

      <!-- SCREEN 5: SUBMISSION CONFIRMATION -->
      <article class="panel screen" id="screen-5">
        <p class="meta-line">Screen 05 of 05 · Immutable Submission Verification Receipt</p>
        <div style="background:var(--status-success-bg); border:1px solid #bbf7d0; padding:16px; border-radius:6px; margin-bottom:20px;">
          <strong style="color:var(--status-success); display:block; font-size:16px;">Submission Confirmed &amp; Logged (Prototype State)</strong>
          <span style="color:var(--text-secondary); font-size:14px;">A digital receipt has been generated. Keep your Receipt ID for academic verification.</span>
        </div>
        <table>
          <tbody>
            <tr><th>Receipt ID</th><td class="tabular">SF-2026-1103-8942</td></tr>
            <tr><th>Student</th><td>Maya Lin · ID: NB-2026-0419 (Sample Data)</td></tr>
            <tr><th>Course &amp; Task</th><td>HCI-304 · Task 04: Usability Testing &amp; Heuristic Evaluation Report</td></tr>
            <tr><th>Submitted File</th><td class="tabular" id="conf-file">Maya_Lin_HCI304_Report.pdf (2.4 MB · SHA-256 Verified)</td></tr>
            <tr><th>Reflection Note</th><td id="conf-notes">Evaluated the registration flow across all 10 heuristics and validated Severity 3 deadline confusion with 3 student participants.</td></tr>
          </tbody>
        </table>
        <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:20px;">
          <button type="button" class="btn btn-primary" onclick="showScreen(2)">Return to Student Dashboard</button>
          <button type="button" class="btn btn-secondary" onclick="showScreen(3)">Return to Assignments List</button>
          <button type="button" class="btn btn-secondary" onclick="showScreen(4)">Submit New Revision</button>
        </div>
      </article>
    </section>

    <!-- UX CASE STUDY -->
    <section id="case-study" style="margin-top:48px;">
      <h2 style="font-size:24px; border-bottom:1px solid var(--border-subtle); padding-bottom:12px;">UX Case Study — StudentFlow Portal</h2>
      <div class="panel">
        <h3>01. Project Overview &amp; 02. Problem Statement</h3>
        <p><strong>Overview:</strong> StudentFlow is a high-fidelity interactive prototype exploring how university students discover upcoming coursework deadlines, inspect grading rubrics, validate submission files, and receive verifiable confirmation receipts.</p>
        <p><strong>Problem Statement:</strong> University students managing 4–5 concurrent courses frequently experience deadline fragmentation across syllabus documents and LMS tabs, unclear file format validation prior to submission, and post-submission anxiety caused by vague confirmation messages that lack verifiable timestamps or receipt numbers.</p>
      </div>
      <div class="panel">
        <h3>03. Target Users (Unvalidated Proto-Personas) &amp; 04. Design Goals</h3>
        <p><em>Disclaimer: The following proto-personas and benchmarks are design assumptions based on secondary academic literature and have not yet been validated through primary field interviews.</em></p>
        <ul>
          <li><strong>Proto-Persona A — Maya Lin (Full-Time Undergraduate, Junior):</strong> Balances studio and lecture courses; needs a unified deadline triage view and rubric-adjacent submission workspace.</li>
          <li><strong>Proto-Persona B — Marcus Vance (Working Commuter Student):</strong> Submits assignments under tight time constraints; relies on keyboard navigation, clear file validation errors, and downloadable submission receipts.</li>
          <li><strong>Design Goals:</strong> Streamline the 5-step core submission flow, provide explicit pre-flight form validation, maintain WCAG 2.1 AA contrast and keyboard focus, and eliminate decorative visual clutter.</li>
        </ul>
      </div>
      <div class="panel" id="user-flow">
        <h3>05. Key Design Decisions &amp; 06. Main User Flow</h3>
        <p><strong>Main User Flow:</strong> 01. Login / Sign Up (Credential Verification) &rarr; 02. Student Dashboard (Priority Deadline Triage) &rarr; 03. Assignments List (Course/Status Filtering) &rarr; 04. Assignment Details &amp; Submission (Split Brief/Rubric + Validated Form &amp; Live Readiness Progress Indicator) &rarr; 05. Submission Confirmation (Timestamped Receipt #SF-2026-1103-8942).</p>
      </div>
      <div class="panel" id="accessibility">
        <h3>07. Accessibility Considerations &amp; 08. Limitations and Future Improvements</h3>
        <p><strong>Accessibility:</strong> Built with semantic HTML landmarks, programmatic form labels, visible 2px blue focus outlines, 4.5:1+ text contrast, tabular numerals, non-color status text labels, and zero motion/animations.</p>
        <p><strong>Limitations &amp; Future Work:</strong> This prototype runs entirely in browser memory without a live LMS backend or persistent database. Future iterations will validate assumptions via moderated usability testing with 8–10 students and add multi-file diffing and offline draft synchronization.</p>
      </div>
    </section>
  </main>

  <script>
    function showScreen(num) {
      for (var i = 1; i <= 5; i++) {
        var el = document.getElementById('screen-' + i);
        var tab = document.getElementById('tab-' + i);
        if (el) el.className = (i === num) ? 'panel screen active' : 'panel screen';
        if (tab) tab.className = (i === num) ? 'step-btn active' : 'step-btn';
      }
    }
    function updateProgress() {
      var file = document.getElementById('sub-file').value.trim().toLowerCase();
      var notes = document.getElementById('sub-notes').value.trim();
      var honor = document.getElementById('sub-honor').checked;
      var fileOk = file.length > 0 && (file.endsWith('.pdf') || file.endsWith('.docx') || file.endsWith('.zip'));
      var notesOk = notes.length >= 20;
      var steps = (fileOk ? 1 : 0) + (notesOk ? 1 : 0) + (honor ? 1 : 0);
      var pct = Math.round((steps / 3) * 100);
      document.getElementById('prog-label').textContent = steps + ' of 3 Required Steps · ' + pct + '%';
      document.getElementById('prog-bar-fill').style.width = pct + '%';
      document.getElementById('prog-bar-fill').style.background = (pct === 100) ? 'var(--status-success)' : 'var(--accent-blue)';
      document.getElementById('prog-bar-wrap').setAttribute('aria-valuenow', String(pct));
    }
    function fillSampleLogin() {
      document.getElementById('login-email').value = 'maya.lin@northbridge.edu';
      document.getElementById('login-password').value = 'StudentFlow2026';
      document.getElementById('err-email').className = 'error-msg';
      document.getElementById('err-password').className = 'error-msg';
    }
    function handleLogin(e) {
      e.preventDefault();
      var email = document.getElementById('login-email').value.trim();
      var pass = document.getElementById('login-password').value;
      var valid = true;
      if (!email || email.indexOf('@') === -1) {
        document.getElementById('err-email').className = 'error-msg visible';
        valid = false;
      } else {
        document.getElementById('err-email').className = 'error-msg';
      }
      if (!pass || pass.length < 8) {
        document.getElementById('err-password').className = 'error-msg visible';
        valid = false;
      } else {
        document.getElementById('err-password').className = 'error-msg';
      }
      if (valid) showScreen(2);
    }
    function triggerEmptyValidation() {
      document.getElementById('sub-file').value = '';
      document.getElementById('sub-notes').value = 'Too short';
      document.getElementById('sub-honor').checked = false;
      document.getElementById('err-file').className = 'error-msg visible';
      document.getElementById('err-notes').className = 'error-msg visible';
      document.getElementById('err-honor').className = 'error-msg visible';
      updateProgress();
    }
    function handleSubmission(e) {
      e.preventDefault();
      var file = document.getElementById('sub-file').value.trim();
      var notes = document.getElementById('sub-notes').value.trim();
      var honor = document.getElementById('sub-honor').checked;
      var valid = true;
      if (!file) {
        document.getElementById('err-file').className = 'error-msg visible';
        valid = false;
      } else {
        document.getElementById('err-file').className = 'error-msg';
      }
      if (!notes || notes.length < 20) {
        document.getElementById('err-notes').className = 'error-msg visible';
        valid = false;
      } else {
        document.getElementById('err-notes').className = 'error-msg';
      }
      if (!honor) {
        document.getElementById('err-honor').className = 'error-msg visible';
        valid = false;
      } else {
        document.getElementById('err-honor').className = 'error-msg';
      }
      if (valid) {
        document.getElementById('conf-file').textContent = file + ' (SHA-256 Verified)';
        document.getElementById('conf-notes').textContent = notes;
        document.getElementById('row-status-hci04').textContent = 'Submitted · Receipt #SF-2026-1103-8942';
        document.getElementById('dash-due-count').textContent = '1 Pending';
        document.getElementById('dash-sub-count').textContent = '12 / 14';
        showScreen(5);
      }
    }
  </script>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'StudentFlow_Task06_Prototype_and_Case_Study.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
