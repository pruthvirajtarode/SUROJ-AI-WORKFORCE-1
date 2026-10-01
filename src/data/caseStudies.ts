
export const caseStudies = [
  // TYPE A: REAL PROJECT PROFILES
  {
    id: "cs1",
    type: "REAL PROJECT PROFILE",
    title: "Midea India Supa: Greenfield EPC Complexities",
    session: "EPC Bids & Design-Build",
    department: "EPC",
    projectRef: "p1", // Midea India
    context: "A massive 48-acre greenfield EPC project for a White Goods Manufacturing Unit requiring coordination across Civil, Structural, Architectural, MEP, and PEB works.",
    problem: "Managing interface risks between PEB structures and civil foundations, alongside MEP coordination in a fast-track 48-acre greenfield environment.",
    aiWorkflow: "Illustrative AI Workflow: AI-assisted interface checking.",
    solution: "AI could extract interface requirements from PEB vendor specifications and cross-check against civil foundation drawings to flag dimensional inconsistencies before pouring concrete.",
    result: "Potential AI Training Opportunity: Reduced rework at the Civil/PEB interface by identifying dimensional conflicts during the design phase.",
    badge: "REAL PROJECT PROFILE",
    color: "brick",
    source: "Suroj Buildcon official website"
  },
  {
    id: "cs2",
    type: "REAL PROJECT PROFILE",
    title: "Siemens Kalwa: Brownfield Restoration Risks",
    session: "Plant, Execution & Compliance",
    department: "EHS / Quality",
    projectRef: "p7", // Siemens
    context: "Structural restoration and rehabilitation of an existing factory building in an operational plant environment.",
    problem: "Maintaining strict EHS compliances and tracking daily site observations without disrupting the client's ongoing plant operations.",
    aiWorkflow: "Illustrative AI Workflow: Daily EHS observation structuring.",
    solution: "Using AI to convert rough notes from site walkdowns into structured safety reports, categorizing hazards by severity and generating corrective action lists.",
    result: "Potential AI Training Opportunity: Faster turnaround of daily safety compliance reports for client submission.",
    badge: "REAL PROJECT PROFILE",
    color: "iron",
    source: "Suroj Buildcon official website"
  },
  {
    id: "cs3",
    type: "REAL PROJECT PROFILE",
    title: "Asian Paints Mysuru: Chemical Standard Specifications",
    session: "Design, Drawings & Quantities",
    department: "MEP / Quantity Surveyor",
    projectRef: "p4", // Asian Paints
    context: "Civil and Structural works for a large-scale paint manufacturing facility with strict chemical industry safety and material standards.",
    problem: "Extracting precise material specifications and testing requirements from hundreds of pages of chemical industry standards for BOQ preparation.",
    aiWorkflow: "Illustrative AI Workflow: Specification extraction & BOQ checking.",
    solution: "AI prompt to extract 'all mandatory testing criteria and material grades' from the technical specifications, mapping them directly to the BOQ items.",
    result: "Potential AI Training Opportunity: Rapid verification that the priced BOQ includes all required specialized tests for chemical compliance.",
    badge: "REAL PROJECT PROFILE",
    color: "slate",
    source: "Suroj Buildcon official website"
  },

  // TYPE B: SYNTHETIC TRAINING SIMULATIONS
  {
    id: "cs4",
    type: "SYNTHETIC TRAINING SIMULATION",
    title: "The addendum that mattered (Tender Analysis)",
    session: "Tendering & Contracts",
    department: "Contract & Tendering",
    context: "A 300-page tender received a 40-page addendum four days before submission.",
    problem: "The addendum buried a change to the mobilization advance recovery terms inside a seemingly unrelated clause about progress billing. Human reviewers could miss it during a fast-tracked review.",
    aiWorkflow: "AI Document Analysis & Delta Comparison",
    solution: "The tender team runs a delta-comparison prompt using an LLM. The AI flags the exact clause where 'recovery at 20% progress' was changed to 'recovery at 10% progress'.",
    result: "The firm adjusts their working capital projection accordingly.",
    badge: "TRAINING SIMULATION",
    color: "rust",
    source: "Synthetic training scenario"
  },
  {
    id: "cs5",
    type: "SYNTHETIC TRAINING SIMULATION",
    title: "The lowest quote that wasn't",
    session: "Procurement & Stores",
    department: "Purchase",
    context: "Comparing three vendor quotes for a major steel procurement package.",
    problem: "Vendor A had the lowest basic rate. Vendor B had a higher basic rate but included unloading and had shorter lead times. Vendor C had a complex staggered payment term.",
    aiWorkflow: "AI Vendor Comparison",
    solution: "The procurement team uses a 'Total Cost of Ownership' normalization prompt. The AI produces a leveled comparison table incorporating the time-value of money for the advance payment and the cost of site unloading.",
    result: "Vendor B is revealed to be 4% cheaper in total actual cost than Vendor A.",
    badge: "TRAINING SIMULATION",
    color: "ochre",
    source: "Synthetic training scenario"
  },
  {
    id: "cs6",
    type: "SYNTHETIC TRAINING SIMULATION",
    title: "Invoice Reconciliation Discrepancy",
    session: "Accounts & Finance",
    department: "Accounts",
    context: "End of month reconciliation of 150+ subcontractor invoices against ERP ledger.",
    problem: "Manual checking of GST numbers, retention deductions, and TDS rates takes three days, with frequent errors in TDS categorisation for mixed-supply bills.",
    aiWorkflow: "AI Data Structuring & Checking",
    solution: "AI structuring prompt extracts basic value, GST, and TDS from raw invoice scans into a tabular format, highlighting invoices where the applied TDS rate contradicts the service description.",
    result: "Flagged 4 invoices with incorrect TDS application before payment processing.",
    badge: "TRAINING SIMULATION",
    color: "indigo",
    source: "Synthetic training scenario"
  },
  {
    id: "cs7",
    type: "SYNTHETIC TRAINING SIMULATION",
    title: "Budget vs Actual Variance Report",
    session: "Cost, Planning & Systems",
    department: "Cost Control",
    context: "Monthly cost review meeting preparation using raw ERP dumps.",
    problem: "Translating 5,000 lines of transaction data into a narrative variance report for management.",
    aiWorkflow: "AI Narrative Generation from Data",
    solution: "After summarizing the variance in Excel, the planner feeds the top 5 overrunning cost codes to AI to draft the explanatory narrative based on site logs.",
    result: "Management report drafted in 30 minutes instead of half a day.",
    badge: "TRAINING SIMULATION",
    color: "steel",
    source: "Synthetic training scenario"
  },
  {
    id: "cs8",
    type: "SYNTHETIC TRAINING SIMULATION",
    title: "Tone Shift: Notice to Subcontractor",
    session: "People, Admin & Communication",
    department: "HR & Admin / Project Management",
    context: "Site engineer drafted an emotionally charged email to a subcontractor about delays.",
    problem: "The draft was unprofessional and could damage the commercial relationship while failing to assert contractual rights properly.",
    aiWorkflow: "AI Tone Transformation",
    solution: "Using the 'Executive Professional' tone prompt, AI rewrote the email to remove emotion, state the facts chronologically, and clearly reference the contractual delay clauses.",
    result: "A firm, defensible, and professional communication sent.",
    badge: "TRAINING SIMULATION",
    color: "moss",
    source: "Synthetic training scenario"
  }
];
