import React, { useState } from 'react';
// import Link from 'gatsby-link';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
    /* > div {
      width: ${p => (p.columns ? `${100 / p.columns}%` : '100%')};
    } */
    @media (max-width: 550px) {
      flex-direction: column;
      
    }
`;

const Header = styled.h3`
  text-align: center;
`;

const SelectionWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  overflow-y: scroll;
`;

const Shortened = styled.div`
  display: ${p => (p.disabled ? `none` : `flex`)};
  justify-content: space-between;
`;

const ShortColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const GridRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
  padding: 0;
`;

const Column = styled.div`
  padding: 1rem;
  flex-basis: 50%;
`;

const ColumnHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-left: 0.3em;
`;

const RadioButton = styled.input`
  cursor: pointer;
  z-index: 3;
  width: 17px;
  height: 17px;
  margin: 6px 1em 0 0;
`;

const List = styled.ul`
  display: ${p => (p.selected ? 'none' : 'block')};
  height: 120px;
  list-style-type: square;
  > li {
    position: relative;
    display: list-item;
    padding: 0.21428571em 0;
    line-height: 1.14285714em;
  }
`;
const DraftTypeSetup = ({ draftType, typeClick }) => {
  const [draft, changeDraft] = useState(draftType);
  const [draftShort, changeShortDraft] = useState(draftType);

  const handleChange = e => {
    console.log(e.target.value);
    changeDraft(e.target.value);
    typeClick(e.target.value);
  };

  return (
    <Container>
      <Header>Choose Type</Header>
      <SelectionWrapper>
        <Column>
          <ColumnHeader>
            <RadioButton
              type="radio"
              name="draft"
              value="nfl"
              checked={draft === 'nfl'}
              onChange={handleChange}
            />

            <label>NFL</label>
          </ColumnHeader>

          <List selected={draftType === 'nfl' || draftType === 'fantasy'}>
            <li>Choose a NFL team</li>
            <li>Become the GM/Head Coach/Owner</li>
            <li>Do some other stuff</li>
          </List>
        </Column>

        <Column>
          <ColumnHeader>
            <RadioButton
              type="radio"
              name="draft"
              value="fantasy"
              checked={draft === 'fantasy'}
              onChange={handleChange}
            />

            <label>Fantasy</label>
          </ColumnHeader>
          <List selected={draftType === 'nfl' || draftType === 'fantasy'}>
            <li>Draft a Fantasy Team</li>
            <li>Choose what pick number and Number of teams</li>
            <li>etc etc etc</li>
          </List>
        </Column>
      </SelectionWrapper>
    </Container>
  );
};

export default DraftTypeSetup;
