import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useRecoilState } from "recoil";
import { serialNumberState } from "../recoil/atom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../fbase";
import Login from "../assets/LoginImage.svg";
const GlobalStyle = createGlobalStyle`
  body {
    margin : 0;
    padding: 0;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  overflow: auto;
<<<<<<< HEAD
`;
const Color = styled.div`
  width: 50vw;
  height: 100vh;
  flex-shrink: 0;
  background: #9D221A;
=======
  align-items: center;
  justify-content: center;
  text-align: center;
>>>>>>> main
`;

const Container = styled.div`
  margin-top: 133px;
`;
const Head = styled.div`
  justify-content: center;
  margin-bottom: 40px;
`;
const Title = styled.div`
  color: #000;
  font-family: Poppins;
  font-size: 70px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 15px;
`;

const SubT = styled.div`
  color: #000;
  font-family: Poppins;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Button = styled.button`
  width: 287px;
  height: 51.933px;
  flex-shrink: 0;
  border-radius: 6px;
  background: #000;
  color: #fff;
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const Main = () => {
  const navigate = useNavigate();
  const [serialNumber, setSerialNumber] = useRecoilState(serialNumberState);

  const handleLogin = async () => {
    try {
      // const auth = getAuth();
      const provider = new GoogleAuthProvider(); // provider를 구글로 설정
      await signInWithPopup(auth, provider); // popup을 이용한 signup
      const user = auth.currentUser;
      console.log("유저 ", user);

      // if (user.email === "black.princeee@gmail.com") {
<<<<<<< HEAD
        localStorage.setItem("email", user.email);
        navigate("/attendance");
=======
      localStorage.setItem("email", user.email);
      navigate("/attendance");
>>>>>>> main
      // } else {
      //   alert("허용되지 않은 이메일입니다");
      // }
    } catch (error) {
      console.error("Google 로그인 에러:", error);
    }
  };

  const handleInputChange = (e) => {
    setSerialNumber(e.target.value);
  };
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log(serialNumber);
      handleLogin();
    }
  };
  return (
    <>
      <GlobalStyle />
      <Div>
        <Container>
          <Head>
            <Title>양영학원 고등부 영어과</Title>
            <SubT>지정된 이메일로 로그인하세요.</SubT>
          </Head>
          <Button onClick={handleLogin}>Login</Button>
        </Container>
        <img src={Login} />
      </Div>
    </>
  );
};
export default Main;
