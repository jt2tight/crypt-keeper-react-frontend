import React from 'react';
import { Line } from 'react-chartjs-2';



const HistoryChart = (props) => {


    const priceHistory = props.data; 

    const priceTimeStamps = props.timeStamps; 

    const oneWeek = priceHistory.oneWeek; 
    const oneMonth = priceHistory.oneMonth; 
    const oneYear = priceHistory.oneYear; 

    // const timeStampWeek = priceTimeStamps.oneWeek; 
    const timeStampMonth = priceTimeStamps.oneMonth;
    const timeStampYear = priceTimeStamps.oneYear; 

    let maxTicksLimit;
    let autoSkip;
    let selectedData; 
    let selectedTime; 

    let minPrice;
    let maxPrice;

    const getMin = (array) => {
        let min = Math.floor(Math.min(...array));
        let tolerance = 0.02; 
        let minTolerance = Math.floor(min * tolerance);
        return min - minTolerance
    }

    const getMax = (array) => {
      let max = Math.floor(Math.max(...array));
      let tolerance = 0.02; 
      let maxTolerance = Math.floor(max * tolerance);
      return max + maxTolerance
  }

    //Year Price History Variable Options
    if (props.selected === 'year'){
        maxTicksLimit = 12; 
        autoSkip = true; 
        selectedData = oneYear; 
        selectedTime = timeStampYear; 
        minPrice = getMin(oneYear)
        maxPrice = getMax(oneYear)

    }
    

    //Month Price History Variable Options
    if (props.selected === 'month'){
        maxTicksLimit = 30; 
        autoSkip = true;
        selectedData = oneMonth; 
        // selectedTime = timeStampMonth; 
        selectedTime = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]; 
        minPrice = getMin(oneMonth)
        maxPrice = getMax(oneMonth)

    }

    //Week Price History Variable Options
    if (props.selected === 'day'){
        maxTicksLimit = 7; 
        autoSkip = false;
        selectedData = oneWeek; 
        selectedTime = [1,2,3,4,5,6,7]; 
        minPrice = getMin(oneWeek)
        maxPrice = getMax(oneWeek)
    }


    const data = {
        labels: selectedTime,
        datasets: [
          {
            label: 'Price',
            data: selectedData,
            fill: true,
            backgroundColor: 'rgba(92, 216, 183, 1)',
            borderColor: 'rgba(42, 172, 138, 1)',
            pointBorderWidth: 0,
            pointRadius: 0,
            tension: 0.1,
      
          }
          
        ],
      };
      
      const options =  {
        plugins: {
        legend: {
          display: false
        }},  
        borderColor: 'white',
      
        scales: {
            
            y: {
              ticks: {
                callback: function(val, index) {
                    return val;
                },
              },
             
              grid: {
                  borderColor: 'white',
                  borderWidth: '10px',
                  
                  
                },
              // suggestedMin: 46000,
              // suggestedMax: 50,
              suggestedMin: minPrice,
              suggestedMax: maxPrice
                
            },

            x: {
              offset: false,
              ticks: {
                autoSkip: autoSkip,
                maxTicksLimit: maxTicksLimit,
                maxRotation: 1,
                minRotation: 1
              },
              display: true,
              grid: {
                display: false
              }
            }

        },
      };
      


    return(
        <div>
            <Line data={data} options={options} width={1000} height={500}/>
        </div>
        )
};

export default HistoryChart; 