import React from 'react';
import styled from '@emotion/styled';

const ScrollContainer = styled.div`
  overflow-y: scroll;
  overflow-x: scroll;
  max-height: ${p => p.theme.scrollHeight[p.size]};
  margin-bottom: 10px;
  ${'' /* margin-left: 0.5em; */}
`;
const Scroll = props => {
  return <ScrollContainer size={props.size}>{props.children}</ScrollContainer>;
};

export default Scroll;
