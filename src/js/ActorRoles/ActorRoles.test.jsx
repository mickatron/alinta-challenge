
import React from 'react';
import { shallow } from 'enzyme';

import ActorRoles, { parseMovieData } from './ActorRoles';

const mockData = [
  {
    name: 'Beverly Hills Cop',
    roles: [{ name: 'Axel Foley', actor: 'Eddie Murphy' }, { name: 'Billy Rosewood', actor: 'Judge Reinhold' }, { name: 'Mikey Tandino', actor: '' }],
  },
  {
    name: 'Another Movie',
    roles: [{ name: 'Axels Foley', actor: 'Eddie Murphy' }, { name: 'Billy Rosewood', actor: 'Judge Reinhold' }],
  },
];

describe('ActorRoles:', () => {
  let component = null;
  describe('renders', () => {
    it('a snapshot', () => {
      component = shallow((
        <ActorRoles
          name="Some Actor"
          roles={[
            { name: 'Axel Foley' },
            { name: 'Axels Foley' },
          ]}
        />
      ));
      expect(component).toMatchSnapshot();
    });
  });

  describe('{parseMovieData}:', () => {
    it('parses movie api data', () => {
      const parsedData = parseMovieData(mockData);
      expect(parsedData).toMatchSnapshot();
      expect(parsedData.length).toEqual(2);
      // first item has correct actor
      expect(parsedData[0][0]).toEqual('Eddie Murphy');
      // first item has correct number of roles
      expect(parsedData[0][1].length).toEqual(2);
    });
  });
});
