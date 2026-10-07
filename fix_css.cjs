const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

const fixCSS = `
/* Global Fixes applied by AI */
.goal b { color: #2E7D32 !important; }
.mini { background: rgba(0,0,0,0.06) !important; color: #14161A !important; font-weight: 500 !important; }
.diagram { background: rgba(0,0,0,0.05) !important; }
.diagram .node { background: #ffffff !important; color: #14161A !important; }
.diagram .node-danger { border-color: #FF5252 !important; color: #D32F2F !important; }
.diagram .node-safe { border-color: #4CAF50 !important; color: #2E7D32 !important; }
.diagram .sm { color: #555 !important; }
.diagram .arr { color: #B0431E !important; }
`;

fs.readdirSync(publicDir).forEach(file => {
    if (file.endsWith('.html')) {
        const filePath = path.join(publicDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        if (!content.includes('/* Global Fixes applied by AI */')) {
            content = content.replace('</style>', fixCSS + '\n</style>');
            fs.writeFileSync(filePath, content);
            console.log('Fixed', file);
        } else {
            console.log('Already fixed', file);
        }
    }
});
