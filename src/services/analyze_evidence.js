// Script to analyze evidence-rule linkages in mockData.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the data
const mockDataPath = path.join(__dirname, 'mockData.js');
const mockDataContent = fs.readFileSync(mockDataPath, 'utf-8');

// Parse the file to extract rules and their linkedClauses
const rulesMatch = mockDataContent.match(/export const rules = \[([\s\S]*?)\n\];/);
if (!rulesMatch) {
  console.error('Could not find rules array');
  process.exit(1);
}

// Extract rule IDs and their linkedClauses
const ruleToClausesMap = {};
const ruleIdRegex = /id: '(rule-[^']+)'/g;
const linkedClausesRegex = /linkedClauses: \[([^\]]+)\]/g;

let ruleMatch;
let prevRuleId = null;
const rulesSection = rulesMatch[1];

// Parse each rule and its linkedClauses
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

console.log('=== RULE TO CLAUSES MAPPING ===');
Object.entries(ruleToClausesMap).forEach(([ruleId, clauses]) => {
  console.log(`${ruleId}: ${clauses.join(', ')}`);
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

console.log('\n=== CLAUSE TO RULES MAPPING ===');
Object.entries(clauseToRulesMap).sort().forEach(([clauseId, ruleIds]) => {
  console.log(`${clauseId}: ${ruleIds.join(', ')}`);
});

// Extract all document clauses and their linkedRules
console.log('\n=== CHECKING EVIDENCE-RULE LINKAGES ===');
const docsMatch = mockDataContent.match(/export const regulatoryDocuments = \[([\s\S]*?)\n\];/);
if (!docsMatch) {
  console.error('Could not find regulatory documents');
  process.exit(1);
}

const docsSection = docsMatch[1];
const issues = [];

// Find all clauses with their IDs and linkedRules
const clauseRegex = /\{\s*id: '([^']+)',[\s\S]*?linkedRules: \[([^\]]*)\]/g;
let clauseMatch;

while ((clauseMatch = clauseRegex.exec(docsSection)) !== null) {
  const clauseId = clauseMatch[1];
  const linkedRulesStr = clauseMatch[2].trim();

  if (linkedRulesStr) {
    const linkedRules = linkedRulesStr.match(/'([^']+)'/g).map(r => r.replace(/'/g, ''));

    // Check if this clause actually has these rules associated
    const validRulesForClause = clauseToRulesMap[clauseId] || [];

    linkedRules.forEach(ruleId => {
      if (!validRulesForClause.includes(ruleId)) {
        issues.push({
          clauseId,
          invalidRuleId: ruleId,
          validRules: validRulesForClause
        });
      }
    });
  }
}

if (issues.length > 0) {
  console.log('\n⚠️  FOUND ISSUES:');
  issues.forEach(issue => {
    console.log(`\nClause: ${issue.clauseId}`);
    console.log(`  Invalid linkedRule: ${issue.invalidRuleId}`);
    console.log(`  Valid rules for this clause: ${issue.validRules.length > 0 ? issue.validRules.join(', ') : 'NONE'}`);
  });
} else {
  console.log('\n✅ No issues found with linkedRules in clauses');
}

// Also check linkedEvidence entries that might reference rules
console.log('\n=== CHECKING EVIDENCE ENTRIES ===');
const evidenceIssues = [];

// Find clauses with linkedEvidence
const clauseWithEvidenceRegex = /\{\s*id: '([^']+)',[\s\S]*?linkedEvidence: \[([^\]]+)\]/g;
let evidenceMatch;

while ((evidenceMatch = clauseWithEvidenceRegex.exec(docsSection)) !== null) {
  const clauseId = evidenceMatch[1];
  const linkedEvidenceStr = evidenceMatch[2].trim();

  if (linkedEvidenceStr) {
    const linkedEvidence = linkedEvidenceStr.match(/'([^']+)'/g).map(e => e.replace(/'/g, ''));

    // Get valid rules for this clause
    const validRulesForClause = clauseToRulesMap[clauseId] || [];

    evidenceIssues.push({
      clauseId,
      evidenceIds: linkedEvidence,
      validRules: validRulesForClause,
      hasRules: validRulesForClause.length > 0
    });
  }
}

console.log(`\nFound ${evidenceIssues.length} clauses with evidence entries`);
console.log(`\nClauses with NO associated rules but have evidence:`);
const clausesWithEvidenceButNoRules = evidenceIssues.filter(e => !e.hasRules);
clausesWithEvidenceButNoRules.forEach(issue => {
  console.log(`  - ${issue.clauseId} (${issue.evidenceIds.length} evidence entries)`);
});

console.log('\n=== SUMMARY ===');
console.log(`Total rules: ${Object.keys(ruleToClausesMap).length}`);
console.log(`Total clauses referenced by rules: ${Object.keys(clauseToRulesMap).length}`);
console.log(`Clauses with invalid linkedRules: ${issues.length}`);
console.log(`Clauses with evidence but no associated rules: ${clausesWithEvidenceButNoRules.length}`);
