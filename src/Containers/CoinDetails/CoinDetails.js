import React, { Component } from 'react';
import classes from './CoinDetails.module.css';
import HistoryChart from '../../Components/HistoryChart/HistoryChart';
import axios from 'axios';
import Header from '../../Components/Header/Header';
import Spinner from '../../Components/Spinner/Spinner';
import BasicCoinInfoBox from '../../Components/BasicCoinInfoBox/BasicCoinInfoBox';
import DeveloperBubble from '../../Components/DeveloperBubble/DeveloperBubble';
import CoinHeadLogo from '../../Components/CoinHeadLogo/CoinHeadLogo';
import ActionBtn from '../../Components/ActionBtn/ActionBtn';
import Footer from '../../Components/Footer/Footer';

class CoinDetails extends Component {

    state = { 
        coinId: 'bitcoin',
        priceHistory: {},
        priceTimeStamps: {},
        loading: true, 
        selected: 'day',
        coinDetails: null,
        description: classes.DescriptionInfo

    }



    formatData  = (data) => {
        return data.map(el => {
            return el[1].toFixed(2)
            
        })
    }

    formatTimeStamps = (data) => {
        return data.map(el => {
            let timestamp = el[0]
            let date = new Date(timestamp)
            const month = date.toLocaleString('default', { month: 'long' }).slice(0,3);
            const year = date.getFullYear()

            const output = `${month}  ${year}`
            
            
            return output
            
        })

        
    }

    getData = (coinId) => { 

        //Today's Date (end date) in UNIX format
        const todayDate = Date.now(); 
        const endDate = todayDate.toString().slice(0,10);

        //Destructure today's date
        const date = new Date();
        const [year, day, month] = [ date.getFullYear(), date.getDate(), date.getMonth()]

        //One Year Date Variables
        let prevYearDate = new Date().getFullYear() - 1;
        let startDatePrevYear = new Date(prevYearDate, month, day).getTime(); 
        startDatePrevYear = startDatePrevYear.toString().slice(0,10);

        //One Month Date Variables
        let prevMonth = month - 1; 
        let startDatePrevMonth = new Date(year, prevMonth, day); 
        startDatePrevMonth = startDatePrevMonth.getTime().toString().slice(0,10);


        const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range?vs_currency=usd&from=${startDatePrevYear}&to=${endDate}`;
        const coinInfoUrl = `https://api.coingecko.com/api/v3/coins/${coinId}`;

        axios.get(url)
        .then(res => {
            console.log(res.data)
            let sevenDayData = res.data.prices.slice(-7);
            let thirtyDayData = res.data.prices.slice(-30);

            this.setState({
                coinId: coinId,
                loading: false,
                priceHistory: {
                    oneYear: this.formatData(res.data.prices),
                    oneMonth: this.formatData(thirtyDayData),
                    oneWeek: this.formatData(sevenDayData)
                },
                priceTimeStamps: {
                    oneYear: this.formatTimeStamps(res.data.prices),
                    oneMonth: this.formatTimeStamps(thirtyDayData),
                    oneWeek: this.formatTimeStamps(sevenDayData)
                }

            })
        })
        .catch(err => {
            console.log(err)
        })

        axios.get(coinInfoUrl)
        .then(res => {
            this.setState({ coinDetails: res.data})
            console.log(this.state.coinDetails.market_data.current_price.usd)
            

        })
        .catch(err =>{
            console.log(err)
        })


    }

    
    

    componentDidMount = () => {
        let coinId = localStorage.getItem('coinId');    
        this.getData(coinId); 

        localStorage.removeItem(coinId)
        
        
    }

    componentDidUpdate = () => {
        // console.log(this.state.priceHistory)
        // console.log(this.state.priceTimeStamps)
        console.log(this.state.coinDetails)
    }


    render(){
        let subBubbles = <div></div>;
        let basicDetails = <Spinner />
        let coinHead = <div></div>;
        let description = <p></p>;
        let descriptionContainer = <div></div>;


        if(this.state.coinDetails !== null){
            basicDetails = <BasicCoinInfoBox 
                                current_price={this.state.coinDetails.market_data.current_price.usd} 
                                rank={this.state.coinDetails.market_cap_rank}
                                priceChange24hr={this.state.coinDetails.market_data.price_change_percentage_24h}
                                high_24hr={this.state.coinDetails.market_data.high_24h.usd}
                                low_24hr={this.state.coinDetails.market_data.low_24h.usd}
                                marketcap={this.state.coinDetails.market_data.market_cap.usd}
                                marketcap_change={this.state.coinDetails.market_data.market_cap_change_percentage_24h.toFixed(2)}
                                
                            />
            description = {'info': this.state.coinDetails.description.en}
            descriptionContainer = <div dangerouslySetInnerHTML={ {__html: description['info']} } className={this.state.description}></div>
            subBubbles = (
                <div className={classes.SubBubbles}>
                {this.state.coinDetails.hashing_algorithm !== null ? <DeveloperBubble>{this.state.coinDetails.hashing_algorithm}</DeveloperBubble> : null }
                <DeveloperBubble><a href={this.state.coinDetails.links.homepage[0]}>{this.state.coinDetails.links.homepage[0]}</a></DeveloperBubble>
                <DeveloperBubble>Liquidity Score: {this.state.coinDetails.liquidity_score.toFixed(2)}</DeveloperBubble>
                </div>
            );
            coinHead = <CoinHeadLogo image={this.state.coinDetails.image.small} name={this.state.coinId} symbol={this.state.coinDetails.symbol} />

        }

        



        

        let detailsPage = (
            <div className={classes.Details}>
            
                <div className={classes.HeaderWrapper}>
                    <div className={classes.HeaderInfo}>
                        {coinHead}
                        <ActionBtn>Add to Portfolio</ActionBtn>
                        {subBubbles}
                        {basicDetails}
                        
                    </div>
                    
                </div>
                
            <div className={classes.ChartOptions}>  
            
            <ul>
                    { this.state.selected === 'day' ? <li className={classes.ChartTimeSelectActive} onClick={() => this.setState({selected: 'day'})}>7 Day</li> : <li className={classes.ChartTimeSelect} onClick={() => this.setState({selected: 'day'})}>7 Day</li>}
                    { this.state.selected === 'month' ? <li className={classes.ChartTimeSelectActive} onClick={() => this.setState({selected: 'month'})}>1 Month</li> : <li className={classes.ChartTimeSelect} onClick={() => this.setState({selected: 'month'})}>1 Month</li>}
                    { this.state.selected === 'year' ? <li className={classes.ChartTimeSelectActive} onClick={() => this.setState({selected: 'year'})}>1 Year</li> : <li className={classes.ChartTimeSelect} onClick={() => this.setState({selected: 'year'})}>1 Year</li>}
                </ul>
            </div>
            <HistoryChart data={this.state.priceHistory} timeStamps={this.state.priceTimeStamps} selected={this.state.selected}/>
            <div className={classes.Description}>
            <h2>About</h2>
            {descriptionContainer}
            { this.state.description === classes.DescriptionInfo ? <p onClick={()=> this.setState({ description: classes.DescriptionInfoExpanded})} className={classes.ExpandBtn}>Expand</p> : <p onClick={()=> this.setState({ description: classes.DescriptionInfo})} className={classes.ExpandBtn}>Hide</p> }
            </div>
            </div>
            

        )

        if(this.state.loading){
            detailsPage = <Spinner />
        }

        return(
            <div>
                <div className={classes.CoinDetails}>
                <Header />
                {detailsPage}    
                           
                </div>
                <Footer />

            </div>
             
            )
    }
};

export default CoinDetails; 