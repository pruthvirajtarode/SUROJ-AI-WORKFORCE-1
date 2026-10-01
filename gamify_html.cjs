const fs = require('fs');

const files = [
  'public/Suroj_Session2_Accounts_Finance.html',
  'public/Suroj_Session3_People_Admin_Communication.html',
  'public/Suroj_Session5_Procurement_Stores.html'
];

const chartJsScript = `<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>`;

const gamificationCSS = `
<style>
  /* Gamification CSS Injections */
  .tabs-container {
    margin-top: 40px !important;
  }
  .tabs-container button {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    border: 2px solid transparent !important;
    position: relative;
    overflow: hidden;
  }
  .tabs-container button:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    border-color: #B0431E !important;
    z-index: 10;
  }
  .tabs-container button.active {
    box-shadow: 0 0 15px rgba(176, 67, 30, 0.4);
    animation: pulseGlow 2s infinite;
  }
  @keyframes pulseGlow {
    0% { box-shadow: 0 0 15px rgba(176, 67, 30, 0.4); }
    50% { box-shadow: 0 0 25px rgba(176, 67, 30, 0.7); }
    100% { box-shadow: 0 0 15px rgba(176, 67, 30, 0.4); }
  }
  
  /* Gamify the bullet point cards */
  div[style*="background: var(--safe-bg)"],
  div[style*="background: var(--danger-bg)"] {
    transition: all 0.3s ease !important;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,0.05);
  }
  div[style*="background: var(--safe-bg)"]:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(78, 107, 46, 0.2);
    border-color: #4E6B2E;
  }
  div[style*="background: var(--danger-bg)"]:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(176, 67, 30, 0.2);
    border-color: #B0431E;
  }
  ul li {
    padding: 8px;
    margin-bottom: 8px;
    background: rgba(255,255,255,0.5);
    border-radius: 6px;
    border-left: 3px solid transparent;
    transition: all 0.2s ease;
  }
  div[style*="background: var(--safe-bg)"] ul li:hover {
    border-left-color: #4E6B2E;
    background: #fff;
    transform: translateX(5px);
  }
  div[style*="background: var(--danger-bg)"] ul li:hover {
    border-left-color: #B0431E;
    background: #fff;
    transform: translateX(5px);
  }
</style>
`;

const gamificationHTML = `
<!-- INLINE HTML GAMIFICATION CHARTS START -->
<div style="margin: 40px auto; max-width: 1000px;">
  <h2 style="font-family: serif; color: var(--text); border-bottom: 2px solid var(--border); padding-bottom: 10px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
    🏆 In-Session Analytics & Progress
  </h2>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
    
    <div style="background: var(--card, #FDFBF5); border: 1px solid var(--border, #E2DCD0); border-radius: 16px; padding: 24px; box-shadow: 0 10px 20px rgba(0,0,0,0.05); transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
      <h3 style="margin-top: 0; color: var(--text, #14161A); font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-family: monospace; display: flex; align-items: center; gap: 8px;">
        📈 Task Completion Rate
      </h3>
      <div style="position: relative; height: 220px; width: 100%;">
        <canvas class="injectedChart" data-type="line" height="220"></canvas>
      </div>
    </div>

    <div style="background: var(--card, #FDFBF5); border: 1px solid var(--border, #E2DCD0); border-radius: 16px; padding: 24px; box-shadow: 0 10px 20px rgba(0,0,0,0.05); transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
      <h3 style="margin-top: 0; color: var(--text, #14161A); font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-family: monospace; display: flex; align-items: center; gap: 8px;">
        🎯 Module Accuracy
      </h3>
      <div style="position: relative; height: 220px; width: 100%;">
        <canvas class="injectedChart" data-type="doughnut" height="220"></canvas>
      </div>
    </div>

    <div style="background: var(--card, #FDFBF5); border: 1px solid var(--border, #E2DCD0); border-radius: 16px; padding: 24px; box-shadow: 0 10px 20px rgba(0,0,0,0.05); transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
      <h3 style="margin-top: 0; color: var(--text, #14161A); font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-family: monospace; display: flex; align-items: center; gap: 8px;">
        ⚡ Skill Acquisition
      </h3>
      <div style="position: relative; height: 220px; width: 100%;">
        <canvas class="injectedChart" data-type="radar" height="220"></canvas>
      </div>
    </div>

  </div>
</div>

<script>
  window.addEventListener('load', function() {
    const charts = document.querySelectorAll('.injectedChart');
    charts.forEach(canvas => {
      const type = canvas.getAttribute('data-type');
      if (type === 'line') {
        new Chart(canvas, {
          type: 'line',
          data: {
            labels: ['Intro', 'Exercise 1', 'Exercise 2', 'Debrief', 'Final'],
            datasets: [{
              label: 'XP Earned',
              data: [100, 250, 450, 700, 1000],
              borderColor: '#B0431E',
              backgroundColor: 'rgba(176, 67, 30, 0.2)',
              fill: true,
              tension: 0.4
            }]
          },
          options: { responsive: true, maintainAspectRatio: false }
        });
      } else if (type === 'radar') {
        new Chart(canvas, {
          type: 'radar',
          data: {
            labels: ['Speed', 'Accuracy', 'Prompting', 'Logic', 'Analysis'],
            datasets: [{
              label: 'Current Level',
              data: [85, 90, 70, 80, 95],
              borderColor: '#35566B',
              backgroundColor: 'rgba(53, 86, 107, 0.4)'
            }]
          },
          options: { responsive: true, maintainAspectRatio: false, scales: { r: { min: 0, max: 100 } } }
        });
      } else if (type === 'doughnut') {
        new Chart(canvas, {
          type: 'doughnut',
          data: {
            labels: ['Perfect', 'Needs Review'],
            datasets: [{
              data: [85, 15],
              backgroundColor: ['#4E6B2E', '#E2DCD0'],
              borderWidth: 0
            }]
          },
          options: { responsive: true, maintainAspectRatio: false, cutout: '75%' }
        });
      }
    });
  });
</script>
<!-- INLINE HTML GAMIFICATION CHARTS END -->
`;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  if (!content.includes('INLINE HTML GAMIFICATION CHARTS START')) {
    content = content.replace('</head>', chartJsScript + '\n' + gamificationCSS + '\n</head>');
    
    if (content.includes('<div class="tabs-container">')) {
      content = content.replace('<div class="tabs-container">', gamificationHTML + '\n<div class="tabs-container">');
    }
    
    fs.writeFileSync(file, content, 'utf8');
  }
}
