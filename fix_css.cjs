const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove scoreboard CSS
    content = content.replace(/\.sb-btn\{.*?\}/g, '');
    content = content.replace(/\.sb-panel\{.*?\}/g, '');
    content = content.replace(/\.sb-h\{.*?\}/g, '');
    content = content.replace(/\.sb-x\{.*?\}/g, '');
    content = content.replace(/\.sb-r\{.*?\}/g, '');
    content = content.replace(/\.sb-r\.lead\{.*?\}/g, '');
    content = content.replace(/\.sb-r:nth-child\(odd\)\{.*?\}/g, '');
    content = content.replace(/\.sb-r b\{.*?\}/g, '');
    content = content.replace(/\.sb-g\{.*?\}/g, '');
    content = content.replace(/\.sb-link\{.*?\}/g, '');

    // Remove stamp CSS
    content = content.replace(/\.paper \.stamp\{.*?\}/g, '');

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Processed CSS in HTML files');
