const API_KEY = "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"; 
const MODEL = "deepseek/deepseek-r1-0528-qwen3-8b:free"; 

async function sendMessage() {
  const input = document.getElementById('user-input');
  const chatBox = document.getElementById('chat-box');
  const userMessage = input.value.trim();
  if (userMessage === '') return;

  
  const userBubble = document.createElement('div');
  userBubble.className = 'chat-bubble user';
  userBubble.textContent = userMessage;
  chatBox.appendChild(userBubble);

 
  const botBubble = document.createElement('div');
  botBubble.className = 'chat-bubble bot';
  botBubble.textContent = "Sedang memproses...";
  chatBox.appendChild(botBubble);

  chatBox.scrollTop = chatBox.scrollHeight;
  input.value = '';

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": "https://orionmgmn-alt.github.io/",  
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: "Kamu adalah asisten AI yang ramah dan membantu. Selalu jawab semua pertanyaan dalam Bahasa Indonesia." },
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await response.json();

    // Ganti teks bot dengan respons dari API
    const botReply = data.choices?.[0]?.message?.content || "Maaf, tidak ada jawaban.";
    botBubble.textContent = botReply;

  } catch (error) {
    botBubble.textContent = "Terjadi kesalahan: " + error.message;
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}
