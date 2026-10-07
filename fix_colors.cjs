const fs = require('fs');

const files = [
  'public/Suroj_Session1_Tendering_EPC_BD_with_Hour1.html',
  'public/Suroj_Session4_Cost_Planning_Systems_with_Hour1.html',
  'public/Suroj_Session6_Design_Drawings_Quantities_with_Hour1.html'
];

const newRoot = `:root{--bg:#F6F2E9;--card:#EFE9DB;--card2:#E7DFCB;--border:#C9C0AA;--text:#14161A;--accent:#B0431E;--blue:#35566B;--green:#4E6B2E;--red:#A03422;--orange:#B58022}`;

const stylesToInject = `
  /* Table and Row Enhancements */
  table { border-collapse: separate !important; border-spacing: 0 10px !important; width: 100% !important; }
  tr { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important; position: relative; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
  tr:hover { transform: scale(1.02) translateY(-2px); box-shadow: 0 12px 24px rgba(0,0,0,0.08) !important; z-index: 10; }
  td, th { border: none !important; padding: 16px 20px !important; }
  td:first-child, th:first-child { border-top-left-radius: 12px; border-bottom-left-radius: 12px; }
  td:last-child, th:last-child { border-top-right-radius: 12px; border-bottom-right-radius: 12px; }
  td { line-height: 1.6 !important; color: #334155 !important; transition: color 0.3s ease; }
  tr:hover td { color: #0f172a !important; }
  
  /* Typography enhancements */
  body { font-size: 16px !important; }
  p, li, td, th, .tab-content div { font-size: 16px !important; line-height: 1.7 !important; }
  h3 { font-size: 20px !important; margin-bottom: 16px !important; }
  h2 { font-size: 26px !important; }
  
  /* Elegant Dynamic Enhancements */
  div[style*="background: var(--safe-bg)"], div[style*="background: var(--danger-bg)"], div[style*="background: var(--card-bg)"] { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important; position: relative; padding: 24px !important; }
  ul li { transition: transform 0.2s ease, color 0.2s ease; padding: 10px 14px !important; margin-bottom: 12px !important; }
  ul li:hover { transform: translateX(6px); color: #14161A !important; font-weight: 500; }
  h3 { transition: color 0.3s ease; }
  button, .module-header { transition: all 0.3s ease !important; }
  .module-header:hover { box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important; }
  .module-header .tag { color: white !important; background: rgba(0,0,0,0.5) !important; }
  .module-header h1, .module-header p { color: white !important; }
`;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Replace :root
  content = content.replace(/:root\s*\{[^}]+\}/, newRoot);
  
  // Replace black/white hardcoded background opacities to match dark text readability on hover
  content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.08\)/g, 'rgba(0, 0, 0, 0.04)');
  content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.03\)/g, 'rgba(0, 0, 0, 0.02)');
  content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.02\)/g, 'rgba(0, 0, 0, 0.01)');
  content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.04\)/g, 'rgba(0, 0, 0, 0.03)');
  content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.15\)/g, 'rgba(0, 0, 0, 0.08)');
  content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.1\)/g, 'rgba(0, 0, 0, 0.05)');

  // Fix module headers which are explicitly set in style attributes
  // The user wants them project color friendly. We will remove the explicit background linear-gradient 
  // on the module headers so it defaults to the CSS class, OR we can set it to the primary accent color.
  // Actually, we can just replace the style="" completely and let it use a clean look or just set it to the project accent.
  content = content.replace(/<div class="module-header"([^>]*)style="[^"]*"/g, '<div class="module-header"$1 style="background:linear-gradient(135deg, #B0431E 0%, #A03422 100%)"');

  // Inject additional styles before </style>
  if (!content.includes('Table and Row Enhancements')) {
    content = content.replace(/<\/style>\s*<\/head>/, `\n${stylesToInject}\n</style>\n</head>`);
  }

  // Set the overall body color to be sure
  content = content.replace(/body\s*\{[^}]*background:[^;]+;([^}]+)\}/, 'body{font-family:\'Segoe UI\',Roboto,sans-serif;background:var(--bg);color:var(--text);$1}');

  fs.writeFileSync(file, content);
  console.log(`Updated colors for ${file}`);
}