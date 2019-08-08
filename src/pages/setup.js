import React from 'react';
import PropTypes from 'prop-types';
import { Link, navigate } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '../components/layout/';
import SEO from '../components/common/seo';
import DraftTypeSetup from '../components/setup/draftTypeSetup';
import NFLSetup from '../components/setup/nflSetup';
import { connect } from 'react-redux';
import { setupNflDraftroom } from '../state/actions/nflActions';
import { setupFantasyDraftroom } from '../state/actions/fantasyActions';
import FantasySetup from '../components/setup/fantasySetup';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: white;
  align-items: center;
  flex: 1 auto;
`;

const Title = styled.h1`
  text-align: center;
  font-family: monospace;
  color: white;
`;

const Form = styled.form`
  flex: 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  font-size: 1rem;
  max-width: 800px;
  width: 100%;
  margin-bottom: 0;
`;

const FormGroup = styled.div`
  display: ${p => (p.hidden ? 'none' : 'flex')};
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  overflow: visible;
  padding: 1em 1em;
  margin: 0 0 0.5em 0;
  border-radius: 0.28571429rem;
  border: 1px solid rgba(34, 36, 38, 0.15);
  background: '#fgfafb';
  border-color: rgba(34, 36, 38, 0.15);
  box-shadow: 0 2px 25px 0 rgba(34, 36, 38, 0.05) inset;
  &:first-of-type {
    margin-bottom: 1em;
  }
`;

const TypeGroup = styled(FormGroup)`
  /* flex-basis: 40%; */
`;

const SettingsGroup = styled(FormGroup)`
  flex: 1 auto;
`;

const Header = styled.h3`
  text-align: center;
`;

const Memo = styled.h2`
  text-align: center;
  text-transform: uppercase;
  color: yellow;
`;

class SetupPage extends React.Component {
  state = {
    draftType: '',
    nfl: {
      hidden: true,
      team: '',
      draftBoard: 'default',
      teamNeeds: 'default',
    },
    fantasy: {
      hidden: true,
      team: '',
      numOfTeams: '',
      numOfRounds: 15,
      positions: ['qb', 'rb', 'rb', 'wr', 'wr', 'te', 'flex', 'd', 'k'],
      pickNumber: null,
    },
  };

  componentDidMount() {
    if (localStorage.nflSetupStore) {
      localStorage.removeItem('nflSetupStore');
    }
  }
  // changes state when NFL settings are clicked
  handleNflSelectClick = e => {
    this.setState({
      nfl: {
        ...this.state.nfl,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleFantasyClick = e => {
    this.setState({
      fantasy: {
        ...this.state.fantasy,
        [e.target.name]: e.target.value,
      },
    });
  };

  typeClick = type => {
    const checked = type;
    const unChecked = checked === 'nfl' ? 'fantasy' : 'nfl';

    this.setState({
      draftType: checked,
      [checked]: {
        ...this.state[checked],
        hidden: false,
      },
      [unChecked]: {
        ...this.state[unChecked],
        hidden: true,
      },
    });
  };

  handleNFLSubmit = async e => {
    e.preventDefault();
    debugger;
    let setupInfo = { type: 'nfl', ...this.state.nfl };
    const result = await this.props.setupNflDraftroom(setupInfo);
    navigate('/nfl/draftroom');
    return null;
  };

  handleFantasySubmit = setupInfo => {
    setupInfo = { type: 'fantasy', ...setupInfo };
    this.props.setupFantasyDraftroom(setupInfo);
    navigate('/fantasy/draftroom');
    return null;
  };

  disableButton = type => {
    return !!this.state[type].team;
  };

  render() {
    const { draftType, nfl, fantasy } = this.state;
    return (
      <Layout background="default">
        <SEO title="Setup Draft Page" />
        <Title>Create Draft</Title>
        <Container>
          <Form>
            <TypeGroup>
              <DraftTypeSetup
                draftType={draftType}
                typeClick={this.typeClick}
              />
            </TypeGroup>
            <SettingsGroup hidden={this.state.nfl.hidden}>
              <Memo>Under Construction</Memo>
              {/* <NFLSetup
                nfl={nfl}
                handleSelectClick={this.handleNflSelectClick}
                submit={this.handleNFLSubmit}
              /> */}
            </SettingsGroup>
            <SettingsGroup hidden={this.state.fantasy.hidden}>
              <FantasySetup submit={this.handleFantasySubmit} />
            </SettingsGroup>
          </Form>
        </Container>
      </Layout>
    );
  }
}

SetupPage.propTypes = {
  setupNflDraftroom: PropTypes.func.isRequired,
  setupFantasyDraftroom: PropTypes.func.isRequired,
  nfl: PropTypes.object.isRequired,
  fantasy: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    nfl: state.nfl,
    fantasy: state.fantasy,
  };
};

export default connect(
  mapStateToProps,
  { setupNflDraftroom, setupFantasyDraftroom },
)(SetupPage);
