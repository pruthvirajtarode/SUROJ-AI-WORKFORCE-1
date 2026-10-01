const fs = require('fs');
const path = require('path');

const files = [
  'public/Suroj_Session2_Accounts_Finance.html',
  'public/Suroj_Session3_People_Admin_Communication.html',
  'public/Suroj_Session5_Procurement_Stores.html'
];

const fixCSS = `
  /* Fix download button visibility */
  .dlbtn {
    color: #0f172a !important;
    background: #e2e8f0 !important;
    border: 1px solid #94a3b8 !important;
    font-weight: 700 !important;
    display: inline-flex !important;
    align-items: center;
    gap: 6px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
  .dlbtn:hover {
    background: #cbd5e1 !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
`;

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  
  let content = fs.readFileSync(file, 'utf8');
  
  // Inject CSS fix
  if (!content.includes('/* Fix download button visibility */')) {
    content = content.replace('</style>', fixCSS + '\n</style>');
  }

  // Regex to find download buttons with base64 data URIs
  const regex = /<a\\s+[^>]*?class=["']dlbtn["'][^>]*?download=["']([^"']+)["'][^>]*?href=["']data:text\\/csv;base64,([^"']+)["'][^>]*?>/gi;
  
  let match;
  while ((match = regex.exec(content)) !== null) {
    const fullMatch = match[0];
    const filename = match[1];
    const base64Data = match[2];
    
    // Save to public folder
    const outPath = path.join('public', filename);
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(outPath, buffer);
    
    // Replace in HTML to point to the actual file and add target="_top"
    const newAnchor = fullMatch
      .replace(/href=["']data:text\\/csv;base64,[^"']+["']/, 'href="/' + filename + '" target="_top"')
      .replace(/download=["'][^"']+["']/, 'download="' + filename + '"');
      
    content = content.replace(fullMatch, newAnchor);
  }
  
  fs.writeFileSync(file, content, 'utf8');
}
