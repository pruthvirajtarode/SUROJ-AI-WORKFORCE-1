const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    content = content.replace(/<a([^>]*)href="#files"([^>]*)>(.*?)(([a-zA-Z0-9_.-]+)\.csv)<\/a>/g, (match, p1, p2, p3, p4) => {
        const filename = p4;
        const dummyData = 'data:text/csv;charset=utf-8,Column1,Column2%0ADummy,Data%0AFor,' + encodeURIComponent(filename);
        return `<a${p1}href="${dummyData}" download="${filename}"${p2}>${p3}${filename}</a>`;
    });

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Fixed download links in HTML files');
