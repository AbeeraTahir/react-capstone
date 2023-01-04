import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCoins } from '../redux/AllCoins/coinSlice';
import banner from '../images/banner.jpg';
import searchIcon from '../images/find.svg';
import '../styles/coinsList.css';

const CoinsList = () => {
  const dispatch = useDispatch();
  const coins = useSelector((state) => state.coins.coinsData);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (coins.length === 0) {
      dispatch(getCoins());
    }
  }, [dispatch, coins.length]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const searchedCoin = coins.filter((coin) => coin.name.toLowerCase()
    .match(search.toLowerCase()) || coin.symbol.toLowerCase()
    .match(search.toLowerCase()));

  return (
    <div className="coins-container">
      <img src={banner} alt="banner" />
      <div className="search-field">
        <img src={searchIcon} alt="search icon" />
        <input
          type="search"
          placeholder="Search cryptocurrency"
          onChange={handleChange}
          value={search}
        />
      </div>
      <div className="coins-list">
        {searchedCoin.map((coin) => (
          <Link to={`/details/${coin.id}`} key={coin.id}>
            <div className="coin-card">
              <div className="coin-logo">
                <img src={coin.icon} alt="coin icon" />
              </div>
              <div className="coin-desc">
                <h2>{coin.name}</h2>
                <p>
                  Price:
                  {' ~$'}
                  {coin.price < 1000 ? coin.price.toFixed(2) : (coin.price / 1000).toFixed(1)}
                  {coin.price > 1000 ? 'K' : ''}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CoinsList;
