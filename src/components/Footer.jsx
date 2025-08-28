// src/components/Footer.js
import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-lang-currency">
          <span>🌐 한국어 (KR)</span>
          <span>₩ KRW</span>
        </div>
        <div className="footer-social-icons">
          <a href="#">📘</a>
          <a href="#">❌</a>
          <a href="#">📸</a>
          <a href="#">💬</a>
          <a href="#">🎥</a>
        </div>
      </div>
      <div className="footer-middle">
        © 2025 JOEUN, Inc. · 개인정보 처리방침 · 쿠키 정책 · 이용약관 · 사이트맵
      </div>
      <div className="footer-bottom">
        <p>
          웹사이트 제공자: JOEUN KOREA INCHEON...<br />
          IVAT 번호: 11110 | 사업자 등록 번호: AE0505
        </p>
      </div>
    </footer>
  );
}

export default Footer;
