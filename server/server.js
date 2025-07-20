import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import aiRouter from "./routes/aiRoutes.js";
import connectCloudniary from "./config/cloudinary.js";
import sql from "./config/db.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

await connectCloudniary();
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("Welcome To the server"));

// 👇 NeonDB test
(async () => {
  try {
    const result = await sql`SELECT NOW()`;
    console.log("✅ Connected to NeonDB at:", result[0].now);
  } catch (err) {
    console.error("❌ NeonDB connection failed:", err);
  }
})();

app.use(requireAuth());
app.use("/api/ai", aiRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
