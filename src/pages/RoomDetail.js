import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // URL 파라미터 사용 시

function RoomDetail() {
  const { id } = useParams(); // URL에서 숙소 id 받기
  const [room, setRoom] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/rooms/${id}`)
      .then(res => res.json())
      .then(data => setRoom(data));
  }, [id]);

  if (!room) return <p>숙소 정보를 불러오는 중...</p>;

  return (
    <div>
      <h1>{room.title}</h1>
      <img src={room.image_url} alt={room.title} width="400" />
      <p>{room.description}</p>
      <p>가격: {room.price}원</p>
      {/* 예약 버튼이나 예약 폼 연결 가능 */}
    </div>
  );
}

export default RoomDetail;
