const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const root = path.join(__dirname, '..');
const templatePath = path.join(root, 'index.template.html');
const markdownPath = path.join(root, 'content.md');
const outputPath = path.join(root, 'index.html');

const template = fs.readFileSync(templatePath, 'utf8');
const markdown = fs.readFileSync(markdownPath, 'utf8');
const rendered = marked.parse(markdown);

if (!template.includes('<!-- CONTENT -->')) {
  throw new Error('Template missing <!-- CONTENT --> placeholder.');
}

const output = template.replace('<!-- CONTENT -->', rendered);
fs.writeFileSync(outputPath, output, 'utf8');

console.log(`Wrote ${path.relative(root, outputPath)} from ${path.basename(markdownPath)}.`);
