import React from 'react';

class TestSoccerData extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      seasons: [],
      standings: []
    }
  }



  render() {
    // const { error, isLoaded, items } = this.state;
    // if (error) {
    //   return <div>Error: {error.message}</div>;
    // } else if (!isLoaded) {
    //   return <div>Loading...</div>;
    // } else {
    //   return (
    //     <ul>
    //       {items.map(item => (
    //         <li key={item.name}>
    //           {item.name} {item.price}
    //         </li>
    //       ))}
    //     </ul>
    //   );
    // }
    console.log(this.state.seasons);
    console.log(this.state.standings);

    return (
      <h1>Test soccer API</h1>
    )
  }
}

export default TestSoccerData;
