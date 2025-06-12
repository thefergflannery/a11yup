const fs = require('fs');
const path = require('path');
const wcagData = require('./wcag22.json');

function mapToTS(guideline) {
  return {
    id: guideline.num || guideline.id,
    title: guideline.handle || guideline.title || '',
    description: guideline.summary || guideline.description || '',
    level: guideline.level || 'A',
    category: guideline.principle || '',
    subject: [], // Placeholder for enrichment
    successCriteria: (guideline.sc || []).map(sc => ({
      id: sc.num || sc.id,
      title: sc.handle || sc.title || '',
      description: sc.summary || sc.description || '',
      simpleLanguage: '', // Placeholder
      techniques: [],
      examples: [],
      wrongExample: '',
      rightExample: '',
      testingTools: [],
      references: [{ label: sc.num || sc.id, url: sc.url || '' }],
      screenReaderTips: [],
    })),
  };
}

const principles = { Perceivable: [], Operable: [], Understandable: [], Robust: [] };

(wcagData.guidelines || []).forEach(g => {
  const mapped = mapToTS(g);
  if (principles[mapped.category]) {
    principles[mapped.category].push(mapped);
  }
});

Object.entries(principles).forEach(([principle, arr]) => {
  const outPath = path.join(__dirname, `../client/src/tools/wcag-explainer/guidelines/wcag22-${principle.toLowerCase()}.ts`);
  fs.writeFileSync(
    outPath,
    `import type { WCAGGuideline } from '../index';\n\nexport const wcag22${principle}: WCAGGuideline[] = ${JSON.stringify(arr, null, 2)};\n`
  );
  console.log(`Wrote ${arr.length} guidelines to ${outPath}`);
}); 