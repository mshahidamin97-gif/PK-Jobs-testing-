const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const src = 'C:/Users/RUKN AL MINHAJ/.antigravity-ide/job-prep-portal';
const destinations = [
  'C:/Users/RUKN AL MINHAJ/Downloads/PkJobs',
  'C:/Users/RUKN AL MINHAJ/OneDrive/Desktop/PkJobs'
];

destinations.forEach(dest => {
  try {
    fs.mkdirSync(dest, { recursive: true });
    // Copy all files and folders
    const items = fs.readdirSync(src);
    items.forEach(item => {
      const srcItem = path.join(src, item);
      const destItem = path.join(dest, item);
      fs.cpSync(srcItem, destItem, { recursive: true, force: true });
    });
    console.log('Successfully copied all files to:', dest);
  } catch (err) {
    console.error('Error copying to ' + dest + ':', err.message);
  }
});

try {
  // Open Windows Explorer highlighting the Desktop PkJobs folder so the user can drag it
  cp.exec('explorer.exe /select,"C:\\Users\\RUKN AL MINHAJ\\OneDrive\\Desktop\\PkJobs"');
  console.log('Explorer opened highlighting the folder!');
} catch (e) {
  console.error(e);
}
