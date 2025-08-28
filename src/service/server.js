const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// 임시 저장용 배열 (DB 대신)
let bookings = [];

// 예약 생성
app.post("/api/bookings", (req, res) => {
  const booking = { id: bookings.length + 1, ...req.body };
  bookings.push(booking);
  console.log("예약 데이터:", booking);
  res.json({ success: true, message: "예약 성공", booking });
});

// 유저별 예약 조회
app.get("/api/bookings/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const userBookings = bookings.filter((b) => b.user_id === userId);
  res.json(userBookings);
});

// 숙소 리스트 (테스트용)
app.get("/rooms", (req, res) => {
  res.json([
    { id: 1, title: "서울 아파트", price: "₩100,000", img: "/img1.jpg", rating: 4.5, description: "좋은 위치의 아파트" },
    { id: 2, title: "부산 오션뷰", price: "₩150,000", img: "/img2.jpg", rating: 4.7, description: "바다 전망이 아름다운 숙소" },
  ]);
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
