import React, { useState } from "react";
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
  background: #2d6f4c;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddSt = () => {
  return (
    <Div>
      <GlobalStyle />
      helloworld
    </Div>
  );
};

export default AddSt;
