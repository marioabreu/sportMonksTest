import React from 'react';
import StageTable from './StageTable';

class Standings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let i = 0;
    return (
      <div>
        {
          this.props.standings.map((stage) => (
            <StageTable
              key={i++}
              squad={this.props.squad}
              data={stage}
              handleTeamClick={this.props.handleTeamClick}
            />
          ))
        }
      </div>
    )
  }
}

export default Standings;
