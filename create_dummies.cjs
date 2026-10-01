const fs = require('fs');
const path = require('path');

const files = [
  'public/Suroj_Session2_Accounts_Finance.html',
  'public/Suroj_Session3_People_Admin_Communication.html',
  'public/Suroj_Session5_Procurement_Stores.html'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  
  let content = fs.readFileSync(file, 'utf8');
  
  // Find all dummy buttons
  const regex = /<a([^>]+)href="#files"([^>]*)>📄\\s*([^<]+)<\\/a>/g;
  
  let match;
  // We have to restart the regex index if we replace within the string,
  // or just collect matches first.
  const matches = [];
  while ((match = regex.exec(content)) !== null) {
    matches.push({
      fullMatch: match[0],
      prefix: match[1],
      suffix: match[2],
      filename: match[3].trim()
    });
  }
  
  for (const m of matches) {
    // Create dummy CSV
    const outPath = path.join('public', m.filename);
    if (!fs.existsSync(outPath)) {
      fs.writeFileSync(outPath, 'ID,Description,Amount,Date\\n1,Dummy data for testing,1000,01-Aug-2026\\n');
    }
    
    // Replace href
    const newAnchor = '<a' + m.prefix + 'href="/' + m.filename + '" download="' + m.filename + '" target="_top"' + m.suffix + '>📄 ' + m.filename + '</a>';
    content = content.replace(m.fullMatch, newAnchor);
  }
  
  fs.writeFileSync(file, content, 'utf8');
}
