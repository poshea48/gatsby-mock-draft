import React from 'react';
import styled from '@emotion/styled';

const SelectContainer = styled.div`
  margin: 0 auto;
  text-align: center;
  max-width: 800px;
`;

const DraftRoomSelection = ({ nfl, fantasy, handleTeamSelect }) => (
  <SelectContainer>
    <label>Current Teams: </label>
    <select
      onChange={handleTeamSelect}
      name="selectedTeam"
      placeholder="Which Draft?"
    >
      <option
        defaultValue="Choose your draft"
        hidden
        value=""
        disabled
        selected
      >
        Choose your draft
      </option>
      <optgroup label="NFL Teams">
        {Object.keys(nfl.teams).map(team => (
          <option key={team} value={`nfl-${team}`}>
            {team}
          </option>
        ))}
      </optgroup>
      <optgroup label="Fantasy Teams">
        {Object.keys(fantasy.teams).map(team => (
          <option key={team} value={`fantasy-${team}`}>
            {team}
          </option>
        ))}
      </optgroup>
    </select>
  </SelectContainer>
);

export default DraftRoomSelection;
