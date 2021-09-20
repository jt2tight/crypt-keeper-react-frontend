import React, { Component } from 'react';
import classes from './CoinList.module.css';
import CircSupplyBar from '../../Components/CircSupplyBar/CircSupplyBar';
import axios from 'axios';
import CoinListAction from '../../Components/CoinListAction/CoinListAction';
import Spinner from '../../Components/Spinner/Spinner';

class CoinList extends Component{

    state = {
        coinList: [],
        loading: true,
        showAction: false
    }

    loadData = () => {

        const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc'

        axios.get(url)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount = () => {
        const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc'

        axios.get(url)
        .then(res => {

            console.log(res)

            this.setState({
                coinList: res.data,
                loading: false
            })
        })
        .catch(err => {
            console.log(err)
        })
        
    }



    render(){


        let coinTable = (
            <table className={classes.CoinTable}>
                <thead>
                <th>Name</th>
                <th>Price</th>
                <th>Volume (24h)</th>
                <th>24h High</th>
                <th>24h Low</th>
                <th>Market Cap</th>
                <th>Circulating Supply</th>
                </thead>
            <tbody >
            {this.state.coinList.map(coin => {

                let volume = coin.total_volume.toLocaleString();
                let marketCap = coin.market_cap.toLocaleString();

                return(
                    <tr key={coin.id}>
                        <td>
                        <div className={classes.CoinItemHead}>
                        <img src={coin.image} alt="" />
                        <div className={classes.CoinTitle}>
                            <div><h3>{coin.name}</h3></div>
                            <div><h4>{coin.symbol}</h4></div>
                        </div>
                        </div>
                        </td>
                        <td>${coin.current_price}</td>
                        <td>${volume}</td>
                        <td>${coin.high_24h}</td>
                        <td>${coin.low_24h}</td>
                        <td>${marketCap}</td>
                        <td><CircSupplyBar 
                                circulatingSupply={coin.circulating_supply} 
                                totalSupply={coin.total_supply} 
                                maxSupply={coin.max_supply}
                                symbol={coin.symbol}/>
                        </td>
                        <td>
                            <CoinListAction coinId={coin.id}/>
                        </td>
                    </tr>
                    
                )
            })}
        </tbody>
        </table>

        )

        if(this.state.loading){
            coinTable = <Spinner />
        }

        return(
            <div className={classes.CoinList}>

            {coinTable}

            </div>
            )
    }
}

export default CoinList 