const data = require('./parsed_output.json');
console.log('Total Cashbook transactions:', data.cashTransactions.length);
console.log('Total Orders:', data.orders.length);
console.log('Sample Cashbook transaction (index 0):', data.cashTransactions[0]);
console.log('Sample Cashbook transaction (index 1):', data.cashTransactions[1]);
console.log('Sample Order (index 0):', data.orders[0]);
console.log('Sample Order (index 27):', data.orders[27]); // Row with 2 phone numbers
