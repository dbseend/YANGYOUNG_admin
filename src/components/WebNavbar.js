import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
<<<<<<< HEAD
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
=======
import styled, { createGlobalStyle } from "styled-components";
>>>>>>> main

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (!email) {
      alert("로그인 후 이용해주세요");
      navigate("/");
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollThreshold = 100;

      setIsScrolled(scrollTop > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navigate]);

  const onLogOutClick = () => {
    alert("로그아웃 되었습니다.");
    localStorage.removeItem("email");
    navigate("/");
  };

  const isactive = (path) => location.pathname === path;

<<<<<<< HEAD
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
=======
  const moveTo = (path) => {
    navigate(path);
>>>>>>> main
  };

  return (
    <div>
      <GlobalStyle />
      <NavbarContainer $scrolled={isScrolled}>
        <Logo>양영학원 고등부</Logo>
        <MenuList>
          <MenuItem>
            <NavLink
              href="#"
              onClick={() => moveTo("/attendance")}
              isactive={isactive("/attendance").toString()}
            >
              출결관리
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              href="#"
              onClick={() => moveTo("/student")}
              isactive={isactive("/student").toString()}
            >
              학생관리
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              href="#"
              onClick={() => moveTo("/lecture")}
              isactive={isactive("/lecture").toString()}
            >
              수업관리
            </NavLink>
          </MenuItem>
        </MenuList>
        <LogoutButton onClick={onLogOutClick}>로그아웃</LogoutButton>
      </NavbarContainer>
    </div>
  );
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
  }
`;

const NavbarContainer = styled.div`
  background-color: white;
  padding: 10px;
  z-index: 1000;
  border-bottom: 1px solid
    ${(props) => (props.$scrolled ? "#7f8c8d" : "transparent")};
  transition: border-color 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  /* 스크롤 내릴 때 고정 */
  position: fixed;
  top: 0;
  width: 100%;
`;


const Logo = styled.div`
  font-size: 24px;
  color: black;
  font-weight: bold;
  margin-left: 40px;
`;

const MenuList = styled.ul`
  list-style: none;
  display: flex;
  margin-right: 40px;
  padding: 0;
  justify-content: flex-end;
  flex-grow: 1;
`;

const MenuItem = styled.li`
  margin-left: 40px;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: black;
  font-size: 16px;
  font-weight: ${(props) => (props.isactive === "true" ? "bold" : "normal")};
  transition: color 0.3s ease;

  &:hover {
    color: #3498db;
  }
`;

const LogoutButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  padding: 8px 12px;
  font-size: 16px;
  font-weight: normal;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.3s ease;
  margin-right: 40px;
  &:hover {
    background-color: #2c3e50;
  }
`;

export default Navbar;
