// backend/server.js
import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 MySQL 연결
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "KOO",
  password: "123456",
  database: "airbnb_db"
});

// 🔹 연결 확인
db.connect((err) => {
  if (err) {
    console.error("MySQL 연결 실패:", err);
  } else {
    console.log("MySQL 연결 성공!");
  }
});

// 🔹 예약 내역 추가
app.post("/api/bookings", (req, res) => {
  const { place, checkin, checkout, guests, price, transactionId, user_id } = req.body;
  const sql = `
    INSERT INTO rooms 
      (place, checkin, checkout, guests, price, transactionId, user_id, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
  `;
  db.query(sql, [place, checkin, checkout, guests, price, transactionId, user_id], (err, result) => {
    if (err) {
      console.error("예약 추가 에러:", err);
      return res.status(500).json(err);
    }
    res.json({ success: true, id: result.insertId });
  });
});

// 🔹 유저 예약 내역 조회
app.get("/api/bookings/:userId", (req, res) => {
  const { userId } = req.params;
  const sql = `SELECT * FROM rooms WHERE user_id = ? ORDER BY created_at DESC`;
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("예약 조회 에러:", err);
      return res.status(500).json(err);
    }
    res.json(results);
  });
});

// 🔹 서버 실행
app.listen(3001, () => console.log("Server running on port 3001"));
