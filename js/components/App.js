import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Form from './Form';
import Standings from './Standings';
import Textbox from 'carbon-react/lib/components/textbox';
import TeamModal from './TeamModal';

const TOKEN='HOLCAStI6Z0OfdoPbjdSg5b41Q17w2W5P4WuoIBdC66Z54kUEvGWPIe33UYC';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    height: '750px',
    overlfow: 'scroll'
  }
};

Modal.setAppElement('#app')

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      leagues: [],
      stages: [],
      dialogOpened: false,
      selectedSeasonId: '',
      selectedTeamInfo: {},
      selectedSquad: []
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.teamDetails = this.teamDetails.bind(this);

  }

  openModal() {
    this.setState({dialogOpened: true});
  }

  closeModal() {
    this.setState({dialogOpened: false});
  }

  componentWillMount() {
    this.fetchLeagues(this.state.leagues);
  }

  fetchLeagues = (leagues) => {
    fetch(`https://soccer.sportmonks.com/api/v2.0/leagues?api_token=${TOKEN}`)
      .then(res => res.json())
      .then((result) => {
        result.data.map(league => {
          leagues.push({ id: league.id, name: league.name, seasons: [] });
        });

        this.fetchSeasons(leagues)
      },
      (error) => {
        this.setState({
          error
        });
      }
    );
  }

  fetchSeasons = (leagues) => {
    fetch(`https://soccer.sportmonks.com/api/v2.0/seasons?api_token=${TOKEN}`)
    .then(res => res.json())
    .then((result) => {
      let standings = this._availableData(result.data);

      standings.map(season => {
        let league = leagues.find( (league) => league.id === season.league_id )
        league.seasons.push({ id: season.id, name: season.name });
      });

      this.setState({
        leagues: leagues
      });
    },
    (error) => {
      this.setState({
        error
      });
    });
  }

  fetchStandings = (seasonId) => {
    let stageStandings = [];
    let stageAux;

    fetch(`https://soccer.sportmonks.com/api/v2.0/standings/season/${seasonId}?api_token=${TOKEN}`)
    .then(res => res.json())
    .then((result) => {
      result.data.map((stage) => {
        stageAux = {
          name: stage.name,
          seasonId: seasonId,
          standings: []
        }

        let stageStanding = stage.standings.data;

        stageStanding.map((standing) => {
          let tempStanding = {
            position: standing.position,
            team_id: standing.team_id,
            team_name: standing.team_name,
            played: standing.overall.games_played,
            won: standing.overall.won,
            draw: standing.overall.draw,
            lost: standing.overall.lost,
            goals_scored: standing.overall.goals_scored,
            goals_against: standing.overall.goals_against,
            difference: this._difference(standing.overall.goals_scored, standing.overall.goals_against),
            points: standing.total.points
          }

          stageAux.standings.push(tempStanding);
        });

        stageStandings.push(stageAux);

        this.setState({
          stages: stageStandings,
          selectedSeasonId: seasonId
        });
      });

    },
    (error) => {
      this.setState({ error });
    });
  }

  fetchTeamDetails(teamId) {
    fetch(`https://soccer.sportmonks.com/api/v2.0/teams/${teamId}?api_token=${TOKEN}`)
    .then(res => res.json())
    .then((result) => {
      this.setState({
        selectedTeamInfo: {
          logo: result.data.logo_path,
          name: result.data.name,
          founded: result.data.founded
        }
      });
    });
  };

  fetchSquadInformation(teamId, seasonId) {
    let squad = [];

    fetch(`https://soccer.sportmonks.com/api/v2.0/squad/season/${seasonId}/team/${teamId}?api_token=${TOKEN}&include=position,player`)
    .then(res => res.json())
    .then((result) => {

      result.data.map((element) => {
        if (element.position === null) { alert('boom!'); }

        let player = element.player.data;
        let formatedPlayer = {
          number: element.number,
          name: player.common_name,
          position: element.position.data.name,
          height: player.height,
          nationality: player.nationality,
          weight: player.weight
        }
        squad.push(formatedPlayer);
      });

      this.setState({
        dialogOpened: true,
        selectedSquad: squad
      });
    });
  }

  teamDetails(seasonId, teamId){
    this.fetchTeamDetails(teamId);
    this.fetchSquadInformation(teamId, seasonId);
  }
  squadModal() {
    return(
      <div>
        <Modal
          isOpen={this.state.dialogOpened}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <TeamModal teamSquad={this.state.selectedSquad} teamInformation={this.state.selectedTeamInfo} />
        </Modal>
      </div>
    )
  }

  _difference = (goals_scored, goals_against) => {
    return parseInt(goals_scored) - parseInt(goals_against);
  }

  _availableData(standings){
    return standings.filter((element) => ((element.name.indexOf('2017') >=0) || (element.name.indexOf('2018') >=0)));
  }



  render() {
    return (
      <div className='container'>
        <div className='row'>
          <h1 className='app-title'>Soccer API</h1>
        </div>

        <div className='row'>
          <Form leagues={ this.state.leagues } onSubmit={this.fetchStandings} />
        </div>

        <div className='row'>
          <Standings standings={this.state.stages } handleTeamClick={this.teamDetails} />
        </div>
        { this.squadModal() }
      </div>
    );
  }
}

export default App;
