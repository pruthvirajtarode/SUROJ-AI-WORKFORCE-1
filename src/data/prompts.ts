export const prompts = [
  {
    id: 1,
    title: "Obligation Extraction",
    department: "Contract & Tendering",
    useCase: "Tender Review",
    prompt: `You are a Contracts Engineer at Suroj Buildcon.
The document below is a tender condition of contract for an upcoming Industrial EPC project.

TASK:
Extract every obligation placed on the contractor.

FORMAT:
Table with columns: Clause No. | Obligation | Trigger | Potential Impact | Risk Level

RULES:
- Only use information present in the text.
- If unclear, mark "ambiguous".
- Do not invent obligations.`,
    difficulty: "Beginner",
    color: "bg-rust"
  },
  {
    id: 2,
    title: "Spec vs BOQ Mismatch",
    department: "EPC",
    useCase: "Design-Build Interface",
    prompt: `You are a Design Coordinator at Suroj Buildcon working on a Greenfield Industrial Project.
Below are two texts: a Technical Specification extract and a BOQ line item description.

TASK:
Compare them and identify any mismatches where the specification demands a higher standard or different scope than what the BOQ prices. Focus on structural and architectural interfaces.

FORMAT:
Bullet points highlighting specifically the delta.`,
    difficulty: "Intermediate",
    color: "bg-brick"
  },
  {
    id: 3,
    title: "Invoice Reconciliation Discrepancy",
    department: "Accounts",
    useCase: "Financial Compliance",
    prompt: `You are a Senior Accountant at Suroj Buildcon.
I have a list of invoice variances between our purchase register and GSTR-2A for subcontractors.

TASK:
Categorize these variances into: Date mismatch, Value mismatch, Vendor not filed, or Invoice missing in PR.

FORMAT:
Table summary followed by the categorized lists.`,
    difficulty: "Intermediate",
    color: "bg-indigo"
  },
  {
    id: 4,
    title: "Budget vs Actual Narrative",
    department: "Cost Control",
    useCase: "Management Dashboard",
    prompt: `You are a Cost Control Manager at Suroj Buildcon.
Below is the data showing Schedule Variance and Cost Variance for this month across an ongoing FMCG factory project.

TASK:
Write a crisp 3-paragraph executive narrative explaining the variances to the Management. Focus on root causes, equipment delays, and site productivity, not just repeating the numbers.`,
    difficulty: "Advanced",
    color: "bg-steel"
  },
  {
    id: 5,
    title: "BOQ Checking & Variation",
    department: "Quantity Surveyor",
    useCase: "Quantity Checking",
    prompt: `You are a Quantity Surveyor at Suroj Buildcon.
Below are the quantities derived from a revised structural drawing and the original tender BOQ.

TASK:
Identify items with more than 10% positive or negative variance. Flag any new items that need a variation claim.

FORMAT:
Variation table with justification column.`,
    difficulty: "Intermediate",
    color: "bg-slate"
  },
  {
    id: 6,
    title: "TCO Vendor Comparison",
    department: "Purchase",
    useCase: "Procurement Intelligence",
    prompt: `You are a Procurement Manager at Suroj Buildcon.
I am providing three vendor quotations for a bulk steel order.

TASK:
Compare the vendors based on basic rate, freight, unloading terms, and payment terms (advance vs credit). Calculate a Total Cost of Ownership (TCO) considering a 12% cost of capital.

FORMAT:
Comparison matrix.`,
    difficulty: "Advanced",
    color: "bg-ochre"
  },
  {
    id: 7,
    title: "EHS Daily Observation structuring",
    department: "EHS",
    useCase: "Site Operations",
    prompt: `You are an EHS Officer at a Suroj Buildcon project site.
Here are my raw, unstructured notes from the morning site walkdown.

TASK:
Convert these notes into a structured Daily EHS Observation Report. Categorize into: Unsafe Acts, Unsafe Conditions, Good Practices.

FORMAT:
Numbered list with Location, Observation, and Recommended Corrective Action.`,
    difficulty: "Beginner",
    color: "bg-iron"
  },
  {
    id: 8,
    title: "Firm Email to Subcontractor",
    department: "HR & Admin",
    useCase: "Communication Tone",
    prompt: `You are a Project Manager at Suroj Buildcon.
Below is a draft email written by a site engineer to a subcontractor regarding schedule delays. It is currently too emotional and unprofessional.

TASK:
Rewrite the email in an 'Executive Professional' tone. State the facts chronologically, remove emotion, and clearly reference the delay.`,
    difficulty: "Beginner",
    color: "bg-moss"
  }
];
