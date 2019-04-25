import React from 'react';
import { graphql, navigate } from 'gatsby';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import Layout from '../../components/layout/';
import DraftOrder from '../../components/draftroom/draftOrder';
import AvailablePlayers from '../../components/draftroom/availablePlayers';
import isEmpty from '../../validation/is-empty';
import nflTeams from '../../constants/nflTeams';
import MyTeam from '../../components/draftroom/myTeam';
import { togglePlayersModal } from '../../state/actions/appActions';
import { setupNflDraftroom } from '../../state/actions/nflActions';

const Container = styled.div`
  display: grid;
  grid-gap: 2em 2em;
  grid-template-columns: 20% auto auto;
  grid-template-areas:
    'header header header'
    'teams main players';
  border-radius: 5px;
  padding: 1em 0;
  @media (max-width: 860px) {
    grid-template-columns: 100%;

    grid-template-areas:
      'header '
      'teams'
      'main';
  }
  ${'' /* @media (max-width: 680px) {
    grid-template-areas: 'header header header';
  } */}
`;

const Top = styled.div`
  grid-area: header;
`;

const Teams = styled.div`
  grid-area: teams;
`;

const Players = styled.div`
  grid-area: players;
  @media (max-width: 860px) {
    display: ${p => (p.isPlayersModalOpen ? 'flex' : 'none')};
    position: fixed;
    z-index: 200;
    flex-direction: column;

    width: 90%;
    left: 5%;
    right: 5%;

    background: white;
    transition: transform 0.3s ease-in-out;
    opacity: ${p => (p.isPlayersModalOpen ? 1 : 0)}
    ${
      '' /* transform: translateX(
      ${p => (p.isPlayerModalOpen ? 20 : `-${p.theme.size(16)}`)} */
    }
    );
  }
`;

const PlayersModalButton = styled.div`
  display: none;
  cursor: pointer;
  text-align: center;
  margin-bottom: 1em;
  @media (max-width: 860px) {
    display: block;
  }
`;

const PlayersModal = styled.div`
  position: fixed;
  z-index: ${p => p.theme.zIndex.drawer};
  display: flex;
  flex-direction: column;
  top: 50;
  left: 50;
  width: 200px;
  background: ${p => p.theme.palette.secondary.main};
  transition: transform 0.3s ease-in-out;
  transform: translateX(
    ${p => (p.isPlayerModalOpen ? 0 : `-${p.theme.size(16)}`)}
  );
`;
//   transition: transform 0.3s ease-in-out;
//   transform: perspective(200px)
//     ${p =>
//       p.isPlayerModalOpen
//         ? `translateX(${p.theme.size(8)}) translateZ(-20px)`
//         : 'none'};
//   padding-top: ${p => p.theme.size(1)};
//   padding-left: ${p => p.theme.size(1)};
//   padding-right: ${p => p.theme.size(1)};
// `;

const Overlay = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  background: black;
  width: 100vw;
  height: 100vh;
  transition: opacity 0.3s ease-in-out;
  opacity: ${p => (p.isPlayersModalOpen ? 0.8 : 0)};
  pointer-events: ${p => (p.isPlayersModalOpen ? 'all' : 'none')};
`;

const Main = styled.div`
  grid-area: main;
`;

const PlayerSort = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
`;

const SortFieldHeader = styled.small`
  margin: 0;
`;

const SortButton = styled.div`
  margin: 0 1em;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
  &:hover {
    color: white;
    background: black;
  }
`;

const DraftButton = styled.button`
  background: ${p => p.theme.color.primary};
  color: white;
  cursor: pointer;
  width: 150px;
  padding: 5px;
  border-radius: 10px;
  &:disabled {
    display: none;
  }
`;

const Header = styled.h3``;

class NFLDraftroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPick: 1,
      currentRound: 1,
      started: false,
      paused: false,
      finished: false,
      players: this.props.data.allContentfulProspects2019.edges[0].node.player,
      draftOrder: this.props.data.allContentfulDraftOrder2019.edges[0].node.teams.map(
        team => team.content,
      ),
      draftedPlayers: [],
      filterBy: 'OVERALL',
      myTeam: [], //JSON.parse(localStorage.getItem('nflSetupStore')).team || [],
      needs: [],
    };
  }

  componentDidMount() {
    const { nfl } = this.props;
    if (isEmpty(nfl.team)) {
      let localData = JSON.parse(localStorage.getItem('nflSetupStore'));
      if (localData.team) {
        this.props.setupNflDraftroom(localData);
      } else {
        navigate('/setup');
      }
      return null;
    }
    if (isEmpty(this.state.needs)) {
      console.log(nfl);
      let needs = this.props.data.teamNeedsJson.teams.filter(
        teamNeeds => teamNeeds.team === nfl.team,
      )[0].needs;
      this.setState({ needs: needs });
    }
  }

  componentDidUpdate() {
    if (this.state.started && this.state.players.length === 0) {
      this.setState({
        paused: false,
        started: false,
        finished: true,
      });
    }
  }

  handleSort = e => {
    this.setState({
      filterBy: e.target.value.toUpperCase(),
    });
  };

  startDraft = async () => {
    await this.setState({
      started: true,
      paused: false,
    });
    (function simulate(players, myTeam, teamToPick, paused, context) {
      if (players.length === 0) {
        return;
      }
      if (myTeam === teamToPick || paused) {
        return;
      }
      setTimeout(async () => {
        await context.simulatePick();
        if (
          context.state.players.length > 0 &&
          context.props.nfl.team !== context.getTeamToPick()
        ) {
          simulate(
            context.state.players,
            context.props.nfl.team,
            context.getTeamToPick(),
            context.state.paused,
            context,
          );
        }
      }, 500);
    })(
      this.state.players,
      this.props.nfl.team,
      this.getTeamToPick(),
      this.state.paused,
      this,
    );
  };

  getTeamToPick = () => {
    return this.state.draftOrder[this.state.currentPick - 1] || '';
  };

  simulatePick = () => {
    const { currentPick, currentRound } = this.state;
    let availablePlayers = [...this.state.players];
    let draftedPlayers = [...this.state.draftedPlayers];

    let player = availablePlayers.splice(0, 1)[0];
    let draftedPlayer = {
      ...player,
      draftedBy: this.getTeamToPick(),
      round: currentRound,
      pick: currentPick,
    };
    draftedPlayers.push(draftedPlayer);

    return this.setState({
      players: availablePlayers,
      draftedPlayers: draftedPlayers,
      currentPick: currentPick + 1,
      currentRound: currentPick % 32 === 0 ? currentRound + 1 : currentRound,
    });
  };

  stopDraft = e => {
    e.preventDefault();

    this.setState({
      paused: true,
    });
  };

  draftMyPlayer = async e => {
    const { currentPick, currentRound, myTeam } = this.state;
    let availablePlayers = [...this.state.players];
    let draftedPlayers = [...this.state.draftedPlayers];
    let index = availablePlayers.findIndex(
      player => player.name === e.target.dataset.name,
    );
    let player = availablePlayers.splice(index, 1)[0];
    let draftedPlayer = {
      ...player,
      draftdBy: myTeam,
      round: currentRound,
      pick: currentPick,
    };
    draftedPlayers.push(draftedPlayer);
    myTeam.push(draftedPlayer);

    await this.setState({
      players: availablePlayers,
      draftedPlayers: draftedPlayers,
      myTeam: myTeam,
      currentPick: currentPick + 1,
      currentRound: currentPick % 32 === 0 ? currentRound + 1 : currentRound,
    });
    this.startDraft();
  };
  render() {
    const { nfl } = this.props;
    const teamToPick = this.getTeamToPick();
    const {
      players,
      filterBy,
      myTeam,
      needs,
      currentPick,
      currentRound,
      draftedPlayers,
      draftOrder,
    } = this.state;
    return (
      <Layout>
        <Overlay
          onClick={() => this.props.togglePlayersModal(false)}
          isPlayersModalOpen={this.props.app.isPlayersModalOpen}
        />
        <Container color="blueSteal">
          <Top>
            <h3 style={{ textAlign: 'center' }}>
              {(nfl.team && nflTeams[nfl.team].fullName) || `...Loading`} Draft
              Room
            </h3>
            <PlayersModalButton>
              <small
                onClick={() =>
                  this.props.togglePlayersModal(
                    !this.props.app.isPlayersModalOpen,
                  )
                }
                style={{ textDecoration: 'underline', cursor: 'pointer' }}
              >
                Players Drafted
              </small>
            </PlayersModalButton>
            <div style={{ textAlign: 'center', borderRadius: '10px' }}>
              <DraftButton
                disabled={this.state.started || this.state.finished}
                onClick={this.startDraft}
              >
                Start Draft
              </DraftButton>
              <DraftButton
                disabled={!this.state.started || this.state.paused}
                onClick={this.stopDraft}
              >
                Pause Draft
              </DraftButton>
              <DraftButton
                disabled={!this.state.paused}
                onClick={this.startDraft}
              >
                Resume Draft
              </DraftButton>
            </div>
          </Top>
          <Teams>
            <DraftOrder
              draftOrder={draftOrder}
              myTeam={nfl.team}
              draftedPlayers={draftedPlayers}
              currentPick={currentPick}
              currentRound={currentRound}
            />
          </Teams>
          <Main>
            <h3 style={{ textAlign: 'center', marginBottom: '0.5em' }}>
              Players Available
            </h3>
            <PlayerSort>
              <SortFieldHeader>Sort by: </SortFieldHeader>
              <SortButton>
                <select name="sortField" onChange={this.handleSort}>
                  <option value="overall">Overall Rank</option>
                  <option value="qb">QB</option>
                  <option value="rb">RB</option>
                  <option value="wr">WR</option>
                  <option value="te">TE</option>
                  <option value="ol">OL</option>
                  <option value="dl">DL</option>
                  <option value="edge">EDGE</option>
                  <option value="lb">LB</option>
                  <option value="s">S</option>
                  <option value="cb">CB</option>
                </select>
              </SortButton>
            </PlayerSort>
            {players ? (
              <AvailablePlayers
                draftButton={this.draftMyPlayer}
                draftStarted={this.state.started}
                teamToPick={this.getTeamToPick()}
                myTeam={nfl.team}
                currentPick={currentPick}
                players={
                  filterBy === 'OVERALL'
                    ? players
                    : players.filter(player => player.pos === filterBy)
                }
              />
            ) : (
              <p>...loading</p>
            )}
          </Main>
          <Players isPlayersModalOpen={this.props.app.isPlayersModalOpen}>
            <MyTeam
              players={myTeam}
              needs={needs}
              round={this.state.currentRound}
            />
          </Players>
        </Container>
      </Layout>
    );
  }
}

export const query = graphql`
  {
    draftboardsJson(name: { eq: "default" }) {
      name
      value
    }
    teamNeedsJson(name: { eq: "default" }) {
      name
      teams {
        team
        needs
      }
    }

    allContentfulProspects2019 {
      edges {
        node {
          player {
            name
            pos
            school
            year
            overallRank
            posRank
            height
            weight
          }
        }
      }
    }

    allContentfulDraftOrder2019 {
      edges {
        node {
          teams {
            content
          }
        }
      }
    }
  }
`;

const mapStateToProps = state => {
  return {
    app: state.app,
    nfl: state.nfl,
  };
};

// export default connect(
//   mapStateToProps,
//   dispatch => ({
//     togglePlayersModal: open => dispatch(togglePlayersModal(open)),
//   }),
// )(NFLDraftroom);

export default connect(
  mapStateToProps,
  { togglePlayersModal, setupNflDraftroom },
)(NFLDraftroom);
