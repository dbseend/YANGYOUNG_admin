import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  const navigate = useNavigate();
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

  const onRefreshClick = () => {
    window.location.reload(true);
  };

  return (
    <div>
    <NavbarContainer $scrolled={isScrolled}>
      <Logo onClick={onRefreshClick}>양영학원 고등부</Logo>
      <MenuList>
        <MenuItem id={'attendance'} value={'출결관리'} />
        <MenuItem id={'student'} value={'학생관리'} />
        <MenuItem id={'lecture'} value={'수업관리'} />
        <MenuItem id={'section'} value={'분반관리'} />
        <LogoutButton onClick={onLogOutClick}>로그아웃</LogoutButton>
      </MenuList>
    </NavbarContainer>
    <Outlet />
    </div>
  );
};

const MenuItem = ({ id, value }) => {
  const activeStyle = {
    fontWeight: "bold",
  };

  const defaultStyle = {
    textDecoration: "none",
    fontSize: 13,
    color: 'black',
    transition: "color 0.3s ease",
    minWidth: 70,
  };

  return (
    <NavLink
      to={`/${id}`}
      style={({ isActive }) => (isActive ? {...defaultStyle, ...activeStyle} : defaultStyle)}
    >{value}</NavLink>
  );
};

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  width: 100vw;
  height: 3%;
  padding: 10px;
  z-index: 1000;
  border-bottom: 1px solid
    ${(props) => (props.$scrolled ? "#7f8c8d" : "transparent")};
  transition: border-color 0.3s ease;
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 18px;
  color: black;
  font-weight: bold;
  margin-left: 3%;
  min-width: 70px;
  cursor: pointer;
  font-family: "Poppins";
`;

const MenuList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1%;
  flex-grow: 1;
  margin-right: 5%;
`;

const LogoutButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  padding: 2px 7px 2px 7px;
  line-height: 27px;
  font-size: 13px;
  font-weight: normal;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.3s ease;
  height: 31px;
  &:hover {
    background-color: #2c3e50;
  }
  min-width: 60px;
`;

export default Navbar;
