const inspect = async () => {
  try {
    const ordersRes = await fetch('https://earphone-bd-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json?shallow=true');
    const ordersKeys = await ordersRes.json();
    console.log('Orders Keys:', ordersKeys ? Object.keys(ordersKeys).slice(0, 10) : 'None');
    console.log('Total Orders in DB:', ordersKeys ? Object.keys(ordersKeys).length : 0);

    const cashRes = await fetch('https://earphone-bd-default-rtdb.asia-southeast1.firebasedatabase.app/cashbook_transactions.json?shallow=true');
    const cashKeys = await cashRes.json();
    console.log('Cashbook Keys:', cashKeys ? Object.keys(cashKeys).slice(0, 10) : 'None');
    console.log('Total Cashbook Transactions in DB:', cashKeys ? Object.keys(cashKeys).length : 0);
  } catch (error) {
    console.error('Error inspecting database:', error);
  }
};

inspect();
