// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/Login.css";

function Login({ setIsLoggedIn }) { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();

    // 임시 로그인 검증
    if (email === "test@test.com" && password === "1234") {
      alert("로그인 성공!");
      setIsLoggedIn(true); 
      navigate("/");       
    } else {
      alert("이메일 또는 비밀번호가 잘못되었습니다.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>로그인</h2>
        <form onSubmit={handleLogin}>
          <label>
            이메일
            <input
              type="email"
              placeholder="이메일 입력"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            비밀번호
            <input
              type="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">로그인</button>
        </form>

        {/* 회원가입 버튼 */}
        <p className="signup-link">
          계정이 없으신가요?{" "}
          <span onClick={() => navigate("/signup")}>회원가입</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
