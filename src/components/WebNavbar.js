import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin : 0;
    padding: 0;
  }
`;

const Div = styled.div`
  height: 41px;
  flex-shrink: 0;
  background: #9D221A;
  display: flex;
  justify-content: center;
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
  font-family: IBM Plex Sans KR;
  font-size: 13px;
  font-style: normal;
  line-height: normal;
  color: ${(props) => (props.$active ? "#fff" : "#fff")};
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
`;

const Logout = styled.div`
  cursor: pointer;
  font-family: IBM Plex Sans KR;
  font-size: 13px;
  font-style: normal;
  line-height: normal;
  color: #fff;

  ${(props) =>
    props.active &&
    css`
      color: #fff;
      font-weight: bold;
    `}
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (!email) {
      alert("로그인 후 이용해주세요");
      navigate("/");
    }
  }, []);

  const onLogOutClick = () => {
    console.log("logout");
    alert("로그아웃 되었습니다.");
    localStorage.removeItem("email");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const moveToAttendance = () => {
    navigate("/attendance");
  };

  const moveToStudent = () => {
    // alert("서비스 준비 중입니다.");
    navigate("/student");
  };

  const moveToLecture = () => {
    // alert("서비스 준비 중입니다.");
    navigate("/lecture");
  };

  return (
    <Div>
      <GlobalStyle />
      <Container>
        <Menu onClick={moveToAttendance} $active={isActive("/attendance")}>
          출결관리
        </Menu>
        <Menu onClick={moveToStudent} $active={isActive("/student")}>
          학생관리
        </Menu>
        <Menu onClick={moveToLecture} $active={isActive("/lecture")}>
          수업관리
        </Menu>

        <Logout onClick={onLogOutClick}> 로그아웃</Logout>
      </Container>
    </Div>
  );
};

export default Navbar;
