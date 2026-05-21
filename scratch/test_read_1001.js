const testRead = async () => {
  try {
    const res = await fetch('https://earphone-bd-default-rtdb.asia-southeast1.firebasedatabase.app/orders/1001.json');
    const data = await res.json();
    console.log('Read Order 1001 Response:', data);
  } catch (error) {
    console.error('Error reading from database:', error);
  }
};

testRead();
