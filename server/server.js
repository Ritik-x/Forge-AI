import express from "express";

import cors from "cors";

import "dotenv/config";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import aiRouter from "./routes/aiRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("Welcome To the server"));
app.use(requireAuth());

app.use("/api/ai", aiRouter);
const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
