import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Form from './Form';
import Standings from './Standings';
import Textbox from 'carbon-react/lib/components/textbox';
import TeamModal from './TeamModal';


// import DialogFullScreen from 'carbon-react/lib/components/dialog-full-screen';
const tokens = [
  '6WcFXpOL3OTmicAadF1V9t5aOFc4huUub1xKnfDYOkKv8GhvDy6pGXkju2mA',
  'HOLCAStI6Z0OfdoPbjdSg5b41Q17w2W5P4WuoIBdC66Z54kUEvGWPIe33UYC',
  '1WFHIyPjtnendfqDjtv3edGT3c7PoUaIEnov8mxx4hRerq69wQlzjkX7exI0',

]
// const TOKEN='BtvrMTb6bwYNpbk95zMlF5l11EYukogDLlms31bIsKixOS7cIfTyLKI9TJCs';
// const TOKEN='6WcFXpOL3OTmicAadF1V9t5aOFc4huUub1xKnfDYOkKv8GhvDy6pGXkju2mA';
const TOKEN='HOLCAStI6Z0OfdoPbjdSg5b41Q17w2W5P4WuoIBdC66Z54kUEvGWPIe33UYC';
// const TOKEN='1WFHIyPjtnendfqDjtv3edGT3c7PoUaIEnov8mxx4hRerq69wQlzjkX7exI0';
// const TOKEN='9OWPHwsWVgcHmJEr6RoYsWGr7rGKDrt69psUSaEsy2o83FnwMiA7Z97ZWvr7';

//limitaion of 1500 request per hour

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
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
      teams: [],
      logoPaths: []
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({dialogOpened: true});
  }

  closeModal() {
    this.setState({dialogOpened: false});
  }

  componentWillMount() {
    this.fetchSoccerData();
  }

  componentDidMount(){

  }

  fetchSoccerData = () => {
    this.fetchLeagues(this.state.leagues);
  }

  fetchLeagues(leagues) {
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

  availableData(standings){
    return standings.filter((element) => ((element.name.indexOf('2017') >=0) || (element.name.indexOf('2018') >=0)));
  }

  fetchSeasons = (leagues) => {
    fetch(`https://soccer.sportmonks.com/api/v2.0/seasons?api_token=${TOKEN}`)
    .then(res => res.json())
    .then((result) => {
      let standings = this.availableData(result.data);

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
    let teams = [];
    fetch(`https://soccer.sportmonks.com/api/v2.0/standings/season/${seasonId}?api_token=${TOKEN}`)
    .then(res => res.json())
    .then((result) => {
      result.data.map((stage) => {
        stageAux = {
          name: stage.name,
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

          //Atualizar tabela classificativa
          stageAux.standings.push(tempStanding);
          let team = {
            id: standing.team_id,
            standing: standing,
            squad: []
          }

          if (this.state.teams.find((t) => t.id === team.id)) {
            console.log('Team already Saved!');
            return;
          }

          fetch(`https://soccer.sportmonks.com/api/v2.0/squad/season/${seasonId}/team/${standing.team_id}?api_token=${TOKEN}&include=position,player`)
          .then(res => res.json())
          .then((result) => {
            let elements = result.data;

            elements.map((element) => {
              let player = element.player.data;

              let formatedPlayer = {
                number: element.number,
                name: player.common_name,
                position: element.position.data.name,
                height: player.height,
                nationality: player.nationality,
                weight: player.weight
              }
              team.squad.push(formatedPlayer);
            });

            this.setState((prevState) => {
              teams: prevState.teams.push(team)
            });
          });
        });

        stageStandings.push(stageAux);

      });
      this.setState({
        stages: stageStandings
      });


    },
    (error) => {
      this.setState({ error });
    });
  }

  updateTeamIds(teamId, collection){
    if (!collection.includes(teamId)) {
      collection.push(teamId)
    }
  }

  detailedTeamInformation(){
    if (event === undefined) { return; }
    let teamId = parseInt(event.target.id)

    return {
      team: this.state.teams.find((team) => team.id === teamId),
      squad: this.state.loadedSquads.filter(x => x.team_id === teamId)
    };
  }

  _selectedTeam(teamId) {
    return this.state.teams.find((team) => team.id === parseInt(teamId));
  }

  modal() {
    if (event === undefined) { return; }
    let selectedTeamId = event.target.id;
    return(
      <div>
        <Modal
          isOpen={this.state.dialogOpened}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <TeamModal data={this._selectedTeam(selectedTeamId)} />
        </Modal>
      </div>
    )
  }

  _difference = (goals_scored, goals_against) => {
    return parseInt(goals_scored) - parseInt(goals_against);
  }

  // fetchTeamsImage(teamId) {
  //   let logoPath='';
  //   fetch(`https://soccer.sportmonks.com/api/v2.0/teams/${teamId}}?api_token=${TOKEN}`)
  //   .then(res => res.json())
  //   .then((result) => {
  //     logo_path = result.data.logo_path;
  //   });
  //   return logoPath;
  // };

  render() {
    return (
      <div className="container">
        <h1 className="app-title">Soccer API</h1>
        <Form leagues={ this.state.leagues } onSubmit={this.fetchStandings} />
        <Standings standings={this.state.stages } dialogOpened={this.openModal}/>
        { this.modal() }
        { `Standings: ${this.state.standings}`}
        { `Saved Teams: ${this.state.teams.length}`}
      </div>
    );
  }
}

export default App;
