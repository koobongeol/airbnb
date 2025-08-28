// src/contexts/BookingContext.js
import React, { createContext, useState } from "react";

export const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);

  // ✅ 예약 추가 함수
  const addBooking = (newBooking) => {
    setBookings((prev) => [...prev, newBooking]);
  };

  // ✅ 예약 취소 함수
  const cancelBooking = (transactionId) => {
    setBookings((prev) =>
      prev.filter((b) => b.transactionId !== transactionId)
    );
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking }}>
      {children}
    </BookingContext.Provider>
  );
}
