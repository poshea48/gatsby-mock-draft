import React from 'react';
import Scroll from '../../common/scroll';
import styled from '@emotion/styled';
// import isEmpty from '../../../../validation/is-empty';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  text-align: center;
  margin-bottom: 0.5em;
`;

const NeedsDisplay = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
`;
const Need = styled.small`
  margin: 0 0.2em;
`;

const PlayerField = styled.div``;
const MyTeam = ({ players, needs, round }) => (
  <Container>
    <Title>Players Drafted</Title>
    <small style={{ textAlign: 'center' }}>Your Team Needs: </small>
    <NeedsDisplay>
      {needs.map((need, i) => (
        <Need key={i}>
          {i + 1}. {need}
        </Need>
      ))}
    </NeedsDisplay>
    <Scroll size="mid">
      {Array.from(Array(round), (_, i) => i + 1).map(round => (
        <div key={round}>
          <h4 style={{ marginBottom: '0.5em', textAlign: 'center' }}>
            Round {round}
          </h4>
          <ul style={{ listStyle: 'none', margin: '0', textAlign: 'center' }}>
            {players
              .filter(player => player.round === round)
              .map(player => (
                <li key={player.name}>
                  <small>{player.name}</small> - <small>{player.pos}</small>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </Scroll>
  </Container>
);

export default MyTeam;
