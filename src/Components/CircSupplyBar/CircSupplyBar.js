import React, { useState } from 'react';
import classes from './CircSupplyBar.module.css';

const CircSupplyBar = (props) => {

    const [showInfo, getShowInfo] = useState(false);

    let width = (props.circulatingSupply / props.totalSupply) * 100; 
    let statusWidth = `${width}%`; 

    let progressBar = (
        <div className={classes.Bar}>
                 
                <div style={{ 
                    minHeight: '15px', 
                    width: statusWidth,
                              
                            }}
                />
            
            </div>

    )

    let details = (
        <div className={classes.Info}  
            onMouseOver={()=> getShowInfo(true)}
            onMouseOut={()=> getShowInfo(false)}
            >i</div>
    )

    if(props.maxSupply === null){
        progressBar = null
        details = null


    }

    let circulatingSupply = props.circulatingSupply.toLocaleString();
    let maxSupply = props.maxSupply === null ?  null : props.maxSupply.toLocaleString(); 

    return(
        <div className={classes.CircSupplyBar}>
            {showInfo && (
                    <div className={classes.MoreDetails}>
                        <p><span>Percentage:</span> {width.toString().slice(0,5)}%</p>
                        <p><span>Circulating Supply:</span> {circulatingSupply} {props.symbol}</p>
                        <p><span>Max Supply: </span>{maxSupply} {props.symbol}</p>
                    </div>
                )}
            <div className={classes.Details}>
                {details}
                
                <div>{circulatingSupply} {props.symbol}</div>
                
            </div>
            {progressBar}
        </div>
        )
}

export default CircSupplyBar; 