export const sessions = [
  {
    id: 1,
    title: "Tendering & Contracts",
    family: "Winning Work",
    headcount: 23,
    departments: [
      { name: "Contract & Tendering", count: 22 },
      { name: "Business Development", count: 1 }
    ],
    objective: "Long tender document analysis, obligation extraction, eligibility checking, and pre-bid query generation.",
    problem: "Reading 300 pages of tender documents to find three critical clauses hidden in annexures takes days and is prone to human fatigue.",
    aiOpportunity: "An LLM can read the entire document in seconds and extract every obligation, mapped to clause numbers, providing a structured first draft for human verification.",
    theory: [
      {
        title: "CONTEXT WINDOWS — WHY IT MATTERS",
        content: "Every AI tool has a limit on how much text it can hold in mind at once — its 'context window.' A 300-page tender document is about 130,000–180,000 words, which fits comfortably in Claude but not always in older ChatGPT models. The habit: ask it to cite the clause number. If the citations dry up, split the document."
      },
      {
        title: "UPLOAD vs PASTE — WHEN TO USE EACH",
        content: "Upload the PDF when it is more than a few pages, or when the layout matters (tables, forms). Paste text when it is a short clause or an excerpt, or when the PDF has copy-protection that garbles the upload. Always keep the original open in another window."
      },
      {
        title: "STRUCTURED EXTRACTION BEATS SUMMARY",
        content: "Do not ask 'summarise this tender.' Ask for a table: obligation, clause, trigger, consequence. A summary is prose that reads well and forgets things. A table forces the AI to be complete or to leave a cell blank — and blank cells are what you go looking for."
      }
    ],
    color: "rust"
  },
  {
    id: 2,
    title: "EPC Bids & Design-Build",
    family: "Winning Work",
    headcount: 19,
    departments: [],
    objective: "Design-build bidding, specification analysis, scope/interface boundaries, and design-stage risk.",
    problem: "Identifying spatial and interface conflicts between Architectural, Structural, and MEP specifications during rapid tender stages.",
    aiOpportunity: "AI can cross-reference multiple specifications simultaneously to flag dimensional constraints and scope gaps before finalizing the BOQ.",
    theory: [
      {
        title: "THE RISK OF THE 'BLIND SPOT'",
        content: "Design-build tenders shift the design risk entirely to Suroj. The most expensive mistakes happen at the boundaries between disciplines (e.g., structural vs. architectural clashes). AI's ability to 'read across' documents makes it an ideal tool for finding these boundary clashes."
      },
      {
        title: "DOCUMENT CROSS-REFERENCING",
        content: "When analyzing multiple discipline specs, provide all relevant documents in a single prompt and explicitly command the AI to look for 'contradictions' or 'unaligned parameters'. Use structured outputs to force the AI to list exactly which documents contain the clash."
      }
    ],
    color: "brick"
  },
  {
    id: 3,
    title: "Accounts & Finance",
    family: "Numbers, Drawings & Systems",
    headcount: 39,
    departments: [],
    objective: "Invoice reconciliation, GSTR-2A/2B reconciliation, TDS review, bank reconciliation, notice response drafting.",
    problem: "Manually reconciling hundreds of subcontractor invoices with GSTR-2A records takes days and often misses miscategorized TDS rates.",
    aiOpportunity: "AI data structuring can instantly extract and categorize invoice data, flagging variances and mismatching GST numbers for human review.",
    theory: [
      {
        title: "AI IS NOT A CALCULATOR",
        content: "LLMs are language models, not arithmetic engines. Do not ask an LLM to sum up 100 invoice amounts; it will likely hallucinate a number. Instead, ask it to write the Excel formula or Python script to do the sum."
      },
      {
        title: "DATA NORMALIZATION",
        content: "AI is exceptionally good at normalizing messy text. If you have 50 different spellings of a vendor's name or date formats in your ledger, a prompt can output a perfectly clean CSV table mapping them all to a standard format."
      }
    ],
    color: "indigo"
  },
  {
    id: 4,
    title: "Cost, Planning & Systems",
    family: "Numbers, Drawings & Systems",
    headcount: 26,
    departments: [
      { name: "Cost Control", count: 11 },
      { name: "Planning", count: 9 },
      { name: "EDP", count: 6 }
    ],
    objective: "Budget vs actual, schedule analysis, monthly reporting, dashboard creation, forecast-at-completion.",
    problem: "Translating 5,000 lines of ERP transaction data into an insightful, narrative-driven variance report for management.",
    aiOpportunity: "Once the data is summarized, AI can instantly draft the management narrative focusing on root causes and exceptions.",
    theory: [
      {
        title: "FROM DATA TO NARRATIVE",
        content: "Management doesn't just want the dashboard; they want the story behind the dashboard. Provide the AI with the top 5 cost variances (the numbers) and the site diaries (the context), and ask it to draft the variance narrative explaining *why* the budget was exceeded."
      },
      {
        title: "THE 'EXPLAIN IT LIKE I'M 5' PRINCIPLE",
        content: "Use AI to simplify complex schedule delays (like Critical Path logic) into plain English for non-technical stakeholders or client communications."
      }
    ],
    color: "steel"
  },
  {
    id: 5,
    title: "Design, Drawings & Quantities",
    family: "Numbers, Drawings & Systems",
    headcount: 18,
    departments: [
      { name: "MEP", count: 12 },
      { name: "Quantity Surveyor", count: 4 },
      { name: "Documentation & Engineering Coordination", count: 2 }
    ],
    objective: "Drawings, specifications, quantities, BBS checking, revisions, correspondence, take-off verification.",
    problem: "Checking revised structural drawings against the original tender BOQ to identify required variation claims is incredibly time-intensive.",
    aiOpportunity: "AI can compare take-off data tables and automatically flag items with variance over a specified threshold, generating the variation claim drafts.",
    theory: [
      {
        title: "VISION MODELS VS DRAWINGS",
        content: "Current AI vision models are poor at reading dense, scaled CAD/PDF construction drawings natively. Do not upload a complex reinforcement drawing and ask 'is this correct?'. Instead, extract the text/tables (like BBS schedules) and have the AI analyze the tabular data."
      },
      {
        title: "DRAFTING RFI'S",
        content: "When a drawing is missing information, use the AI to draft the Request For Information (RFI) to the consultant. Provide the context, and it will ensure the tone is professional, contractual, and specific."
      }
    ],
    color: "slate"
  },
  {
    id: 6,
    title: "Procurement & Stores",
    family: "Running Site & Materials",
    headcount: 17,
    departments: [
      { name: "Purchase", count: 11 },
      { name: "Store", count: 6 }
    ],
    objective: "Vendor quotations, quotation normalisation, purchase orders, vendor comparison, delivery tracking, inventory.",
    problem: "Comparing vendor quotes that have different basic rates, freight terms, unloading duties, and staggered payment terms.",
    aiOpportunity: "An AI normalization prompt can generate a Total Cost of Ownership (TCO) comparison table, bringing all quotes to a common baseline.",
    theory: [
      {
        title: "NORMALIZATION AS A SUPERPOWER",
        content: "Procurement teams waste hours aligning vendor quotes (some include GST, some don't, freight is extra vs inclusive). An LLM excels at reading 5 different PDF quotes and extracting all variables into a standardized Excel matrix for true apples-to-apples comparison."
      },
      {
        title: "VENDOR NEGOTIATION PREP",
        content: "Before a negotiation meeting, feed the vendor's past performance, current market rates, and proposed terms into the AI. Ask it to generate a negotiation strategy, highlighting weak points in the vendor's proposal."
      }
    ],
    color: "ochre"
  },
  {
    id: 7,
    title: "Plant, Execution & Compliance",
    family: "Running Site & Materials",
    headcount: 17,
    departments: [
      { name: "V&M", count: 5 },
      { name: "Mechanical", count: 3 },
      { name: "Operation", count: 3 },
      { name: "EHS", count: 3 },
      { name: "Precast", count: 1 },
      { name: "Quality", count: 1 },
      { name: "Shuttering & Formwork", count: 1 }
    ],
    objective: "Machine logbooks, preventive maintenance, statutory documents, safety observations, inspection checklists.",
    problem: "Capturing rough notes from daily site walkdowns and turning them into structured, categorized EHS and Quality compliance reports.",
    aiOpportunity: "AI can convert unstructured, messy field notes into fully formatted, categorized daily safety and quality observations ready for client submission.",
    theory: [
      {
        title: "VOICE-TO-TEXT FOR SITE WALKS",
        content: "Site engineers cannot type while inspecting a scaffold. Train them to dictate their observations into a voice-to-text tool, then use an LLM prompt to structure that raw transcript into a formal NCR or Daily EHS Report."
      },
      {
        title: "COMPLIANCE CHECKING",
        content: "Upload the specific IS code or OSHA standard alongside the site observation. Ask the AI to identify exact standard violations based on the observation."
      }
    ],
    color: "iron"
  },
  {
    id: 8,
    title: "People, Admin & Communication",
    family: "People & Communication",
    headcount: 25,
    departments: [
      { name: "HR & Admin", count: 23 },
      { name: "Branding", count: 2 }
    ],
    objective: "Letter drafting, tone control, policy documents, meeting minutes, presentations, internal communication.",
    problem: "Site engineers often draft emotionally charged emails to subcontractors about delays, lacking professional tone and contractual rigor.",
    aiOpportunity: "AI tone transformation rewrites emails to be firm, factual, and strictly aligned with contractual conditions.",
    theory: [
      {
        title: "TONE IS A TOGGLE",
        content: "Language models can perfectly adjust tone. You can write an angry, bulleted list of grievances and ask the AI to 'rewrite this to be legally sound, professional, unemotional, and contractually firm.' This de-risks communication."
      },
      {
        title: "THE 'MINUTES OF MEETING' PIPELINE",
        content: "Instead of having someone take manual notes, use meeting transcription software and feed the transcript to an LLM. Ask it to specifically extract 'Decisions Made', 'Action Items with Owners', and 'Open Risks'."
      }
    ],
    color: "moss"
  }
];

export const globalStats = {
  totalParticipants: 184,
  totalSessions: 8,
  learningFamilies: 4,
  workshopDays: 3,
  medianRoomSize: 23,
  smallestRoom: 17,
  largestRoom: 39
};
