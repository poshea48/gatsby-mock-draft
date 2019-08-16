import React, { useState, useEffect, useReducer, useRef } from 'react';
import PropTypes, { resetWarningCache } from 'prop-types';
import styled from '@emotion/styled';
import Layout from '../../../layout';
import useModal from '../../../customHooks/useModal';
import Modal from '../../../common/Modal';
import {
  updateTeamName,
  toggleAutoPick,
  updateKeeper,
  updateKeepers,
  updateKeeperRound,
} from '../../../../state/actions/fantasyActions';
import { connect } from 'react-redux';
import { navigate, Link } from 'gatsby';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  max-width: 500px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 1em;
`;

const Title = styled.h2`
  color: #fff;
  margin: 0;
`;

const BackLink = styled(Link)`
  display: flex;
  text-decoration: none;
  margin-right: 1em;
  align-items: center;
  color: black;
`;

const BackButton = styled.span`
  /* margin-right: 1em;
  display: inline-block;
  color: black;
  height: 10px;
  width: 10px;
  border-left: 1px solid black;
  border-bottom: 1px solid black; */
  display: inline-block;
  width: 0;
  height: 0;
  margin-right: 0.5em;
  border-top: 10px solid transparent;
  border-right: 15px solid black;
  border-bottom: 10px solid transparent;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  border: 1px solid #2f4f4f;
  background: #fff;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #2f4f4f;
  padding: 1em;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

const TeamsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  padding: 1em;
  box-sizing: border-box;
`;

const Team = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0.5em 0;
`;

const TeamName = styled.div`
  display: flex;
  justify-content: space-between;
  width: 20%;
`;
const Edit = styled.small`
  margin-right: 0.5em;
  cursor: pointer;
  text-decoration: underline;
  color: #6495ed;
  align-self: center;
`;

const TeamNameWindow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeamAutopick = styled.div`
  display: flex;
  justify-content: center;
  width: 30%;
`;

const TeamKeeper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-basis: 35%;
`;

const Keeperform = styled.form`
  position: relative;
  width: 100%;
`;
const Keeper = styled.input`
  width: 100%;
  padding: 0.5em;
  font-size: 12px;
  box-sizing: border-box;
`;

const Suggestions = styled.ul`
  display: ${p => (p.show ? 'block' : 'none')};
  position: absolute;
  list-style: none;
  background: #fff;
  font-size: 12px;
  z-index: 50;
  width: 100%;
  height: 45px;
  margin: 0;
  padding: 0 0.5em 0.5em 0.5em;
  box-sizing: border-box;
  border: 1px solid gainsboro;
  border-top: none;
  overflow: scroll;
`;

const Suggestion = styled.li`
  margin: 0.5em 0;
`;
const TeamKeeperRound = styled.div`
  display: flex;
  justify-content: center;
  flex-basis: 15%;
`;
const DropDown = styled.select`
  display: block;
  border: none !important;
  font-size: 14px;
  font-family: sans-serif;
  padding: 0 0.8em 0 0.4em;
  width: 60%;
  border: 1px solid black;
  box-sizing: border-box;
  background: inherit;
  margin: 0;
  border-radius: 0.5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat, repeat;
  background-position: right 0 top 50%, 0 0;
  background-size: 0.65em auto, 100%;
  cursor: pointer;
  &:-ms-expand {
    display: none;
  }

  &:focus {
    outline: none;
  }

  option {
    font-weight: normal;
    font-size: 18px;
    text-transform: uppercase;
  }

  @media (max-width: 550px) {
    border: none !important;
    &:last-child {
      margin-left: 0;
    }
  }
`;

const Button = styled.button`
  border-radius: 10px;
  cursor: pointer;
  background: #6495ed;
  color: #fff;
  align-self: center;
  padding: 0.5em 0;
  margin: 1em 0;
  width: 50%;
`;

const UpdateButton = styled.button`
  border-radius: 10px;
  cursor: pointer;
  background: #20bf55;
  color: #fff;
  align-self: center;
  padding: 0.5em 0;
  width: 50%;
  margin-bottom: 0.5em;
  &:disabled {
    display: none;
  }
`;

const SuggestionOverlay = styled.div`
  position: fixed;
  display: ${p => (p.show ? 'block' : 'none')};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: transparent;
  z-index: 10;
`;

const keeperReducer = (state, action) => {
  let keepers;
  let keeper;
  switch (action.type) {
    case 'UPDATE_KEEPER':
      keepers = { ...state.keepers };
      keepers[action.teamId].playerName = action.playerName;
      if (action.playerId) {
        keepers[action.teamId].playerId = action.playerId;
      }
      return {
        ...state,
        keepers,
        suggestions: action.selections,
      };
    case 'UPDATE_KEEPER_ROUND':
      keepers = { ...state.keepers };
      keepers[action.teamId].round = Number(action.round);
      return {
        ...state,
        keepers,
      };
    case 'RESET_SUGGESTIONS':
      return {
        ...state,
        suggestions: [],
      };
    default:
      return { ...state };
  }
};

const Settings = ({
  fantasy,
  updateTeamName,
  toggleAutoPick,
  updateKeeper,
  updateKeeperRound,
  updateKeepers,
}) => {
  const {
    availablePlayers,
    teams,
    settings: { keeper, numOfRounds },
    keepers,
    draftStarted,
  } = fantasy;

  const init = () => {
    const keepersCopy = { ...keepers };
    return { keepers: keepersCopy, suggestions: [] };
  };

  // initiate state with keepers object and suggestion array
  const [state, dispatch] = useReducer(keeperReducer, {}, init);

  const [modalOpen, toggleModal] = useModal(false);
  const [showOverlay, toggleOverlay] = useState(false);

  //* x,y coordinates for modal popup
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  //* keep track of team selected
  const [teamId, changeTeamId] = useState(null);
  const [teamName, changeTeamName] = useState(null);
  const changeNameRef = useRef(null);

  // put focus back on modal after re-render
  useEffect(() => {
    if (teamName !== null) changeNameRef.current.focus();
  }, [teamName]);

  // * click (Edit)
  const handleEditClick = e => {
    const teamId = e.currentTarget.parentNode.parentNode.dataset.id;
    const teamName = e.currentTarget.dataset.name;
    console.log(teamName);
    changeTeamId(teamId);
    changeTeamName(teamName);

    setX(e.clientX);
    setY(e.clientY);
    toggleModal(true);
  };

  // * control input inside edit team name
  const onTeamNameChange = e => {
    e.preventDefault();
    if (e.target.value.match(/[<>]/)) return;
    changeTeamName(e.target.value);
  };

  const resetTeamInfo = () => {
    changeTeamId(null);
    changeTeamName(null);
  };

  const resetModal = () => {
    changeNameRef.current = null;
    toggleModal(false);
  };

  // * submit teamName change to redux store
  const submitTeamNameChange = e => {
    e.preventDefault();
    updateTeamName(teamId, teamName);
    resetTeamInfo();
    resetModal();
  };

  const handleAutoPickChange = e => {
    const teamId = Number(e.currentTarget.parentNode.parentNode.dataset.id);
    toggleAutoPick(teamId);
  };

  const onKeeperNameChange = e => {
    const teamId = e.currentTarget.parentNode.parentNode.parentNode.dataset.id;
    const name = e.target.value;
    changeTeamId(Number(teamId));
    const reg = new RegExp('^' + name, 'i');
    let selections =
      name.length >= 3
        ? availablePlayers
            .filter(player => player.Player.match(reg))
            .map(player => (
              <Suggestion
                key={player.id}
                data-id={player.id}
                onClick={onSuggestedPlayerClick}
              >
                {player.Player} (
                <span style={{ fontSize: '8px' }}>{player.Position}</span>)
              </Suggestion>
            ))
        : [];
    selections.length > 0 ? toggleOverlay(true) : null;
    dispatch({
      type: 'UPDATE_KEEPER',
      teamId,
      playerName: e.target.value,
      selections,
    });
  };

  const turnOffSuggesstions = e => {
    resetTeamInfo();
    toggleOverlay(false);
    dispatch({
      type: 'RESET_SUGGESTIONS',
    });
  };

  const onSuggestedPlayerClick = e => {
    const [player, position] = e.currentTarget.innerText
      .match(/^(\S+? \S+?) ([\s\S]+?)$/)
      .slice(1);
    const playerId = e.currentTarget.dataset.id;
    turnOffSuggesstions();
    updateKeeper(playerId, player, position.slice(1, -1), teamId);
    dispatch({
      type: 'UPDATE_KEEPER',
      teamId,
      playerName: player,
      position: position.slice(1, -1),
      playerId,
      selections: [],
    });
  };

  const handleKeeperRound = e => {
    const teamId = e.currentTarget.parentNode.parentNode.dataset.id;
    const round = e.target.value;
    updateKeeperRound(round, teamId);
    dispatch({
      type: 'UPDATE_KEEPER_ROUND',
      teamId,
      round,
    });
  };

  const handleUpdateKeepers = () => {
    if (
      Object.keys(keepers).some(
        keeper => keepers[keeper].playerId && !keepers[keeper].round,
      )
    ) {
      console.log('round was not entered');
      // ! make an error message
      return;
    } else if (Object.keys(keepers).every(keep => !keepers[keep].playerId)) {
      console.log('nothing to update');
      return;
    }
    updateKeepers();
    navigate('/fantasy/draftroom');
  };

  const teamsDisplay = teams.map(team => (
    <Team key={team.id} data-id={team.id}>
      <TeamName>
        {team.name}
        <Edit onClick={handleEditClick} data-name={team.name}>
          (edit)
        </Edit>
      </TeamName>

      <TeamAutopick>
        <input
          type="checkbox"
          name="keeper"
          data-id={team.id}
          onChange={handleAutoPickChange}
          value={team.autoPick}
          checked={team.autoPick}
        />
      </TeamAutopick>
      {keeper && !draftStarted && (
        <TeamKeeper>
          <Keeperform>
            <Keeper
              onChange={onKeeperNameChange}
              autoComplete="off"
              type="text"
              name="player"
              value={
                state.keepers[team.id] && state.keepers[team.id].playerName
              }
              placeholder="Add Keeper"
            />
            <Suggestions
              show={teamId === team.id && state.suggestions.length > 0}
            >
              {state.suggestions}
            </Suggestions>
          </Keeperform>
        </TeamKeeper>
      )}
      {keeper && !draftStarted && (
        <TeamKeeperRound>
          <DropDown
            onChange={handleKeeperRound}
            value={state.keepers[team.id] && state.keepers[team.id].round}
          >
            <option></option>
            {Array.from({ length: numOfRounds }, (_, i) => (
              <option key={i}>{i + 1}</option>
            ))}
          </DropDown>
        </TeamKeeperRound>
      )}
    </Team>
  ));
  return (
    <Layout>
      <Container>
        <TitleWrapper>
          <BackLink to="/fantasy/draftroom">
            <BackButton />
            <span>Back</span>
          </BackLink>
          <Title>Configure Draft</Title>
        </TitleWrapper>
        <Form>
          <HeaderWrapper>
            <Header>
              <TeamName>Team</TeamName>
              <TeamAutopick>Auto Pick?</TeamAutopick>
              {keeper && !draftStarted && <TeamKeeper>Keeper</TeamKeeper>}
              {keeper && !draftStarted && (
                <TeamKeeperRound>Round</TeamKeeperRound>
              )}
            </Header>
          </HeaderWrapper>

          <TeamsWrapper>
            {teamsDisplay}

            {modalOpen && (
              <Modal toggle={toggleModal} open={modalOpen} x={x} y={y}>
                <h3 style={{ textAlign: 'center' }}>Edit Team Name</h3>
                <TeamNameWindow>
                  <input
                    style={{ padding: '.5em' }}
                    type="text"
                    name="teamName"
                    value={teamName}
                    onChange={onTeamNameChange}
                    ref={changeNameRef}
                  />
                </TeamNameWindow>
                <Button onClick={submitTeamNameChange}>Submit</Button>
              </Modal>
            )}
          </TeamsWrapper>
          <UpdateButton
            disabled={!keeper || draftStarted}
            onClick={handleUpdateKeepers}
          >
            Update Keepers
          </UpdateButton>
        </Form>
      </Container>
      <SuggestionOverlay show={showOverlay} onClick={turnOffSuggesstions} />
    </Layout>
  );
};

Settings.propTypes = {
  fantasy: PropTypes.object.isRequired,
  updateTeamName: PropTypes.func.isRequired,
  toggleAutoPick: PropTypes.func.isRequired,
  updateKeeper: PropTypes.func.isRequired,
  updateKeeperRound: PropTypes.func.isRequired,

  updateKeepers: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    fantasy: state.fantasy,
  };
};

export default connect(
  mapStateToProps,
  {
    updateTeamName,
    toggleAutoPick,
    updateKeeper,
    updateKeeperRound,
    updateKeepers,
  },
)(Settings);
