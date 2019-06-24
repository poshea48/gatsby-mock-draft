import React from 'react';
import styled from '@emotion/styled';

const Table = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr
  grid-auto-rows: auto;
  overflow-x: scroll;
  max-height: 50vh;
  @media (max-width: 860px) {
    height: 30vh;
  }
  @media (max-width: 480px) {
    height: 33vh;
  }
`;

const NameField = styled.div``;

const RowItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  margin-bottom: 10px;
  @media (max-width: 500px) {
    font-size: 85%;
  }

  @media (max-width: 400px) {
    font-size: 70%;
  }
`;

const RowItemHeader = styled(RowItem)`
  border-bottom: 1px solid black;
  margin-bottom: 5px;
`;
const PlayerField = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  background: ${p => p.theme.color.primary};
  color: white;
  border-radius: 10px;
  width: 110px;
  text-align: center;
  padding: 0.2em;
  cursor: pointer;
  &:disabled {
    display: none;
  }
`;

const AvailablePlayers = ({
  players,
  draftButton,
  currentPick,
  myTeam,
  draftStarted,
  teamToPick,
}) => (
  <Table>
    <RowItemHeader>
      <span>Player</span>
      <span>position</span>
      <span>School</span>
      <span>year</span>
    </RowItemHeader>
    {players.map((player, i) => (
      <RowItem key={player.name}>
        <PlayerField>
          <span>
            {i + 1}. {player.name}
          </span>
          <span>
            <Button
              onClick={draftButton}
              disabled={myTeam !== teamToPick || !draftStarted}
              data-name={player.name}
            >
              Draft Player
            </Button>
          </span>
        </PlayerField>
        <span>{player.pos}</span>
        <span>{player.school}</span>
        <span>{player.year}</span>
      </RowItem>
    ))}
  </Table>
);

// {players.map(player => (
//   <RowItem key={player.name}>
//     <span>{}</span>
//   </RowItem>
// ))}

export default AvailablePlayers;
