// src/pages/Booking.js
import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/Booking.css";
import { createReservation } from "../service/api";
import { BookingContext } from "../contexts/BookingContext";

const BASE_GUESTS = 2;
const MAX_GUESTS = 4;
const EXTRA_GUEST_FEE = 50000;

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addBooking } = useContext(BookingContext);
  const place = location.state?.place;

  const today = new Date().toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState(location.state?.checkIn || today);
  const [checkOut, setCheckOut] = useState(location.state?.checkOut || today);
  const [guests, setGuests] = useState(location.state?.guests || BASE_GUESTS);
  const [overGuest, setOverGuest] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // 요금 상태
  const [nights, setNights] = useState(1);
  const [extraGuests, setExtraGuests] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const calculateNights = (inDate, outDate) => {
    if (!inDate || !outDate) return 0;
    const diffTime = new Date(outDate) - new Date(inDate);
    return diffTime > 0 ? diffTime / (1000 * 60 * 60 * 24) : 0;
  };

  const getMinCheckOut = () => {
    const date = new Date(checkIn);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (!place) navigate("/");
  }, [place, navigate]);

  // 요금 계산
  useEffect(() => {
    if (!place) return;

    const nightlyPrice =
      typeof place.price === "number"
        ? place.price
        : parseInt(place.price.replace(/[^0-9]/g, ""), 10);

    const nightsRaw = calculateNights(checkIn, checkOut);
    const newNights = nightsRaw > 0 ? nightsRaw : 1;

    const newExtraGuests = guests > BASE_GUESTS ? guests - BASE_GUESTS : 0;
    const newSubtotal = nightlyPrice * newNights + newExtraGuests * EXTRA_GUEST_FEE;
    const newTax = Math.floor(newSubtotal * 0.1);
    const newTotal = newSubtotal + newTax;

    setNights(newNights);
    setExtraGuests(newExtraGuests);
    setSubtotal(newSubtotal);
    setTax(newTax);
    setTotalPrice(newTotal);
  }, [checkIn, checkOut, guests, place]);

  const handleGuestsChange = (e) => {
    let value = Number(e.target.value);
    if (value < 1) value = 1;

    if (value > MAX_GUESTS) {
      setOverGuest(true);
      value = MAX_GUESTS;
      showToast(
        `⚠️ 최대 예약 가능 인원은 ${MAX_GUESTS}명입니다. (기본 ${BASE_GUESTS}명, 추가 인원당 ₩${EXTRA_GUEST_FEE.toLocaleString()})`
      );
    } else {
      setOverGuest(false);
    }
    setGuests(value);
  };

  const handlePayment = async () => {
    if (!place) return showToast("❌ 숙소 정보가 없습니다.");
    if (cardNumber.replace(/-/g, "").length !== 16)
      return showToast("❌ 카드 번호를 정확히 입력해주세요.");
    if (!/^\d{2}\/\d{2}$/.test(expiry))
      return showToast("❌ 유효기간을 MM/YY 형식으로 입력해주세요.");
    if (cvc.length !== 3)
      return showToast("❌ CVC 번호 3자리를 입력해주세요.");

    const bookingData = {
      place: place.title,
      img: place.img,
      checkin: checkIn,
      checkout: checkOut,
      guests,
      price: totalPrice,
      transactionId: "TX" + new Date().getTime(),
    };

    try {
      setLoading(true);
      await createReservation(bookingData);
      addBooking(bookingData);
      showToast("✅ 결제가 완료되었습니다!");
      navigate("/mypage");
    } catch (err) {
      console.error(err);
      showToast("❌ 결제 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      {place && (
        <div className="booking-app">
          <div className="booking-container">

            {/* 좌측 숙소 정보 */}
            <div className="booking-left">
              <img src={place.img} alt={place.title} className="booking-image" />

              <div className="place-description">
                <h3>{place.title}</h3>
                <p>⭐ {place.rating}</p>
                <p>입실/퇴실: 14:00 ~ 11:00</p>
                <p className="alert-text">⚠️ 주의사항: 애완동물 X, 요리 X</p>
                <p className="alert-text">
                  👥 기본 인원 {BASE_GUESTS}명, 추가 인원 1명당 ₩{EXTRA_GUEST_FEE.toLocaleString()}
                </p>
                <p>{place.description}</p>
              </div>

              <div className="date-guest-picker">
                <div className="date-picker">
                  <label>
                    체크인:
                    <input
                      type="date"
                      value={checkIn}
                      min={today}
                      onChange={(e) => setCheckIn(e.target.value)}
                    />
                  </label>
                  <label>
                    체크아웃:
                    <input
                      type="date"
                      value={checkOut}
                      min={getMinCheckOut()}
                      onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </label>
                </div>
                <div className="guest-picker">
                  <label>
                    인원:
                    <input
                      type="number"
                      min="1"
                      max={MAX_GUESTS}
                      value={guests}
                      onChange={handleGuestsChange}
                    />
                  </label>
                  {overGuest && (
                    <p className="alert-text">
                      추가 인원 1명당 ₩{EXTRA_GUEST_FEE.toLocaleString()} 추가
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 우측 결제 정보 */}
            <div className="booking-right">
              <div className="booking-ui">
                <h2>결제 정보</h2>
                <div className="summary-card">
                  <h3>여행 세부 정보</h3>
                  <p>{checkIn} ~ {checkOut}</p>
                  <p>성인 {guests}명</p>
                  <hr />
                  <h3>요금 세부 정보</h3>
                  <p>
                    {nights}박 × ₩{typeof place.price === "number"
                      ? place.price.toLocaleString()
                      : parseInt(place.price.replace(/[^0-9]/g, ""), 10).toLocaleString()}
                  </p>
                  {extraGuests > 0 && (
                    <p className="alert-text">
                      추가 인원 {extraGuests}명 × ₩{EXTRA_GUEST_FEE.toLocaleString()}
                    </p>
                  )}
                  <p>세금(10%): ₩{tax.toLocaleString()}</p>
                  <p><strong>총액: ₩{totalPrice.toLocaleString()}</strong></p>
                </div>

                <div className="payment-section">
                  <h3>카드 정보</h3>
                  {/* 카드 번호 */}
                  <input
                    type="text"
                    placeholder="카드 번호 (####-####-####-####)"
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(
                        e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1-")
                      )
                    }
                    maxLength={19}
                  />
                  {/* MM/YY 자동 슬래시 */}
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, ""); // 숫자만
                      if (value.length > 4) value = value.slice(0, 4);
                      if (value.length >= 3) value = value.slice(0, 2) + "/" + value.slice(2);
                      setExpiry(value);
                    }}
                    maxLength={5}
                  />
                  {/* CVC */}
                  <input
                    type="password"
                    placeholder="CVC"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
                    maxLength={3}
                  />
                  <div className="payment-buttons">
                    <button className="pay-btn" onClick={handlePayment} disabled={loading}>
                      {loading ? "결제 중..." : "결제하기"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
      {toastMsg && <div className="toast">{toastMsg}</div>}
      <Footer />
    </div>
  );
}

export default Booking;
