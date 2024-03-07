import React from "react";
import styled from "styled-components";

const NotFound = () => {
  return (
    <Wrapper>
      <h1>매일매일 성장하는 개발자들</h1>
      <h2>한동대학교 22학번 웹 개발 왕 김예은</h2>
      <h2>왕 밑에서 열심히 배우는 윤성현</h2>
    </Wrapper>
  );
};
// 중앙 가로 정렬
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default NotFound;
