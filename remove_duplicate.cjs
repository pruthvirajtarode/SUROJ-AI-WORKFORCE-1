const fs = require('fs');

const files = [
  'public/Suroj_Session2_Accounts_Finance.html',
  'public/Suroj_Session3_People_Admin_Communication.html',
  'public/Suroj_Session5_Procurement_Stores.html'
];

const oldScript = `<script>
  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.flow').forEach(flow => {
      const children = Array.from(flow.children);
      const nodes = children.filter(c => c.classList.contains('node'));
      const arrows = children.filter(c => c.classList.contains('arr'));
      
      // Initial state: hide everything except the first node
      nodes.forEach((node, index) => {
        if (index > 0) {
          node.classList.add('locked');
        } else {
          node.classList.add('unlocked');
        }
        
        node.addEventListener('click', () => {
          if (index < nodes.length - 1) {
            const nextNode = nodes[index + 1];
            const nextArrow = arrows[index];
            
            if (nextArrow && nextArrow.classList.contains('locked')) {
              nextArrow.classList.remove('locked');
              nextArrow.classList.add('unlocked');
            }
            
            if (nextNode && nextNode.classList.contains('locked')) {
              nextNode.classList.remove('locked');
              nextNode.classList.add('unlocked');
              
              // Remove the 'click to reveal' hint from the parent once completed
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
      });
      
      // Add a helpful hint below the diagram
      if (nodes.length > 1) {
        const hint = document.createElement('div');
        hint.className = 'flow-hint';
        hint.innerHTML = '👆 Click the first box to reveal the workflow step-by-step';
        flow.parentElement.appendChild(hint);
      }
    });
  });
</script>`;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(oldScript, '');
  
  // Just in case there's any stray double hints left by Vercel cache mismatch or re-renders
  // Let's add a CSS rule to only ever show the FIRST .flow-hint sibling
  const cssFix = `
  /* Ensure only one flow hint shows */
  .flow-hint ~ .flow-hint { display: none !important; }
  `;
  if(!content.includes('/* Ensure only one flow hint shows */')) {
     content = content.replace('</style>', cssFix + '\n</style>');
  }

  fs.writeFileSync(file, content, 'utf8');
}
