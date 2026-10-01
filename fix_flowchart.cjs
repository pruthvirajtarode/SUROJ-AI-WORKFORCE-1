const fs = require('fs');

const fixFlowCSS = `
  /* Interactive Flowchart Fixes */
  .flow .node.locked {
    opacity: 0 !important;
    transform: scale(0.8) translateX(-20px) !important;
    pointer-events: none !important;
    display: none !important;
  }
  .flow .arr.locked {
    opacity: 0 !important;
    transform: translateX(-10px) !important;
    display: none !important;
  }
  .flow .node.unlocked {
    display: block !important;
    animation: popSlideIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards !important;
  }
  .flow .arr.unlocked {
    display: block !important;
    animation: fadeIn 0.5s ease forwards !important;
  }
`;

const fixFlowJS = `
<script>
  // Execute immediately when the script runs (placed at the bottom of the body)
  (function() {
    function initFlowcharts() {
      document.querySelectorAll('.flow').forEach(flow => {
        const children = Array.from(flow.children);
        const nodes = children.filter(c => c.classList.contains('node'));
        const arrows = children.filter(c => c.classList.contains('arr'));
        
        // Initial state: hide everything except the first node
        nodes.forEach((node, index) => {
          if (index > 0) {
            node.classList.add('locked');
            node.classList.remove('unlocked');
          } else {
            node.classList.add('unlocked');
            node.classList.remove('locked');
          }
          
          // Ensure no duplicate listeners by cloning
          const newNode = node.cloneNode(true);
          node.parentNode.replaceChild(newNode, node);
          
          newNode.addEventListener('click', () => {
            if (index < nodes.length - 1) {
              const nextNode = flow.querySelectorAll('.node')[index + 1];
              const nextArrow = flow.querySelectorAll('.arr')[index];
              
              if (nextArrow && nextArrow.classList.contains('locked')) {
                nextArrow.classList.remove('locked');
                nextArrow.classList.add('unlocked');
              }
              
              if (nextNode && nextNode.classList.contains('locked')) {
                nextNode.classList.remove('locked');
                nextNode.classList.add('unlocked');
                
                if (index + 1 === nodes.length - 1) {
                  const hint = flow.parentElement.querySelector('.flow-hint');
                  if (hint) hint.style.display = 'none';
                }
              }
            }
          });
        });
        
        arrows.forEach(arr => {
          arr.classList.add('locked');
          arr.classList.remove('unlocked');
        });
        
        // Add a helpful hint below the diagram
        if (nodes.length > 1 && !flow.parentElement.querySelector('.flow-hint')) {
          const hint = document.createElement('div');
          hint.className = 'flow-hint';
          hint.innerHTML = '👆 Click the first box to reveal the workflow step-by-step';
          flow.parentElement.appendChild(hint);
        }
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initFlowcharts);
    } else {
      initFlowcharts();
    }
  })();
</script>
`;

const files = [
  'public/Suroj_Session2_Accounts_Finance.html',
  'public/Suroj_Session3_People_Admin_Communication.html',
  'public/Suroj_Session5_Procurement_Stores.html'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Inject the fix CSS if not already there
  if (!content.includes('Interactive Flowchart Fixes')) {
    content = content.replace('</style>', fixFlowCSS + '\n</style>');
  }
  
  // Inject the resilient JS before body closing tag
  if (!content.includes('// Execute immediately when the script runs')) {
    content = content.replace('</body>', fixFlowJS + '\n</body>');
  }
  
  fs.writeFileSync(file, content, 'utf8');
}
