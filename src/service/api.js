// src/service/api.js
const API_BASE_URL = 'http://localhost:3001';

export async function fetchRooms() {
  const res = await fetch(`${API_BASE_URL}/rooms`);
  if (!res.ok) throw new Error('숙소 불러오기 실패');
  return res.json();
}

// 예약 생성 API (mock)
export async function createReservation(data) {
  console.log("예약 요청 데이터:", data);
  // 실제 서버가 없으면 1초 뒤 성공 반환
  return new Promise((resolve) => setTimeout(resolve, 1000));
}
