import React, { useState } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  /* margin: ${p => (p.size === 'small' ? `0.5em 0 0.2em 0` : `0`)}; */
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  h3 {
    margin: 0;
  }
`;

const Position = styled.div`
  display: flex;
  /* padding: 0.5px 0; */
`;
const DropDown = styled.select`
  display: block;
  border: none !important;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  padding: 0 0.8em 0 0.4em;
  width: 100%;
  border: 1px solid black;
  box-sizing: border-box;
  background: inherit;
  margin: 0;
  border-radius: 0.5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat, repeat;
  background-position: right 0 top 50%, 0 0;
  background-size: 0.65em auto, 100%;
  cursor: pointer;
  &:-ms-expand {
    display: none;
  }

  &:focus {
    outline: none;
  }

  &:last-child {
    margin-left: 0.6em;
  }

  option {
    font-weight: normal;
    font-size: 18px;
    text-transform: uppercase;
  }

  @media (max-width: 550px) {
    border: none !important;
    &:last-child {
      margin-left: 0;
    }
  }
`;

const DisplayNav = ({ title, options, handleSelect, selected, size }) => {
  const displayOptions = options.map(option => {
    return (
      <option key={option} value={option}>
        {option.toUpperCase()}
      </option>
    );
  });
  return (
    <Container>
      <Title>
        <h3 size={size}>{title}</h3>
      </Title>
      <Position>
        <DropDown onChange={handleSelect} defaultValue={selected}>
          {displayOptions}
        </DropDown>
      </Position>
    </Container>
  );
};

export default DisplayNav;