import React from 'react';
import styled from '@emotion/styled';
import Scroll from '../common/scroll';
import NFLTEAMS from '../../constants/nflTeams';
import { draftBoardsList } from '../../testData/draftBoards';
import { NFLTeamsNeedsList } from '../../testData/teamsNeeds';

const Segment = styled.div`
  font-size: 1rem;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
  margin: 1rem 0;
  padding: 1em 1em;
  border-radius: 0.28571429rem;
  border: 1px solid rgba(34, 36, 38, 0.15);
`;
const Title = styled.h1``;
const Header = styled.h3`
  font-size: 1.28571429rem;
  border: none;
  margin: 1rem 0 0.5rem 0;
  padding: 0 0;
  font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
  font-weight: 700;
  line-height: 1.28571429em;
  text-transform: none;
  color: rgba(0, 0, 0, 0.87);
`;

const Grid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  @media (max-width: 550px) {
    flex-direction: column;
    > div {
      width: 100%;
    }
  }
`;

const Column = styled.div`
  width: 50%;
`;

const Dropdown = styled.input``;

const NFLSetup = ({ nfl, handleTeamClick, handleSelectClick }) => (
  <Grid>
    <Column>
      <Header>Choose your team</Header>
      <Scroll size="compact">
        {Object.keys(NFLTEAMS).map(team => (
          <div key={team} style={{ paddingLeft: '.3em', marginRight: '.5em' }}>
            <input
              label={NFLTEAMS[team].fullName}
              type="radio"
              name="team"
              value={NFLTEAMS[team].code}
              onChange={handleSelectClick}
            />
            <label style={{ marginLeft: '.5em' }}>
              {NFLTEAMS[team].fullName}
            </label>
          </div>
        ))}
      </Scroll>
    </Column>
    <Column>
      <Header>Choose your draft board</Header>
      <select
        name="draftBoard"
        placeholder="Choose your Draft Board"
        onChange={handleSelectClick}
      >
        {draftBoardsList.map(brd => (
          <option key={brd.name} value={brd.name}>
            {brd.name}
          </option>
        ))}
      </select>
      <Header>Select team needs</Header>
      <select name="teamNeeds" onChange={handleSelectClick}>
        {NFLTeamsNeedsList.map(need => (
          <option key={need.name} value={need.name}>
            {need.name}
          </option>
        ))}
      </select>
    </Column>
  </Grid>
);

export default NFLSetup;
