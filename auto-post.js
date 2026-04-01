// config
const MESSAGE = "anjay";
const DELAY = 2000; // 2 detik (jangan terlalu cepat, nanti kena limit)

async function sendMessage() {
  try {
    const res = await fetch("https://discord.com/api/v9/channels/1234263726052343878/messages", {
      method: "POST",
      headers: {
        "authorization" : "OTYxOTYwMTQxOTgzNDQ5MTA4.GI_SHG.xiBeaWjclBfZhFnrMo4a6Is3vjBYPJnjqPzqPE"
      },
      body: {
        content: MESSAGE
      }
    });

    if (!res.ok) {
      console.log("Kena limit / error");
    } else {
      console.log("Terkirim");
    }
  } catch (err) {
    console.log("Error:", err.message);
  }
}

// loop
export default function handler(req, res) {
  res.status(200).send("ok");
  setInterval(sendMessage, DELAY);
}
