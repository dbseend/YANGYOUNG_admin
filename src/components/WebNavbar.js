import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

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
  border-bottom: 1px solid ${(props) => (props.$scrolled ? "#7f8c8d" : "transparent")};
  transition: border-color 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
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

  const isActive = (path) => location.pathname === path;

  const moveTo = (path) => {
    navigate(path);
  };

  return (
    <div>
      <GlobalStyle />
      <NavbarContainer $scrolled={isScrolled}>
        <Logo>양영학원 고등부</Logo>
        <MenuList>
          <MenuItem>
            <NavLink href="#" onClick={() => moveTo("/attendance")} isActive={isActive("/attendance")}>
              출결관리
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink href="#" onClick={() => moveTo("/student")} isActive={isActive("/student")}>
              학생관리
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink href="#" onClick={() => moveTo("/lecture")} isActive={isActive("/lecture")}>
              수업관리
            </NavLink>
          </MenuItem>
        </MenuList>
        <LogoutButton onClick={onLogOutClick}>로그아웃</LogoutButton>
      </NavbarContainer>
    </div>
  );
};

export default Navbar;
