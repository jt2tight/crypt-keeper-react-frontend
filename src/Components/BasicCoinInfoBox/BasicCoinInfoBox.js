import React from 'react';
import classes from './BasicCoinInfoBox.module.css';

const BasicCoinInfoBox = (props) => {

    let priceChange24hr = props.priceChange24hr.toFixed(2);

    return(
        <div className={classes.BasicCoinInfoBox}>
            <div className={classes.PriceInfo}>
            <h2>${props.current_price.toFixed(2)}</h2>
            
                {props.priceChange24hr > 0 ? <div className={classes.PriceChangePercentGreen}> {priceChange24hr}% </div> : <div className={classes.PriceChangePercentRed}> {priceChange24hr}% </div> }
            
            </div>
            <ul>
                <li>Rank: #{props.rank}</li>
                <li>High 24hr: ${props.high_24hr}</li>
                <li>Low 24hr: ${props.low_24hr}</li>
                <li>Marketcap: ${props.marketcap}</li>
                


            </ul>
                

        </div>
        )
};

export default BasicCoinInfoBox;