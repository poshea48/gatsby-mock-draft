import React, { useReducer, useEffect } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 auto;
`;

const Header = styled.h3`
  margin: 0 0 1em 0;
`;

const SelectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  max-width: 600px;
  width: 100%;
  flex: 1 auto;
`;

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin: 0.2em 0;
`;

const SplitRow = styled.div`
  flex-basis: 50%;
  display: flex;
  justify-content: flex-start;
`;

const Label = styled.label`
  flex-basis: 28%;
`;
const TextField = styled.input`
  flex-basis: 72%;
  padding: 0.4em;
`;

const SplitLabel = styled(Label)`
  flex-basis: 56%;
`;
const NumberField = styled.input`
  width: 50px;
  box-sizing: border-box;
  padding: 0.4em 0 0.4em 0.4em;
  text-align: center;
  vertical-align: center;
`;

const PositionsRow = styled(Row)`
  max-height: 50%;
  overflow-y: scroll;
`;

const PositionFieldWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex-basis: 80%;
  /* max-height: 80%; */
  overflow-y: scroll;
`;

const PositionField = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.2em;
`;

const PositionLabel = styled.label`
  width: 50px;
  text-align: center;
  font-size: 0.8em;
`;

const PositionNumber = styled(NumberField)`
  width: 40px;
  height: 30px;
`;

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

const formReducer = (state, action) => {
  switch (action.type) {
    case 'ON_CHANGE':
      return {
        ...state,
        [action.name]: action.value,
      };
    default:
      return state;
  }
};

const fantasySetup = ({ submit }) => {
  const [
    {
      teamName,
      numOfTeams,
      pickNum,
      numOfRounds,
      QB,
      RB,
      WR,
      FLEX,
      TE,
      K,
      DSPT,
    },
    dispatch,
  ] = useReducer(formReducer, {
    teamName: '',
    numOfTeams: 0,
    pickNum: '',
    numOfRounds: 15,
    QB: 1,
    RB: 2,
    WR: 2,
    FLEX: 1,
    TE: 1,
    K: 1,
    DSPT: 1,
  });

  const handleChange = e => {
    const { name, value } = e.target;

    dispatch({ type: 'ON_CHANGE', name, value });
  };

  const submitSettings = e => {
    e.preventDefault();
    submit({
      teamName,
      numOfTeams,
      pickNum,
      numOfRounds,
      QB,
      RB,
      WR,
      FLEX,
      TE,
      K,
      DSPT,
    });
  };

  return (
    <Container>
      <Header>Fantasy Draft Settings</Header>
      <SelectionWrapper>
        <Row>
          <Label>Team Name</Label>
          <TextField
            type="text"
            name="teamName"
            value={teamName}
            onChange={handleChange}
            required
          />
        </Row>
        <Row>
          <SplitRow>
            <SplitLabel>Number of Teams</SplitLabel>
            <NumberField
              name="numOfTeams"
              type="number"
              value={numOfTeams || ''}
              onChange={handleChange}
            />
          </SplitRow>
          <SplitRow>
            <SplitLabel>Your Pick</SplitLabel>
            <NumberField
              name="pickNum"
              type="number"
              value={pickNum || ''}
              onChange={handleChange}
            />
          </SplitRow>
        </Row>
        <Row>
          <SplitRow>
            <SplitLabel>Rounds</SplitLabel>
            <NumberField
              name="numOfRounds"
              type="number"
              value={numOfRounds || ''}
              onChange={handleChange}
            />
          </SplitRow>
        </Row>
        <PositionsRow>
          <Label>Positions</Label>
          <PositionFieldWrapper>
            <PositionField>
              <PositionLabel>QB</PositionLabel>
              <PositionNumber
                name="QB"
                type="number"
                value={QB}
                onChange={handleChange}
              />
            </PositionField>
            <PositionField>
              <PositionLabel>RB</PositionLabel>
              <PositionNumber
                name="RB"
                type="number"
                value={RB}
                onChange={handleChange}
              />
            </PositionField>
            <PositionField>
              <PositionLabel>WR</PositionLabel>
              <PositionNumber
                name="WR"
                type="number"
                value={WR}
                onChange={handleChange}
              />
            </PositionField>
            <PositionField>
              <PositionLabel>FLEX</PositionLabel>
              <PositionNumber
                name="FLEX"
                type="number"
                value={FLEX}
                onChange={handleChange}
              />
            </PositionField>
            <PositionField>
              <PositionLabel>TE</PositionLabel>
              <PositionNumber
                name="TE"
                type="number"
                value={TE}
                onChange={handleChange}
              />
            </PositionField>
            <PositionField>
              <PositionLabel>DSPT</PositionLabel>
              <PositionNumber
                name="DSPT"
                type="number"
                value={DSPT}
                onChange={handleChange}
              />
            </PositionField>
            <PositionField>
              <PositionLabel>K</PositionLabel>
              <PositionNumber
                name="K"
                type="number"
                value={K}
                onChange={handleChange}
              />
            </PositionField>
          </PositionFieldWrapper>
        </PositionsRow>
      </SelectionWrapper>
      <Button disabled={!teamName || !numOfTeams} onClick={submitSettings}>
        Setup Fantasty Draft
      </Button>
    </Container>
  );
};

export default fantasySetup;
