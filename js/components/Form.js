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
    // add default option to dropdown
    return (
      <div>
        <form className="select-league-form" onSubmit={ this.handleSubmit }>
          <div>
            <label htmlFor="leagues">Leagues: </label>
            <select
              id="leagues"
              name="leagues"
              value={this.state.value}
              onChange={ (event) => this.setState({value: event.target.value}) }
            >
              <option defaultValue='selected' disabled>Please select</option>
              {
                this.props.leagues.map( (league) => (
                  league.seasons.map((season) => (
                    <option value={season.id} key={season.id}>{league.name + ' ' +season.name}</option>
                  ))
                ))
              }
            </select>
          </div>
          <button type="submit" className="btn btn-primary fetch">Fetch</button>
        </form>

      </div>
    )
  }
}

export default Form;
