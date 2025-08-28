import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/Home.css";
import { useFavorites } from "../contexts/FavoriteContext";

function Home({ busanPlaces = [], otherPlaces = [], isLoggedIn }) {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();

  const today = new Date();
  const defaultCheckIn = today.toISOString().split("T")[0];
  const defaultCheckOutDate = new Date(today);
  defaultCheckOutDate.setDate(today.getDate() + 2);
  const defaultCheckOut = defaultCheckOutDate.toISOString().split("T")[0];

  const [searchTerm, setSearchTerm] = useState("");
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [filteredBusanPlaces, setFilteredBusanPlaces] = useState(busanPlaces);
  const [filteredOtherPlaces, setFilteredOtherPlaces] = useState(otherPlaces);

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getMonth() + 1}월 ${d.getDate()}일`;
  };
  const dateRange = `${formatDate(checkIn)} ~ ${formatDate(checkOut)}`;

  // 체크인/체크아웃 변경
  const handleCheckInChange = (e) => {
    const newCheckIn = e.target.value;
    setCheckIn(newCheckIn);

    const checkInDate = new Date(newCheckIn);
    const checkOutDate = new Date(checkOut);
    const minCheckOutDate = new Date(checkInDate);
    minCheckOutDate.setDate(minCheckOutDate.getDate() + 1);

    if (checkOutDate <= checkInDate) {
      setCheckOut(minCheckOutDate.toISOString().split("T")[0]);
    }
  };
  const handleCheckOutChange = (e) => setCheckOut(e.target.value);

  // 검색 실행
  const handleSearch = () => {
    if (guests > 4) {
      alert("최대 인원은 4명까지 가능합니다.");
      return;
    }

    const resultsBusan = busanPlaces.filter((place) =>
      place.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const resultsOther = otherPlaces.filter((place) =>
      place.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredBusanPlaces(resultsBusan);
    setFilteredOtherPlaces(resultsOther);

    if (resultsBusan.length === 0 && resultsOther.length === 0) {
      alert("조건에 맞는 숙소가 없습니다.");
    } else {
      alert(`검색 적용됨: 게스트 ${guests}명, ${dateRange}`);
    }
  };

  const busanRef = useRef();
  const otherRef = useRef();
  const scrollLeft = (ref) => (ref.current.scrollLeft -= 304);
  const scrollRight = (ref) => (ref.current.scrollLeft += 304);

  const renderPlaceCard = (place) => {
    const isFav = favorites.some((p) => p.id === place.id);
    return (
      <div
        key={place.id}
        className="place-card"
        onClick={() =>
          navigate("/booking", { state: { place, checkIn, checkOut, guests } })
        }
      >
        <img src={place.img} alt={place.title} />
        <div className="place-info">
          <h3>
            {place.title}
            <span
              className={`heart ${isFav ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                if (!isLoggedIn) {
                  alert("로그인 후 이용 가능합니다.");
                  navigate("/login");
                  return;
                }
                toggleFavorite(place);
              }}
            >
              ♥
            </span>
          </h3>
          <p>{dateRange}</p>
          <p>기본가 {place.price.toLocaleString()}원 / 1박</p>
          <p>⭐ {place.rating}</p>
        </div>
      </div>
    );
  };

  // 로고 클릭 시 초기화 이벤트 수신
  useEffect(() => {
    const resetHandler = () => {
      setSearchTerm("");
      setGuests(2);
      setCheckIn(defaultCheckIn);
      setCheckOut(defaultCheckOut);
      setFilteredBusanPlaces(busanPlaces);
      setFilteredOtherPlaces(otherPlaces);
    };
    window.addEventListener("resetHomeSearch", resetHandler);
    return () => window.removeEventListener("resetHomeSearch", resetHandler);
  }, [busanPlaces, otherPlaces]);

  return (
    <div className="app">
      {/* 검색 바 */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="여행지 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input type="date" value={checkIn} onChange={handleCheckInChange} min={defaultCheckIn} />
        <input
          type="date"
          value={checkOut}
          onChange={handleCheckOutChange}
          min={new Date(new Date(checkIn).setDate(new Date(checkIn).getDate() + 1))
            .toISOString()
            .split("T")[0]}
        />
        <input
          type="number"
          min="1"
          max="4"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          placeholder="게스트 수"
        />
        <button onClick={handleSearch}>🔍</button>
      </div>

      {/* 부산 인기 숙소 */}
      <section className="place-section">
        <h2>가장 검색이 많은 숙소</h2>
        <div className="slider-wrapper">
          <button className="slide-btn left" onClick={() => scrollLeft(busanRef)}>‹</button>
          <div className="place-list" ref={busanRef}>
            {filteredBusanPlaces.length > 0
              ? filteredBusanPlaces.map(renderPlaceCard)
              : <div className="no-results">검색 결과가 없습니다.</div>}
          </div>
          <button className="slide-btn right" onClick={() => scrollRight(busanRef)}>›</button>
        </div>
      </section>

      {/* 다른 지역 인기 숙소 */}
      <section className="place-section">
        <h2>다른 지역 인기 숙소</h2>
        <div className="slider-wrapper">
          <button className="slide-btn left" onClick={() => scrollLeft(otherRef)}>‹</button>
          <div className="place-list" ref={otherRef}>
            {filteredOtherPlaces.length > 0
              ? filteredOtherPlaces.map(renderPlaceCard)
              : <div className="no-results">검색 결과가 없습니다.</div>}
          </div>
          <button className="slide-btn right" onClick={() => scrollRight(otherRef)}>›</button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
