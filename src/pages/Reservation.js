import React, { useState } from 'react';

function Reservation() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 예약 데이터 서버에 보내기
    // fetch('예약 API URL', {...})
  };

  return (
    <div>
      <h1>예약 페이지</h1>
      <form onSubmit={handleSubmit}>
        {/* 체크인, 체크아웃, 인원 입력 폼 */}
        <button type="submit">예약 완료</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Reservation;
