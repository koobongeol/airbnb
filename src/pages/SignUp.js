// src/pages/SignUp.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css"; // 스타일 별도 파일

function SignUp({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // TODO: 실제 회원가입 API 연동 가능
    alert(`${username}님, 회원가입이 완료되었습니다!`);
    setIsLoggedIn(true); // 회원가입 후 바로 로그인 처리
    navigate("/"); // 메인 페이지로 이동
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="이름"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <button type="submit">회원가입</button>
      </form>
      <p className="login-link">
        이미 계정이 있으신가요? <span onClick={() => navigate("/login")}>로그인</span>
      </p>
    </div>
  );
}

export default SignUp;
