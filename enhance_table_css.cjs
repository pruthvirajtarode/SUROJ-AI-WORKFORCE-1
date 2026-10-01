const fs = require('fs');

const tableCSS = `
  /* Table and Row Enhancements */
  table {
    border-collapse: separate !important;
    border-spacing: 0 10px !important;
    width: 100% !important;
  }
  tr {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    position: relative;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  }
  tr:hover {
    transform: scale(1.02) translateY(-2px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.08) !important;
    z-index: 10;
  }
  td, th {
    border: none !important;
    padding: 16px 20px !important;
  }
  td:first-child, th:first-child {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
  td:last-child, th:last-child {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  }
  /* Typography enhancements for the tables */
  td {
    line-height: 1.6 !important;
    color: #334155 !important;
    transition: color 0.3s ease;
  }
  tr:hover td {
    color: #0f172a !important;
  }
  /* Enhance the Tier labels / Badges */
  span[style*="font-family: monospace"] {
    transition: all 0.3s ease;
    display: inline-block;
  }
  tr:hover span[style*="font-family: monospace"] {
    transform: scale(1.05);
    font-weight: 700;
  }
  
  /* Additional block enhancements for 'The anonymisation method' */
  .tab-content > div[style*="background: var(--card-bg)"] {
    transition: all 0.3s ease !important;
    border: 1px solid transparent;
  }
  .tab-content > div[style*="background: var(--card-bg)"]:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 24px rgba(176, 67, 30, 0.1) !important;
    border-color: rgba(176, 67, 30, 0.2);
  }
`;

const files = [
  'public/Suroj_Session2_Accounts_Finance.html',
  'public/Suroj_Session3_People_Admin_Communication.html',
  'public/Suroj_Session5_Procurement_Stores.html'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('Table and Row Enhancements') && content.includes('</style>')) {
    content = content.replace('</style>', tableCSS + '\n</style>');
    fs.writeFileSync(file, content, 'utf8');
  }
}
