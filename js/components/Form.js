import React from 'react';

class Form extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.value);

  }

  render() {
    return (
      <div>
        <form className="select-league-form" onSubmit={ this.handleSubmit }>

          {/* <label htmlFor='leagues' className='form-label'>Leagues: </label> */}

          <select
            id='leagues'
            className='leagues-dropdown'
            name='leagues'
            value={this.state.value}
            onChange={ (event) => this.setState({value: event.target.value}) }
          >
            <option defaultValue='selected' disabled>Please select a league/season</option>
            {
              this.props.leagues.map( (league) => (
                league.seasons.map((season) => (
                  <option value={season.id} key={season.id}>{league.name + ' ' +season.name}</option>
                ))
              ))
            }
          </select>
          <button type='submit' className='btn btn-primary fetch'>Fetch</button>

        </form>
      </div>
    )
  }
}

export default Form;
