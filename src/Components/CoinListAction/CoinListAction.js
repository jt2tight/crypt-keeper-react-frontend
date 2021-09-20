import React, { useState, useRef, useEffect } from 'react';
import classes from './CoinListAction.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";


const CoinListAction = (props) => {

    const [showAction, getShowAction] = useState(false)

    const history = useHistory();

    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            getShowAction(false);
        }
    };
    
    useEffect(()=> {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click',handleClickOutside, true)
        }

    })

    const handleRedirect = () => {
        const coinId = props.coinId; 
        localStorage.setItem('coinId', coinId);
        let path = `details/${coinId}`;
        history.push(path)
    }

    return(
        <div>
            <FontAwesomeIcon icon={faEllipsisV} 
                            style={{ cursor: 'pointer'}}
                            onClick={()=> getShowAction(prevShowAction => !prevShowAction)}
                            />
                            <div ref={ref}>
                            {showAction && (
                                <div className={classes.Action}>
                                    <p onClick={()=> handleRedirect()}>View Chart</p>
                                    <p>Add to Portfolio</p>
                                </div>
                            
                            )}
                            </div>

        </div>)
}

export default CoinListAction; 