// src/App.js
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { BookingProvider } from "./contexts/BookingContext";
import { FavoriteProvider } from "./contexts/FavoriteContext";

import Header from "./components/Header";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
import Favorites from "./pages/Favorite"; // 찜 목록

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 부산 숙소
  const busanPlaces = [
    { id: 1, title: "부산의 광안리", price: "₩178,000", rating: "5.0", img: "/images/해운대.jpg", description: "광안리 해수욕장 근처 숙소" },
    { id: 2, title: "부산의 해운대", price: "₩203,130", rating: "4.96", img: "/images/오션뷰.jpg", description: "해운대 바닷가 바로 앞 숙소" },
    { id: 3, title: "부산의 해운대2", price: "₩235,082", rating: "4.92", img: "/images/해운대2.jpg", description: "모던한 인테리어, 가족 여행 적합" },
    { id: 4, title: "가평", price: "₩197,000", rating: "4.92", img: "/images/가평.jpg", description: "풍경이 좋은 감성 숙소" },
    { id: 5, title: "경주", price: "₩210,000", rating: "4.87", img: "/images/경주.jpg", description: "한옥 스타일과 잘 어울리는 감성 숙소" },
  ];

  // 기타 지역 숙소
  const otherPlaces = [
    { id: 101, title: "강릉의 숙소", price: "₩220,000", rating: "4.85", img: "/images/한옥.jpg", description: "전통 한옥 스타일 숙소" },
    { id: 102, title: "제주도 숙소", price: "₩190,000", rating: "4.9", img: "/images/감성 숙소.jpg", description: "자연과 어우러진 감성 숙소" },
    { id: 103, title: "속초", price: "₩184,000", rating: "4.78", img: "/images/속초.jpg", description: "자연을 한눈에 볼 수 있는 감성 숙소" },
    { id: 104, title: "제주도 서귀포", price: "₩172,000", rating: "4.68", img: "/images/제주도 서귀포.jpg", description: "산과 잘 어울리는 감성 숙소" },
  ];

  return (
    <BookingProvider>
      <FavoriteProvider>
        {/* Header에 로그인 상태 전달 */}
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <Routes>
          {/* 홈 페이지 */}
          <Route 
            path="/" 
            element={
              <Home 
                busanPlaces={busanPlaces} 
                otherPlaces={otherPlaces} 
                isLoggedIn={isLoggedIn} // ✅ 로그인 상태 전달
              />
            } 
          />

          {/* 예약 페이지 */}
          <Route path="/booking" element={<Booking />} />

          {/* 로그인 / 회원가입 */}
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />

          {/* 마이페이지 */}
          <Route path="/mypage" element={<MyPage />} />

          {/* 찜 목록 */}
          <Route path="/favorites" element={<Favorites isLoggedIn={isLoggedIn} />} />
        </Routes>
      </FavoriteProvider>
    </BookingProvider>
  );
}

export default App;
