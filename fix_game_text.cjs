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

  // Fix the dark text inside the .game component which has a dark background
  if (!content.includes('.game{color:#ffffff;')) {
      content = content.replace(/\.game\{background:radial-gradient/g, '.game{color:#ffffff;background:radial-gradient');
  }
  
  // The scoreboard in the game:
  // .sb-panel { background: var(--card); ... } 
  // Wait, .game has dark bg, but is .sb-panel inside it? Yes, sometimes. Let's explicitly set .sb-panel text to var(--text).
  // Actually, .game{color:#ffffff} will cascade to everything inside.
  // .sb-panel is outside .game! It's position:fixed. So it inherits from body. 
  
  // .g-opt has color:#fff; which is good.
  // .gtoast has background:var(--accent); color:#000;
  content = content.replace(/\.gtoast\{([^}]*)color:#000;/g, '.gtoast{$1color:#ffffff;');

  // Let's also enforce white color for the g-exp explanations since they are inside the dark .game container
  content = content.replace(/\.g-exp\{margin-top/g, '.g-exp{color:#ffffff;margin-top');

  // What about .prompt?
  // .prompt{background:var(--card2);... color:var(--green)...
  // In light theme, var(--card2) is light beige. var(--green) is dark green (#4E6B2E).
  // This contrast is excellent! No need to change.
  
  // What about brain breaks? .bbsec
  // .bbsec has light background now, so inherited dark text is fine.

  // .g-tt span needs explicit color because opacity:.85 on white is good
  content = content.replace(/\.g-tt span\{font-size/g, '.g-tt span{color:#ffffff;font-size');

  fs.writeFileSync(file, content);
  console.log('Fixed game text color for ' + file);
}
