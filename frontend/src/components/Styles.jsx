import styled from 'styled-components'

export const Page = styled.div`
  background: #FFE8E8;
  color: #366169;
  display: flex; 
  flex-flow: column;
  font-family: 'Futura', sans-serif;
  font-size: 1em;
`;

export const Button = styled.button`
  background:#54A4A6;
  color: #FFFFFF;
  font-family: 'Futura', sans-serif;
  font-size: 1em;
  padding: 0.1em 0.75em;
  margin: 0.1em 0.2em;
  border: 2px solid #54A4A6;
  border-radius: 3px;
`;

export const Input = styled.input`
  margin: 0.25em;
`

export const NavBar = styled.div`
  display: inline-block;
  width: 200px;
  height: 500px;
  background-color: #3C6D75;
  color:  #FFFFFF;
  text-align: center;
  margin: 20px 20px 20px 0 ;
  padding: 100px 0 0 0 ;
  line-height: 2.5;
`;

export const UpperBar = styled.div`
  background-color: #3C6D75;
  width: 100%;
  height: 50px;
  text-align: center;
  text-indent: 1000px;
  padding: 50px 0 0 0 ;
`;

export const Footer = styled.div`
  background: #FF342F;
  color:  #FFFFFF;
  padding: 1em;
  height: 30px;
  text-indent: 10px;
  margin: 20px 0 20px 0 ;
`

export const linkStyle1 = {
  color: "#54A4A6"
}

export const linkStyle2 = {
  color: "#FF342F"
}

export const listStyle= {
  display: 'flex',
  gap: '5px'
}