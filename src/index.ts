import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();

app.use(cors());
app.use(express.json());

// 🔑 Supabase koppling
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY! // ← viktigt: rätt namn!
);

// TEST ROUTES
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.get("/test", (req, res) => {
  res.send("TEST OK");
});

// 🔥 HÄMTA DATA FRÅN DB
app.get("/names", async (req, res) => {
  const { data, error } = await supabase
    .from("name") // ← din tabell
    .select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
