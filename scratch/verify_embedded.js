const data = require('./embedded_data.json');
console.log('Total embedded cashTransactions:', data.cashTransactions ? data.cashTransactions.length : 0);
console.log('Total embedded firebaseOrders:', data.firebaseOrders ? data.firebaseOrders.length : 0);
if (data.firebaseOrders) {
  const keys = data.firebaseOrders.map(o => o.key);
  console.log('First 5 order keys:', keys.slice(0, 5));
  console.log('Last 5 order keys:', keys.slice(-5));
}
