import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useRecoilState } from "recoil";
import { serialNumberState } from "../recoil/atom";

const GlobalStyle = createGlobalStyle`
  body {
    margin : 0;
    padding: 0;
  }
  `;
const Div = styled.div`
  height: 41px;
  flex-shrink: 0;
  background: #2d6f4c;
  display: flex;
  justify-content: center;
  flex-direction: center;
  align-items: center;
`;

const Container = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: row;
  gap: 40px;
  flex-shrink: 0;
`;
const Menu = styled.div`
  cursor: pointer;

  color: #fff;
  font-family: IBM Plex Sans KR;
  font-size: 13px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const Logout = styled.div`
  color: #fff;
  font-family: IBM Plex Sans KR;
  font-size: 13px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;
const Navbar = () => {
  const navigate = useNavigate();

  const onLogOutClick = () => {
    console.log("logout");
    alert("로그아웃 되었습니다.");
  };

  const moveToAttendence = () => {
    navigate("/attendence");
  };
  const moveToMeet = () => {
    navigate("/client/meet");
  };
  const moveToMyPage = () => {
    navigate("/client/mypage");
  };
  return (
    <Div>
      <GlobalStyle />
      <Container>
        <Menu onClick={moveToAttendence}>출결관리</Menu>
        <Menu onClick={moveToMeet}>학생관리</Menu>
        <Menu onClick={moveToMyPage}>수업관리</Menu>
        <Logout onClick={onLogOutClick}> 로그아웃</Logout>
      </Container>
    </Div>
  );
};

export default Navbar;
