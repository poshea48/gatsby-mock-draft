import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
// import Scroll from '../common/scroll';
import styled from '@emotion/styled';
import NFLTEAMS from '../../constants/nflTeams';

const Container = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  ${'' /* @media (max-width: 860px) {
    display: flex;
    flex-direction: row;
  } */}
`;

const Scroll = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 440px;
  margin-bottom: 10px;
  align-items: stretch;
  @media (max-width: 860px) {
    flex-direction: row;
    height: 65px;
    overflow-x: scroll;
    overflow-y: hidden;
    max-width: 100vw;
    margin-right: 1em;
  }
`;

const Team = styled.div`
  display: flex;
  width: 180px;
  flex-direction: column;
  color: ${p => (p.myTeam ? 'red' : 'black')};
  background: ${p => (p.myTeam ? 'yellow' : 'white')};
  font-weight: ${p => (p.myTeam ? 600 : 'normal')};
  padding-bottom: 1.5em;
  @media (max-width: 860px) {
    width: 200px;
    height: 80px;

    margin-right: 5px;
    margin-bottom: 0;
  }
`;

class DraftOrder extends React.Component {
  state = {
    round: 1,
  };

  scrollToCurrentPick = pick => {
    let container = document.getElementById('scroll');

    let target = document.getElementById(pick);
    // container.scrollTop = target;
    if (container.scrollTop === 0) {
      container.scrollLeft += 185;
    } else {
      console.log('Paul here');
      target.scrollIntoView(true);
    }
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
        <p style={{ fontWeight: '600', color: 'red', margin: 0 }}>
          !! Current Pick !!
        </p>
      );
    } else if (
      (player = draftedPlayers.filter(p => p.pick === pickNumber)[0])
    ) {
      return (
        <p style={{ margin: 0 }}>
          <small>{player.name}</small> - <small>{player.pos}</small>
        </p>
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
      console.log('I should be scrolling');
      this.scrollToCurrentPick(this.props.currentPick);
    }

    if (prevProps.currentRound !== this.props.currentRound) {
    }
  }

  updateRound = async () => {
    let round = this.state.round;
    await this.setState({ round: round + 1 });
    return;
  };

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
        <h3>Current Round: {currentRound}</h3>
        <Scroll size="reg" id="scroll">
          {draftOrder.map((team, i) => {
            return (
              <Team
                key={i}
                myTeam={team === myTeam}
                id={i + 1}
                data-team={team}
              >
                <div style={{ width: '180px' }}>
                  {i + 1}.{' '}
                  {team === myTeam ? 'Your Pick' : NFLTEAMS[team].shortName}
                </div>
                <div style={{ marginLeft: '0.5em' }}>
                  {this.addDetails(i + 1)}
                </div>
              </Team>
            );
          })}
        </Scroll>
      </Container>
    );
  }
}

export default DraftOrder;
