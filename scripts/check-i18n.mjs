// Fails when the locale dictionaries don't expose exactly the same keys, or when a
// translated route has no page file. Array items are compared by index so lists
// (words, phases, modules…) stay aligned.
import { access, readFile } from 'node:fs/promises';

const LOCALE_FILES = ['src/i18n/es.json', 'src/i18n/pt.json'];

function collectKeys(value, prefix = '', keys = new Set()) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectKeys(item, `${prefix}[${index}]`, keys));
  } else if (value !== null && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      collectKeys(child, prefix ? `${prefix}.${key}` : key, keys);
    }
  } else {
    keys.add(prefix);
  }
  return keys;
}

async function loadDictionary(file) {
  return JSON.parse(await readFile(new URL(`../${file}`, import.meta.url), 'utf8'));
}

async function loadKeys(file) {
  return collectKeys(await loadDictionary(file));
}

async function findMissingPages(file) {
  const lang = file.match(/(\w+)\.json$/)[1];
  const { routes } = await loadDictionary(file);
  const missing = [];
  for (const slug of Object.values(routes)) {
    const page = `src/pages/${lang}/${slug || 'index'}.astro`;
    try {
      await access(new URL(`../${page}`, import.meta.url));
    } catch {
      missing.push(page);
    }
  }
  return missing;
}

const [reference, ...others] = LOCALE_FILES;
const referenceKeys = await loadKeys(reference);
let hasMismatch = false;

for (const file of LOCALE_FILES) {
  const missingPages = await findMissingPages(file);
  if (missingPages.length > 0) {
    hasMismatch = true;
    console.error(`✗ routes in ${file} without a page file`);
    missingPages.forEach((page) => console.error(`  missing: ${page}`));
  }
}

for (const file of others) {
  const keys = await loadKeys(file);
  const missing = [...referenceKeys].filter((key) => !keys.has(key));
  const extra = [...keys].filter((key) => !referenceKeys.has(key));

  if (missing.length > 0 || extra.length > 0) {
    hasMismatch = true;
    console.error(`✗ ${file} differs from ${reference}`);
    missing.forEach((key) => console.error(`  missing: ${key}`));
    extra.forEach((key) => console.error(`  extra:   ${key}`));
  }
}

if (hasMismatch) {
  process.exit(1);
}

console.log(`✓ i18n keys and routes match (${referenceKeys.size} keys in ${LOCALE_FILES.length} locales)`);
