// src/pages/MyPage.js
import React, { useContext } from "react";
import { BookingContext } from "../contexts/BookingContext";
import "../styles/MyPage.css";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyPage() {
  const { bookings, cancelBooking } = useContext(BookingContext);

  const handleCancel = (transactionId) => {
    if (window.confirm("정말로 취소하시겠습니까?")) {
      cancelBooking(transactionId);
      toast.success("예약이 취소되었습니다.");
    }
  };

  return (
    <div className="mypage-container">
      <div className="mypage-content">
        {(!bookings || bookings.length === 0) ? (
          <>
            <h2>나의 예약 목록</h2>
            <p className="empty-message">
              예약한 숙소가 없습니다.
            </p>
          </>
        ) : (
          <>
            <h2>나의 예약 목록</h2>
            <div className="booking-list">
              {bookings.map((b) => (
                <div key={b.transactionId} className="booking-card">
                  <img src={b.img} alt={b.place} className="booking-image" />
                  <div className="booking-info">
                    <h3>{b.place}</h3>
                    <p>체크인: {b.checkin}</p>
                    <p>체크아웃: {b.checkout}</p>
                    <p>인원: {b.guests}명</p>
                    <p>결제 금액: ₩{b.price.toLocaleString()}</p>
                    <p>거래 ID: {b.transactionId}</p>

                    <button
                      className="cancel-btn"
                      onClick={() => handleCancel(b.transactionId)}
                    >
                      예약 취소
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default MyPage;
