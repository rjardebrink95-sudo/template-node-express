import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();

app.use(cors());
app.use(express.json());

// 🔑 Supabase koppling
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

// 🔹 Root
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// 🔹 Test route
app.get("/test", (req, res) => {
  res.send("TEST OK");
});

// 🔥 DB route (redo för nästa steg)
app.get("/test-db", async (req, res) => {
  const { data, error } = await supabase
    .from("test")
    .select("*");

  if (error) {
    return res.status(500).json({ error });
  }

  res.json(data);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
