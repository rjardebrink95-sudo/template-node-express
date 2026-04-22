import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 Supabase
const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string
);

// TEST
app.get("/", (req, res) => {
  res.send("API is running");
});

// 📥 GET ALLA NAMN
app.get("/names", async (req, res) => {
  const { data, error } = await supabase
    .from("name") // 👈 viktigt
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    return res.status(500).json({ error });
  }

  res.json(data);
});

// ➕ LÄGG TILL NAMN
app.post("/names", async (req, res) => {
  const { name } = req.body;

  const { data, error } = await supabase
    .from("name") // 👈 viktigt
    .insert([{ name }])
    .select();

  if (error) {
    return res.status(500).json({ error });
  }

  res.json(data);
});

// ✏️ ÄNDRA NAMN
app.put("/names/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { data, error } = await supabase
    .from("name") // 👈 viktigaste fixen
    .update({ name })
    .eq("id", id)
    .select();

  if (error) {
    return res.status(500).json({ error });
  }

  res.json(data);
});

// ❌ TA BORT NAMN
app.delete("/names/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("name") // 👈 viktigt
    .delete()
    .eq("id", id);

  if (error) {
    return res.status(500).json({ error });
  }

  res.json({ success: true });
});

// 🚀 START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
