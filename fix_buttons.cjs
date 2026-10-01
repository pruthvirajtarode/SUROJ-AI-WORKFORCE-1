const fs = require('fs');

const fixCSS = `
  /* Fix Copy Button Visibility inside Paper cards */
  .paper .copy-btn {
    color: #1f2937 !important; 
    background: #e5e7eb !important; 
    border: 1px solid #9ca3af !important;
    font-weight: 600 !important;
  }
  .paper .copy-btn:hover {
    background: #d1d5db !important;
  }
`;

const files = [
  'public/Suroj_Session2_Accounts_Finance.html',
  'public/Suroj_Session3_People_Admin_Communication.html',
  'public/Suroj_Session5_Procurement_Stores.html'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('/* Fix Copy Button Visibility')) {
    content = content.replace('</style>', fixCSS + '\n</style>');
    fs.writeFileSync(file, content, 'utf8');
  }
}
