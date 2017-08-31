import './App.css';

// import Apollo
import { ApolloClient, ApolloProvider, gql, graphql } from 'react-apollo';
import React, { Component } from 'react';

import logo from './logo.svg';

const client = new ApolloClient();
const channelsListQuery = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }
`;
const ChannelsList = ({ data: { loading, error, channels } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return <ul>{channels.map(ch => <li key={ch.id}>{ch.name}</li>)}</ul>;
};
const ChannelsListWithData = graphql(channelsListQuery)(ChannelsList);
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to Apollo</h2>
          </div>
          <ChannelsListWithData />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
