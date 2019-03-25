import React from 'react';
import PropTypes from 'prop-types';
import { Link, navigate } from 'gatsby';
import { Redirect } from 'react-router-dom';
import styled from '@emotion/styled';
import Layout from '../components/layout/';
import SEO from '../components/seo';
import DraftTypeSetup from '../components/setup/draftTypeSetup';
import NFLSetup from '../components/setup/nflSetup';
import { connect } from 'react-redux';
import { setupNflDraftroom } from '../state/actions/nflActions';
import { setupFantasyDraftroom } from '../state/actions/fantasyActions';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
`;

const Form = styled.form`
  display: block;
  position: relative;
  font-size: 1rem;
  margin: 0 auto;
  max-width: 800px;
`;

const FormGroup = styled.div`
  display: ${p => (p.hidden ? 'none' : 'flex')};
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  overflow: visible;
  padding: 1em 1em;
  margin: 1rem 0;
  border-radius: 0.28571429rem;
  border: 1px solid rgba(34, 36, 38, 0.15);
  background: #fgfafb;
  border-color: rgba(34, 36, 38, 0.15);
  box-shadow: 0 2px 25px 0 rgba(34, 36, 38, 0.05) inset;
`;

const Button = styled.button`
  background-color: ${p => p.theme.color.primary};
  color: white;
  box-shadow: 0 0 0 0 rgba(34, 36, 38, 0.15) inset;
  width: 100%;
  display: block;
  font-size: 1rem;

  cursor: pointer;
  min-height: 1em;
  outline: 0;
  border: none;
  vertical-align: baseline;
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
`;

const Header = styled.h3`
  text-align: center;
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
      teamName: '',
      type: '',
      numOfTeams: '',
      numOfRounds: 15,
      positions: ['qb', 'rb', 'rb', 'wr', 'wr', 'te', 'flex', 'd', 'k'],
      selection: null,
    },
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleNflTeamClick = e => {
    const team = e.target.value;
    this.setState({
      nfl: {
        ...this.state.nfl,
        team: team,
      },
    });
  };

  handleNflSelectClick = e => {
    this.setState({
      nfl: {
        ...this.state.nfl,
        [e.target.name]: e.target.value,
      },
    });
  };

  typeClick = e => {
    const checked = e.target.value;
    const unChecked = checked === 'nfl' ? 'fantasy' : 'nfl';
    console.log(e.target.name);
    this.setState({
      [e.target.name]: checked,
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

  handleSubmit = async e => {
    e.preventDefault();
    let setupInfo;
    if (this.state.draftType === 'nfl') {
      setupInfo = { type: 'nfl', ...this.state.nfl };
      const result = await this.props.setupNflDraftroom(setupInfo);
      navigate('/nfl/draftroom');
      return null;
    } else {
      setupInfo = { type: 'fantasy', ...this.state.fantasy };
      this.props.setupFantasyDraftroom(setupInfo);
    }
  };

  render() {
    const { draftType, nfl, fantasy } = this.state;
    console.log(this.state);
    return (
      <Layout>
        <SEO title="Setup Draft Page" />
        <Title>Create a Mock Draft</Title>
        <Container>
          <Form>
            <FormGroup>
              <Header>Choose Type</Header>
              <DraftTypeSetup
                draftType={draftType}
                typeClick={this.typeClick}
              />
            </FormGroup>
            <FormGroup hidden={this.state.nfl.hidden}>
              <Header>NFL Draft Settings</Header>
              <NFLSetup
                nfl={nfl}
                handleTeamClick={this.handleNflTeamClick}
                handleSelectClick={this.handleNflSelectClick}
              />
            </FormGroup>
            <FormGroup hidden={this.state.fantasy.hidden}>
              <Header>Fantasy Draft Settings</Header>
            </FormGroup>

            <Button onClick={this.handleSubmit}>Setup Your Draft Room</Button>
          </Form>
        </Container>
      </Layout>
    );
  }
}

// SetupPage.propTypes = {
//   setupNflDraftroom: PropTypes.func.isRequired,
//   setupFantasyDraftroom: PropTypes.func.isRequired,
//   nfl: PropTypes.object.isRequired,
//   fantasy: PropTypes.object.isRequired,
// };

// const mapStateToProps = state => {
//   return {
//     nfl: state.nfl,
//     fantasy: state.fantasy,
//   };
// };
//
// export default connect(
//   mapStateToProps,
//   { setupNflDraftroom, setupFantasyDraftroom },
// )(SetupPage);

export default connect(
  state => ({ nfl: state.nfl, fantasy: state.fantasy }),
  dispatch => ({
    setupNflDraftroom: setupInfo => dispatch(setupNflDraftroom(setupInfo)),
    setupFantasyDraftroom: setupInfo =>
      dispatch(setupFantasyDraftroom(setupInfo)),
  }),
)(SetupPage);
