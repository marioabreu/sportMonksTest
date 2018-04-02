import React from 'react';
import ReactTable from 'react-table';

class StageTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const columns = [{
      Header: 'Position',
      accessor: 'position', // String-based value accessors!
    }, {
      Header: 'Team Name',
      accessor: 'team_name',
      id: 'team_name',
      accessor: d => <a href='#' id={d.team_id} onClick={this.props.dialogOpened}>{d.team_name}</a>
    }, {
      Header: 'Played',
      accessor: 'played',
    }, {
      Header: 'Won',
      accessor: 'won',
    }, {
      Header: 'Draw',
      accessor: 'draw',
    }, {
      Header: 'Lost',
      accessor: 'lost',
    }, {
      Header: 'Goals Scored',
      accessor: 'goals_scored',
    },  {
      Header: 'Goals Agains',
      accessor: 'goals_against',
    }, {
      Header: 'Difference',
      accessor: 'difference',
      id: 'differences'
    }, {
      Header: 'Points',
      accessor: 'points',
    }];

    return(
      <div>
        <h3>{this.props.data.stage_name} <small>Classificaion</small></h3>
        <hr />
        <ReactTable
          data={this.props.data.standings}
          columns={columns}
          minRows={ 0 }
          showPagination={false}
        />
      </div>
    );
  }
}

export default StageTable;
