import React from 'react';
import Scroll from '../common/scroll';
import styled from '@emotion/styled';

const Table = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr
  grid-auto-rows: 200px;
`;

const NameField = styled.div``;

const RowItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  margin-bottom: 10px;
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
  tex-align: center;
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
    <Scroll size="mid" style={{ marginLeft: '0' }}>
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
    </Scroll>
  </Table>
);

// {players.map(player => (
//   <RowItem key={player.name}>
//     <span>{}</span>
//   </RowItem>
// ))}

export default AvailablePlayers;
