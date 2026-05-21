const inspect = async () => {
  try {
    const ordersRes = await fetch('https://earphone-bd-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json');
    const orders = await ordersRes.json();
    if (orders && orders.error) {
      console.log('Orders error:', orders.error);
    } else {
      console.log('Orders fetched successfully!');
      console.log('Orders Keys:', orders ? Object.keys(orders).slice(0, 10) : 'None');
      console.log('Total Orders in DB:', orders ? Object.keys(orders).length : 0);
    }

    const cashRes = await fetch('https://earphone-bd-default-rtdb.asia-southeast1.firebasedatabase.app/cashbook_transactions.json');
    const cash = await cashRes.json();
    if (cash && cash.error) {
      console.log('Cashbook error:', cash.error);
    } else {
      console.log('Cashbook fetched successfully!');
      console.log('Cashbook Keys:', cash ? Object.keys(cash).slice(0, 10) : 'None');
      console.log('Total Cashbook Transactions in DB:', cash ? Object.keys(cash).length : 0);
    }
  } catch (error) {
    console.error('Error inspecting database:', error);
  }
};

inspect();
