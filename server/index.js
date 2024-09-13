const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const cors = require('cors')

app.use(bodyParser.json());
app.use(cors())

let conn = null;



const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "tutorials",
  });
};

// เพิ่มคำว่า async เข้ามา

app.get("/users", async (req, res) => {
  try {
    let results = await conn.query("SELECT * FROM users");
    res.json(results[0]);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Error fetching users" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const user = req.body;
    const results = await conn.query("INSERT INTO users SET ?", user);
    res.json({
      message: "insert ok",
      data: results[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "something wrong",
      errorMessage: error.message,
    });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const results = await conn.query("SELECT * FROM users WHERE id = ?", id);
    if (results[0].length > 0) {
      res.json(results[0][0]);
    } else {
      res.status(404).json({
        message: "Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "soomething wrong",
      errorMessage: error.message,
    });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updateUser = req.body;
    const results = await conn.query("UPDATE users SET ? WHERE id = ?", [
      updateUser,
      id,
    ]);
    res.json({
      message: "insert ok",
      data: results[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "soomething wrong",
      errorMessage: error.message,
    });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const results = await conn.query("DELETE from users WHERE id = ?", id);
    res.json({
      message: "delete ok",
      data: results[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "soomething wrong",
      errorMessage: error.message,
    });
  }
});

app.listen(8000, async () => {
  await initMySQL();
  console.log("Server started on port 8000");
});
