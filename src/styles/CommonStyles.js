import styled from "styled-components";

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
  width: 90%;
  table-layout: fixed;
  border-collapse: collapse;
  margin-top: 10px;
`;

export const ListTh = styled.th`
  background-color: #f4f4f4;
  color: #333;
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
`;

export const ListTr = styled.tr`
  /* width: 100%; */
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

export const Title = styled.div`
  color: #000;
  font-family: Poppins;
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 10px;
`;

export const SubTitle = styled.div`
  color: #000;
  font-family: Poppins;
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 10px;
  margin-top: 25px;
`;

export const UpdateAndDeleteButton = styled.div`
  padding-right: 10%;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const DateInput = styled.input`
  width: 250px;
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  margin-top: 20px;
  table-layout: fixed;
  width: 100%;
`;

export const StyledTh = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  background-color: #dfdfdf;
`;

export const StyledTd = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  align-items: center;
`;

export const StyledTr = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
`;

export const Th = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  background-color: #dfdfdf;
`;

export const Td = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
`;

export const Tr = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
