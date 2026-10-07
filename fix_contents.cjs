const fs = require('fs');
const path = require('path');

const files = [
  'public/Suroj_Session1_Tendering_EPC_BD_with_Hour1.html',
  'public/Suroj_Session4_Cost_Planning_Systems_with_Hour1.html',
  'public/Suroj_Session6_Design_Drawings_Quantities_with_Hour1.html'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Find the <nav class="rn" ...> block
  const navRegex = /<nav class="rn"[^>]*>([\s\S]*?)<\/nav>\s*<button class="rn-btn"[^>]*>.*?<\/button>/;
  const navMatch = content.match(navRegex);

  if (navMatch) {
    const navContent = navMatch[1];
    
    // Extract groups
    const groupRegex = /<button class="rn-gt"[^>]*>(.*?)<\/button>\s*<div class="rn-items"[^>]*>([\s\S]*?)<\/div>/g;
    let match;
    const groups = [];
    while ((match = groupRegex.exec(navContent)) !== null) {
      let titleHtml = match[1];
      // remove the <span>...</span> from title
      titleHtml = titleHtml.replace(/<span.*?>.*?<\/span>/, '').trim();
      const itemsHtml = match[2];
      
      // Extract links
      const linkRegex = /<a href="([^"]*)">([^<]*)<\/a>/g;
      let linkMatch;
      const links = [];
      while ((linkMatch = linkRegex.exec(itemsHtml)) !== null) {
        links.push({ href: linkMatch[1], text: linkMatch[2] });
      }
      
      groups.push({ title: titleHtml, links: links });
    }

    // Build the new contents HTML
    let newHtml = `<!-- CONTENTS GRID -->
<div class="section open">
<div class="section-head" onclick="toggle(this)"><h2>📋 Contents</h2><span class="arrow">▼</span></div>
<div class="section-body">
<div class="grid-3">
`;
    for (const g of groups) {
      newHtml += `  <div class="card">\n    <h3>${g.title}</h3>\n    <ul>\n`;
      for (const l of g.links) {
        newHtml += `      <li><a href="${l.href}" style="color:var(--text);text-decoration:none;font-weight:500;">${l.text}</a></li>\n`;
      }
      newHtml += `    </ul>\n  </div>\n`;
    }
    newHtml += `</div>\n</div>\n</div>\n`;

    // Insert newHtml after <div class="container">
    content = content.replace(/<div class="container">\s*/, `<div class="container">\n${newHtml}\n`);

    // Remove the nav
    content = content.replace(navRegex, '');

    // Fix layout CSS
    content = content.replace(/\.layout\s*\{.*?\}/, '.layout{display:block}');
    // Also remove the script block at the end if it contains rn toggling? 
    // Usually it doesn't hurt to leave it, but let's check what it is.
    // I'll just write it back
    
    fs.writeFileSync(file, content);
    console.log(`Processed ${file}`);
  } else {
    console.log(`No nav found in ${file}`);
  }
}