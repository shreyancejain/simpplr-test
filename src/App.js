import React from 'react';
import ShopCard from './shop-card/ShopCard'
import './App.css';
import CircularProgress from '@material-ui/core/CircularProgress';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shopList: [],
      loading: true
    }
  }

  componentDidMount() {
    this.setState({ loading: true }, () => {
      fetch('/api/shops')
      .then(response => response.json())
      .then(shopList => {
        this.setState({
          loading: false,
          shopList: shopList || []
        })
      });
    });
  }

  render() {
    const { shopList, loading } = this.state;
    return (
      <div className="App">
        {loading && <CircularProgress  classes={{ root: 'progress' }} size={60} />}
        {shopList.map(
          (shop) => (
            <ShopCard shop={shop} key={shop.id}/>
          )
        )}
      </div>
    );
  }
}

export default App;
