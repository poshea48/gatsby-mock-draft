import React from 'react';
import Link from 'gatsby-link';
import styled from '@emotion/styled';

const Grid = styled.div`
  display: flex;
  flex-direction: ${p => (p.column ? 'column' : 'row')};
  > div {
    width: ${p => (p.columns ? `${100 / p.columns}%` : '100%')};
  }
  @media (max-width: 550px) {
    flex-direction: column;
    > div {
      width: 100%;
    }
  }
`;

const GridRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
  padding: 0;
`;

const Column = styled.div`
  width: 50%;
  padding: 1rem;
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
  }
`;

const Header = styled.h3`
  text-align: center;
`;

const List = styled.ul`
  height: 120px;
  list-style-type: square;
  > li {
    position: relative;
    display: list-item;
    padding: 0.21428571em 0;
    line-height: 1.14285714em;
  }
`;

const DraftTypeSetup = ({ draftType, typeClick }) => (
  <Grid columns={2} stackable>
    <Column>
      <ColumnHeader>
        <RadioButton
          type="radio"
          name="draftType"
          value="nfl"
          checked={draftType === 'nfl'}
          onChange={typeClick}
        />

        <label>
          <Header>NFL</Header>
        </label>
      </ColumnHeader>

      <List>
        <li>Choose a NFL team</li>
        <li>Become the GM/Head Coach/Owner</li>
        <li>Do some other stuff</li>
      </List>
    </Column>

    <Column>
      <ColumnHeader>
        <RadioButton
          type="radio"
          name="draftType"
          value="fantasy"
          checked={draftType === 'fantasy'}
          onChange={typeClick}
        />

        <label>
          <Header>Fantasy</Header>
        </label>
      </ColumnHeader>
      <List>
        <li>Draft a Fantasy Team</li>
        <li>Choose what pick number and Number of teams</li>
        <li>etc etc etc</li>
      </List>
    </Column>
  </Grid>
);

export default DraftTypeSetup;
