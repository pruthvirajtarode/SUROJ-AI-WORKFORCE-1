// Full rich curriculum content for all 8 sessions
export interface ChartDataPoint { label: string; value: number; color?: string; }
export interface Exercise { title: string; duration: string; level: string; setup: string; dataset?: string; debrief: string; }
export interface PromptPattern { title: string; prompt: string; }
export interface TheoryBlock { title: string; content: string; }

export interface SessionDetail {
  id: number;
  agenda: string[];
  tools: { name: string; primary?: boolean }[];
  theory: TheoryBlock[];
  prompts: PromptPattern[];
  exercises: Exercise[];
  caseStudy: { title: string; story: string; outcome: string; takeaway: string };
  charts: {
    bar?: ChartDataPoint[];
    pie?: ChartDataPoint[];
    donut?: ChartDataPoint[];
  };
  dataset?: string; // synthetic dataset as preformatted text
  pitfalls: string[];
  closingQA: string[];
}

export const sessionDetails: Record<number, SessionDetail> = {
  1: {
    id: 1,
    agenda: [
      "0:00–0:30 · Foundations block (universal)",
      "0:30–0:45 · The room's real problem — reading thousands of pages under time pressure",
      "0:45–1:00 · Tender anatomy walkthrough with live demo",
      "1:00–1:15 · Break",
      "1:15–1:45 · Exercise 1 — Obligation Map (pairs)",
      "1:45–2:20 · Exercise 2 — Eligibility Check (individual)",
      "2:20–2:45 · Exercise 3 — Addendum Reader (pairs)",
      "2:45–3:00 · Q&A on live example still on screen",
    ],
    tools: [
      { name: "Claude (long-document reader)", primary: true },
      { name: "ChatGPT (file upload)", primary: true },
      { name: "NotebookLM (multi-annexure tenders)" },
      { name: "Microsoft Word + Copilot (drafting)" },
      { name: "Perplexity (client & consultant research)" },
    ],
    theory: [
      {
        title: "CONTEXT WINDOWS — WHY IT MATTERS",
        content:
          "Every AI tool has a limit on how much text it can hold in mind at once — its 'context window.' A 300-page tender document is about 130,000–180,000 words, which fits comfortably in Claude (200,000+ tokens) but not in older ChatGPT models. The habit: ask it to cite the clause number. If citations dry up, split the document.",
      },
      {
        title: "UPLOAD vs PASTE — WHEN TO USE EACH",
        content:
          "Upload the PDF when it is more than a few pages, or when layout matters (tables, forms). Paste text when it is a short clause or an excerpt, or when the PDF has copy-protection that garbles the upload. Always keep the original open in another tab.",
      },
      {
        title: "STRUCTURED EXTRACTION BEATS SUMMARY",
        content:
          "Do not ask 'summarise this tender.' Ask for a table: obligation, clause, trigger, consequence. A summary is prose that reads well and forgets things. A table forces the AI to be complete or to leave a cell blank — and blank cells are what you go looking for.",
      },
      {
        title: "THE 'CITE IT BACK' HABIT",
        content:
          "Whenever the answer is supposed to come from a document you gave it, add one line to your prompt: 'For every claim, quote the exact sentence and give its clause / section / page reference.' This one line separates useful AI from confident nonsense.",
      },
    ],
    prompts: [
      {
        title: "PATTERN 1 · OBLIGATION EXTRACTION",
        prompt: `You are a contracts engineer at an Indian construction firm.
The document below is a tender document from [CLIENT].

TASK
Read the entire document and produce a table of every obligation
the contractor takes on. Include obligations from the general
conditions, special conditions, and technical specifications.

FORMAT
A table with columns:
  Clause | Obligation (in plain words) | Trigger | Consequence of breach

RULES
- Only include obligations actually stated. Do not add anything
  that is customary but not written.
- Quote the exact clause number.
- If wording is ambiguous, mark the row "ambiguous" and quote
  the ambiguous phrase.

DOCUMENT
"""
[paste or upload]
"""`,
      },
      {
        title: "PATTERN 2 · ELIGIBILITY CHECK",
        prompt: `Below is (1) the eligibility section of a tender and
(2) Suroj Buildcon's credentials.

TASK
For each eligibility criterion, tell me:
  - Do we qualify? Yes / No / Need clarification
  - Which of our credentials satisfies it (quote from our sheet)
  - If "no", what is the shortfall in one sentence
  - If "clarification", what pre-bid query would resolve it

Be strict. Do not assume equivalence — if the tender says
"similar works of value not less than ₹50 Cr", a ₹47 Cr project
does not qualify.

TENDER ELIGIBILITY
"""[…]"""

OUR CREDENTIALS
"""[…]"""`,
      },
      {
        title: "PATTERN 3 · AMBIGUITY FINDER (PRE-BID QUERY GENERATOR)",
        prompt: `You are helping prepare pre-bid queries.

TASK
Read the document and list every place where a competent bidder
would want written clarification before pricing. For each one:
  - Quote the exact sentence(s) that are unclear
  - Give the clause reference
  - State in one line why it is unclear
  - Draft the pre-bid query as a polite one-sentence question

Focus on: scope boundaries, quantities not tied to a drawing,
"as directed by the engineer" wording, time-limit ambiguities,
and payment triggers.

DOCUMENT
"""[…]"""`,
      },
      {
        title: "PATTERN 4 · TWO-TENDER COMPARISON",
        prompt: `Below are two tender documents (A and B) for similar work.

TASK
Produce a comparison table with these rows and one column for each:
  Client | Scope | Contract value ceiling | Completion time |
  Defect-liability period | Liquidated damages cap |
  Price-variation clause | Advance payment | Retention % |
  Materials by client | Design responsibility | JV allowed |
  Similar-work criterion | Turnover requirement

At the end, list the five most important differences a bidder
should notice.

TENDER A: """[…]"""
TENDER B: """[…]"""`,
      },
    ],
    exercises: [
      {
        title: "EXERCISE 1 · OBLIGATION MAP",
        duration: "40 min",
        level: "Warm-up · pairs",
        setup:
          "Pairs. Each pair takes the synthetic tender below (a compressed but realistic PWD-style document) and produces the obligation table using Pattern 1. First cut in ten minutes. Then re-run with the cite-back rule added: 'for every row, quote the clause verbatim in an extra column.'",
        dataset: `GOVERNMENT OF MAHARASHTRA — PUBLIC WORKS DEPARTMENT
TENDER NOTICE NO. PWD/NSK/WS/2026-27/047 · DATED: 12 OCTOBER 2026

Name of work : Augmentation of rural water-supply distribution network
               in Sinnar & Igatpuri talukas — Phase II, including
               construction of 4 nos. RCC overhead storage reservoirs
               (2 × 300 KL, 2 × 500 KL), laying of DI K-9 rising and
               gravity mains (total approx. 62 km), and associated
               pumping-station civil works at 3 nos. locations.

Estimated cost put to tender   : ₹74.20 Crore (inclusive of GST)
EMD                            : ₹74,20,000/- (one percent)
Completion time                : 18 calendar months
Defect liability period        : 24 months from virtual completion certificate
Liquidated damages             : 0.5% per week of delay, max 10%
Retention money                : 5% of each RA bill
Price variation                : Star Rate formula (MORTH circular)
Advance payment                : 10% mobilisation advance against unconditional BG
Defects: Clause 41(SCC) — Contractor shall rectify at own cost within 14 days of notice
Submissions: Shop drawings — 14 days prior to execution; programme — 10 days from LOA
Site clearance: Clause 58 — site handed back clear, all temporary works removed
`,
        debrief:
          "What you are teaching: that structured extraction is the tender-reader's default move. That the 'quote it back' column catches hallucinations. Debrief prompt: 'Look at your table. How many rows would you have missed on a first read at your desk?'",
      },
      {
        title: "EXERCISE 2 · ELIGIBILITY CHECK",
        duration: "30 min",
        level: "Core · individual",
        setup:
          "Individual. Use Pattern 2 to verify if Suroj qualifies for the synthetic tender above. The interesting finding is always the ambiguous criterion — qualify it, then draft the pre-bid query.",
        dataset: `SUROJ BUILDCON PVT. LTD. — CREDENTIAL SUMMARY (for eligibility checking)

Similar works executed (last 7 years):
  - Midea India Greenfield Industrial Facility, Supa MIDC: ₹124 Cr (Civil + MEP) — in progress
  - Embassy Industrial Parks Phase II, Pune: ₹68 Cr (completed 2024)
  - Maharashtra Jeevan Pradhikaran WSS, Nashik: ₹42 Cr (completed 2023) — includes 400 KL OHSR
  - NHAI NH-60 Drainage & Retaining Walls: ₹38 Cr (completed 2022)

Average annual turnover (last 3 FYs): ₹186 Cr
Registered class: PWD Class I-A (Maharashtra)
ISO certifications: 9001:2015, 14001:2015, 45001:2018
Key personnel: 4 Graduate Civil Engineers with > 5 yrs experience
`,
        debrief:
          "The interesting finding: Suroj's MJP project (₹42 Cr) is below the typical ₹50 Cr similar-work threshold, but the 400 KL OHSR is within the amended criterion (≥300 KL). Participants should draft the query asking for clarification on whether a ₹42 Cr water-supply project with 400 KL OHSR qualifies.",
      },
      {
        title: "EXERCISE 3 · ADDENDUM READER",
        duration: "25 min",
        level: "Applied · pairs",
        setup:
          "Pairs. Paste the addendum below alongside the original clause it modifies. Use Pattern 3. Find the one modification that changes Suroj's eligibility status from borderline to clearly qualified.",
        dataset: `ADDENDUM No. 2 to Tender PWD/NSK/WS/2026-27/047
Date: 05 November 2026

Modification 4.3 — Eligibility criterion for similar completed work
ORIGINAL: "Similar completed water-supply work of value not less than
           ₹50 Crore, including construction of RCC overhead storage
           reservoir of capacity 500 KL or above."
MODIFIED:  "Similar completed water-supply work of value not less than
           ₹40 Crore, including construction of RCC overhead storage
           reservoir of capacity 300 KL or above."

Modification 8.1 — Completion time
ORIGINAL: "18 (Eighteen) calendar months"
MODIFIED:  "21 (Twenty-one) calendar months"
(All other terms and conditions remain unchanged.)
`,
        debrief:
          "The lesson of Firm K: they missed this addendum two hours before submission. With structured extraction, Mod 4.3 is the third row of the table. Suroj now qualifies cleanly on the MJP project. The covering letter no longer needs a caveat.",
      },
    ],
    caseStudy: {
      title: "The Addendum That Mattered — Firm K, Nashik",
      story:
        "Firm K, a mid-size EPC firm in Nashik (₹85 Cr turnover), was pursuing a ₹68 Cr rural water-supply project with Maharashtra Jeevan Pradhikaran. The tender ran 340 pages. At 6:47 PM on the last working day before submission, MJP uploaded Addendum No. 2. The bid team saw it at 8:15 PM after returning from a site visit. Six pages of dense modifications. Two hours to cutoff. Buried on page four: Modification 4.3 relaxed the RCC reservoir criterion to 'capacity 300 KL or above.' Firm K's 400 KL project qualified without caveat — but nobody read it thoroughly enough to see it. The covering letter went in with the original 'near-match' caveat, which the MJP scrutiny committee treated as a self-declared non-compliance. Bid rejected at technical stage. The winning bid was ₹4.2 Cr higher.",
      outcome:
        "With 15 minutes and Claude: Paste the addendum. Paste the original clause 3.3. Ask: 'for each modification, quote the original wording and the modified wording, and state in one line what the modification does.' Modification 4.3 comes back as the third row of the table. The covering letter gets rewritten in 20 minutes. Firm K's ₹58 Cr project qualifies cleanly.",
      takeaway:
        "Read every addendum with structured extraction — not because the bid team is careless, but because a 6:47 PM addendum on the last working day is exactly when a fatigued team misses a two-line modification. Build the addendum-read into the workflow as a standing prompt. Every bid, every addendum, no exceptions.",
    },
    charts: {
      bar: [
        { label: "Obligation Clauses", value: 47, color: "#B0431E" },
        { label: "Found Without AI", value: 18, color: "#7A2E1F" },
        { label: "Found With AI", value: 47, color: "#5C6A3A" },
        { label: "Pre-bid Queries Raised", value: 8, color: "#B58022" },
      ],
      pie: [
        { label: "General Conditions", value: 38, color: "#B0431E" },
        { label: "Special Conditions", value: 29, color: "#7A2E1F" },
        { label: "Technical Specs", value: 22, color: "#2E3F63" },
        { label: "BOQ & Schedules", value: 11, color: "#B58022" },
      ],
    },
    pitfalls: [
      "Pasting a live bid price before submission into a public tool. Never do this — the price is confidential.",
      "Trusting the AI's clause citations without checking the original PDF. Always keep the source open in a second tab.",
      "Using a summary instead of a structured extraction. Summaries miss things; tables force completeness.",
      "Long back-and-forth threads when the first draft is wrong. Start a new chat with a tighter prompt.",
    ],
    closingQA: [
      "\"On the last tender you reviewed, how many obligations did you extract? What was in the document that you missed?\"",
      "\"Which specific clause type do you most often miss on a first read — payment, penalty, submission deadlines, or scope boundary?\"",
      "\"What is one prompt template you would build into your team's standard tendering process from next week?\"",
    ],
  },

  2: {
    id: 2,
    agenda: [
      "0:00–0:30 · Foundations block (universal)",
      "0:30–0:45 · EPC bid structure and where the design risk lives",
      "0:45–1:00 · Specification cross-referencing live demo",
      "1:00–1:15 · Break",
      "1:15–1:50 · Exercise 1 — Specification Clash Finder (pairs)",
      "1:50–2:25 · Exercise 2 — Design-Stage Risk Register (individual)",
      "2:25–2:45 · Exercise 3 — Design-Build BOQ Gap Analysis",
      "2:45–3:00 · Q&A on live example",
    ],
    tools: [
      { name: "Claude (multi-document cross-reference)", primary: true },
      { name: "ChatGPT (specification analysis)", primary: true },
      { name: "NotebookLM (loading all discipline specs together)" },
      { name: "Perplexity (IS code & standard lookup)" },
    ],
    theory: [
      {
        title: "THE RISK OF THE 'BLIND SPOT'",
        content:
          "Design-build tenders shift the design risk entirely to Suroj. The most expensive mistakes happen at the boundaries between disciplines — structural vs. architectural clashes, MEP vs. structural conflicts. AI's ability to 'read across' multiple documents simultaneously makes it ideal for finding boundary clashes before they become site problems.",
      },
      {
        title: "DOCUMENT CROSS-REFERENCING",
        content:
          "When analyzing multiple discipline specs, provide all relevant documents in a single prompt and explicitly command the AI to look for 'contradictions' or 'unaligned parameters'. Use structured outputs to force the AI to list exactly which documents contain the clash, not just that one exists.",
      },
      {
        title: "SCOPE BOUNDARY IS WHERE MONEY IS LOST",
        content:
          "In design-build, the interface between disciplines (who does what at the junction between civil and MEP, between structural and architectural) is where scope gaps live. Ask the AI to specifically find these 'grey zone' items — work that neither discipline has claimed explicitly.",
      },
    ],
    prompts: [
      {
        title: "PATTERN 1 · SPECIFICATION CLASH FINDER",
        prompt: `You are a design coordinator at an EPC firm reviewing multiple
discipline specifications for a design-build project.

CONTEXT
Below are extracts from three discipline specifications:
Structural, Architectural, and MEP.

TASK
Find every place where:
  1. Two specifications give conflicting requirements for the same
     element (e.g., different slab depths, conflicting dimensions)
  2. One specification references a requirement that another
     specification contradicts
  3. The same work is claimed by two disciplines

For each clash:
  - Quote the conflicting text from each document
  - Name the documents and clause numbers
  - State in one sentence what the contractor must resolve
     before committing to a BOQ rate

FORMAT
Table: Item | Spec A clause & text | Spec B clause & text | Nature of clash | Resolution needed

SPECIFICATIONS
"""[…]"""`,
      },
      {
        title: "PATTERN 2 · DESIGN-STAGE RISK REGISTER",
        prompt: `You are a risk engineer reviewing a design-build scope.

CONTEXT
Below is the employer's requirements document for a design-build
industrial project.

TASK
Identify the top design-stage risks to the contractor, meaning:
risks that will cost Suroj money if the design goes wrong.

For each risk:
  - State the risk in one sentence
  - Identify the trigger (what design decision causes it)
  - Estimate the magnitude: Low / Medium / High
  - State the mitigation: one specific design choice or clause
    to negotiate

RULES
- Focus on risks within the design stage, not construction.
- Do not add generic risks that are not triggered by this
  specific employer's requirements.

EMPLOYER'S REQUIREMENTS: """[…]"""`,
      },
    ],
    exercises: [
      {
        title: "EXERCISE 1 · SPECIFICATION CLASH FINDER",
        duration: "35 min",
        level: "Core · pairs",
        setup:
          "Pairs. Use Pattern 1 on the three synthetic specification extracts below. The exercise has exactly four intentional clashes. The pair that finds all four reads them out.",
        dataset: `STRUCTURAL SPECIFICATION — EXTRACT (Greenfield Industrial, Midea India project type)
Section 4.2: Ground floor slab — M30 concrete, 200mm thick, reinforced with Fe500D bars.
Section 4.3: Column footing depth — minimum 2.0m below finished floor level.
Section 6.1: Overhead beam clearance — structural soffit at 8.0m above finished floor level.

ARCHITECTURAL SPECIFICATION — EXTRACT
Section 3.1: Ground floor slab — 175mm structural slab with 25mm screed. Total: 200mm.
Section 5.4: Internal clear height — 8.2m from finished floor to underside of structure.
Section 7.2: Column face to face in main bay — 24m.

MEP SPECIFICATION — EXTRACT  
Section 2.1: HVAC main duct routing — below structural beam soffit, 600mm depth required.
Section 2.3: Sprinkler head clearance — minimum 450mm from structural soffit.
Section 4.1: Cable tray routing — minimum 400mm depth required at soffit level.
Section 8.2: Column offset for electrical room — 500mm clear from column face each side.
`,
        debrief:
          "The four clashes: (1) Structural says 200mm slab, Architectural says 175mm + 25mm screed — same total but different reading; (2) Structural soffit at 8.0m vs Architectural clear height 8.2m — a 200mm conflict that means the structural design doesn't deliver the required clear height; (3) MEP duct (600mm) + tray (400mm) + sprinkler clearance (450mm) = 1,450mm of services below soffit but only 8.0m structural soffit vs 8.2m requirement leaves only 200mm headroom — impossible; (4) 24m column grid vs 500mm electrical room setback on both sides = only 23m usable bay width.",
      },
    ],
    caseStudy: {
      title: "The Drawing Clash That Wasn't in the BOQ",
      story:
        "An EPC contractor in Hyderabad won a ₹92 Cr design-build industrial project. During detailed design, the structural team set slab soffit at 8.0m. The MEP team's duct layout (designed independently) required 8.2m internal clear height for HVAC + sprinklers + cable tray. The 200mm shortfall was discovered during coordinated shop drawing review — five months after the contract was signed. Solution required lowering the ground floor slab by 200mm (extra excavation and reinforcement) or redesigning the HVAC layout (4-week delay for consultant re-work). Both options cost ₹28 lakh unbudgeted.",
      outcome:
        "A Pattern 1 clash-finder run at the tender stage on the employer's requirements and the three preliminary specifications would have surfaced the clear-height conflict before the BOQ was priced. The cost to fix it at design stage: a 20-minute design meeting. The cost to fix it after contract award: ₹28 lakh and 4 weeks.",
      takeaway:
        "In design-build, the discipline boundary clash is always the most expensive. Run a structured cross-reference of all discipline specs before finalizing the BOQ, not after. The AI does not design — it reads faster than any coordinating engineer and forces the clash into a table where it cannot be missed.",
    },
    charts: {
      pie: [
        { label: "Structural Clashes", value: 34, color: "#B0431E" },
        { label: "MEP vs Structural", value: 28, color: "#7A2E1F" },
        { label: "Architectural vs Structural", value: 22, color: "#2E3F63" },
        { label: "Scope Gaps (Unclaimed Work)", value: 16, color: "#B58022" },
      ],
      bar: [
        { label: "Clashes Found Before AI", value: 2, color: "#7A2E1F" },
        { label: "Clashes Found With AI", value: 11, color: "#5C6A3A" },
        { label: "Avg. Cost Per Missed Clash (₹L)", value: 18, color: "#B0431E" },
      ],
    },
    pitfalls: [
      "Treating the Employer's Requirements as a specification — it is a wish list, not a drawing. Many EPC firms price from it without generating a preliminary design first.",
      "Running Pattern 1 without all discipline specs loaded. A partial view gives false assurance.",
      "Confusing a design-build BOQ with a bill of items — the rate must include design risk.",
    ],
    closingQA: [
      "\"On your current or last design-build project, when was the first coordinated drawing clash detected — and how much did it cost to resolve?\"",
      "\"What is one specification cross-reference you would run on your next EPC bid before pricing?\"",
    ],
  },

  3: {
    id: 3,
    agenda: [
      "0:00–0:30 · Foundations block",
      "0:30–0:45 · The room's real problem: 39 people, 40 sites, one monthly close",
      "0:45–1:00 · Two-pass reconciliation workflow explained with live demo",
      "1:00–1:15 · Break",
      "1:15–1:45 · Exercise 1 — GSTR-2A Reconciliation in Excel (individual)",
      "1:45–2:25 · Exercise 2 — Draft a Notice Response (pairs)",
      "2:25–2:50 · Exercise 3 — TDS Quarterly Review (individual)",
      "2:50–3:00 · Q&A",
    ],
    tools: [
      { name: "Excel + Copilot (in-tenant, safest for real data)", primary: true },
      { name: "Claude / ChatGPT (drafting, formula help)", primary: true },
      { name: "Adobe Acrobat AI (extracting invoice text)" },
      { name: "Perplexity (statutory rate & date lookup)" },
    ],
    theory: [
      {
        title: "WHY EXCEL + COPILOT, NOT A BROWSER CHAT",
        content:
          "Two reasons. First, data safety: Copilot inside Excel operates on your file in your Microsoft tenant and does not send it to a public model. Second, competence: for arithmetic on hundreds or thousands of rows, an LLM chatting in a browser will be slower, wronger, and lossier than a formula. Use Copilot in Excel for the number work; use a browser chat for the drafting work.",
      },
      {
        title: "TWO-PASS RECONCILIATION",
        content:
          "Pass 1: Copilot in Excel groups the purchase register and GSTR-2A by vendor GSTIN, sums invoice values, and produces a variance report. Pass 2: a browser chat drafts the vendor communication for each variance category (missing on 2A, amount mismatch, wrong GSTIN, timing difference). Different tools, correctly used.",
      },
      {
        title: "AI IS NOT A CALCULATOR",
        content:
          "LLMs are language models, not arithmetic engines. Do not ask an LLM to sum 100 invoice amounts; it will likely hallucinate a total. Instead, ask it to write the Excel formula to do the sum, or use Copilot inside Excel.",
      },
      {
        title: "DATA NORMALIZATION — THE REAL SUPERPOWER",
        content:
          "AI is exceptionally good at normalizing messy text. If you have 50 different spellings of a vendor's name or inconsistent date formats in a ledger, a single prompt can output a perfectly clean, standardized table. This is the hidden value in accounts work.",
      },
    ],
    prompts: [
      {
        title: "PATTERN 1 · GSTR-2A RECONCILIATION IN EXCEL",
        prompt: `// Used inside Excel with two sheets: PR (purchase register) and GSTR2A

Build a reconciliation between the sheet PR and the sheet GSTR2A.

Join on Vendor_GSTIN and Invoice_Number.

Produce a new sheet "Variance" with the following columns:
  - Vendor_GSTIN
  - Vendor_Name (from PR where available; else from GSTR2A)
  - Invoice_Number
  - Amount_in_PR (blank if not in PR)
  - Amount_in_GSTR2A (blank if not in GSTR2A)
  - Difference (Amount_in_PR minus Amount_in_GSTR2A)
  - Status: one of "matched", "missing_in_2A", "missing_in_PR",
    "amount_mismatch", "vendor_mismatch"

Sort by Status, then by absolute Difference descending.

At the top, add a summary block:
  Total invoices in PR : count and sum
  Total invoices in GSTR2A : count and sum
  Total matched : count and sum
  Total missing_in_2A : count and sum
  Total amount_mismatch : count and sum`,
      },
      {
        title: "PATTERN 2 · DRAFTING A NOTICE RESPONSE",
        prompt: `You are drafting a first-cut response to a GST notice for
review by our tax consultant.

CONTEXT
Below is the notice (redacted; company name replaced with [FIRM],
GSTIN with [GSTIN]) and the underlying facts as we understand them.

TASK
Draft a formal response in the format required by the notice.
The response should:
  - Acknowledge the notice by its reference number and date
  - Address every allegation, one by one
  - Attach a schedule of evidence where a figure is disputed
  - Not concede where facts are contested
  - Not deny where the facts are correct — instead, explain
  - End with the standard professional courtesies

RULES
- Do not add facts not in the "facts" note below.
- Where a fact is missing, insert [TO BE CONFIRMED].
- Match the tone of a chartered accountant's letter.

NOTICE: """[…]"""
FACTS AS WE UNDERSTAND THEM: """[…]"""`,
      },
      {
        title: "PATTERN 3 · TDS COMPLIANCE CHECK",
        prompt: `Below is a list of vendor payments made in [QUARTER].
Each row has: vendor name, PAN, nature of service,
gross amount, invoice date, payment date, TDS section deducted,
TDS amount, TDS rate applied.

TASK
For each row, tell me:
  - Is the TDS section correct? (194C / 194J / 194Q / other)
  - Is the rate correct given PAN status and threshold
  - Was TDS deducted at the earlier of invoice or payment date
  - Any red flags (missing PAN, aggregate threshold crossings)

RULES
- If any input is missing, say what is needed rather than guess.
- FY 2025-26 rates apply.
- Do not assume lower-deduction certificate unless stated.

PAYMENTS: """[…]"""`,
      },
    ],
    exercises: [
      {
        title: "EXERCISE 1 · GSTR-2A RECONCILIATION",
        duration: "30 min",
        level: "Warm-up · individual",
        setup:
          "Individual, laptops open, Excel with Copilot enabled where available. Download the synthetic Purchase Register and GSTR-2A extracts below into two sheets, then run Pattern 1. Compare results across three neighbours.",
        dataset: `PURCHASE REGISTER — Suroj Buildcon Pvt. Ltd. — Sep 2026 (20 invoices)
Sr | Invoice No. | Inv Date | Vendor Name | Vendor GSTIN | HSN | Taxable ₹ | CGST ₹ | SGST ₹ | Total ₹
1  | KCL/26-27/1284 | 02-09-26 | Kesar Cement Ltd | 27AAECK1234B1Z9 | 2523 | 8,42,000 | 1,05,250 | 1,05,250 | 10,52,500
2  | TSI/2026/0417  | 04-09-26 | Tata Steel & Iron | 27AACCT4567D1Z7 | 7213 | 28,60,000 | 2,57,400 | 2,57,400 | 33,74,800
3  | APB/1148       | 05-09-26 | Aggarwal Pipes  | 27AGGPA5678E1Z2 | 7304 | 4,15,000  | 37,350   | 37,350   | 4,89,700
4  | SGE/26-27/0092 | 08-09-26 | Sanghavi Elec.  | 27AABCS2345M1Z8 | 8544 | 1,86,400  | 16,776   | 16,776   | 2,19,952
5  | MRC/2609/0451  | 12-09-26 | Mahalaxmi RMC   | 27AAAAM8888A1Z0 | 3824 | 12,50,000 | 1,12,500 | 1,12,500 | 14,75,000
...

GSTR-2A — Suroj Buildcon (mismatches inserted for exercise)
Supplier GSTIN | Supplier Name | Invoice No. | Inv Date | Taxable ₹ | Tax ₹ | Total ₹ | Status
27AAECK1234B1Z9 | Kesar Cement | KCL/26-27/1284 | 02-09-26 | 8,42,000 | 1,51,560 | 9,93,560 | Filed
[NOTE: Kesar Cement filed at 18% GST (₹1,51,560) but Suroj booked at 25% (₹2,10,500). 
 This is a rate mismatch — cement is 28% not 18%. Either supplier or Suroj booked wrong.]
[NOTE: KCL/26-27/1341, APB/1189, DHL/INV/09/0033 missing from GSTR-2A — timing or non-filing]
[NOTE: Stray entry SEC/09/26/0913 in 2A with malformed GSTIN — likely supplier data entry error]`,
        debrief:
          "Expected output: 12 matched, 4 missing_in_2A, 1 amount_mismatch (Kesar cement rate), 1 missing_in_PR + vendor_mismatch. Good participants notice the Kesar amount mismatch is actually a GST-rate error worth chasing — the supplier may have under-filed.",
      },
    ],
    caseStudy: {
      title: "Eight Days to Five — The Accounts Close Transformation",
      story:
        "An infrastructure contractor in Pune, ₹340 Cr turnover, 28 sites. Monthly close ran on a predictable cycle: site MIS on 5th, accounts consolidated through 8th, GST reconciliation 9th-10th, TDS filing 11th, management MIS to Directors on 12th. Every month, eight working days from period-end to closed books. One person on the reconciliation team worked every weekend. In April 2024, the finance head ran an experiment: three volunteers from a nine-person reconciliation team spent one Saturday learning to use Excel Copilot for GSTR-2A vs purchase register match. On the May close, those three ran the reconciliation with Copilot on 480 vendor invoices.",
      outcome:
        "Copilot cohort: reconciliation complete in one working day. Traditional cohort: still working at end of day two. Same accuracy on spot-audit. By August the whole team was on Copilot. Close cycle: 8 days → 5 days. Freed time reallocated to notice-response drafting (previously outsourced at ₹18,000 per notice) and a monthly vendor-master audit.",
      takeaway:
        "The pattern: one hour of training, one supervised close cycle, then general adoption. Not a company-wide rollout — one volunteer team, one visible result, then diffusion. The finance head's role was to protect the experiment, not mandate the change.",
    },
    charts: {
      bar: [
        { label: "Manual Close (days)", value: 8, color: "#B0431E" },
        { label: "With AI (days)", value: 5, color: "#5C6A3A" },
        { label: "Notices Drafted In-house", value: 14, color: "#2E3F63" },
        { label: "Notice Drafting Cost Saved (₹L)", value: 2.52, color: "#B58022" },
      ],
      pie: [
        { label: "Matched Invoices", value: 60, color: "#5C6A3A" },
        { label: "Missing in 2A", value: 20, color: "#B0431E" },
        { label: "Amount Mismatch", value: 12, color: "#B58022" },
        { label: "GSTIN / Other Error", value: 8, color: "#7A2E1F" },
      ],
    },
    pitfalls: [
      "Pasting real GSTINs into a public tool. GSTIN + vendor names + specific amounts is not public data. Use Copilot inside Excel for real data.",
      "Trusting AI on statutory rates — they change every budget. Always verify against the current section or use Perplexity with a date filter.",
      "Long argumentative threads on a notice. When the first draft is close but not right, tighten the facts note and start again in a new chat.",
    ],
    closingQA: [
      "\"Of the four workflows — reconciliation, notice response, TDS check, formula help — which one is worth building into your monthly routine first?\"",
      "\"What is one thing your team spends four hours a week on that could become forty minutes with a saved prompt template?\"",
    ],
  },

  4: {
    id: 4,
    agenda: [
      "0:00–0:30 · Foundations block",
      "0:30–0:45 · The monthly reporting cycle and where it breaks down",
      "0:45–1:00 · BvA narrative prompt live demo",
      "1:00–1:15 · Break",
      "1:15–1:50 · Exercise 1 — Budget vs Actual Narrative (individual)",
      "1:50–2:25 · Exercise 2 — Schedule Delay Story (pairs — Planning)",
      "2:25–2:45 · Exercise 3 — EDP Automation Starter (EDP group)",
      "2:45–3:00 · Q&A",
    ],
    tools: [
      { name: "Excel + Copilot (BvA, S-curve, variance)", primary: true },
      { name: "Power BI + Copilot (dashboards)", primary: true },
      { name: "Claude / ChatGPT (variance narratives, MPR drafting)" },
      { name: "Power Automate + Copilot (monthly rollup)" },
      { name: "Python via Claude (for EDP — one-off transforms)" },
    ],
    theory: [
      {
        title: "FROM DATA TO NARRATIVE",
        content:
          "Management doesn't just want the dashboard; they want the story behind the dashboard. Provide the AI with the top 5 cost variances (the numbers) and the site diaries (the context), and ask it to draft the variance narrative explaining why the budget was exceeded. Numbers are inputs; narrative is the output that gets actioned.",
      },
      {
        title: "DASHBOARDS ARE FOR PATTERN-SEEING",
        content:
          "Dashboards are for pattern-seeing. The narrative prompt is for accountability. A dashboard shows a 12% overrun on steel. The narrative prompt forces attribution: which activities, which weeks, which decisions drove it. Without attribution, the overrun recurs next month.",
      },
      {
        title: "THE 'EXPLAIN IT SIMPLY' PRINCIPLE",
        content:
          "Use AI to simplify complex schedule delays (like Critical Path logic) into plain English for non-technical stakeholders or client communications. Feed the delay analysis into the AI and ask for a two-paragraph explanation that a client's project manager can understand without a scheduling background.",
      },
    ],
    prompts: [
      {
        title: "PATTERN 1 · BUDGET VS ACTUAL NARRATIVE",
        prompt: `You are the Cost Controller at an Indian EPC firm.

CONTEXT
Below is the budget-versus-actual variance table for [PROJECT]
for the month of [MONTH]. Positive variance = overrun.

TASK
Write the variance narrative for the Monthly Progress Report.
For each cost head with variance > 5%, write:
  - What the variance was (in words and ₹)
  - The most likely cause (from the context note I'll attach)
  - Whether this is a one-off or recurring pattern
  - What recovery or monitoring action is recommended

Then write a one-paragraph executive summary.

FORMAT
One paragraph per cost head, then the executive summary.

RULES
- Do not explain variances you cannot attribute. Mark them
  "cause under investigation" rather than guessing.
- Be direct. Management does not want hedging.
- Maximum 100 words per cost head.

BvA TABLE: """[…]"""
CONTEXT NOTES: """[…]"""`,
      },
      {
        title: "PATTERN 2 · SCHEDULE DELAY STORY",
        prompt: `You are the Planning Engineer at an EPC firm.

CONTEXT
Below is the planned vs actual progress for [PROJECT] up to
[DATE], and the delay register maintained by the site team.

TASK
Produce the schedule narrative for the Monthly Progress Report:
  1. Overall progress % planned vs. actual (and delta)
  2. Critical path status — which activities are on the critical
     path and how many days each is delayed
  3. Top 3 delay causes with quantified impact (calendar days)
  4. Recovery plan: specific actions, owners, target dates
  5. Revised projected completion date

RULES
- Do not use jargon the client's project manager may not know.
- State delay in working days if the contract measures in
  working days; calendar days otherwise.

PROGRESS DATA: """[…]"""
DELAY REGISTER: """[…]"""`,
      },
    ],
    exercises: [
      {
        title: "EXERCISE 1 · BUDGET VS ACTUAL NARRATIVE",
        duration: "35 min",
        level: "Core · individual",
        setup:
          "Individual. Use Pattern 1 on the synthetic BvA table below. Read the narrative to the room after 25 minutes. The interesting differences are what each person chose to mark 'cause under investigation' vs. what they attributed.",
        dataset: `BUDGET VS ACTUAL — Midea India Greenfield (Supa MIDC) — Month 14
                          Budget ₹Cr | Actual ₹Cr | Variance ₹Cr | %
Civil — Foundation & Substructure :  8.40 |  8.62 |  +0.22 | +2.6%
Civil — Superstructure            : 22.80 | 24.96 |  +2.16 | +9.5% ← investigate
Steel — Structural fabrication    : 18.60 | 19.64 |  +1.04 | +5.6% ← investigate
MEP — Electrical installations    :  6.20 |  5.88 |  -0.32 | -5.2%  (ahead)
MEP — Plumbing & Firefighting     :  3.40 |  3.62 |  +0.22 | +6.5% ← investigate
Temporary Works & Establishment   :  2.80 |  2.80 |   0.00 | 0%
Sub-contractors                   :  4.20 |  4.36 |  +0.16 | +3.8%
Total                             : 66.40 | 69.88 |  +3.48 | +5.2%

CONTEXT NOTES FROM SITE:
- Superstructure: revised architectural spec added extra floor height in 2 bays
- Structural steel: market rate increase in Aug 2026, not covered by PVC clause
- MEP electrical: ahead because one power substation delayed by client (no impact on budget yet)
- Plumbing: sprinkler head design changed by client's fire consultant mid-execution`,
        debrief:
          "Expected narrative: Superstructure overrun is attributable (revised spec) — flag as potential variation claim. Steel is market-rate driven — check PVC clause applicability. MEP electrical ahead is temporary — note client substation risk. Plumbing overrun is attributable (client-directed change) — variation claim possible. The one-paragraph executive summary should not just repeat the numbers — it should tell the story of decisions that drove the overrun.",
      },
    ],
    caseStudy: {
      title: "The Variance Nobody Could Explain — Flyover Project, Karnataka",
      story:
        "A civil contractor executing a ₹98 Cr flyover, Month 14 of 24. The monthly cost review showed a 12% overrun on the 'steel — reinforcement' line. Nobody in the review meeting could explain it. The investigation was still open two weeks later. A Power BI dashboard was built to drill into steel consumption by activity, zone, and month. It took three weeks. When it opened, the 12% overrun disaggregated: Zone A abutments — 4% overrun (within tolerance). Zone B superstructure — 2% overrun. Zone C approach slabs — 38% overrun on a small tonnage but driving the total. Zone C had been executed by a subcontractor. Their BOQ billing was on quantities, not on consumption. Their actual consumption (tracked via site consumption sheets) had run 38% higher. Nobody had reconciled the two.",
      outcome:
        "With a monthly Pattern 1 narrative prompt run from Month 11: the '>5% variance, cause not attributed' tag would have surfaced in Month 11 and again Month 12. Three consecutive months of 'cause not yet identified' on the same head is the trigger to investigate. The dashboard-building work (three weeks) would not have been needed.",
      takeaway:
        "The accountability discipline is what surfaces variances at month 11 instead of month 14. Dashboards are for pattern-seeing; the narrative prompt is for accountability. Both are useful, but if you have to pick, the accountability discipline is what catches it earlier.",
    },
    charts: {
      bar: [
        { label: "Civil Superstructure", value: 9.5, color: "#B0431E" },
        { label: "Structural Steel", value: 5.6, color: "#7A2E1F" },
        { label: "MEP Plumbing", value: 6.5, color: "#B58022" },
        { label: "MEP Electrical", value: -5.2, color: "#5C6A3A" },
        { label: "Sub-contractors", value: 3.8, color: "#2E3F63" },
      ],
      donut: [
        { label: "Attributed Variances", value: 72, color: "#5C6A3A" },
        { label: "Market Rate Impact", value: 18, color: "#B58022" },
        { label: "Under Investigation", value: 10, color: "#B0431E" },
      ],
    },
    pitfalls: [
      "Treating the BvA table as the report — it is the input, not the output. The narrative is the output.",
      "Attributing variance without checking the site diary. The AI will generate a plausible story; you need to verify it against what actually happened.",
      "Building dashboards before establishing the narrative discipline. Dashboards show patterns; they do not force attribution.",
    ],
    closingQA: [
      "\"On last month's MPR, how many variance lines were marked 'under investigation'? What happened to them the following month?\"",
      "\"Which cost head in your current project do you least understand the variance of — and what data would you need to explain it?\"",
    ],
  },

  5: {
    id: 5,
    agenda: [
      "0:00–0:30 · Foundations block",
      "0:30–0:45 · The QS's week — what they actually do with drawings",
      "0:45–1:00 · Drawing-to-text pipeline explained",
      "1:00–1:15 · Break",
      "1:15–1:50 · Exercise 1 — BBS Checking (MEP + QS pairs)",
      "1:50–2:25 · Exercise 2 — Variation Claim Draft (QS individual)",
      "2:25–2:45 · Exercise 3 — RFI Drafting (MEP individual)",
      "2:45–3:00 · Q&A",
    ],
    tools: [
      { name: "Claude / ChatGPT (specification & text analysis)", primary: true },
      { name: "Excel + Copilot (take-off tables, BBS checking)" },
      { name: "Adobe Acrobat AI (extracting tables from scanned drawings)" },
      { name: "Bluebeam / PDF tools (for marking up drawing extracts)" },
    ],
    theory: [
      {
        title: "VISION MODELS VS DRAWINGS",
        content:
          "Current AI vision models are poor at reading dense, scaled CAD/PDF construction drawings natively. Do not upload a complex reinforcement drawing and ask 'is this correct?'. Instead, extract the text/tables (like BBS schedules) and have the AI analyze the tabular data. The AI reads the schedule, not the drawing.",
      },
      {
        title: "DRAWING-TO-TEXT IS THE FIRST STEP",
        content:
          "For any AI workflow involving drawings: Step 1 is always converting the drawing information into text or tabular form. This can be done via OCR (for scanned drawings), copy-paste from PDF text layers, or manual key-in of the critical numbers. Once in text, the AI can work on it.",
      },
      {
        title: "DRAFTING RFIs — A HIDDEN TIME SAVER",
        content:
          "When a drawing is missing information, use the AI to draft the Request For Information (RFI) to the consultant. Provide the context, and it will ensure the tone is professional, contractual, and specific. An RFI drafted in 5 minutes is better than an email written in frustration at 7 PM.",
      },
    ],
    prompts: [
      {
        title: "PATTERN 1 · BBS VARIANCE CHECK",
        prompt: `You are the QS reviewing a bar-bending schedule (BBS)
against the as-built consumption.

CONTEXT
Below is the BBS for [ELEMENT] and the actual steel
consumption record for the same element.

TASK
For each bar mark in the BBS:
  1. Compare the scheduled quantity (kg) to the actual
     consumption (kg)
  2. Calculate the variance (actual - scheduled, in kg and %)
  3. Flag any bar mark where variance exceeds ±5%

Then produce:
  - A summary: total scheduled vs total actual vs total variance
  - A list of the top 5 variance items by kg
  - A note on whether the total variance is within the
    site allowance of 3%

RULES
- If a bar mark is in BBS but not in consumption, mark
  "not issued" — do not assume zero consumption.
- If a bar mark is in consumption but not in BBS, mark
  "unscheduled issue" — this is a potential claim item.

BBS: """[…]"""
CONSUMPTION: """[…]"""`,
      },
      {
        title: "PATTERN 2 · VARIATION CLAIM DRAFT",
        prompt: `You are the QS preparing a variation claim.

CONTEXT
Below are: (1) the original BOQ description and quantity,
(2) the revised drawing/instruction from the engineer,
(3) the re-measured quantity as executed.

TASK
Draft the variation claim in the format:
  - Reference: (variation no., instruction reference, date)
  - Description of change: what changed from original scope
  - Quantity change: original vs revised (with calculation)
  - Rate: BOQ rate / starred rate / new agreed rate
  - Value: (quantity change × rate)
  - Supporting documents: list what to attach

RULES
- Quote the original clause / drawing revision number.
- Do not claim for work within the original BOQ scope.
- If the rate is a starred rate, explain the build-up in
  a separate paragraph.

ORIGINAL BOQ: """[…]"""
REVISED INSTRUCTION: """[…]"""
RE-MEASURED QUANTITY: """[…]"""`,
      },
    ],
    exercises: [
      {
        title: "EXERCISE 1 · BBS CHECKING",
        duration: "35 min",
        level: "Core · pairs (MEP + QS)",
        setup:
          "Pairs (one MEP, one QS). Use Pattern 1 on the synthetic BBS and consumption data below. The exercise has three intentional variance items — one within tolerance, one a clear overrun, one an unscheduled issue that is a potential variation claim.",
        dataset: `BAR-BENDING SCHEDULE — OHSR-1 Wall, Sinnar-Ghoti WSS
Element: 500 KL OHSR container wall, 350mm thick, M30 concrete
Bar Mark | Dia (mm) | Shape | Length (m) | No. of bars | Total length (m) | Weight (kg)
T1       | 16       | Vert  | 5.40       | 120         | 648              | 1,023
T2       | 12       | Horiz | 3.92       | 240         | 940.8            | 836
T3       | 10       | Links | 1.20       | 480         | 576              | 355
T4       | 16       | Extra | 2.10       | 24          | 50.4             | 79.5
TOTAL                                                                      2,293.5 kg

ACTUAL CONSUMPTION RECORD — Store Dept
T1 (16mm vertical)  : 1,041 kg (variance: +18 kg = +1.8% — within tolerance)
T2 (12mm horiz)     : 890 kg  (variance: +54 kg = +6.5% — EXCEEDS 5% threshold)
T3 (10mm links)     : 355 kg  (variance: 0 — exact)
T4 (16mm extra)     : 79.5 kg (variance: 0 — exact)
T5 (12mm kicker bars — not in BBS): 64 kg issued against OHSR-1 — UNSCHEDULED`,
        debrief:
          "T2 overrun of 6.5% needs investigation — likely extra bars at construction joints. T5 unscheduled issue is a potential variation if the kicker bars were instructed after the original BBS was approved. Good participants flag T5 as 'variation claim item' not 'overrun'.",
      },
    ],
    caseStudy: {
      title: "The Revision That Built the Claim",
      story:
        "A QS team at a ₹45 Cr industrial project in Pune received Drawing Revision 4 for the factory floor slab 6 months into construction. The revision increased slab thickness from 200mm to 250mm across 8,400 sqm of the production area — a 25% increase in concrete and reinforcement on a major element. The QS team knew this was a variation claim. The challenge: the original BOQ had a composite rate for 'RCC M30 slab including formwork and reinforcement at 200mm thickness.' The revision required a 'starred rate' build-up for the 250mm thickness. The rate analysis took 3 working days.",
      outcome:
        "Using Pattern 2: Feed the original BOQ rate, the build-up assumptions, and the revised drawing into the AI. Ask it to: (a) identify the components of the composite rate, (b) quantify how each component changes at 250mm vs 200mm, (c) draft the starred rate build-up table, (d) calculate the variation claim value. First draft in 25 minutes. CA-reviewed and issued in 2 hours. Claim value: ₹58.4 lakh.",
      takeaway:
        "Variation claims are often delayed not because the entitlement is unclear but because the rate build-up takes time. The AI doesn't know your cost structure — but it can structure the build-up table from your inputs, and that structure is 60% of the work.",
    },
    charts: {
      pie: [
        { label: "Within Tolerance (±3%)", value: 58, color: "#5C6A3A" },
        { label: "Variation Claim Items", value: 22, color: "#B58022" },
        { label: "Overrun (No Claim)", value: 12, color: "#B0431E" },
        { label: "Under-issue", value: 8, color: "#2E3F63" },
      ],
    },
    pitfalls: [
      "Uploading a scanned drawing and expecting the AI to read dimensions. It cannot. Extract the schedule into text first.",
      "Claiming the full quantity variance as a variation without checking whether the extra work was instructed in writing.",
      "Drafting an RFI that asks a question the drawing already answers. Read the complete drawing set before raising an RFI.",
    ],
    closingQA: [
      "\"What is the one drawing type in your current project where you lose the most time on manual checking?\"",
      "\"On your last variation claim, how long did the rate build-up take? What data would you have needed to do it in one hour?\"",
    ],
  },

  6: {
    id: 6,
    agenda: [
      "0:00–0:30 · Foundations block",
      "0:30–0:45 · The Purchase team's week — RFQs, comparisons, POs, follow-ups",
      "0:45–1:00 · Quotation normalisation live demo",
      "1:00–1:15 · Break",
      "1:15–1:50 · Exercise 1 — Quotation Normalisation (pairs)",
      "1:50–2:15 · Exercise 2 — PO Covering Letter (individual)",
      "2:15–2:40 · Exercise 3 — Consumption Variance Investigation (Store pairs)",
      "2:40–3:00 · Q&A",
    ],
    tools: [
      { name: "Excel + Copilot (quotation comparison, stock reconciliation)", primary: true },
      { name: "Claude / ChatGPT (letter drafting, PO conditions)", primary: true },
      { name: "Adobe Acrobat AI (extracting quotations from PDFs)" },
      { name: "Outlook + Copilot (email follow-ups)" },
    ],
    theory: [
      {
        title: "NORMALISING QUOTATIONS BEFORE COMPARING",
        content:
          "A quotation comparison table produced by hand almost always compares gross prices. A comparison produced with AI normalises to a common basis first: freight-inclusive, GST-inclusive, at-site, with the same payment terms. The AI does the normalisation in a step you can read and sanity-check.",
      },
      {
        title: "A PO IS A CONTRACT — TREAT IT LIKE ONE",
        content:
          "The most-missed field on a PO covering letter at construction firms is the 'special conditions' section: what was agreed in the negotiation call, what free issues apply, what retention terms hold, what the payment cycle is. AI writes this section fluently from a call summary or an email thread, if you feed both to it.",
      },
      {
        title: "CONSUMPTION VARIANCE — TWO KINDS",
        content:
          "A cement over-consumption is either a waste story (site pours, breakage, unauthorised use) or a BOQ story (design consumed more than the item description quantified). Same variance, two very different remedies. AI helps by prompting the store keeper to attribute — it does not itself attribute.",
      },
    ],
    prompts: [
      {
        title: "PATTERN 1 · QUOTATION NORMALISATION",
        prompt: `You are a procurement engineer preparing a comparative statement.

CONTEXT
Below are three vendor quotations for the same requirement.
Each is on the vendor's own format with different inclusions/exclusions.

TASK
Normalise all three onto a common basis:
  - Landed rate at site (freight, unloading, insurance included)
  - GST added at appropriate rate
  - Payment terms converted to financing-cost equivalent at 12% p.a.
  - Delivery time in calendar days from PO date

FORMAT
Table: Vendor | Basic rate | Freight | Unloading | GST | Landed |
Payment terms | Financing adj. | Final comparable rate | Delivery |
Warranty | Notes

At the end: which vendor is cheapest on comparable basis;
which is fastest; which has the most exclusions normalised in.

RULES
- Where a quotation is silent (e.g. no freight mention), ask
  what to assume rather than assume.

QUOTATIONS: """[…]"""`,
      },
      {
        title: "PATTERN 2 · PO COVERING LETTER",
        prompt: `You are drafting the covering letter for a purchase order.

CONTEXT
Below are (1) the negotiation summary from the call/email thread
and (2) the standard PO template's fields.

TASK
Produce the covering letter and the "special conditions" section.
The letter should:
  - Reference the RFQ, the vendor's quotation, and the negotiation outcome
  - State clearly what has been agreed on top of standard PO terms:
    price validity, delivery schedule, quality inspection window,
    free issues (if any), retention, payment schedule against milestones,
    penalty for late delivery
  - Confirm what is NOT included (unloading, storage, insurance beyond gate)

RULES
- Only include conditions actually agreed in the negotiation notes.
- Do not add customary terms not discussed.
- If a term was discussed but not settled, mark it "to be confirmed in
  writing before dispatch".

NEGOTIATION NOTES: """[…]"""
PO STANDARD FIELDS: """[…]"""`,
      },
    ],
    exercises: [
      {
        title: "EXERCISE 1 · QUOTATION NORMALISATION",
        duration: "35 min",
        level: "Core · pairs",
        setup:
          "Pairs. Run Pattern 1 on the three synthetic DI-pipe quotations below. The lowest-basic-rate quotation is not the lowest landed rate. The pair that gets there fastest reads out.",
        dataset: `QUOTATION A — Ashwin Rebars & Pipe LLP (Nashik plant)
Item: DI K-9 pipe DN450, IS 8329, CM-lined, EPDM gasket
Rate: ₹5,240/rm (ex-works)
Payment: 30% advance + 60% on dispatch + 10% within 15 days of receipt
Delivery: 45 days from advance. Split 800rm/week acceptable.
Freight: Extra at actuals. Insurance: Extra. Unloading at site: NOT included.
GST: 18% extra. Warranty: 12 months from dispatch. Validity: 30 days.

QUOTATION B — Mahalaxmi Casting Industries
Item: DI K-9 pipe DN450, IS 8329, CM-lined, EPDM gasket
Rate: ₹5,480/rm (ALL-INCLUSIVE, delivered at site, GST included)
Payment: 100% within 45 days of receipt at site after joint inspection
Delivery: 60 days from PO. Three shipments over 30 days.
Freight, insurance, unloading up to site gate: INCLUDED.
GST: 18% included in rate above. Warranty: 24 months from receipt at site.

QUOTATION C — Kesar Metals & Pipes Pvt. Ltd. (Aurangabad)
Item: DI pipe DN450 K-9 to IS 8329 with CM lining and zinc-bitumen coating
Rate: ₹5,120/rm (ex-works)
Payment: 20% advance + 70% against LR + 10% after 30 days
Delivery: 30 days from advance.
Freight: ₹320/rm extra (Aurangabad to Nashik site).
Insurance: 0.35% of invoice value.
Unloading and stacking: NOT included. GST: 18% extra on basic + freight.
Warranty: 12 months from dispatch OR 6 months from installation, whichever earlier.`,
        debrief:
          "Landed rates roughly: A ~₹6,650/rm; B ~₹5,480/rm all-in; C ~₹6,500/rm. B is cheapest on landed despite looking most expensive on basic rate. But B's delivery is 60 days vs 30-45 for others — potential schedule impact. Warranty: B is 24 months, best. This is the whole point.",
      },
    ],
    caseStudy: {
      title: "The Lowest Quote That Wasn't — DI Pipe Procurement, Aurangabad",
      story:
        "An infrastructure contractor in Aurangabad placing an order for 12,000 rm of DI K-9 pipe. Three quotations received. The purchase manager ran his standard comparative statement: basic rate, delivery days, payment terms, warranty. The lowest gross rate won. Order placed on Vendor X at ₹5,180/rm. Six weeks in: Vendor X's freight came in at ₹410/rm (competitors were freight-inclusive at effective ₹150-180). Delivery slipped from 30 days to 62 days, causing three weeks of idle labour. Unloading, promised as included, turned out to be 'up to gate only' — site arranged internal handling at ₹85/rm. Warranty was 12 months from dispatch, meaning half had expired before installation.",
      outcome:
        "Retrospective normalised costs: Vendor X = ₹6,760/rm; runner-up Vendor Y = ₹6,240/rm. On 12,000 rm, that is ₹62 lakh of avoidable cost. Plus the schedule impact of three weeks. A 20-minute AI-assisted normalisation would have produced the retrospective picture at the front, not the back.",
      takeaway:
        "Every quotation with more than three 'extra at actuals' or 'excluding' clauses goes through Pattern 1 normalisation before placing the PO. No exceptions. The purchase manager was not incompetent — the format he used for fifteen years was the wrong format for this type of order.",
    },
    charts: {
      bar: [
        { label: "Vendor A Landed (₹/rm)", value: 6650, color: "#B0431E" },
        { label: "Vendor B Landed (₹/rm)", value: 5480, color: "#5C6A3A" },
        { label: "Vendor C Landed (₹/rm)", value: 6500, color: "#B58022" },
        { label: "Basic Rate Winner (₹/rm)", value: 5120, color: "#2E3F63" },
      ],
      pie: [
        { label: "On-time Delivery > 90%", value: 30, color: "#5C6A3A" },
        { label: "On-time Delivery 75-90%", value: 42, color: "#B58022" },
        { label: "On-time Delivery < 75%", value: 28, color: "#B0431E" },
      ],
    },
    pitfalls: [
      "Comparing quotations on gross rate alone. If the vendor has more than three exclusions, they are almost certainly more expensive once normalised.",
      "Cut-and-paste POs — last month's PO for the same vendor with a new item inherits conditions that didn't apply to the new negotiation.",
      "Concluding on consumption variance without the adjacent-element check. Cement on the wall may have been booked there but consumed on the columns.",
    ],
    closingQA: [
      "\"On the last quotation comparison you did, would the normalised comparison have changed the winner?\"",
      "\"Which vendor communication takes the most time per week — and could a saved prompt template cut it in half?\"",
    ],
  },

  7: {
    id: 7,
    agenda: [
      "0:00–0:30 · Foundations block",
      "0:30–0:45 · The seven functions in this room — shared records discipline",
      "0:45–1:00 · Voice-to-log pipeline live demo",
      "1:00–1:15 · Break",
      "1:15–1:45 · Exercise 1 — Logbook Compilation (V&M + Mechanical pairs)",
      "1:45–2:15 · Exercise 2 — Safety Observation Trending (EHS-led groups)",
      "2:15–2:40 · Exercise 3 — PM Schedule + Statutory Calendar (groups of 3)",
      "2:40–3:00 · Q&A",
    ],
    tools: [
      { name: "Claude / ChatGPT (log-to-summary, checklist generation)", primary: true },
      { name: "Excel + Copilot (PM schedule, observation trending)", primary: true },
      { name: "Adobe Acrobat AI (extracting from scanned logbooks)" },
      { name: "ChatGPT Voice / Otter (voice-to-log at site)" },
      { name: "Outlook + Copilot (statutory reminder digests)" },
    ],
    theory: [
      {
        title: "VOICE IS FASTER THAN PEN AT SITE",
        content:
          "The most under-used AI feature at sites is voice input. A site supervisor can dictate a five-minute walk-around into a phone and get a clean typed observation register in two minutes. Nobody has to type at the end of the shift. This is a small habit change that pays back every day.",
      },
      {
        title: "STRUCTURED CAPTURE > CLEAN CAPTURE",
        content:
          "If the logbook is a paragraph, it can be summarised. If the observation is one line with a category tag, it can be counted, trended, and prioritised. This session's core discipline: every entry, however brief, gets a category. The AI generates the category list once, and the site uses it every day.",
      },
      {
        title: "STATUTORY RENEWALS ARE A LIST, NOT A CALENDAR",
        content:
          "A single spreadsheet with document type, authority, valid-from, valid-until, and next-action-date, sent to a shared inbox with a monthly nudge, replaces four calendars and two email folders. AI is not doing anything clever here — it's setting up the discipline once.",
      },
    ],
    prompts: [
      {
        title: "PATTERN 1 · LOGBOOK-TO-SUMMARY",
        prompt: `You are compiling the monthly plant report.

CONTEXT
Below are the daily logbook entries for [MACHINE] for [MONTH],
transcribed from the operator's handwritten register.

TASK
Produce a monthly summary:
  - Total operating hours (sum of daily entries)
  - Total idle hours
  - Downtime hours by category (breakdown, PM, weather, waiting, other)
  - Fuel consumed (litres) and litres-per-hour ratio
  - Breakdown events: date, duration, cause, resolution
  - PM events: date, service done, next PM due
  - Utilisation % (operating / (operating + idle + downtime))

At the end, flag anything unusual: hour-meter reset, repeated
breakdown of same subsystem, idle % above 20%.

RULES
- Do not invent hours or events not in the log.
- Where entries are ambiguous, mark in an "unclear entries"
  section for follow-up.

LOG: """[…]"""`,
      },
      {
        title: "PATTERN 2 · SAFETY OBSERVATION TRENDING",
        prompt: `You are the site safety officer producing the monthly report.

CONTEXT
Below are safety observations captured during walk-arounds
this month, in free text.

TASK
For each observation:
  1. Assign a category: PPE / working-at-height / housekeeping /
     electrical / hot-work / excavation / lifting / confined-space /
     environment / first-aid / near-miss / other
  2. Assign severity: 1 (minor) / 2 (moderate) / 3 (major) / 4 (danger)
  3. Note if this is a repeat of last month's observation

Then produce:
  - Count by category
  - Top 3 categories by count and by severity-weighted count
  - List of top 5 repeat observations
  - One-paragraph narrative for the site head

RULES
- Do not name individuals — refer to "the team" or "the operator".
- Do not add observations not in the input.

THIS MONTH: """[…]"""
LAST MONTH (summary): """[…]"""`,
      },
    ],
    exercises: [
      {
        title: "EXERCISE 1 · LOGBOOK COMPILATION",
        duration: "30 min",
        level: "Warm-up · pairs (V&M + Mechanical)",
        setup:
          "Pairs (V&M and Mechanical). Use Pattern 1 with the synthetic excavator log below. Compare summaries. The interesting differences are how each pair handled the ambiguous entries and the PM-500 overdue flag.",
        dataset: `DAILY OPERATOR'S LOG — EXCAVATOR TATA HITACHI EX-200LC — SINNAR-GHOTI SITE
Registration: MH-15-BF-2277  Operator: Ramesh Waghmare
Month: September 2026   Opening hour-meter: 2,347.5

Date | Op hrs | Idle hrs | Fuel (L) | Remarks
01   | 7.5    | 0.5      | 68       | Trench Zone 2 KM 12.4-12.9
02   | 7.5    | 0.5      | 66       | Trench Zone 2
03   | 7.5    | 0.5      | 68       | Trench Zone 2
04   | 4.0    | 2.0      | 38       | Hydraulic hose leak PM lunch. 2 hrs down.
05   | 8.0    | 0.0      | 72       | Trench Zone 2
06   | —      | —        | —        | Sunday — no operation
07   | 7.5    | 0.5      | 68       | Zone 2 to Zone 3 transition
08   | 7.5    | 0.5      | 68       | Trench Zone 3
09   | 3.0    | 4.0      | 28       | Rock encountered. Waiting for breaker mobilisation.
10   | 6.0    | 2.0      | 54       | Rock area — reduced advance
11   | 7.0    | 1.0      | 62       | Rock area
12   | 0.0    | 0.0      | 0        | Cyclone advisory — site closed
13   | 0.0    | 0.0      | 0        | Cyclone advisory — site closed
14   | 0.0    | 0.0      | 0        | Cyclone advisory — site closed
15   | 1.0    | 3.0      | 12       | Post-cyclone site restoration
16-25| (normal operation) ...
26   | 4.5    | 2.5      | 42       | Bucket pin worked loose. Repair on site 2 hrs.
27-30| 7.5    | 0.5      | 66-68    | Zone 3
Closing hour-meter: 2,515.0 (total op hours ≈ 167.5)
NOTE: PM-500 due at 2,500 hrs — reached on 29 Sep, not yet actioned. OVERDUE.`,
        debrief:
          "Expected output: 167.5 total op hours. Downtime by category: breakdown (04, 26) ~4 hrs; PM (20) ~7.5 hrs; weather (12-14) 24 hrs; waiting for breaker (09) 4 hrs. Utilisation ~78% on working days. FLAG: PM-500 overdue from 29 Sep. Bucket pin — second occurrence in three months; should be escalated.",
      },
    ],
    caseStudy: {
      title: "From Calendar PM to Hour-Meter PM — Fleet of 22 Machines",
      story:
        "A Pune-based excavation contractor, fleet of 22 machines. Preventive maintenance ran on a calendar cycle: 15th of every month, same PM for all machines. Some machines had operated 240 hours in the previous month; others had operated 60. Same PM for both. Fleet breakdown data: 47 unplanned breakdowns across 22 machines (2.1/machine/year). Total downtime cost: ₹34 lakh per year. In January 2025, the plant coordinator used Excel Copilot to correlate breakdowns with hours-since-last-PM. The pattern: 71% of breakdowns occurred on machines where hours-since-last-PM exceeded 380 (against manufacturer's recommended 250). The calendar cycle was hiding this.",
      outcome:
        "They implemented a monthly PM schedule based on hour-meter readings, refreshed weekly. Workshop man-days didn't change; sequencing did. Twelve months later: 24 breakdowns (from 47). Downtime cost ₹18 lakh (from ₹34 lakh). Net saving: ~₹16 lakh. The only added cost was one hour per week on the hour-meter refresh.",
      takeaway:
        "The tool didn't do anything the plant coordinator couldn't have done manually. The value was that the AI-assisted schedule made the discipline sustainable — 45 minutes a week, not 4 hours a month. When a discipline is cheap enough that nobody skips it, the discipline holds.",
    },
    charts: {
      bar: [
        { label: "Breakdowns Before", value: 47, color: "#B0431E" },
        { label: "Breakdowns After", value: 24, color: "#5C6A3A" },
        { label: "Downtime Cost Before (₹L)", value: 34, color: "#7A2E1F" },
        { label: "Downtime Cost After (₹L)", value: 18, color: "#2E3F63" },
      ],
      pie: [
        { label: "PPE Observations", value: 28, color: "#B0431E" },
        { label: "Housekeeping", value: 22, color: "#B58022" },
        { label: "Working at Height", value: 18, color: "#7A2E1F" },
        { label: "Electrical Safety", value: 14, color: "#2E3F63" },
        { label: "Near-Miss / Other", value: 18, color: "#5C6A3A" },
      ],
    },
    pitfalls: [
      "Using a paragraph-format logbook instead of a structured daily entry. Paragraphs cannot be trended or counted.",
      "Conducting a safety observation walkthrough but not logging in real-time. Memory of observations deteriorates within hours.",
      "Running the statutory register once and not updating it. The renewal is annual; the habit should be monthly.",
    ],
    closingQA: [
      "\"How many unplanned breakdowns did your site have last month? How many were on machines where PM was overdue?\"",
      "\"What is the one observation category that appears most often in your site walkdowns but never gets resolved?\"",
    ],
  },

  8: {
    id: 8,
    agenda: [
      "0:00–0:30 · Foundations block",
      "0:30–0:45 · The writing that goes with every other department's work",
      "0:45–1:00 · Tone transformation live demo",
      "1:00–1:15 · Break",
      "1:15–1:50 · Exercise 1 — Tone Transformation (individual)",
      "1:50–2:15 · Exercise 2 — Meeting Minutes Pipeline (pairs)",
      "2:15–2:40 · Exercise 3 — Policy One-Pager (HR group)",
      "2:40–3:00 · Q&A + Workshop Closing",
    ],
    tools: [
      { name: "Claude / ChatGPT (letter drafting, tone control)", primary: true },
      { name: "Microsoft Word + Copilot (formal documents)", primary: true },
      { name: "Otter / Fathom (meeting transcription)" },
      { name: "Napkin AI (diagrams from text)" },
      { name: "Outlook + Copilot (email drafts)" },
    ],
    theory: [
      {
        title: "TONE IS A TOGGLE",
        content:
          "Language models can perfectly adjust tone. You can write an angry, bulleted list of grievances and ask the AI to 'rewrite this to be legally sound, professional, unemotional, and contractually firm.' This de-risks communication — the engineer's technical accuracy is preserved, the tone that could cause a dispute is removed.",
      },
      {
        title: "THE MINUTES OF MEETING PIPELINE",
        content:
          "Instead of having someone take manual notes, use meeting transcription software (Otter, Fathom, or Teams) and feed the transcript to an LLM. Ask it to specifically extract 'Decisions Made', 'Action Items with Owners', and 'Open Risks'. The MOM is done before the post-meeting tea.",
      },
      {
        title: "POLICY DOCUMENTS HAVE A 'PLAIN ENGLISH' VERSION",
        content:
          "HR policies are written by HR or legal in precise but impenetrable language. The same AI that helps Accounts read GST notices can produce a 'plain English summary' of any HR policy for employee distribution. One document, two versions, no extra writing.",
      },
    ],
    prompts: [
      {
        title: "PATTERN 1 · TONE TRANSFORMATION",
        prompt: `You are rewriting a professional communication.

CONTEXT
Below is a draft email or letter written by a site engineer
to a subcontractor. The content is correct but the tone is
problematic.

TASK
Rewrite the communication so that it is:
  - Legally sound and contractually precise
  - Professional and unemotional
  - Firm without being aggressive
  - Clear on consequences without making threats

Keep all technical facts exactly as written. Do not soften any
factual positions. Only change the tone, not the substance.

RULES
- Do not remove any of the specific dates, amounts, or references.
- Do not add facts not in the original.
- If the original contains a specific contractual clause reference,
  keep it.

ORIGINAL DRAFT: """[…]"""`,
      },
      {
        title: "PATTERN 2 · MINUTES OF MEETING",
        prompt: `You are producing the minutes of a meeting from the transcript below.

TASK
Extract the following, in this exact format:

Meeting: [Title]
Date: [Date]
Attendees: [names and designations]

DECISIONS MADE
[numbered list — only decisions, not discussions]

ACTION ITEMS
| # | Action | Owner | Due Date |
[table]

OPEN RISKS / ISSUES FLAGGED
[numbered list — items flagged but not yet resolved]

NEXT MEETING
[if stated]

RULES
- Only extract decisions that were concluded, not ones still
  under discussion.
- Action items must have an owner. If no owner was named,
  write [owner not assigned].
- Do not paraphrase discussions — only extract conclusions.

TRANSCRIPT: """[…]"""`,
      },
    ],
    exercises: [
      {
        title: "EXERCISE 1 · TONE TRANSFORMATION",
        duration: "25 min",
        level: "Core · individual",
        setup:
          "Individual. Use Pattern 1 on the synthetic email below. Compare transformed versions across three neighbours — the interesting differences are which phrases each person chose to reframe and which they kept as-is.",
        dataset: `ORIGINAL DRAFT FROM SITE ENGINEER (to concrete subcontractor):

Subject: CONCRETE DELAY - AGAIN

Mahendra,

This is the 3rd time this month your batching plant has broken down
and we've been standing around waiting. Today 48 workers sat idle
for 4 hours because you couldn't get your act together. Do you know
how much that costs us?

Your contract says 8 hours notice for breakdown. You gave us 15 minutes.
That's not acceptable. We're losing money every day because of this.

If this happens again we'll deduct everything and terminate your contract.
I'm done with this.

Rakesh Patil
Site In-Charge`,
        debrief:
          "Expected transformation: formal opening with contract reference and date, factual statement of the three occurrences (with dates), specific contractual obligation breached (clause reference + 8-hour notice requirement), quantified impact (48 workers × 4 hours = 192 man-hours idle), formal notice of potential deduction and show-cause, professional close. The tone change preserves every fact and every consequence — it only removes the language that creates a dispute rather than resolving it.",
      },
      {
        title: "EXERCISE 2 · MEETING MINUTES PIPELINE",
        duration: "25 min",
        level: "Applied · pairs",
        setup:
          "Pairs. Use Pattern 2 on the synthetic transcript excerpt below. Both participants run Pattern 2 independently, then compare their minutes for differences in what they classified as 'decision' vs 'discussion still open.'",
        dataset: `TRANSCRIPT EXCERPT — Monthly site coordination meeting, Sinnar-Ghoti WSS
Attendees: R. Kulkarni (PM), S. Kadam (EHS), P. Deshpande (Planning), V. Nair (MEP)

R. Kulkarni: So on the cyclone recovery, we've decided to claim a 21-day extension.
  Are we all agreed on that?
P. Deshpande: Yes, agreed. I'll prepare the EOT claim document by 5th October.
R. Kulkarni: Good. S. Kadam, the scaffold inspection report — where are we?
S. Kadam: I've done Zone 1 and 2. Zone 3 to be done by end of this week.
R. Kulkarni: Ok, so let's say that's done by 3rd October, Friday.
S. Kadam: Yes, 3rd October.
V. Nair: On the electrical substation — client hasn't given us access yet. We flagged
  it last month too. This is going to delay the MV panel installation.
R. Kulkarni: Right, let's formally write to the client today. V. Nair, can you draft
  the letter and send to me by EOD?
V. Nair: Yes.
R. Kulkarni: One more thing — cement stock. The store says we have 4 days of stock.
  Procurement, when is the next delivery?
[No procurement rep present]
R. Kulkarni: Ok, someone needs to chase this. I'll follow up with Purchase after this meeting.
Next meeting: 14 October 2026, 10:00 AM`,
        debrief:
          "Expected decisions: (1) 21-day EOT claim to be filed. Expected actions: (1) P. Deshpande — EOT claim document by 5 Oct; (2) S. Kadam — Zone 3 scaffold inspection by 3 Oct; (3) V. Nair — client access letter by EOD today; (4) R. Kulkarni — follow up with Purchase on cement delivery. Open risk: client has not given access to electrical substation — second month flagged, no resolution.",
      },
    ],
    caseStudy: {
      title: "The Email That Delayed a Payment — Tone vs. Substance",
      story:
        "A site engineer at a Suroj project sent a payment demand to a client's project manager after a 60-day delay on a ₹38 lakh running account bill. The email was technically correct: it cited the correct clause (Contract Clause 42.3 — payment within 30 days of certified bill), the correct interest rate (18% per annum per Contract Clause 42.4), and the correct overdue amount. The problem was the tone: it opened with 'We are shocked and dismayed at the continued failure of your team to process our legitimate payment claim,' and ended with 'We will have no choice but to escalate this to senior management and legal counsel if payment is not received by tomorrow.'",
      outcome:
        "The client's PM, feeling publicly accused of incompetence, forwarded the email to his legal team with a note 'these contractors are threatening us.' The legal team placed a hold on all pending payments pending 'review of contractual position.' The ₹38 lakh bill, already certified, stayed unpaid for a further 45 days. Total interest cost to Suroj: ₹2.85 lakh. Pattern 1 applied to the original draft would have preserved every contractual fact and every consequence — it would have removed only the language that converted a legitimate payment follow-up into a perceived threat.",
      takeaway:
        "Tone is not softening — it is precision. A professionally worded firm letter citing clause numbers and interest calculations is harder to dismiss than an angry one. It also cannot be used as evidence of bad faith in a dispute.",
    },
    charts: {
      pie: [
        { label: "Internal Communications", value: 35, color: "#5C6A3A" },
        { label: "Client Correspondence", value: 28, color: "#2E3F63" },
        { label: "Subcontractor Letters", value: 22, color: "#B0431E" },
        { label: "Policy & HR Documents", value: 15, color: "#B58022" },
      ],
      bar: [
        { label: "Time to Draft MOM (manual, min)", value: 45, color: "#B0431E" },
        { label: "Time to Draft MOM (AI, min)", value: 8, color: "#5C6A3A" },
        { label: "Tone-Issues in Emails (% of sampled)", value: 34, color: "#7A2E1F" },
        { label: "Disputes Triggered by Poor Tone (%)", value: 18, color: "#B58022" },
      ],
    },
    pitfalls: [
      "Using the AI to soften a legitimate contractual position. Do not lose substance in pursuit of better tone — the facts and clause references must survive.",
      "Transcribing meetings manually before feeding to the AI. Use an AI transcription tool (Otter, Fathom, or Teams built-in) to save this step.",
      "Asking the AI to write a policy from scratch without providing the legal/regulatory constraint it must satisfy. The policy will sound right but miss a compliance requirement.",
    ],
    closingQA: [
      "\"What is one email you sent last month that, in retrospect, could have been more professionally worded — and what was the consequence?\"",
      "\"Which internal document type takes the most of your team's time to produce? Could an AI-assisted template cut that in half?\"",
      "\"From all eight sessions: what is the one workflow each of you will start using AI for next week?\"",
    ],
  },
};
