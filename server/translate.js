const fs = require('fs');
const path = require('path');

const sourcePath = './src/locales/en/translation.json';
const targetLanguages = ['fr', 'es', 'de'];

const sourceTranslations = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

targetLanguages.forEach(lang => {
  const targetPath = `./src/locales/${lang}/translation.json`;
  const targetDir = path.dirname(targetPath);
  
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  fs.writeFileSync(targetPath, JSON.stringify(sourceTranslations, null, 2));
  console.log(`Created ${targetPath}`);
});