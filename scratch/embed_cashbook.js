const fs = require('fs');
const parsed = require('./parsed_output.json');

const jsCode = `// Embedded historical cashbook transactions from Cash Book.csv
const historicalTransactions = ${JSON.stringify(parsed.cashTransactions, null, 2)};
`;

fs.writeFileSync('scratch/embedded_cashbook_js.txt', jsCode, 'utf8');
console.log('Successfully wrote script/embedded_cashbook_js.txt');
