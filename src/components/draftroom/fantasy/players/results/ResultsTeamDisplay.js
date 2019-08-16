import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import DisplayNav from '../DisplayNav';
import DraftedPlayers from './DraftedPlayers';
import { connect } from 'react-redux';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NavWrapper = styled.div`
  align-self: center;
  height: 22.8px;
  padding: 0 0.2em 0.2em 0.2em;
  box-sizing: border-box;
`;

const ResultsTeamDisplay = ({ teams }) => {
  const [teamName, changeTeamName] = useState('You');
  const [teamData, changeTeamData] = useState(null);

  useEffect(() => {
    changeTeamData(teams.find(team => team.name === teamName));
  }, [teamName]);

  const teamsOptions = teams.map(team => team.name);

  const handleTeamSelect = e => {
    changeTeamName(e.target.value);
  };

  return (
    <Container>
      <NavWrapper>
        <DisplayNav
          title=""
          options={teamsOptions}
          handleSelect={handleTeamSelect}
          selected={teamName}
          size="small"
        />
      </NavWrapper>
      <DraftedPlayers
        starters={teamData && teamData.starters}
        bench={teamData && teamData.bench}
      />
    </Container>
  );
};

ResultsTeamDisplay.propTypes = {
  teams: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  return {
    teams: state.fantasy.teams,
  };
};

export default connect(
  mapStateToProps,
  {},
)(ResultsTeamDisplay);
