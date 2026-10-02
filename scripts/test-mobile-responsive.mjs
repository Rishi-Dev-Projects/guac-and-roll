// A simple Node.js script to simulate basic regression checks for mobile markup
import fs from 'fs';
import path from 'path';

const SRC_DIR = path.join(process.cwd(), 'src');

function checkFile(filePath, rules) {
  const content = fs.readFileSync(filePath, 'utf8');
  const errors = [];
  rules.forEach(rule => {
    if (!rule.test(content)) {
      errors.push(`Failed rule: ${rule.description}`);
    }
  });
  return errors;
}

const tests = [
  {
    file: 'src/components/layout/MobileMenu.tsx',
    rules: [
      {
        description: 'Should use createPortal to decouple from sticky header stacking context',
        test: (content) => content.includes('createPortal')
      }
    ]
  },
  {
    file: 'src/components/layout/Footer.tsx',
    rules: [
      {
        description: 'Footer should have sufficient bottom padding for mobile dock',
        test: (content) => content.includes('pb-28') || content.includes('pb-32') || content.includes('pb-[')
      }
    ]
  },
  {
    file: 'src/components/layout/MobileUtilityDock.tsx',
    rules: [
      {
        description: 'Dock should respect safe-area-inset-bottom',
        test: (content) => content.includes('env(safe-area-inset-bottom)')
      }
    ]
  }
];

let failed = false;
console.log('Running Mobile Regression Checks...');
for (const test of tests) {
  const filePath = path.join(process.cwd(), test.file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing file: ${test.file}`);
    failed = true;
    continue;
  }
  
  const errors = checkFile(filePath, test.rules);
  if (errors.length > 0) {
    console.error(`❌ Issues in ${test.file}:`);
    errors.forEach(e => console.error(`  - ${e}`));
    failed = true;
  } else {
    console.log(`✅ ${test.file} passed.`);
  }
}

if (failed) {
  process.exit(1);
} else {
  console.log('All mobile regression rules passed! 🎉');
}
