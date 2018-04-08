import React, { Component } from 'react';
import { moviesApi } from 'js/api/apiRequest';
import ActorRoles, { parseMovieData } from 'js/ActorRoles/ActorRoles';

import './App.css';

class App extends Component {
  state = {
    data: undefined,
  }

  componentDidMount() {
    moviesApi.get()
      .then((response) => {
        this.setState({ data: parseMovieData(response.data) });
      });
  }

  render() {
    const { data } = this.state;

    return (
      <div className="App">
        {!data && <div>Loading...</div>}
        {data && data.map(actor => (
          <ActorRoles
            key={actor[0]}
            name={actor[0]}
            roles={actor[1]}
          />
        ))}
      </div>
    );
  }
}

export default App;
