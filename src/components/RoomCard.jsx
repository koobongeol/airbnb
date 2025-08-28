import React from 'react';

function RoomCard({ room, onReserve }) {
  return (
    <div className="room-card">
      <h2>{room.title} - {room.price}원</h2>
      <p>{room.description}</p>
      <img src={room.image_url} alt={room.title} width="200" />
      <button onClick={() => onReserve(room)}>예약하기</button>
    </div>
  );
}

export default RoomCard;
