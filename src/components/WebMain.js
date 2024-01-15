import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useRecoilState } from "recoil";
import { serialNumberState } from "../recoil/atom";
// import { checkTokenValidity } from "../api/StudentApi";
const GlobalStyle = createGlobalStyle`
  body {
    margin : 0;
    padding: 0;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  overflow: auto;
`;
const Color = styled.div`
  width: 50vw;
  height: 100vh;
  flex-shrink: 0;
  background: #2d6f4c;
`;

const Texts = styled.div`
  float: right;
  margin-left: 146px;
  margin-top: 150px;
  flex-shrink: 0;
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
`;
const Login = styled.div`
  color: #000;
  font-family: IBM Plex Sans KR;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Content = styled.div`
  color: #000;
  font-family: IBM Plex Sans KR;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const Token = styled.div`
  color: #000;
  font-family: IBM Plex Sans KR;
  font-size: 30px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 70px;
`;

const Inputing = styled.input`
  margin-top: 12px;
  padding-left: 10px;
  width: 331px;
  height: 35px;
  flex-shrink: 0;
  stroke-width: 1px;
  stroke: #b5b5b5;
  font-family: IBM Plex Sans KR;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Button = styled.button`
  margin-top: 30px;
  display: flex;
  width: 349px;
  height: 45px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background: #2d6f4c;
  color: #fff;
  font-family: IBM Plex Sans KR;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border-radius: 3px;
`;
const Main = () => {
  const navigate = useNavigate();
  const [serialNumber, setSerialNumber] = useRecoilState(serialNumberState);
  
  const handleLogin = async () => {
    navigate("/student");
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
        <Color></Color>
        <Texts>
          <Login>양영학원</Login>
          <Button onClick={handleLogin}>Login</Button>
        </Texts>
      </Div>
    </>
  );
};
export default Main;
