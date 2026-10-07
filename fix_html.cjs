const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove stamp elements entirely
    content = content.replace(/<span class="stamp">.*?<\/span>/gs, '');
    
    // Change .dlbtn styles
    content = content.replace(/color:#80DEEA;/g, 'color:#004d40;');
    content = content.replace(/background:rgba\(0,188,212,0\.12\)/g, 'background:rgba(0,150,136,0.2)');
    content = content.replace(/border:1px solid rgba\(0,188,212,0\.45\)/g, 'border:1px solid rgba(0,150,136,0.5)');
    content = content.replace(/background:rgba\(0,188,212,0\.22\)/g, 'background:rgba(0,150,136,0.3)');

    // Remove floating scoreboard script
    const scoreboardStart = '// ---------- floating scoreboard ----------';
    const scoreboardIndex = content.indexOf(scoreboardStart);
    if (scoreboardIndex !== -1) {
        let endIndex = content.indexOf('})();', scoreboardIndex);
        if (endIndex !== -1) {
            content = content.substring(0, scoreboardIndex) + content.substring(endIndex);
        }
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Processed HTML files');
