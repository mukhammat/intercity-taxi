import { Hono } from "hono";
import { Telegram } from "./endpoints/Telegram";

// Start a Hono app
const app = new Hono();
const telegram = new Telegram();

// Register OpenAPI endpoints
app.post("/telegram", telegram.webhook.bind(telegram));
app.get("/health", c => c.text("OK"));

// Export the Hono app
export default app;
