import styled from 'styled-components'

export const Page = styled.div`
  background: #FFE8E8;
  display: flex; 
  flex-flow: column;
`;

export const Button = styled.button`
  background:#54A4A6;
  color: #FFFFFF;
  font-size: 0.9em;
  margin: 0.5em 0.1em;
  padding: 0.25em 0.75em;
  border: 5px solid #54A4A6;
  border-radius: 3px;
`;

export const NavBar = styled.div`
    display: inline-block;
    width: 250px;
    height: 500px;
    background-color: #3C6D75;
    text-align: center;
    top: 0;
    left: 0;
`;

export const UpperBar = styled.div`
    background-color: #3C6D75;
    position: relative;
    width: 1000px;
    height: 100%;
    text-align: right;
    left: 2 px;
    padding: 1em;

   
`;