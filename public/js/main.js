const userId = 'user-' + Math.floor(Math.random() * 1000000);

document.getElementById('chatForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const message = document.getElementById('message').value;



  try {
    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, message })
    });

    const data = await response.json();

    // Display chatbot reply
    document.getElementById('reply').innerText = data.reply || JSON.stringify(data);
  } catch (error) {
    document.getElementById('reply').innerText = 'Error: ' + error.message;
  }
});
