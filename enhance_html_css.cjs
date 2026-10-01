const fs = require('fs');

const elegantCSS = `
<style>
  /* Elegant Dynamic Enhancements */
  body {
    -webkit-font-smoothing: antialiased;
  }
  
  /* Make the main cards interactive */
  div[style*="background: var(--safe-bg)"],
  div[style*="background: var(--danger-bg)"],
  div[style*="background: var(--card-bg)"],
  div[style*="background: #FDFBF5"] {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    position: relative;
  }
  
  div[style*="background: var(--safe-bg)"]:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(78, 107, 46, 0.15) !important;
    border-color: rgba(78, 107, 46, 0.3) !important;
  }
  
  div[style*="background: var(--danger-bg)"]:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(176, 67, 30, 0.15) !important;
    border-color: rgba(176, 67, 30, 0.3) !important;
  }

  /* Flowchart / Process Boxes hover */
  div[style*="border: 1px solid var(--border)"] {
    transition: all 0.3s ease !important;
  }
  div[style*="border: 1px solid var(--border)"]:hover {
    box-shadow: 0 8px 20px rgba(0,0,0,0.06) !important;
    border-color: #B0431E !important;
    transform: translateY(-2px);
  }

  /* Bullet Points Micro-animations */
  ul li {
    transition: transform 0.2s ease, color 0.2s ease;
  }
  ul li:hover {
    transform: translateX(6px);
    color: #14161A !important;
    font-weight: 500;
  }

  /* Dynamic Title Colors on Hover */
  h3 {
    transition: color 0.3s ease;
  }
  div[style*="background: var(--safe-bg)"]:hover h3 {
    color: #4E6B2E !important;
  }
  div[style*="background: var(--danger-bg)"]:hover h3 {
    color: #B0431E !important;
  }
  
  /* Button Hover Enhancements */
  button, .module-header {
    transition: all 0.3s ease !important;
  }
  .module-header:hover {
    box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
  }
</style>
`;

const files = [
  'public/Suroj_Session2_Accounts_Finance.html',
  'public/Suroj_Session3_People_Admin_Communication.html',
  'public/Suroj_Session5_Procurement_Stores.html'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('Elegant Dynamic Enhancements')) {
    content = content.replace('</head>', elegantCSS + '\n</head>');
    fs.writeFileSync(file, content, 'utf8');
  }
}
