const fs = require('fs');

function parseCSV(text) {
  const lines = [];
  let row = [""];
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];

    if (c === '"') {
      if (inQuotes && next === '"') {
        row[row.length - 1] += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',') {
      if (inQuotes) {
        row[row.length - 1] += c;
      } else {
        row.push("");
      }
    } else if (c === '\r' || c === '\n') {
      if (inQuotes) {
        row[row.length - 1] += c;
      } else {
        if (c === '\r' && next === '\n') {
          i++;
        }
        lines.push(row);
        row = [""];
      }
    } else {
      row[row.length - 1] += c;
    }
  }
  if (row.length > 1 || row[0] !== "") {
    lines.push(row);
  }
  return lines;
}

const csvPath = 'd:\\Sajidul Islam\\My Companies\\Sajid Tech\\Antigravity All Project\\Earphone BD Official Website\\Order Book - Order Book.csv';
const content = fs.readFileSync(csvPath, 'utf8');
const rows = parseCSV(content);

console.log('Total rows parsed:', rows.length);
console.log('Headers:', rows[0]);
console.log('First data row:', rows[1]);
console.log('Row with double numbers (row 29 in CSV, index 28 in parsed):', rows[28]);
