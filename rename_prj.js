const fs = require('fs');
const path = require('path');

function walkAndReplace(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === '.antigravityignore') continue;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkAndReplace(filePath);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.html') || filePath.endsWith('.json')) {
      let content = fs.readFileSync(filePath, 'utf8');
      const original = content;
      // Replace theme colors
      content = content.replace(/emerald/gi, 'amber');
      // Replace name
      content = content.replace(/SeatSync/gi, 'Table d\'Or');
      if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated:', filePath);
      }
    }
  }
}

walkAndReplace('d:\\resto\\resto_frontend');

console.log('Done');
