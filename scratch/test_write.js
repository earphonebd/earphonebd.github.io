const testWrite = async () => {
  try {
    const res = await fetch('https://earphone-bd-default-rtdb.asia-southeast1.firebasedatabase.app/cashbook_transactions/test_auth_write.json', {
      method: 'PUT',
      body: JSON.stringify({ test: "hello" })
    });
    const data = await res.json();
    console.log('Write Response:', data);
  } catch (error) {
    console.error('Error writing to database:', error);
  }
};

testWrite();
