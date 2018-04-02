
import React from 'react';
import Standings from './Standings';
import StageTable from './StageTable';

import { shallow } from 'enzyme';

describe('Standings', () => {
  const stages = [{
    name: "Championship Round",
    seasonId: "6361",
    standings: [{
      difference: 34,
      draw: 6,
      goalagainst: 24,
      goals_scored: 58,
      lost: 2,
      played: 26,
      points: 60,
      position: 1,
      team_id: 293,
      team_name: "Brøndby",
      won: 18
    },
    {
      difference: 31,
      draw: 3,
      goals_against: 29,
      goals_scored: 60,
      lost: 4,
      played: 26,
      points: 60,
      position: 2,
      team_id: 939,
      team_name: "Midtjylland",
      won: 19
    }]
  }];

  const teamDetails = jasmine.createSpy('teamDetails');

  wrapper = shallow(
    <Standings standings={stages} handleTeamClick={teamDetails} />
  );

  describe('render', () => {
    it('has a container class', () => {
      expect(wrapper.hasClass('batatas')).toBeTruthy();
    });
  })
});
