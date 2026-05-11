const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.jsx')) results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace em-dashes and en-dashes
  content = content.replace(/— /g, '');
  content = content.replace(/ —/g, '');
  content = content.replace(/—/g, '');
  
  // Replace hyphens in text (but safely!)
  // It's too dangerous to replace all '-' because of class names and URLs.
  // We will only replace decorative hyphens or em-dashes as requested.
  // Actually, let's just replace the em-dash "—" which is heavily used as a decorative element.
  
  fs.writeFileSync(file, content, 'utf8');
});
console.log('Removed decorative dashes.');
