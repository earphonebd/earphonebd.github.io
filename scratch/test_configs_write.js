const inspect = async () => {
  try {
    const res = await fetch('https://earphone-bd-default-rtdb.asia-southeast1.firebasedatabase.app/moderator_configs/test_moderator.json', {
      method: 'PUT',
      body: JSON.stringify({ excludeFromPayout: true })
    });
    const data = await res.json();
    console.log('Write Response:', data);
  } catch (error) {
    console.error('Error writing to database:', error);
  }
};

inspect();
