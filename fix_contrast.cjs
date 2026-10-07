const fs = require('fs');

const files = [
  'public/Suroj_Session1_Tendering_EPC_BD_with_Hour1.html',
  'public/Suroj_Session2_Accounts_Finance_Gamified.html',
  'public/Suroj_Session3_People_Admin_Communication_Gamified.html',
  'public/Suroj_Session4_Cost_Planning_Systems_with_Hour1.html',
  'public/Suroj_Session5_Procurement_Stores_Gamified.html',
  'public/Suroj_Session6_Design_Drawings_Quantities_with_Hour1.html'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Replace hardcoded hex colors with theme variables for light mode readability
  content = content.replace(/#FF5252/gi, 'var(--red)');
  content = content.replace(/#4CAF50/gi, 'var(--green)');
  content = content.replace(/#FF9800/gi, 'var(--orange)');
  content = content.replace(/#FFD600/gi, 'var(--accent)');
  content = content.replace(/#2196F3/gi, 'var(--blue)');
  content = content.replace(/#CE93D8/gi, 'var(--indigo)');
  content = content.replace(/#4DD0E1/gi, 'var(--steel)');
  
  // Replace dark backgrounds
  content = content.replace(/#1e1e2e/gi, 'var(--card2)');
  content = content.replace(/#1a1a2e/gi, 'var(--card)');
  content = content.replace(/#0f0f1a/gi, 'var(--bg)');
  
  // Replace other light text colors used in dark mode
  content = content.replace(/#a6e3a1/gi, 'var(--green)');
  content = content.replace(/#69F0AE/gi, 'var(--green)');
  content = content.replace(/#A5D6A7/gi, 'var(--green)');
  content = content.replace(/#FF8A80/gi, 'var(--red)');
  
  // Fix specific diagram background
  content = content.replace(/\.diagram\{background:rgba\(0,0,0,0\.3\)/g, '.diagram{background:var(--card2)');
  
  // Also fix color:#fff if it's used as general text, but careful not to ruin button text.
  // Actually, wait, replacing #fff globally might ruin white text on dark buttons. Let's leave #fff alone 
  // or only replace it in specific rules. The main issue was the bright colored text and dark backgrounds.
  
  // Let's also fix the `.node` and `.diagram` border/colors that might still be using rgba.
  content = content.replace(/rgba\(255,82,82,0\.[0-9]+\)/g, 'rgba(160, 52, 34, 0.15)'); // Danger bg
  content = content.replace(/rgba\(76,175,80,0\.[0-9]+\)/g, 'rgba(78, 107, 46, 0.15)'); // Safe bg
  content = content.replace(/rgba\(255,152,0,0\.[0-9]+\)/g, 'rgba(181, 128, 34, 0.15)'); // Warn bg

  // In .q.done .exp, the background is rgba(0,0,0,0.25) which is too dark.
  content = content.replace(/rgba\(0,0,0,0\.25\)/g, 'rgba(0,0,0,0.05)');
  content = content.replace(/rgba\(0,0,0,0\.35\)/g, 'rgba(0,0,0,0.08)');

  fs.writeFileSync(file, content);
  console.log('Fixed contrast for ' + file);
}
