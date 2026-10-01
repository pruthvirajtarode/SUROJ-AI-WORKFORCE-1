const fs = require('fs');

const interactiveFlowCSS = `
  /* Interactive Flowchart Enhancements */
  .flow {
    position: relative;
  }
  .flow .node {
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
  }
  .flow .node:hover {
    transform: translateY(-5px) scale(1.05) !important;
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
  .flow .node::after {
    content: 'Click to reveal next step';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 10px;
    color: #B0431E;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }
  .flow .node:not(.locked):hover::after {
    opacity: 1;
  }
  
  .flow .node.locked {
    opacity: 0;
    transform: scale(0.8) translateX(-20px);
    pointer-events: none;
    display: none; /* Hide entirely until unlocked */
  }
  .flow .arr.locked {
    opacity: 0;
    transform: translateX(-10px);
    display: none;
  }
  
  .flow .node.unlocked {
    display: block;
    animation: popSlideIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }
  .flow .arr.unlocked {
    display: block;
    animation: fadeIn 0.5s ease forwards;
  }
  
  @keyframes popSlideIn {
    0% { transform: scale(0.8) translateX(-30px); opacity: 0; }
    100% { transform: scale(1) translateX(0); opacity: 1; }
  }
  @keyframes fadeIn {
    0% { opacity: 0; transform: translateX(-10px); }
    100% { opacity: 1; transform: translateX(0); }
  }
  
  .flow-hint {
    font-size: 13px;
    color: #B0431E;
    margin-top: 15px;
    font-weight: 600;
    text-align: center;
    animation: pulseHint 2s infinite;
  }
  @keyframes pulseHint {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
`;

const interactiveFlowJS = `
<script>
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
</script>
`;

const files = [
  'public/Suroj_Session2_Accounts_Finance.html',
  'public/Suroj_Session3_People_Admin_Communication.html',
  'public/Suroj_Session5_Procurement_Stores.html'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('Interactive Flowchart Enhancements')) {
    content = content.replace('</style>', interactiveFlowCSS + '\n</style>\n' + interactiveFlowJS);
    fs.writeFileSync(file, content, 'utf8');
  }
}
