import { START_MESSAGE, ASK_ROUTE } from "@/constants/messages";
import { TELEGRAM_TOKEN } from "#/env";

const API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

export class Telegram {
	constructor() {}

	async webhook(c) {
		const update = await c.req.json();
		const message = update.message;
		const chatId = message.chat.id;
		const text = message.text;
	  
		if (text === "/start") {
		  await sendMessage(chatId, START_MESSAGE);
		  return "OK"
		}
	  
		// Пример простой логики: сохраняем маршрут
		if (text.includes("→")) {
		  const [from, to] = text.split("→").map(s => s.trim());
		  //await saveOrder(chatId, from, to);
		  await sendMessage(chatId, `Принято: ${from} → ${to}`);
		  return "OK";
		}
	  
		await sendMessage(chatId, ASK_ROUTE);
		return "OK";
	}
}

export async function sendMessage(chatId, text) {
	await fetch(`${API}/sendMessage`, {
	  method: "POST",
	  headers: { "Content-Type": "application/json" },
	  body: JSON.stringify({ chat_id: chatId, text })
	});
}
