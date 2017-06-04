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
      combinedData["api2"] = values[1];
      return combinedData;
        })
      .then(combinedData => this.setBankData(combinedData));



      //.then(result => this.setBankData(result));
    }

    componentDidMount() {
      this.fetchBankData();
    }

  render() {
    const { result } = this.state;

    if (result == null) { return null ;}
    //console.log(result.api1.data);

    result.api1.data.map(item =>
      item.BankName = 'Halifax'
      );

     result.api2.data.map(item =>
      item.BankName = 'Lloyds'
      );

    let list = result.api1.data.concat(result.api2.data);  
    console.log(list);

    return (
      <div className="App">
      <table>
      <tbody>
        { list.map(item =>
          <tr key={item.ProductIdentifier}>
          <td>{item.BankName}</td>
          <td>{item.ProductName}</td>
          
          </tr>
        )}
        </tbody>
        </table>
      </div>
    );
  }
}

export default App;
