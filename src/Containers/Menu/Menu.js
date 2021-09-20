import React, { Component } from 'react';
import classes from './Menu.module.css';
import axios from 'axios';

class Menu extends Component{

    state = {
        searchQuery: '',
        coinName: '',
        coinId: '',
        coinData: {
            symbol: null,
            image: null,
            marketcap: null,
            price: null,
            volume: null
        }
    }

    async LoadData(){
        const url = 'https://api.coingecko.com/api/v3/coins/cardano'
        console.log('Load Data')
        try {
            const res = await axios.get(url);
            const data = await res.data;
            const price = await data.market_data.current_price.usd
            console.log(price)

            this.setState({
                coinData: {
                    price: price
                }
            })
        } catch (err){
            console.log(err)
        }
    }

    componentDidMount(){
        const url = 'https://api.coingecko.com/api/v3/coins/cardano'

        // let price; 
        let marketcap;

        axios.get(url).then(res => {
            console.log(res.data)
            // console.log(res.data.tickers[2].last)
            marketcap = res.data.market_data.market_cap.usd;
            console.log(marketcap)
            if (marketcap / 1000000000 > 1){
                marketcap = String(marketcap / 1000000000).slice(0,6);
                marketcap = '$' + marketcap + 'B'
                
            } else {
                marketcap = String(marketcap / 1000000).slice(0,5);
                marketcap = '$' + marketcap + 'M'
            }

            // price = String(res.data.market_data.current_price.usd).slice(0,7);

            // console.log(price)
            
            this.setState({
                coinName: res.data.name,
                coinId: res.data.id,
                coinData:{
                    symbol: res.data.symbol,
                    image: res.data.image.thumb,
                    marketcap: marketcap,
                    volume: res.data.tickers[2].volume

                }
            })
        })
        .catch(err => {
            console.log(err)
        })

        this.LoadData();
        setInterval(this.LoadData.bind(this), 5000)
        
    }

    render(){

        return(
            <div className={classes.Menu}>
                <div className={classes.Header}>
                    <h1>CRYPT KEEPER</h1>
                </div>
                <div className={classes.CoinList}>
                    
                        <div className={classes.CoinHeader}>
                            <div className={classes.CoinTitle}>
                                <div>
                                <img src={this.state.coinData.image} alt="" />
                                </div>
                                <div className={classes.CoinName}>
                                <h2>{this.state.coinName}</h2>
                                
                                <div className={classes.CoinSymbol}>
                                {this.state.coinData.symbol}
                                </div>
                                </div>
                            </div>
                            
                            
                        </div>
                        <div className={classes.CoinDetails}>
                        <ul>
                            <li>Marketcap: {this.state.coinData.marketcap}</li>
                            <li>Price: ${this.state.coinData.price}</li>
                        </ul>

                        </div>
                        
                    
                    <div>

                    </div>
                </div>

            </div>
            )
    }
}

export default Menu; 