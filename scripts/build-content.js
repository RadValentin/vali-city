const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const root = path.join(__dirname, '..');
const templatePath = path.join(root, 'index.template.html');
const markdownPath = path.join(root, 'content.md');
const outputPath = path.join(root, 'index.html');

function buildContent() {
  try {
    const template = fs.readFileSync(templatePath, 'utf8');
    const markdown = fs.readFileSync(markdownPath, 'utf8');
    const rendered = marked.parse(markdown);

    if (!template.includes('<!-- CONTENT -->')) {
      throw new Error('Template missing <!-- CONTENT --> placeholder.');
    }

    const output = template.replace('<!-- CONTENT -->', rendered);
    fs.writeFileSync(outputPath, output, 'utf8');

    console.log(`[${new Date().toLocaleTimeString()}] ✓ Built index.html from content.md`);
  } catch (err) {
    console.error(`[${new Date().toLocaleTimeString()}] ✗ Build failed:`, err.message);
  }
}

// Build once on startup
buildContent();

// Watch for changes if --watch flag is present
if (process.argv.includes('--watch')) {
  const watcher = fs.watch(markdownPath, (eventType, filename) => {
    if (eventType === 'change') {
      buildContent();
    }
  });

  const templateWatcher = fs.watch(templatePath, (eventType, filename) => {
    if (eventType === 'change') {
      buildContent();
    }
  });

  console.log('👀 Watching for changes in content.md and index.template.html...');
}
