const inspect = async () => {
  try {
    const res = await fetch('https://earphone-bd-default-rtdb.asia-southeast1.firebasedatabase.app/payouts/test_moderator.json', {
      method: 'POST',
      body: JSON.stringify({ amount: 10, date: "2026-05-22", note: "test write", timestamp: Date.now() })
    });
    const data = await res.json();
    console.log('Write Response:', data);
  } catch (error) {
    console.error('Error writing to database:', error);
  }
};

inspect();
