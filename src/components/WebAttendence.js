import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import {useRecoilState} from "recoil";
import { serialNumberState } from "../recoil/atom";
import { checkTokenValidity } from "../api/AdminApi";
import Navbar from "./WebNavbar";

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
  overflow: hidden;
`;

const Attendence = () => {
    const navigate = useNavigate();
    const [serialNumber, setSerialNumber] = useRecoilState(serialNumberState);
  
    return (
      <>
        <GlobalStyle />
        <Div>
            <div>날짜를 선택하세요</div>
            <input type = "date"></input>
            
        </Div>
      </>
    );
  };
  export default Attendence;
  