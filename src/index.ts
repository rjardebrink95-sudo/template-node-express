import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string
);

// TEST
app.get("/", (req, res) => {
  res.send("API is running");
});

// GET ALL
app.get("/names", async (req, res) => {
  const { data, error } = await supabase.from("name").select("*");

  if (error) return res.status(500).json(error);

  res.json(data);
});

// ADD NAME
app.post("/names", async (req, res) => {
  const { name } = req.body;

  const { data, error } = await supabase
    .from("name")
    .insert([{ name }]);

  if (error) return res.status(500).json(error);

  res.json(data);
});

// ❗❗ FIXAD UPDATE ❗❗
app.put("/names/:id", async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  const { data, error } = await supabase
    .from("name")
    .update({ name: name })
    .eq("id", id)
    .select(); // ← VIKTIGT

  if (error) return res.status(500).json(error);

  res.json(data);
});

// DELETE
app.delete("/names/:id", async (req, res) => {
  const id = req.params.id;

  const { error } = await supabase
    .from("name")
    .delete()
    .eq("id", id);

  if (error) return res.status(500).json(error);

  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
