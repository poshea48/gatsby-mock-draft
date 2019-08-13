import React from 'react';
import styled from '@emotion/styled';
import Scroll from '../common/scroll';
import NFLTEAMS from '../../constants/nflTeams';
import { draftBoardsList } from '../../testData/draftBoards';
import { NFLTeamsNeedsList } from '../../testData/teamsNeeds';

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 550px) {
    flex-direction: column;
    > div {
      width: 100%;
    }
  }
`;

const SelectionWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

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

const MainHeader = styled.h3`
  text-align: center;
  margin-bottom: 0.5em;
`;

const Column = styled.div`
  width: 50%;
`;

const Dropdown = styled.input``;

const Button = styled.button`
  background-color: #20BF55;/*${p => p.theme.color.primary}; */
  color: white;
  box-shadow: 0 0 0 0 rgba(34, 36, 38, 0.15) inset;
  width: 100%;
  display: block;
  font-size: 1rem;

  cursor: pointer;
  min-height: 1em;
  outline: 0;
  border: none;
  font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
  margin: 0 0.25em 0 0;
  padding: 0.78571429em 1.5em 0.78571429em;
  text-transform: none;
  font-weight: 700;
  line-height: 1em;
  font-style: normal;
  text-align: center;
  text-decoration: none;
  border-radius: 0.28571429rem;

  user-select: none;
  transition: opacity 0.1s ease, background-color 0.1s ease, color 0.1s ease,
    box-shadow 0.1s ease, background 0.1s ease;

  &:disabled {
    display: none;
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const NFLSetup = ({ nfl, handleTeamClick, handleSelectClick, submit }) => (
  <Grid>
    <MainHeader>NFL Draft Settings</MainHeader>
    <SelectionWrapper>
      <Column>
        <Header>Choose your team</Header>
        <Scroll size="compact">
          {Object.keys(NFLTEAMS).map(team => (
            <div
              key={team}
              style={{ paddingLeft: '.3em', marginRight: '.5em' }}
            >
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
        <Header>Choose draft board</Header>
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
    </SelectionWrapper>
    <Button onClick={submit}>Setup NFL Draft</Button>
  </Grid>
);

export default NFLSetup;
