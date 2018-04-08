import PropTypes from 'prop-types';
import flow from 'lodash/fp/flow';
import flatMap from 'lodash/fp/flatMap';
import filter from 'lodash/fp/filter';
import groupBy from 'lodash/fp/groupBy';
import pairs from 'lodash/fp/toPairs';
import sortBy from 'lodash/fp/sortBy';
import uniqBy from 'lodash/fp/uniqBy';
import React from 'react';

export default function ActorRoles(props) {
  const { name, roles } = props;

  return (
    <React.Fragment key={name}>
      <strong>{name}</strong>
      <ul>
        {roles.map(role => <li key={role.name}>{role.name}</li>)}
      </ul>
    </React.Fragment>
  );
}

ActorRoles.propTypes = {
  name: PropTypes.string.isRequired,
  roles: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
};


export const parseMovieData = flow([
  sortBy('name'),
  flatMap(movie => movie.roles),
  uniqBy(role => role.name),
  filter(role => role.actor && role.name),
  groupBy('actor'),
  pairs,
  sortBy(item => item[0]),
]);