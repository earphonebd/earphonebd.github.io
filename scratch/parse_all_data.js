const fs = require('fs');
const path = require('path');

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

// ----------------------------------------------------
// 1. Parsing Cash Book CSV
// ----------------------------------------------------
const cashBookPath = 'd:\\Sajidul Islam\\My Companies\\Sajid Tech\\Antigravity All Project\\Earphone BD Official Website\\Cash Book.csv';
const cashBookContent = fs.readFileSync(cashBookPath, 'utf8');
const cashBookRows = parseCSV(cashBookContent);

const cashTransactions = [];
const cashBookHeaders = cashBookRows[0];

for (let i = 1; i < cashBookRows.length; i++) {
  const cols = cashBookRows[i];
  if (cols.length < 5) continue;
  
  let dateStr = cols[0] ? cols[0].trim() : '';
  let description = cols[1] ? cols[1].trim() : '';
  let category = cols[2] ? cols[2].trim() : '';
  let cashInStr = cols[3] ? cols[3].trim() : '';
  let cashOutStr = cols[4] ? cols[4].trim() : '';
  
  if (!cashInStr && !cashOutStr) continue;
  
  const cashIn = parseFloat(cashInStr) || 0;
  const cashOut = parseFloat(cashOutStr) || 0;
  if (cashIn === 0 && cashOut === 0) continue;
  
  let dateParts = dateStr.split('/');
  let dateObj = new Date();
  let finalDateStr = '';
  if (dateParts.length === 3) {
    let day = parseInt(dateParts[0], 10);
    let month = parseInt(dateParts[1], 10) - 1;
    let year = parseInt(dateParts[2], 10);
    dateObj = new Date(year, month, day, 12, 0, 0);
    
    let MM = String(month + 1).padStart(2, '0');
    let DD = String(day).padStart(2, '0');
    finalDateStr = `${year}-${MM}-${DD}`;
  } else {
    // Net-zero startup rows (i = 1 to 4)
    dateObj = new Date(2026, 4, 5, 12, 0, 0); // May 5, 2026
    finalDateStr = '2026-05-05';
  }
  const timestamp = dateObj.getTime();

  if (cashIn > 0 && cashOut > 0) {
    // Split into parallel income and expense entries
    let incomeCat = "Investment Capital (বিনিয়োগ)";
    let incomeDesc = `Card Funding: ${description || category}`;
    
    cashTransactions.push({
      amount: cashIn,
      category: incomeCat,
      description: incomeDesc,
      type: 'income',
      timestamp: timestamp,
      date: finalDateStr
    });
    
    let expenseCat = "Other Expenses (অন্যান্য ব্যয়)";
    const catLower = category.toLowerCase();
    if (catLower.includes('procurement') || catLower.includes('product')) {
      expenseCat = "Product Procurement (প্রোডাক্ট ক্রয়)";
    } else if (catLower.includes('courier') || catLower.includes('packing')) {
      expenseCat = "Courier & Packing (কুরিয়ার খরচ)";
    } else if (catLower.includes('commission') || catLower.includes('moderator')) {
      expenseCat = "Moderator Commissions (মডারেটর বিল)";
    } else if (catLower.includes('marketing') || catLower.includes('ad') || catLower.includes('follower')) {
      expenseCat = "Marketing & Ads (ফেসবুক বিজ্ঞাপন)";
    } else if (catLower.includes('salary') || catLower.includes('বেতন')) {
      expenseCat = "Salaries & Bonuses (বেতন)";
    } else if (catLower.includes('office') || catLower.includes('rent') || catLower.includes('utility')) {
      expenseCat = "Office & Utilities (অফিস ও বিল)";
    } else if (catLower.includes('refund') || catLower.includes('return')) {
      expenseCat = "Refunds/Returns (রিফান্ড)";
    }
    
    let expenseDesc = description || `Startup card expenditure: ${category}`;
    
    cashTransactions.push({
      amount: cashOut,
      category: expenseCat,
      description: expenseDesc,
      type: 'expense',
      timestamp: timestamp,
      date: finalDateStr
    });
  } else {
    // Single entry
    let type = cashIn > 0 ? 'income' : 'expense';
    let amount = cashIn > 0 ? cashIn : cashOut;
    let finalCategory = '';
    const catLower = category.toLowerCase();
    
    if (type === 'income') {
      if (catLower.includes('deposit')) {
        finalCategory = "Investment Capital (বিনিয়োগ)";
      } else if (catLower.includes('sale')) {
        finalCategory = "Sales Revenue (বিক্রয় আয়)";
      } else if (catLower.includes('borrow')) {
        finalCategory = "Loan Received (ঋণ গ্রহণ)";
      } else {
        finalCategory = "Other Inflow (অন্যান্য আয়)";
      }
    } else {
      if (catLower.includes('procurement') || catLower.includes('product')) {
        finalCategory = "Product Procurement (প্রোডাক্ট ক্রয়)";
      } else if (catLower.includes('courier') || catLower.includes('packing')) {
        finalCategory = "Courier & Packing (কুরিয়ার খরচ)";
      } else if (catLower.includes('commission') || catLower.includes('moderator')) {
        finalCategory = "Moderator Commissions (মডারেটর বিল)";
      } else if (catLower.includes('marketing') || catLower.includes('ad') || catLower.includes('follower')) {
        finalCategory = "Marketing & Ads (ফেসবুক বিজ্ঞাপন)";
      } else if (catLower.includes('salary') || catLower.includes('বেতন')) {
        finalCategory = "Salaries & Bonuses (বেতন)";
      } else if (catLower.includes('office') || catLower.includes('rent') || catLower.includes('utility')) {
        finalCategory = "Office & Utilities (অফিস ও বিল)";
      } else if (catLower.includes('refund') || catLower.includes('return')) {
        finalCategory = "Refunds/Returns (রিফান্ড)";
      } else {
        finalCategory = "Other Expenses (অন্যান্য ব্যয়)";
      }
    }
    
    let finalDescription = description || `Imported historical ${type === 'income' ? 'income' : 'expense'} entry for ${category}`;
    
    cashTransactions.push({
      amount,
      category: finalCategory,
      description: finalDescription,
      type,
      timestamp,
      date: finalDateStr
    });
  }
}

console.log(`Parsed ${cashTransactions.length} transaction records from Cash Book.csv.`);

// ----------------------------------------------------
// 2. Parsing Order Book CSV
// ----------------------------------------------------
const orderBookPath = 'd:\\Sajidul Islam\\My Companies\\Sajid Tech\\Antigravity All Project\\Earphone BD Official Website\\Order Book - Order Book.csv';
const orderBookContent = fs.readFileSync(orderBookPath, 'utf8');
const orderBookRows = parseCSV(orderBookContent);

const orders = [];
const orderHeaders = orderBookRows[0];

function getProductImage(model, color) {
  const m = String(model || '').toLowerCase();
  const c = String(color || '').toLowerCase();
  
  if (m.includes('3rd') || m.includes('3rd generation')) {
    return 'assets/airpod_pro_3rd_generation_premium_anc.png';
  }
  if (m.includes('premium anc') || m.includes('premium')) {
    return 'assets/airpod_pro_2nd_generation_premium_anc.png';
  }
  if (m.includes('chaina') || m.includes('china')) {
    if (c.includes('black')) {
      return 'assets/airpod_pro_2nd_generation_china_black.png';
    }
    return 'assets/airpod_pro_2nd_generation_china_white.png';
  }
  // Default to Dubai Edition
  if (c.includes('black')) {
    return 'assets/airpod_pro_2nd_generation_dubai_black.png';
  }
  return 'assets/airpod_pro_2nd_generation_dubai_white.png';
}

function normalizeColor(color) {
  const c = String(color || '').toLowerCase().trim();
  if (c.includes('black')) return 'Classic Black';
  if (c.includes('white')) return 'Classic White';
  return color || 'Classic White';
}

function getEdition(model) {
  const m = String(model || '').toLowerCase();
  if (m.includes('3rd')) return '3rd Generation Premium ANC';
  if (m.includes('premium anc')) return 'Premium ANC';
  if (m.includes('chaina') || m.includes('china')) return 'China Edition';
  return 'Dubai Edition';
}

for (let i = 1; i < orderBookRows.length; i++) {
  const cols = orderBookRows[i];
  if (cols.length < 16) continue;
  
  const sl = cols[0].trim();
  const dateStr = cols[1].trim();
  const orderId = cols[2].trim();
  const customerName = cols[3].trim();
  const phone = cols[4].trim().replace(/\r/g, ''); // replace carriage returns if any
  const address = cols[5].trim();
  const dhaka = cols[6].trim().toLowerCase();
  const productModel = cols[7].trim();
  const color = cols[8].trim();
  const qty = parseInt(cols[9].trim(), 10) || 1;
  const costPrice = parseFloat(cols[10].trim()) || 0;
  const sellingPrice = parseFloat(cols[11].trim()) || 0;
  const deliveryCost = parseFloat(cols[12].trim()) || 0;
  const totalPrice = parseFloat(cols[13].trim()) || 0;
  const profit = parseFloat(cols[14].trim()) || 0;
  const status = cols[15].trim();
  
  if (!orderId) continue;
  
  let dateParts = dateStr.split('-');
  let day = parseInt(dateParts[0], 10);
  let month = parseInt(dateParts[1], 10) - 1;
  let year = parseInt(dateParts[2], 10);
  let dateObj = new Date(year, month, day, 12, 0, 0);
  let timestamp = dateObj.getTime();
  let displayDate = `${day}/${month + 1}/${year}, 12:00:00 PM`;
  
  const isInsideDhaka = dhaka === 'yes' || dhaka === 'true';
  const shippingArea = isInsideDhaka ? 'Inside Dhaka' : 'Outside Dhaka';
  const district = isInsideDhaka ? 'Dhaka' : 'Outside Dhaka';
  
  // Status mapping
  let mappedStatus = 'New Order';
  if (status.toLowerCase().includes('deliver') || status.toLowerCase().includes('complete')) {
    mappedStatus = 'Completed';
  } else if (status.toLowerCase().includes('cancel')) {
    mappedStatus = 'Cancelled';
  } else if (status.toLowerCase().includes('return')) {
    mappedStatus = 'Returned';
  } else if (status.toLowerCase().includes('transit') || status.toLowerCase().includes('shipped')) {
    mappedStatus = 'Shipped';
  } else if (status.toLowerCase().includes('process')) {
    mappedStatus = 'Confirmed';
  }
  
  const normColor = normalizeColor(color);
  const edition = getEdition(productModel);
  const image = getProductImage(productModel, color);
  
  const orderData = {
    key: orderId,
    customer: {
      name: customerName,
      phone: phone,
      address: address,
      email: "",
      note: ""
    },
    order: {
      items: [
        {
          title: productModel,
          qty: qty,
          price: String(Math.round(sellingPrice / qty)),
          edition: edition,
          color: normColor,
          image: image
        }
      ],
      product: `${productModel} (${qty} Pcs)`,
      quantity: qty,
      variation: edition,
      color: normColor,
      shipping_area: shippingArea,
      district: district,
      thana: "",
      subtotal: "৳" + sellingPrice,
      shipping_cost: "৳" + deliveryCost,
      discount: "৳0",
      promo_code: "",
      promo_title: "",
      total_price: "৳" + totalPrice
    },
    metadata: {
      date: displayDate,
      timestamp: timestamp,
      status: mappedStatus
    }
  };
  
  orders.push(orderData);
}

console.log(`Parsed ${orders.length} orders from Order Book - Order Book.csv.`);

// Write to parsed_output.json
fs.writeFileSync(
  'd:\\Sajidul Islam\\My Companies\\Sajid Tech\\Antigravity All Project\\Earphone BD Official Website\\scratch\\parsed_output.json',
  JSON.stringify({ cashTransactions, orders }, null, 2),
  'utf8'
);
console.log('Saved parsed data to scratch/parsed_output.json');
