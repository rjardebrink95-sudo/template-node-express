import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API is running");
});

// GET ALL NAMES
app.get("/names", async (req, res) => {
  const { data, error } = await supabase.from("name").select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// POST NAME 🔥 (DETTA VAR DET DU SAKNADE)
app.post("/names", async (req, res) => {
  const { name } = req.body;

  const { data, error } = await supabase
    .from("name")
    .insert([{ name }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data[0]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
