// src/contexts/FavoriteContext.js
import React, { createContext, useState, useContext } from "react";

// Context 생성
const FavoriteContext = createContext();

// Provider 컴포넌트
export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // 찜 추가/삭제 (토글 방식)
  const toggleFavorite = (place) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p.id === place.id);
      if (exists) {
        // 이미 있으면 제거
        return prev.filter((p) => p.id !== place.id);
      } else {
        // 없으면 추가
        return [...prev, place];
      }
    });
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

// Context 사용 훅
export function useFavorites() {
  return useContext(FavoriteContext);
}
