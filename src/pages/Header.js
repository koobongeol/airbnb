// src/components/Header.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../contexts/FavoriteContext"; // 찜 Context

function Header({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const { favorites } = useFavorites(); // 찜 목록 가져오기

  const handleLogoClick = () => navigate("/");
  const handleLoginClick = () => navigate("/login");

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    alert("로그아웃 성공!");
    navigate("/");
  };

  const handleMyPageClick = () => {
    if (isLoggedIn) navigate("/mypage");
    else alert("로그인 후 이용 가능합니다.");
  };

  const handleFavoritesClick = () => {
    navigate("/favorites"); // 찜목록 페이지로 이동
  };

  return (
    <header style={{
      padding: "10px 20px",
      borderBottom: "1px solid #ccc",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <h1 style={{ cursor: "pointer" }} onClick={handleLogoClick}>
        Airbnb
      </h1>

      <nav>
        <button
          style={{
            marginRight: "10px",
            padding: "6px 12px",
            borderRadius: "6px",
            border: "1px solid #03cbf8",
            backgroundColor: "#fff",
            cursor: "pointer"
          }}
          onClick={isLoggedIn ? handleLogoutClick : handleLoginClick}
        >
          {isLoggedIn ? "로그아웃" : "로그인"}
        </button>

        <button
          style={{
            marginRight: "10px",
            padding: "6px 12px",
            borderRadius: "6px",
            border: "1px solid #03cbf8",
            backgroundColor: "#fff",
            cursor: "pointer"
          }}
          onClick={handleMyPageClick}
        >
          마이페이지
        </button>

        <button
          style={{
            padding: "6px 12px",
            borderRadius: "6px",
            border: "1px solid #03cbf8",
            backgroundColor: "#fff",
            cursor: "pointer",
            position: "relative"
          }}
          onClick={handleFavoritesClick}
        >
          찜목록
          {favorites.length > 0 && (
            <span style={{
              position: "absolute",
              top: "-6px",
              right: "-6px",
              backgroundColor: "red",
              color: "white",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "12px"
            }}>
              {favorites.length}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
}

export default Header;
