import React, { useReducer } from 'react';
import styled from '@emotion/styled';
import { navigate } from 'gatsby';

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
  @media (max-width: 550px) {
    font-size: 0.8em;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin: 0.2em 0;
  overflow: scroll;

  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

const Field = styled.div`
  flex: 1 auto;
  display: flex;
  justify-content: flex-start;
  @media (max-width: 550px) {
    margin: 0.5em 0;
  }
`;

const Label = styled.label`
  width: 150px;

  @media (max-width: 550px) {
    width: 100px;
  }
`;

const MiniLabel = styled(Label)`
  width: 75px;
`;

const TextField = styled.input`
  flex: 1 auto;
  padding: 0.4em;
`;

const NumberField = styled.input`
  width: 50px;
  box-sizing: border-box;
  padding: 0.4em 0 0.4em 0.4em;
  text-align: center;
  vertical-align: center;
`;

const Checkbox = styled.div`
  display: block;
  position: relative;
  cursor: pointer;
  height: 20px;
  width: 20px;
  background: #fff;

  input[type='checkbox'] {
    visibility: hidden;
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #fff;
  }

  input:checked ~ span {
    content: '';
    left: 6px;
    width: 4px;
    height: 12px;
    border: solid #2f4f4f;
    border-width: 0 4px 4px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

const PositionsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0.2em 0;
  overflow: scroll;
`;

const PositionFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  flex: 1 auto;
  overflow-y: scroll;
`;

const PositionField = styled.div`
  display: flex;
  justify-content: space-between;
  flex-basis: 20%;
  margin-right: 1em;
`;

const PositionLabel = styled.label`
  width: 35px;
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
    case 'ON_CHECK_CHANGE':
      return {
        ...state,
        keeper: !state.keeper,
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
      keeper,
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
    keeper: false,
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
    if (value.match(/[<>]/)) return;
    dispatch({ type: 'ON_CHANGE', name, value });
  };

  const handleCheckChange = e => {
    console.log('in checkChange');
    dispatch({ type: 'ON_CHECK_CHANGE' });
  };

  const submitSettings = e => {
    e.preventDefault();
    submit({
      teamName,
      numOfTeams,
      pickNum,
      keeper,
      numOfRounds,
      QB,
      RB,
      WR,
      FLEX,
      TE,
      K,
      DSPT,
    });
    if (keeper) navigate('/fantasy/settings');
  };
  return (
    <Container>
      <Header>Fantasy Draft Settings</Header>
      <SelectionWrapper>
        <Row>
          <Field>
            <Label>Team Name</Label>
            <TextField
              type="text"
              name="teamName"
              value={teamName}
              onChange={handleChange}
              required
            />
          </Field>
        </Row>
        <Row>
          <Field>
            <Label>Number of Teams</Label>
            <NumberField
              name="numOfTeams"
              type="number"
              value={numOfTeams || ''}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <MiniLabel>Your Pick</MiniLabel>
            <NumberField
              name="pickNum"
              type="number"
              value={pickNum || ''}
              onChange={handleChange}
            />
          </Field>
          <Field>
            <MiniLabel>Keeper?</MiniLabel>
            <Checkbox onClick={handleCheckChange}>
              <input
                type="checkbox"
                name="keeper"
                checked={keeper || false}
                onChange={handleCheckChange}
              />
              <span />
            </Checkbox>
          </Field>
        </Row>
        <Row>
          <Field>
            <Label>Rounds</Label>
            <NumberField
              name="numOfRounds"
              type="number"
              value={numOfRounds || ''}
              onChange={handleChange}
            />
          </Field>
        </Row>
        <Row>
          <Label>Positions</Label>
          <PositionFieldWrapper>
            <PositionsRow>
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
            </PositionsRow>
            <PositionsRow>
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
            </PositionsRow>
          </PositionFieldWrapper>
        </Row>
      </SelectionWrapper>
      <Button disabled={!teamName || !numOfTeams} onClick={submitSettings}>
        Setup Fantasty Draft
      </Button>
    </Container>
  );
};

export default fantasySetup;
