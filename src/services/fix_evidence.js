// Script to fix evidence-rule linkages in mockData.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the data
const mockDataPath = path.join(__dirname, 'mockData.js');
let mockDataContent = fs.readFileSync(mockDataPath, 'utf-8');

// Parse to extract rules and their linkedClauses
const rulesMatch = mockDataContent.match(/export const rules = \[([\s\S]*?)\n\];/);
const rulesSection = rulesMatch[1];

// Build rule to clauses mapping
const ruleToClausesMap = {};
const ruleBlocks = rulesSection.split(/\n  \{/);
ruleBlocks.forEach(block => {
  const ruleIdMatch = block.match(/id: '(rule-[^']+)'/);
  const linkedClausesMatch = block.match(/linkedClauses: \[([^\]]+)\]/);

  if (ruleIdMatch && linkedClausesMatch) {
    const ruleId = ruleIdMatch[1];
    const clausesStr = linkedClausesMatch[1];
    const clauses = clausesStr.match(/'([^']+)'/g).map(c => c.replace(/'/g, ''));
    ruleToClausesMap[ruleId] = clauses;
  }
});

// Build reverse mapping: clauseId -> ruleIds
const clauseToRulesMap = {};
Object.entries(ruleToClausesMap).forEach(([ruleId, clauses]) => {
  clauses.forEach(clauseId => {
    if (!clauseToRulesMap[clauseId]) {
      clauseToRulesMap[clauseId] = [];
    }
    clauseToRulesMap[clauseId].push(ruleId);
  });
});

console.log('Clauses with associated rules:', Object.keys(clauseToRulesMap).length);

// Find all clauses with linkedEvidence
const docsMatch = mockDataContent.match(/export const regulatoryDocuments = \[([\s\S]*?)\n\];/);
const docsSection = docsMatch[1];

// Regex to match clauses with linkedEvidence but need to check if they have rules
const clausePattern = /(\{\s*id: '([^']+)',[\s\S]*?linkedEvidence: \[[^\]]+\][\s\S]*?linkedRules: \[[^\]]*\]\s*\})/g;

let match;
const clausesToFix = [];
let changeCount = 0;

// First pass: identify clauses to fix
let tempContent = docsSection;
let lastIndex = 0;
while ((match = clausePattern.exec(docsSection)) !== null) {
  const fullClauseText = match[1];
  const clauseId = match[2];

  // Check if this clause has associated rules
  const hasRules = clauseToRulesMap[clauseId] && clauseToRulesMap[clauseId].length > 0;

  if (!hasRules) {
    // This clause has evidence but no rules - it needs to be fixed
    const linkedEvidenceMatch = fullClauseText.match(/linkedEvidence: \[([^\]]+)\]/);
    if (linkedEvidenceMatch) {
      clausesToFix.push({
        clauseId,
        linkedEvidence: linkedEvidenceMatch[1]
      });
    }
  }
}

console.log(`\nFound ${clausesToFix.length} clauses with evidence but NO associated rules`);
console.log('These will have their linkedEvidence removed:\n');
clausesToFix.forEach(clause => {
  console.log(`  - ${clause.clauseId}`);
});

// Second pass: actually remove the linkedEvidence entries
clausesToFix.forEach(clause => {
  const clauseId = clause.clauseId;

  // Pattern to match the linkedEvidence line for this specific clause
  // We need to match the entire linkedEvidence array
  const evidencePattern = new RegExp(
    `(id: '${clauseId}',[\\s\\S]*?)linkedEvidence: \\[[^\\]]+\\],\\s*\\n`,
    'g'
  );

  const beforeReplace = mockDataContent;
  mockDataContent = mockDataContent.replace(evidencePattern, (match, beforeEvidence) => {
    changeCount++;
    // Remove the linkedEvidence line entirely
    return beforeEvidence;
  });

  if (mockDataContent === beforeReplace) {
    console.log(`  WARNING: Could not find/replace linkedEvidence for ${clauseId}`);
  }
});

if (changeCount > 0) {
  // Write the fixed content back
  fs.writeFileSync(mockDataPath, mockDataContent, 'utf-8');
  console.log(`\n✅ Successfully removed linkedEvidence from ${changeCount} clauses`);
  console.log(`Updated file: ${mockDataPath}`);
} else {
  console.log('\n⚠️  No changes made');
}
