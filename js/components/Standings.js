import React from 'react';
import { Table, TableHeader, TableRow, TableCell } from 'carbon-react/lib/components/table';
import { Row, Column } from 'carbon-react/lib/components/row';
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
            <StageTable key={i++} squad={this.props.squad} data={stage} dialogOpened={this.props.dialogOpened}/>
          ))
        }
      </div>
    )
  }
}

export default Standings;
