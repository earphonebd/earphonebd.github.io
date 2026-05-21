const fs = require('fs');
const https = require('https');

const parsed = require('./parsed_output.json');

const ordersPayload = {};
parsed.orders.forEach(o => {
  const { key, ...orderData } = o;
  ordersPayload[key] = orderData;
});

const payload = JSON.stringify(ordersPayload);
const byteLength = Buffer.byteLength(payload, 'utf8');

console.log(`Prepared payload for ${parsed.orders.length} orders. Size: ${byteLength} bytes.`);

const options = {
  hostname: 'earphone-bd-default-rtdb.asia-southeast1.firebasedatabase.app',
  path: '/orders.json',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': byteLength
  }
};

console.log('Sending PUT request to overwrite /orders node in Firebase...');
const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log(`Response status code: ${res.statusCode}`);
    if (res.statusCode === 200) {
      console.log('SUCCESS - Overwrote /orders node successfully with exactly 65 orders!');
    } else {
      console.error('FAILED - Body:', body);
    }
  });
});

req.on('error', (err) => {
  console.error('Network Error:', err);
});

req.write(payload);
req.end();
