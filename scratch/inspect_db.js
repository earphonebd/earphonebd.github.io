const inspect = async () => {
  try {
    const res = await fetch('https://earphone-bd-default-rtdb.asia-southeast1.firebasedatabase.app/admins.json?shallow=true');
    const data = await res.json();
    console.log('Admins Response:', data);
  } catch (error) {
    console.error('Error inspecting database:', error);
  }
};

inspect();
