const fs = require('fs');
const path = require('path');
const base = path.resolve(__dirname);

let html = fs.readFileSync(path.join(base, 'index.html'), 'utf8');

// Inline CSS
const cssFiles = ['styles/main.css', 'styles/portal.css', 'styles/prep.css', 'styles/companies.css', 'styles/dsa.css'];
let combinedCss = cssFiles.map(f => fs.readFileSync(path.join(base, f), 'utf8')).join('\n\n');

html = html.replace(/<link rel="stylesheet" href="styles\/.*?">/g, '');
html = html.replace('</head>', '<style>\n' + combinedCss + '\n</style>\n</head>');

// Inline JS
const jsFiles = [
  'js/data/jobsData.js',
  'js/data/prepData.js',
  'js/data/companiesData.js',
  'js/data/dsaSheetData.js',
  'js/components/jobs.js',
  'js/components/prep.js',
  'js/components/companies.js',
  'js/components/dsa.js',
  'js/app.js'
];
let combinedJs = jsFiles.map(f => fs.readFileSync(path.join(base, f), 'utf8')).join('\n\n');

html = html.replace(/<script src="js\/.*?"><\/script>/g, '');
html = html.replace('</body>', '<script>\n' + combinedJs + '\n</script>\n</body>');

fs.writeFileSync(path.join(base, 'PkJobs-standalone.html'), html);

// Copy to Desktop folder as well
const desktopFolder = 'C:/Users/RUKN AL MINHAJ/OneDrive/Desktop/PkJobs';
if (fs.existsSync(desktopFolder)) {
  fs.writeFileSync(path.join(desktopFolder, 'PkJobs-standalone.html'), html);
}
console.log('Successfully generated PkJobs-standalone.html');
