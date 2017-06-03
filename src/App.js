import React, { Component } from 'react';
import './App.css';

const LLOYDS = 'https://api.lloydsbank.com/open-banking/v1.2/personal-current-accounts';
const HALIFAX = 'https://api.halifax.co.uk/open-banking/v1.2/personal-current-accounts';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      result: null
    };

    this.setBankData = this.setBankData.bind(this);
    this.fetchBankData = this.fetchBankData.bind(this);
}
    setBankData(result) {
      //console.log(result);
      this.setState({ result });
    }

    fetchBankData(){
      let apiReq1 = fetch(HALIFAX)
      .then(response =>
        response.json());
      //.then(result => this.setBankData(result));

      let apiReq2 = fetch(LLOYDS)
      .then(response =>
        response.json());

      let combinedData = {"api1":{},"api2":{}};

      Promise.all([apiReq1,apiReq2])
      .then(function(values){
       combinedData["api1"] = values[0];
       //console.log(values[0]);
       //console.log(values[1]);
       combinedData["api2"] = values[1];
       //console.log(combinedData);
        })
      .then(this.setBankData(combinedData));



      //.then(result => this.setBankData(result));
    }

    componentDidMount() {
      this.fetchBankData();
    }

  render() {
    const { result } = this.state;

    if (!result) { return null ;}

    const util = require('util')

    console.log(util.inspect(this.state, {showHidden: false, depth: null}));

    console.log(this.state);


    let list = result;
    //console.log(list);

    return (
      <div className="App">
        { list.map(item =>
          <div key={item.ProductIdentifier}><p>{item.ProductName}</p></div>
        )}
      </div>
    );
  }
}

export default App;
