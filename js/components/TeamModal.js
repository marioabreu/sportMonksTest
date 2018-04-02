import React from 'react';
import { Table, TableHeader, TableRow, TableCell } from 'carbon-react/lib/components/table';

class TeamModal extends React.Component {
  constructor(props) {
    super(props);
  }

  teamName() {
    return this.props.data.standing.team_name
  }

  // teamLogo(){
  //   debugger;
  //   if (this.props.data.team === undefined) { return ''; }
  //   return this.props.data.team.logo_path
  // }

  tableHeader() {
    return (
      <TableRow key='header' as='header'>
        <TableHeader
          name='number'
          scope='col'
          className='squad-table__number'
          data-role='squad-table__number'
        >
          Number
        </TableHeader>

        <TableHeader
          name='name'
          scope='col'
          className='squad-table__name'
          data-role='squad-table__name'
        >
          Name
        </TableHeader>
        <TableHeader
          name='minutes'
          scope='col'
          className='squad-table__minutes'
          data-role='squad-table__minutes'
        >
          Minutes
        </TableHeader>
      </TableRow>
    )
  }

  tableRows() {
    let squad = this.props.data.squad;
    // if ((squad.length === 0) || (squad === undefined)) { return; }
    const rows = [];
      squad.forEach((player) => {
        rows.push(
          <TableRow key={player.id} as='body'>
            <TableCell
              name='number'
              scope='col'
              className='squad-table__number'
              data-role='squad-table__number'
            >
              { player.number }
            </TableCell>

            <TableCell
              name='name'
              scope='col'
              className='squad-table__name'
              data-role='squad-table__name'
            >
              { player.name }
            </TableCell>
            <TableCell
              name='position'
              scope='col'
              className='squad-table__position'
              data-role='squad-table__position'
            >
              { player.position }
            </TableCell>
            <TableCell
              name='nationality'
              scope='col'
              className='squad-table__nationality'
              data-role='squad-table__nationality'
            >
              { player.nationality }
            </TableCell>
          </TableRow>
        );
      });
      return rows;
    }

  render() {
    return (
      <div>
        <div className='team-logo'>
          {/* <img src={this.teamLogo()} alt={`team-logo-${this.teamName()}`} /> */}
        </div>

        <span> {this.teamName()} </span>
        <div>
          <Table key={1} className='table squad-table' thead={ this.tableHeader() }>
            { this.tableRows() }
          </Table>
        </div>
      </div>
    )
  }
}

export default TeamModal;
