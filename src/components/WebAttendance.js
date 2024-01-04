import React, { useState } from "react";
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

const Attendance = () => {
  const [date, setDate] = useState("");
  const changeDate = (e) =>{
    setDate(e.target.value);
    console.log(e.target.value);
  }
    return (
      <>
        <GlobalStyle />
        <Div>
            <div>날짜를 선택하세요</div>
            <input type = "date" onChange={changeDate}></input>
            <div>{date}</div>
        </Div>
      </>
    );
  };
  export default Attendance;
  