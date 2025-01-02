import styled from "styled-components";

export const Page = styled.div`
  background: #ffe8e8;
  color: #366169;
  display: flex;
  flex-flow: column;
  font-family: "Futura", sans-serif;
  font-size: 1em;
`;

export const Button = styled.button`
  background: #54a4a6;
  color: #ffffff;
  font-family: "Futura", sans-serif;
  font-size: 0.9em;
  padding: 0.1em 0.75em;
  margin: 1px 1px 1px 1px;
  border: 2px solid #54a4a6;
  border-radius: 3px;
`;

export const Input = styled.input`
  margin: 0.25em;
`;

export const NavBar = styled.div`
  display: inline-block;
  width: 200px;
  background-color: #3c6d75;
  color: #ffffff;
  text-align: center;
  margin: 20px 20px 0 0;
  padding: 100px 0 100px 0;
  line-height: 2.5;
`;

export const UpperBar = styled.div`
  background-color: #3c6d75;
  width: 100%;
  height: 50px;
  text-align: center;
  text-indent: 1000px;
  padding: 50px 0 0 0;
`;

export const Footer = styled.div`
  background: #ff342f;
  color: #ffffff;
  padding: 1em;
  height: 30px;
  text-indent: 10px;
  margin: 20px 0 20px 0;
`;

export const linkStyle1 = {
  color: "#54A4A6",
};

export const linkStyle2 = {
  color: "#FF342F",
};

export const listStyle = {
  display: "flex",
  gap: "5px",
  margin: "10px 0px 10px 0px",
};

export const pstyle = {
  lineHeight: "80%",
  padding: "3px 0px 3px 0px ",
};

export const hstyle = {
  padding: "10px 0px 0px 0px ",
};

export const Table = styled.table`
  td {
    border: solid #54a4a6 1px;
    padding-right: 5px;
    padding-left: 5px;
  }
  ,
  th {
    color: #3c6d75;
  }
`;

export const Table2 = styled.table`
  td {
    padding-right: 5px;
    padding-left: 5px;
  }
  ,
  th {
    color: #3c6d75;
  }
`;

export const notificationStyle = {
  color: "white",
  background: "#54A4A6",
  fontSize: 16,
  borderRadius: 5,
  padding: 10,
  marginBottom: 20,
  marginTop: 20,
  marginRight: 800,
};

export const notificationStyleError = {
  color: "white",
  background: "#FF342F",
  fontSize: 16,
  borderRadius: 5,
  padding: 10,
  marginBottom: 20,
  marginTop: 20,
  marginRight: 800,
};
