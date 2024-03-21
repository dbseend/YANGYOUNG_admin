import styled from 'styled-components';

export const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ColumnCenterDiv = styled(ColumnDiv)`
  align-items: center;
  justify-content: center;
`;

export const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export const RowCenterDiv = styled(RowDiv)`
  align-items: center;
  justify-content: center;
`;

export const ListTable = styled.table`
  width: 80%;
  table-layout: fixed; 
  border-collapse: collapse;
`;

export const ListTh = styled.th`
  background-color: #f4f4f4;
  color: #333;
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
`;

export const ListTr = styled.tr`
  width: 100%;
  /* &:nth-child(even) {
    background-color: #f2f2f2;
  } */
`;

export const ListTd = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

export const Button = styled.button`
  width: 80px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 6px;
  background: #000;
  color: #fff;
  font-family: Poppins;
  font-size: 15px;
  font-style: normal;
  line-height: normal;
  cursor: pointer;
  border: none;
`;
