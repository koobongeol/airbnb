// src/components/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { useFavorites } from "../contexts/FavoriteContext";

function Header({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  // 로고 클릭: 홈 이동 + Home 초기화 이벤트 발생
  const handleLogoClick = () => {
    navigate("/");
    window.dispatchEvent(new Event("resetHomeSearch"));
  };

  // 로그인/로그아웃
  const handleLoginClick = () => navigate("/login");
  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    alert("로그아웃 완료!");
    navigate("/");
  };

  // 마이페이지 이동
  const handleMyPageClick = () => {
    if (isLoggedIn) navigate("/mypage");
    else {
      alert("로그인 후 이용 가능합니다.");
      navigate("/login");
    }
  };

  // 찜목록 이동
  const handleFavoritesClick = () => navigate("/favorites");

  return (
    <header className="header">
      <div className="logo" onClick={handleLogoClick}>
        JOEN
      </div>

      <nav className="nav">
        <span className="favorites-btn" onClick={handleFavoritesClick}>
          찜
          {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
        </span>

        <span onClick={isLoggedIn ? handleLogoutClick : handleLoginClick}>
          {isLoggedIn ? "로그아웃" : "로그인"}
        </span>

        <span onClick={handleMyPageClick}>마이페이지</span>
      </nav>
    </header>
  );
}

export default Header;
