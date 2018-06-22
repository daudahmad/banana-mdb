import React, { Component } from "react";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
`;

const FixedHeader = styled.header`
  background-color: #222;
  height: 100px;
  padding: 20px;
  color: white;
  overflow: hidden;
  background-color: #333;
  position: fixed; 
  top: 0; 
  width: 100%;
  z-index: 1000;
`;

function Header({title}) {
  return (
    <FixedHeader>
      <Title>{title}</Title>
    </FixedHeader>
  );
}

export default Header;