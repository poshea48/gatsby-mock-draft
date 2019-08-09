import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
// import Scroll from '../common/scroll';
import styled from '@emotion/styled';
import NFLTEAMS from '../../../constants/nflTeams';

const Container = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  /* background-color: ${p =>
    p.team
      ? p.theme.background[p.team].secondary2
      : p.theme.background.default}; */
`;

const Scroll = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(100vh - 380px);
  /* flex: 1 auto; */
  margin-bottom: 10px;
  /* align-items: stretch; */
  @media (max-width: 860px) {
    flex-direction: row;
    height: 55px;
    overflow-x: scroll;
    overflow-y: hidden;
    max-width: 100vw;
    margin-right: 1em;
  }
`;

const Team = styled.div`
  display: flex;
  flex-basis: 50%;
  box-sizing: border-box;
  flex-direction: column;
  color: ${p =>
    p.myTeam
      ? p.color
        ? p.theme.background[p.color].secondary2
        : `white`
      : `white`};

  font-weight: ${p => (p.myTeam ? 600 : 'normal')};
  padding-bottom: 1em;
  /* margin-left: 0.8em; */
  @media (max-width: 860px) {
    min-width: 120px;
    /* height: 80px; */

    margin-right: 5px;
    margin-bottom: 0;
  }
`;

const TeamName = styled.p`
  display: inline-block;
  margin: 0;
`;

const Details = styled.p`
  display: inline-block;
  margin: 0;
  color: ${p => p.theme.background[p.color].secondary2};
`;

// One day => break up into DraftOrderList and DraftOrderListItem
// use ref on DraftOrderListItem to scroll to top
// this.teamRef = React.createRef()
// ref={this.teamRef}
// componentDidMount => this.teamRef.current => scrollIntoView
// or for functional components...
// const teamRef = useRef(null)
// ref={teamRef}
// useEffect(() => {
//    teamRef.current.scrollIntoView
//})

class DraftOrder extends React.Component {
  state = {
    round: 1,
  };

  scrollToCurrentPick = pick => {
    let container = document.getElementById('scroll');

    let target = document.getElementById(pick);
    // container.scrollTop = target;
    target.scrollIntoView(true);
  };

  showPlayerDrafted = player => {
    const pick = player.pick;
    const li = document.getElementById(`${player.pick}`);
  };

  addDetails = (pickNumber, teamColor) => {
    const { draftedPlayers, currentPick } = this.props;

    let player;
    if (currentPick === pickNumber) {
      return <Details color={teamColor}>!! Current Pick !!</Details>;
    } else if (
      (player = draftedPlayers.filter(p => p.pick === pickNumber)[0])
    ) {
      return (
        <p style={{ margin: 0 }}>
          <small>{player.name}</small> - <small>{player.pos}</small>
        </p>
      );
    } else {
      return <p> </p>;
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
      theme,
    } = this.props;
    draftedPlayers &&
      draftedPlayers.sort((team1, team2) => team1.pick - team2.pick);
    return (
      <Container team={myTeam}>
        <h3 style={{ textAlign: 'center' }}>Round: {currentRound}</h3>
        <Scroll size="reg" id="scroll">
          {draftOrder.map((team, i) => {
            return (
              <Team
                key={i}
                myTeam={team === myTeam}
                id={i + 1}
                data-team={team}
                color={team}
              >
                <TeamName>
                  {i + 1}.{' '}
                  {team === myTeam ? 'Your Pick' : NFLTEAMS[team].shortName}
                </TeamName>
                <div style={{ marginLeft: '0.5em' }}>
                  {this.addDetails(i + 1, team)}
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
