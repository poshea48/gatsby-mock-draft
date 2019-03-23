// import React from 'react';
// import { Link, graphql } from 'gatsby';
// import styled from '@emotion/styled';
// import Layout from '../../components/layout/';
// import DraftRoomSelection from '../../components/draftroom/draftRoomSelection';
// import DraftOrder from '../../components/draftroom/draftOrder';
// import AvailablePlayers from '../../components/draftroom/availablePlayers';
//
// const Container = styled.div`
//   display: grid;
//   grid-gap: 2em 2em;
//   grid-template-columns: 30% auto auto;
//   grid-template-areas:
//     'header header header'
//     'sidebar main main';
//   border-radius: 5px;
//   padding: 1em 0;
// `;
//
// const Top = styled.div`
//   grid-area: header;
// `;
//
// const Sidebar = styled.div`
//   grid-area: sidebar;
// `;
//
// const Main = styled.div`
//   grid-area: main;
// `;
//
// const HistoryTable = styled.div`
//   margin: 20px auto 0 auto;
//   max-width: 800px;
//   text-align: center;
//   grid-area: header;
// `;
//
// const Header = styled.h3``;
//
// class NFLDraftroom extends React.Component {
//   state = {
//     showSelection: true,
//     selectedTeam: '',
//     draftType: 'nfl',
//     nfl: { team: 'PHI', draftBoard: 'Pauls Board', teamNeeds: 'Default' },
//     fantasy: {},
//   };
//
//   componentDidMount() {
//     this.getDraftBoard();
//     this.getPlayers(this.state.draftType);
//   }
//
//   getPlayers = async () => {
//     const players = await this.props.data.allPlayersJson.edges;
//     this.setState({ players: players });
//   };
//
//   getDraftBoard = board => {};
//
//   handleTeamSelect = e => {
//     console.log(e.target.value);
//   };
//
//   render() {
//     const { nfl, fantasy, showSelection, players } = this.state;
//     console.log(players);
//     return (
//       <Layout>
//         <Container color="blueSteal">
//           <Top>
//             <h3 style={{ textAlign: 'center' }}>Current Selection 1</h3>
//           </Top>
//           <Sidebar>
//             <DraftOrder />
//           </Sidebar>
//           <Main>
//             <h3 style={{ textAlign: 'center' }}>Players Available</h3>
//             {players ? (
//               <AvailablePlayers players={players} />
//             ) : (
//               <p>...loading</p>
//             )}
//           </Main>
//         </Container>
//       </Layout>
//     );
//   }
// }

// export const query(board) = graphql`
//   query($board: String!) {
//     draftboardsJson(name: { eq: $board }) {
//       name
//       value
//     }
//
//     allPlayersJson {
//       edges {
//         node {
//           name
//           overallRank
//           school
//           year
//           pos
//           posRank
//           height
//           weight
//         }
//       }
//     }
//   }
//   {
//     "board": ${board}
//   }
// `;

// export default NFLDraftroom;
