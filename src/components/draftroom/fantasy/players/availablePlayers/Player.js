import React from 'react';
import styled from '@emotion/styled';

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5em 0;
  border: 1px solid #dcdcdc;
  border-bottom: none;
  width: 100%;
  min-height: 35px;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background: #6c757d;
    color: #fff;
  }
  &:first-of-type {
    border-top: none;
  }
`;

const Field = styled.div`
  width: 60px;
`;

const NumField = styled(Field)``;

const PlayerField = styled(Field)`
  width: 200px;
`;

const handleClick = id => {
  clickPlayer(id);
};
const Player = ({ rank, player, clickPlayer }) => {
  return (
    <Row onClick={() => handleClick(player.id)}>
      <NumField>{rank}</NumField>
      <PlayerField>{player.Player}</PlayerField>
      <Field>{player.Position}</Field>
      <Field>{player.Team}</Field>
      <NumField>{player.Bye}</NumField>
      <NumField>{player.OverallRank}</NumField>
    </Row>
  );
};

export default Player;
