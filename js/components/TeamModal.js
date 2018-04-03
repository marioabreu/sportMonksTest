import React from 'react';
import { Table, TableHeader, TableRow, TableCell } from 'carbon-react/lib/components/table';

class TeamModal extends React.Component {
  constructor(props) {
    super(props);
  }

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
          name='Position'
          scope='col'
          className='squad-table__position'
          data-role='squad-table__position'
        >
          Position
        </TableHeader>
        <TableHeader
          name='nationality'
          scope='col'
          className='squad-table__nationality'
          data-role='squad-table__nationality'
        >
          Nationality
        </TableHeader>
      </TableRow>
    )
  }

  tableRows() {
    const rows = [];
    this.props.teamSquad.map((element) => {
        rows.push(
          <TableRow key={element.player_id} as='body'>
            <TableCell
              name='number'
              scope='col'
              className='squad-table__number'
            >
              { element.number }
            </TableCell>

            <TableCell
              name='name'
              scope='col'
              className='squad-table__name'
            >
              { element.name }
            </TableCell>
            <TableCell
              name='position'
              scope='col'
              className='squad-table__position'
            >
              { element.position }
            </TableCell>
            <TableCell
              name='nationality'
              scope='col'
              className='squad-table__nationality'
            >
              { element.nationality }
            </TableCell>
          </TableRow>
        );
      });
      return rows;
    }

  render() {
    return (
      <div>
       <div className='row modal__header'>
          <div className='modal__team-logo' className='col'>
            <img src={this.props.teamInformation.logo} alt={`team-logo-${this.props.teamInformation.name}`} />
          </div>

          <h3> {this.props.teamInformation.name} <small>{this.props.teamInformation.founded}</small> </h3>
        </div>
        <div>

          <Table className='table squad-table' thead={ this.tableHeader() }>
            { this.tableRows() }
          </Table>
        </div>
      </div>
    )
  }
}

export default TeamModal;
