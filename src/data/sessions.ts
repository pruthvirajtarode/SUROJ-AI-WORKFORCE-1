export const sessions = [
  {
    id: 1,
    title: "EPC Bids & Design-Build / Tendering & Contracts",
    family: "Winning Work",
    headcount: 42,
    htmlUrl: "/Suroj_Session1_Tendering_EPC_BD_with_Hour1.html",
    departments: [
      { name: "Contract & Tendering", count: 22 },
      { name: "EPC", count: 19 },
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
      }
    ],
    color: "rust"
  },
  {
    id: 2,
    title: "Accounts & Finance",
    family: "Numbers, Drawings & Systems",
    headcount: 39,
    htmlUrl: "/Suroj_Session2_Accounts_Finance.html",
    departments: [
      { name: "Accounts", count: 39 }
    ],
    objective: "Invoice reconciliation, GSTR-2A/2B reconciliation, TDS review, bank reconciliation, notice response drafting.",
    problem: "Manually reconciling hundreds of subcontractor invoices with GSTR-2A records takes days and often misses miscategorized TDS rates.",
    aiOpportunity: "AI data structuring can instantly extract and categorize invoice data, flagging variances and mismatching GST numbers for human review.",
    theory: [
      {
        title: "AI IS NOT A CALCULATOR",
        content: "LLMs are language models, not arithmetic engines. Do not ask an LLM to sum up 100 invoice amounts; it will likely hallucinate a number. Instead, ask it to write the Excel formula or Python script to do the sum."
      }
    ],
    color: "indigo"
  },
  {
    id: 3,
    title: "People, Admin & Communication",
    family: "People & Communication",
    headcount: 29,
    htmlUrl: "/Suroj_Session3_People_Admin_Communication.html",
    departments: [
      { name: "HR & Admin", count: 23 },
      { name: "EHS", count: 3 },
      { name: "Branding", count: 2 },
      { name: "Quality", count: 1 }
    ],
    objective: "Letter drafting, tone control, policy documents, meeting minutes, presentations, internal communication.",
    problem: "Site engineers often draft emotionally charged emails to subcontractors about delays, lacking professional tone and contractual rigor.",
    aiOpportunity: "AI tone transformation rewrites emails to be firm, factual, and strictly aligned with contractual conditions.",
    theory: [
      {
        title: "TONE IS A TOGGLE",
        content: "Language models can perfectly adjust tone. You can write an angry, bulleted list of grievances and ask the AI to 'rewrite this to be legally sound, professional, unemotional, and contractually firm.' This de-risks communication."
      }
    ],
    color: "moss"
  },
  {
    id: 4,
    title: "Cost, Planning & Systems",
    family: "Numbers, Drawings & Systems",
    headcount: 26,
    htmlUrl: "/Suroj_Session4_Cost_Planning_Systems_with_Hour1.html",
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
      }
    ],
    color: "steel"
  },
  {
    id: 5,
    title: "Procurement & Stores",
    family: "Running Site & Materials",
    headcount: 23,
    htmlUrl: "/Suroj_Session5_Procurement_Stores.html",
    departments: [
      { name: "Purchase", count: 11 },
      { name: "Store", count: 6 },
      { name: "V&M", count: 5 },
      { name: "Shuttering & Formwork Mfg.", count: 1 }
    ],
    objective: "Vendor quotations, quotation normalisation, purchase orders, vendor comparison, delivery tracking, inventory.",
    problem: "Comparing vendor quotes that have different basic rates, freight terms, unloading duties, and staggered payment terms.",
    aiOpportunity: "An AI normalization prompt can generate a Total Cost of Ownership (TCO) comparison table, bringing all quotes to a common baseline.",
    theory: [
      {
        title: "NORMALIZATION AS A SUPERPOWER",
        content: "Procurement teams waste hours aligning vendor quotes (some include GST, some don't, freight is extra vs inclusive). An LLM excels at reading 5 different PDF quotes and extracting all variables into a standardized Excel matrix for true apples-to-apples comparison."
      }
    ],
    color: "ochre"
  },
  {
    id: 6,
    title: "Design, Drawings & Quantities",
    family: "Numbers, Drawings & Systems",
    headcount: 18,
    htmlUrl: "/Suroj_Session6_Design_Drawings_Quantities_with_Hour1.html",
    departments: [
      { name: "MEP", count: 12 },
      { name: "Quantity Surveyor", count: 4 },
      { name: "Documentation & Engg Coordination", count: 2 }
    ],
    objective: "Drawings, specifications, quantities, BBS checking, revisions, correspondence, take-off verification.",
    problem: "Checking revised structural drawings against the original tender BOQ to identify required variation claims is incredibly time-intensive.",
    aiOpportunity: "AI can compare take-off data tables and automatically flag items with variance over a specified threshold, generating the variation claim drafts.",
    theory: [
      {
        title: "VISION MODELS VS DRAWINGS",
        content: "Current AI vision models are poor at reading dense, scaled CAD/PDF construction drawings natively. Do not upload a complex reinforcement drawing and ask 'is this correct?'. Instead, extract the text/tables (like BBS schedules) and have the AI analyze the tabular data."
      }
    ],
    color: "slate"
  }
];

export const globalStats = {
  totalParticipants: 177,
  totalSessions: 6,
  learningFamilies: 4,
  workshopDays: 3,
  medianRoomSize: 24,
  smallestRoom: 18,
  largestRoom: 42
};
