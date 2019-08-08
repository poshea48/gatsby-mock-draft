import React, { useReducer, useEffect } from 'react';
import styled from '@emotion/styled';

const PlayersTable = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-x: scroll;
  /* border-bottom: 1px solid #dcdcdc;
  border-left: 1px solid #dcdcdc;
  border-right: 1px solid #dcdcdc; */
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
`;

const PlayerRow = styled(Row)`
  padding: 0.5em 0;
  min-height: 35px;
  cursor: pointer;
  &:hover {
    background: #6c757d;
    color: #fff;
  }
  &:first-of-type {
    border-top: none;
  }
`;

const TableHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 0.2em 0.3em 0.2em;
`;

const TableData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #dcdcdc;

  flex: 0 1 auto;
  height: -moz-calc(100vh - 376px);
  height: -webkit-calc(100vh - 376px);
  height: calc(100vh - 376px);

  overflow-y: scroll;
  overflow-x: hidden;
  border-top: 1px solid #dcdcdc;

  @media (max-width: 650px) {
    height: calc(100vh - 402px);
  }
`;

const Field = styled.div`
  flex-basis: 10%;
`;

const PlayerField = styled(Field)`
  flex-basis: 35%;
`;

const RankField = styled(Field)`
  text-align: center;
`;

const Players = ({ players, draftPlayer }) => {
  const handleClick = e => {
    e.preventDefault();
    draftPlayer(e.currentTarget.dataset.player_id);
  };
  console.log('Players rendered');
  const availablePlayers = players
    ? players.map((player, i) => (
        <PlayerRow
          key={player.id}
          onClick={handleClick}
          data-player_id={player.id}
        >
          <RankField>{i + 1}</RankField>
          <PlayerField>{player.Player}</PlayerField>
          <Field>{player.Position}</Field>
          <Field>{player.Team}</Field>
          <Field>{player.Bye}</Field>
          <RankField>{player.OverallRank}</RankField>
        </PlayerRow>
      ))
    : [];
  return (
    <PlayersTable>
      <TableHeader>
        <Row>
          <RankField>Rank</RankField>
          <PlayerField>Player</PlayerField>
          <Field>Pos</Field>
          <Field>Team</Field>
          <Field>Bye</Field>
          <RankField>Overall</RankField>
        </Row>
      </TableHeader>
      <TableData>{availablePlayers}</TableData>
    </PlayersTable>
  );
};

export default Players;
