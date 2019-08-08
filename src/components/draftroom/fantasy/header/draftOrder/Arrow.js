import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  width: 80px;
  margin-left: ${p => p.distance * 80 + 'px'};
  box-sizing: border-box;
  flex-basis: 40%;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ArrowWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const ArrowBase = styled.span`
  width: 45px;
  height: 10px;
  background: red;
  align-self: center;
`;

const LeftArrow = styled.div`
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-right: 15px solid red;
  border-bottom: 10px solid transparent;
`;

const RightArrow = styled.div`
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-left: 15px solid red;
  border-bottom: 10px solid transparent;
`;

const Arrow = ({ direction, distance }) => {
  return direction === 'right' ? (
    <Container distance={distance}>
      <ArrowBase />
      <RightArrow />
    </Container>
  ) : (
    <Container distance={distance}>
      <LeftArrow />
      <ArrowBase />
    </Container>
  );
};
export default Arrow;
