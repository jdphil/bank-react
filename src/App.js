import React, { Component } from 'react';
import './App.css';

const LLOYDS = 'https://api.lloydsbank.com/open-banking/v1.2/personal-current-accounts';

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
      this.setState({ result });
    }

    fetchBankData(){
      fetch(LLOYDS)
      .then(response =>
        response.json())
      .then(result => this.setBankData(result));
    }

    componentDidMount() {
      this.fetchBankData();
    }

  render() {
    const { result } = this.state;

    if (!result) { return null ;}

    let list = result.data;

    return (
      <div className="App">
        { list.map(item =>
          <div key={item.ProductName}>{item.ProductName}</div>
        )}
      </div>
    );
  }
}

export default App;
