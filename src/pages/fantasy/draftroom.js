import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { graphql, navigate } from 'gatsby';
import Header from '../../components/draftroom/fantasy/header/Header.js';
import AvailablePlayers from '../../components/draftroom/fantasy/players/availablePlayers/AvailablePlayers';
import Results from '../../components/draftroom/fantasy/players/results/Results';
import styled from '@emotion/styled';
import Layout from '../../components/layout/';
import { connect } from 'react-redux';
import { getAllPlayers } from '../../state/actions/fantasyActions';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Helvetica, sans-serif;
  flex: 1 auto;
  margin: 0 -1em;
`;

const DraftContent = styled.div`
  flex: 1 auto;
  display: flex;
  justify-content: space-around;
  /* flex-direction: column; */
  background: #fff;
  padding: 0 1em;

  @media (max-width: 700px) {
    justify-content: center;
  }
`;

const FantasyDraftroom = ({ fantasy, data, getAllPlayers }) => {
  useEffect(() => {
    if (!fantasy.teamName) {
      navigate('/setup');
      return;
    }
    getAllPlayers(data.allContentfulFantasy.edges[0].node.fantasyPlayers);
  }, []);

  return (
    <Layout>
      <Container>
        <Header />
        <DraftContent>
          <AvailablePlayers />
          <Results />
        </DraftContent>
      </Container>
    </Layout>
  );
};

export const query = graphql`
  {
    allContentfulFantasy {
      edges {
        node {
          fantasyPlayers {
            id
            Player
            Position
            Team
            Bye
            OverallRank
          }
        }
      }
    }
  }
`;

FantasyDraftroom.propTypes = {
  fantasy: PropTypes.object.isRequired,
  getAllPlayers: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    fantasy: state.fantasy,
  };
};

export default connect(
  mapStateToProps,
  { getAllPlayers },
)(FantasyDraftroom);
