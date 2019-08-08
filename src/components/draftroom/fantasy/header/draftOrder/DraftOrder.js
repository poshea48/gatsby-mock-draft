import React from 'react';

import Team from './Team';
import styled from '@emotion/styled';

const Order = styled.div`
  display: flex;
  flex-wrap: nowrap;
  height: 60px;
`;

const DraftOrder = ({ teams }) => {
  const teamsDisplay = teams.map(team => {
    let highlight = team.id === 'You' ? true : false;
    return <Team key={team.id} teamName={team.id} highlight={highlight} />;
  });

  return <Order>{teamsDisplay}</Order>;
};

export default DraftOrder;
