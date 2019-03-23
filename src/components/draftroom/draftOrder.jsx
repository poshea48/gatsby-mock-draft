import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Scroll from '../common/scroll';
import styled from '@emotion/styled';
import NFLTEAMS from '../../constants/nflTeams';

const getDraftOrder = graphql`
  {
    allNflJson {
      edges {
        node {
          draftOrder
        }
      }
    }
  }
`;

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
  constructor(props) {
    super(props);
  }

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
  }

  render() {
    const { draftedPlayers, currentPick, myTeam } = this.props;
    draftedPlayers &&
      draftedPlayers.sort((team1, team2) => team1.pick - team2.pick);

    return (
      <StaticQuery
        query={getDraftOrder}
        render={data => (
          <Container>
            <Scroll size="reg">
              {data.allNflJson.edges[0].node.draftOrder.map((picks, round) => {
                return (
                  <div key={round}>
                    <h3>Round {round + 1}</h3>
                    <div>
                      {picks.map((team, i) => {
                        return (
                          <Team
                            myTeam={team === myTeam}
                            key={i}
                            id={round * 32 + i + 1}
                            data-team={team}
                          >
                            <div>
                              {round * 32 + i + 1}.{' '}
                              {team === myTeam
                                ? 'Your Pick'
                                : NFLTEAMS[team].shortName}
                            </div>
                            <div style={{ marginLeft: '0.5em' }}>
                              {this.addDetails(round * 32 + i + 1)}
                            </div>
                          </Team>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </Scroll>
          </Container>
        )}
      />
    );
  }
}

export default DraftOrder;
