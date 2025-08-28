import React, { useEffect, useRef } from "react";
import { useFavorites } from "../contexts/FavoriteContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/MyPage.css";

function Favorites({ isLoggedIn }) {
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const alerted = useRef(false);

  // 로그인 여부 확인
  useEffect(() => {
    if (!isLoggedIn && !alerted.current) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/login");
      alerted.current = true;
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  return (
    <div className={`mypage-container ${favorites.length === 0 ? "empty" : ""}`}>
      {favorites.length === 0 ? (
        <div className="empty-wrapper">
          <h2>찜 목록</h2>
          <p className="empty-message">
            찜한 숙소가 없습니다. <span role="img" aria-label="우는 얼굴">😢</span>
          </p>
        </div>
      ) : (
        <>
          <h2>찜 목록</h2>
          <div className="booking-list">
            {favorites.map((place) => (
              <div key={place.id} className="booking-card">
                <img src={place.img} alt={place.title} />
                <div className="booking-info">
                  <h3>{place.title}</h3>
                  <p>{place.price} · {place.nights}</p>
                  <p>⭐ {place.rating}</p>
                </div>
                <button
                  className="cancel-btn"
                  onClick={() => toggleFavorite(place)}
                >
                  찜 해제
                </button>
              </div>
            ))}
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}

export default Favorites;
