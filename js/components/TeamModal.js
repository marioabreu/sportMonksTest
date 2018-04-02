import React from 'react';
import { Table, TableHeader, TableRow, TableCell } from 'carbon-react/lib/components/table';

class TeamModal extends React.Component {
  constructor(props) {
    super(props);
  }

  tableHeader() {
    return (
      <TableRow key='header' as='header'>
        <TableHeader/>
        <TableHeader
          name='number'
          scope='col'
          className='squad-table__number col'
        >
          Number
        </TableHeader>

        <TableHeader
          name='name'
          scope='col'
          className='squad-table__name col'
        >
          Name
        </TableHeader>
        <TableHeader
          name='Position'
          scope='col'
          className='squad-table__position col'
        >
          Position
        </TableHeader>
        <TableHeader
          name='nationality'
          scope='col'
          className='squad-table__nationality col'
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
          <TableRow className='row' key={element.player_id} as='body'>
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
        </div>

        <h3 className='club-name'> {this.props.teamInformation.name} <small>{this.props.teamInformation.founded}</small> </h3>
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
