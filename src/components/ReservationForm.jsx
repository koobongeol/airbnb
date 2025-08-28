import React, { useState } from 'react';

function ReservationForm({ room, onClose }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const reservationData = {
      roomId: room.id,
      checkIn,
      checkOut,
      guests,
    };

    fetch('http://localhost:3000/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservationData),
    })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('예약 실패');
      })
      .then(() => setMessage('예약이 완료되었습니다!'))
      .catch(() => setMessage('예약 중 오류가 발생했습니다.'));
  };

  return (
    <div className="reservation-form">
      <h2>{room.title} 예약하기</h2>
      <form onSubmit={handleSubmit}>
        <label>
          체크인 날짜:
          <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} required />
        </label>
        <label>
          체크아웃 날짜:
          <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} required />
        </label>
        <label>
          인원 수:
          <input type="number" min="1" value={guests} onChange={e => setGuests(Number(e.target.value))} required />
        </label>
        <button type="submit">예약 완료</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={onClose}>닫기</button>
    </div>
  );
}

export default ReservationForm;
