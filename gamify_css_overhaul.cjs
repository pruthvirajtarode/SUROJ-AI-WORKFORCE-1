const fs = require('fs');

const gamificationCSS = `
<style>
  /* MASSIVE GAMIFICATION OVERHAUL */
  body {
    background-color: #0f172a !important;
    background-image: radial-gradient(circle at top right, #1e293b, #0f172a) !important;
    color: #e2e8f0 !important;
    font-family: 'Inter', system-ui, sans-serif !important;
  }
  .module-header {
    background: linear-gradient(135deg, #f59e0b, #ea580c) !important;
    color: white !important;
    border-radius: 16px !important;
    padding: 40px 20px !important;
    box-shadow: 0 10px 30px rgba(234, 88, 12, 0.3) !important;
    text-align: center;
    border: 2px solid rgba(255,255,255,0.2);
    position: relative;
    overflow: hidden;
  }
  .module-header::after {
    content: '🏆';
    position: absolute;
    right: -20px;
    bottom: -40px;
    font-size: 150px;
    opacity: 0.2;
    transform: rotate(-15deg);
  }
  .tabs-container {
    background: rgba(30, 41, 59, 0.7) !important;
    border-radius: 24px !important;
    padding: 30px !important;
    border: 1px solid rgba(255,255,255,0.1) !important;
    backdrop-filter: blur(10px);
    box-shadow: inset 0 2px 20px rgba(0,0,0,0.5), 0 10px 40px rgba(0,0,0,0.3) !important;
  }
  .tabs-container button {
    background: linear-gradient(to bottom, #334155, #1e293b) !important;
    color: #cbd5e1 !important;
    border: 1px solid #475569 !important;
    border-radius: 12px !important;
    padding: 12px 20px !important;
    font-weight: bold !important;
    text-transform: uppercase !important;
    letter-spacing: 1px !important;
    box-shadow: 0 4px 6px rgba(0,0,0,0.2) !important;
    position: relative;
  }
  .tabs-container button::before {
    content: '⭐';
    margin-right: 8px;
    font-size: 14px;
  }
  .tabs-container button.active {
    background: linear-gradient(to bottom, #10b981, #059669) !important;
    color: white !important;
    border-color: #34d399 !important;
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.5) !important;
    transform: scale(1.05);
  }
  
  /* GAMIFY CONTENT BLOCKS */
  .tab-content {
    background: transparent !important;
    border: none !important;
    padding: 20px 0 !important;
  }
  
  /* Safe vs Danger blocks */
  div[style*="background: var(--safe-bg)"] {
    background: linear-gradient(135deg, rgba(16,185,129,0.1), rgba(16,185,129,0.05)) !important;
    border: 2px solid #10b981 !important;
    border-radius: 16px !important;
    box-shadow: 0 8px 32px rgba(16,185,129,0.1) !important;
  }
  div[style*="background: var(--safe-bg)"] h3 {
    color: #34d399 !important;
    text-transform: uppercase;
    font-weight: 900;
    letter-spacing: 2px;
  }
  div[style*="background: var(--danger-bg)"] {
    background: linear-gradient(135deg, rgba(239,68,68,0.1), rgba(239,68,68,0.05)) !important;
    border: 2px solid #ef4444 !important;
    border-radius: 16px !important;
    box-shadow: 0 8px 32px rgba(239,68,68,0.1) !important;
  }
  div[style*="background: var(--danger-bg)"] h3 {
    color: #f87171 !important;
    text-transform: uppercase;
    font-weight: 900;
    letter-spacing: 2px;
  }
  
  /* List items as badges */
  ul li {
    background: rgba(15, 23, 42, 0.6) !important;
    border-radius: 8px !important;
    padding: 12px 16px !important;
    margin-bottom: 12px !important;
    border: 1px solid rgba(255,255,255,0.05) !important;
    color: #e2e8f0 !important;
    display: flex;
    align-items: center;
  }
  ul li::before {
    content: '⚡';
    margin-right: 12px;
    font-size: 18px;
  }
  
  /* Code blocks */
  .prompt-block {
    background: #000 !important;
    border: 1px solid #333 !important;
    border-radius: 12px !important;
    box-shadow: 0 0 20px rgba(0,0,0,0.5) !important;
    color: #4ade80 !important;
  }
  
  /* Flowchart / boxes */
  div[style*="border: 1px solid var(--border)"] {
    background: linear-gradient(to right, #1e293b, #0f172a) !important;
    border-color: #3b82f6 !important;
    border-radius: 12px !important;
    color: white !important;
  }

  /* Progress Bar Injection via CSS */
  .tab-content::before {
    content: 'LEVEL PROGRESS';
    display: block;
    font-family: monospace;
    font-weight: bold;
    color: #38bdf8;
    margin-bottom: 10px;
  }
  .tab-content::after {
    content: '';
    display: block;
    height: 8px;
    background: linear-gradient(to right, #38bdf8 70%, #1e293b 70%);
    border-radius: 4px;
    margin-top: 20px;
    box-shadow: 0 0 10px rgba(56,189,248,0.5);
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
  content = content.replace('</head>', gamificationCSS + '\n</head>');
  fs.writeFileSync(file, content, 'utf8');
}
