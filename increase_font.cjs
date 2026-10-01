const fs = require('fs');

const fontCSS = `
  /* Increase Text Size Globally */
  body {
    font-size: 16px !important;
  }
  p, li, td, th, .tab-content div {
    font-size: 16px !important;
    line-height: 1.7 !important;
  }
  h3 {
    font-size: 20px !important;
    margin-bottom: 16px !important;
  }
  h2 {
    font-size: 26px !important;
  }
  .module-header h1 {
    font-size: 38px !important;
    line-height: 1.2 !important;
  }
  .tabs-container button {
    font-size: 15px !important;
    padding: 12px 24px !important;
  }
  span[style*="font-family: monospace"], code, pre {
    font-size: 14px !important;
  }
  
  /* Additional spacing adjustments for the larger text */
  div[style*="background: var(--safe-bg)"],
  div[style*="background: var(--danger-bg)"],
  div[style*="background: var(--card-bg)"] {
    padding: 24px !important;
  }
  ul li {
    padding: 10px 14px !important;
    margin-bottom: 12px !important;
  }
`;

const files = [
  'public/Suroj_Session2_Accounts_Finance.html',
  'public/Suroj_Session3_People_Admin_Communication.html',
  'public/Suroj_Session5_Procurement_Stores.html'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('Increase Text Size Globally')) {
    content = content.replace('</style>', fontCSS + '\n</style>');
    fs.writeFileSync(file, content, 'utf8');
  }
}
