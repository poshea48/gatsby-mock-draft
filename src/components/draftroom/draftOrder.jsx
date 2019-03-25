import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Scroll from '../common/scroll';
import styled from '@emotion/styled';
import NFLTEAMS from '../../constants/nflTeams';

const Container = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
`;

const Team = styled.div`
  display: flex;
  flex-direction: column;
  color: ${p => (p.myTeam ? 'red' : 'black')};
  background: ${p => (p.myTeam ? 'yellow' : 'white')};
  font-weight: ${p => (p.myTeam ? 600 : 'normal')};
  margin-bottom: 1em;
`;

class DraftOrder extends React.Component {
  state = {
    currentRound: this.props.currentRound,
    currentPick: this.props.currentPick,
  };

  scrollToCurrentPick = pick => {
    const li = document.getElementById(pick);
    li && li.scrollIntoView(true, { block: 'start' }, { behavior: 'smooth' });
  };

  showPlayerDrafted = player => {
    const pick = player.pick;
    const li = document.getElementById(`${player.pick}`);
  };

  addDetails = pickNumber => {
    const { draftedPlayers, currentPick } = this.props;
    let player;
    if (currentPick === pickNumber) {
      return (
        <div style={{ fontWeight: '600', color: 'red' }}>
          !! Current Pick !!
        </div>
      );
    } else if (
      (player = draftedPlayers.filter(p => p.pick === pickNumber)[0])
    ) {
      return (
        <div>
          <small>{player.name}</small> - <small>{player.pos}</small>
        </div>
      );
    } else {
      return '';
    }
  };

  componentDidMount() {
    if (this.props.currentPick !== 1) {
      this.scrollToCurrentPick(this.props.currentPick);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentPick !== this.props.currentPick) {
      this.scrollToCurrentPick(this.props.currentPick);
    }

    if (prevProps.currentRound !== this.props.currentRound) {
    }
  }

  render() {
    const {
      draftedPlayers,
      currentPick,
      currentRound,
      myTeam,
      draftOrder,
    } = this.props;
    draftedPlayers &&
      draftedPlayers.sort((team1, team2) => team1.pick - team2.pick);

    return (
      <Container>
        <Scroll size="reg">
          {draftOrder.map((team, i) => {
            return (
              <div key={i}>
                {i % 32 === 0 ? (
                  <h3>Round {i - 32 + 1 > 0 ? i - 32 + 2 : 1}</h3>
                ) : (
                  ''
                )}
                <Team myTeam={team === myTeam} id={i + 1} data-team={team}>
                  <div>
                    {i + 1}.{' '}
                    {team === myTeam ? 'Your Pick' : NFLTEAMS[team].shortName}
                  </div>
                  <div style={{ marginLeft: '0.5em' }}>
                    {this.addDetails(i + 1)}
                  </div>
                </Team>
              </div>
            );
          })}
        </Scroll>
      </Container>
    );
  }
}

export default DraftOrder;
