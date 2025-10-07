// Data validation script to check bidirectional consistency between rules and clauses

import { regulatoryDocuments } from './src/services/mockData.js';
import { rules } from './src/services/mockData.js';

console.log('=== Data Consistency Validation ===\n');

// Build a map of all clauses
const clauseMap = new Map();
regulatoryDocuments.forEach(doc => {
  doc.clauses.forEach(clause => {
    clauseMap.set(clause.id, {
      clause,
      document: doc.title,
      linkedRules: clause.linkedRules || []
    });
  });
});

console.log(`Found ${clauseMap.size} total clauses across ${regulatoryDocuments.length} documents`);
console.log(`Found ${rules.length} total rules\n`);

// Check 1: Verify all clause.linkedRules point to valid rules
console.log('Check 1: Validating clause.linkedRules references...');
let invalidClauseRuleRefs = 0;
clauseMap.forEach((data, clauseId) => {
  data.linkedRules.forEach(ruleId => {
    const rule = rules.find(r => r.id === ruleId);
    if (!rule) {
      console.error(`  ❌ Clause ${clauseId} references non-existent rule: ${ruleId}`);
      invalidClauseRuleRefs++;
    }
  });
});
if (invalidClauseRuleRefs === 0) {
  console.log('  ✓ All clause.linkedRules point to valid rules');
} else {
  console.error(`  ✗ Found ${invalidClauseRuleRefs} invalid references`);
}
console.log('');

// Check 2: Verify all rule.linkedClauses point to valid clauses
console.log('Check 2: Validating rule.linkedClauses references...');
let invalidRuleClauseRefs = 0;
rules.forEach(rule => {
  if (rule.linkedClauses) {
    rule.linkedClauses.forEach(clauseId => {
      if (!clauseMap.has(clauseId)) {
        console.error(`  ❌ Rule ${rule.id} references non-existent clause: ${clauseId}`);
        invalidRuleClauseRefs++;
      }
    });
  }
});
if (invalidRuleClauseRefs === 0) {
  console.log('  ✓ All rule.linkedClauses point to valid clauses');
} else {
  console.error(`  ✗ Found ${invalidRuleClauseRefs} invalid references`);
}
console.log('');

// Check 3: Find bidirectional inconsistencies
console.log('Check 3: Checking bidirectional consistency...');
let bidirectionalIssues = 0;
const issueDetails = [];

// Check from clause side
clauseMap.forEach((data, clauseId) => {
  data.linkedRules.forEach(ruleId => {
    const rule = rules.find(r => r.id === ruleId);
    if (rule && (!rule.linkedClauses || !rule.linkedClauses.includes(clauseId))) {
      bidirectionalIssues++;
      issueDetails.push({
        type: 'clause-to-rule',
        clauseId,
        ruleId,
        message: `Clause ${clauseId} links to rule ${ruleId}, but rule doesn't link back`
      });
    }
  });
});

// Check from rule side
rules.forEach(rule => {
  if (rule.linkedClauses) {
    rule.linkedClauses.forEach(clauseId => {
      const clauseData = clauseMap.get(clauseId);
      if (clauseData && !clauseData.linkedRules.includes(rule.id)) {
        bidirectionalIssues++;
        issueDetails.push({
          type: 'rule-to-clause',
          ruleId: rule.id,
          clauseId,
          message: `Rule ${rule.id} links to clause ${clauseId}, but clause doesn't link back`
        });
      }
    });
  }
});

if (bidirectionalIssues === 0) {
  console.log('  ✓ All bidirectional relationships are consistent');
} else {
  console.error(`  ✗ Found ${bidirectionalIssues} bidirectional inconsistencies:\n`);
  issueDetails.forEach(issue => {
    console.error(`  ❌ ${issue.message}`);
  });
}
console.log('');

// Summary statistics
console.log('=== Summary Statistics ===');
console.log(`Total clauses: ${clauseMap.size}`);
console.log(`Total rules: ${rules.length}`);

let totalClauseLinks = 0;
clauseMap.forEach(data => {
  totalClauseLinks += data.linkedRules.length;
});

let totalRuleLinks = 0;
rules.forEach(rule => {
  totalRuleLinks += rule.linkedClauses ? rule.linkedClauses.length : 0;
});

console.log(`Total clause→rule links: ${totalClauseLinks}`);
console.log(`Total rule→clause links: ${totalRuleLinks}`);
console.log(`Difference: ${Math.abs(totalClauseLinks - totalRuleLinks)}`);

if (totalClauseLinks !== totalRuleLinks) {
  console.error(`\n⚠️  WARNING: Link count mismatch indicates potential data issues`);
}

// Find clauses with no rules
const clausesWithNoRules = [];
clauseMap.forEach((data, clauseId) => {
  if (data.linkedRules.length === 0) {
    clausesWithNoRules.push(clauseId);
  }
});

if (clausesWithNoRules.length > 0) {
  console.log(`\n⚠️  ${clausesWithNoRules.length} clauses have no linked rules:`);
  clausesWithNoRules.forEach(id => {
    const data = clauseMap.get(id);
    console.log(`  - ${id} (${data.clause.reference})`);
  });
}

// Find rules with no clauses
const rulesWithNoClauses = rules.filter(rule => !rule.linkedClauses || rule.linkedClauses.length === 0);
if (rulesWithNoClauses.length > 0) {
  console.log(`\n⚠️  ${rulesWithNoClauses.length} rules have no linked clauses:`);
  rulesWithNoClauses.forEach(rule => {
    console.log(`  - ${rule.id} (${rule.name})`);
  });
}

// Final verdict
console.log('\n=== Final Verdict ===');
const totalIssues = invalidClauseRuleRefs + invalidRuleClauseRefs + bidirectionalIssues;
if (totalIssues === 0) {
  console.log('✅ All data consistency checks passed!');
} else {
  console.error(`❌ Found ${totalIssues} data consistency issues that need to be fixed`);
  process.exit(1);
}
