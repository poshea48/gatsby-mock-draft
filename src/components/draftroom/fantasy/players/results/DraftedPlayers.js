import React, { useReducer, useEffect } from 'react';
import styled from '@emotion/styled';

const PlayersTable = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-x: scroll;
  border: 1px solid #dcdcdc;
  box-sizing: border-box;
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
  padding: 0.4em 0;
`;

const TableData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* border: 1px solid #dcdcdc; */

  flex: 0 1 auto;
  height: -moz-calc(100vh - 404px);
  height: -webkit-calc(100vh - 404px);
  height: calc(100vh - 404px);

  overflow-y: scroll;
  overflow-x: hidden;
  border-top: 1px solid #dcdcdc;

  @media (max-width: 650px) {
    height: calc(100vh - 402px);
  }
`;

const Field = styled.div`
  flex-basis: 10%;
  font-size: 12px;
`;

const PlayerField = styled(Field)`
  flex-basis: 35%;
`;

const EmptyField = styled(Field)`
  flex-basis: 90%;
  text-align: center;
`;

const RankField = styled(Field)`
  text-align: center;
`;

const DraftedPlayers = ({ starters, bench }) => {
  const displayPlayers = (starters, bench) => {
    let key;
    let startersDisplay = Object.keys(starters).map((pos, i) => {
      return starters[pos].map((player, j) => {
        key = player === 'EMPTY' ? `empty-${j}-${i}` : player.id;
        return player === 'EMPTY' ? (
          <PlayerRow key={key}>
            <RankField>{pos}</RankField>
            <EmptyField>--EMPTY--</EmptyField>
          </PlayerRow>
        ) : (
          <PlayerRow key={key}>
            <RankField>{pos}</RankField>
            <PlayerField>{player.Player}</PlayerField>
            <Field>{player.Position}</Field>
            <Field>{player.Team}</Field>
            <Field>{player.Bye}</Field>
          </PlayerRow>
        );
      });
    });

    let benchDisplay = bench.map((player, i) => {
      key = player === 'EMPTY' ? `empty-${i}` : player.id;
      let pos = 'RES';
      return player === 'EMPTY' ? (
        <PlayerRow key={key}>
          <RankField>{pos}</RankField>
          <EmptyField>--EMPTY--</EmptyField>
        </PlayerRow>
      ) : (
        <PlayerRow key={key}>
          <RankField>{pos}</RankField>
          <PlayerField>{player.Player}</PlayerField>
          <Field>{player.Position}</Field>
          <Field>{player.Team}</Field>
          <Field>{player.Bye}</Field>
        </PlayerRow>
      );
    });
    return [...startersDisplay, ...benchDisplay];
  };
  const handleClick = e => {
    e.preventDefault();
    draftPlayer(e.currentTarget.dataset.player_id);
  };

  const display = starters ? displayPlayers(starters, bench) : [];
  return (
    <PlayersTable>
      <TableHeader>
        <Row>
          <RankField>Slot</RankField>
          <PlayerField>Player</PlayerField>
          <Field>Pos</Field>
          <Field>Team</Field>
          <Field>Bye</Field>
        </Row>
      </TableHeader>
      <TableData>{display}</TableData>
    </PlayersTable>
  );
};

export default DraftedPlayers;
