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
          const options = {
     headers: new Headers({'content-type': 'application/json'})
   };

      let apiReq1 = fetch(HALIFAX)
      .then(function(response){
        var contentType = response.headers.get("content-type");
        console.log(contentType);
        return response.json().then(function(json) {
            let ret = JSON.stringify(json);
            ret = JSON.parse(ret);
            return ret;
        });

});
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

    result.api1.data.map(item => 
      //console.log(item.ProductDescription)
      item.ProductDescription = item.ProductDescription.replace('�','&amp;pound;')
      );

     result.api2.data.map(item =>
      item.BankName = 'Lloyds'
      );

    let list = result.api1.data.concat(result.api2.data);  
    console.log(list);


//todo - spilt into components
    return (
      <div className="App">
      <SearchBar />
      <table>
      <tbody>
        { list.map(item =>
          <tr key={item.ProductIdentifier}>
          <td>{item.BankName}</td>
          <td><a href={item.ProductURL} target="_blank" rel="noopener noreferrer">{item.ProductName}</a></td>
          <td>{item.ProductSegment}</td>
          <td>{item.OverdraftOffered ? 'Yes' : 'No'}</td>
          {/*<td>{item.CardWithdrawalLimit}</td>*/}
          <td>{item.Currency}</td>
          <td>{item.ProductDescription}</td>
          </tr>
        )}
        </tbody>
        </table>
      </div>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Search..." />
        <p>
          <input type="checkbox" />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}


export default App;
