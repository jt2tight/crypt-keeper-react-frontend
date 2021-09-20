export const historyOptions = {
    lineHeightAnnotation: {
        always: true,
        hover: false,
        lineWeight: 3.5,
    },
    // grid: {
    //     borderWidth: 0,
    //     color: 'white',
    //     display: false,
    //     drawBorder: false

    // },
    animation: {
        duration: 1000,
    },
    maintainAspectRatio: false,
    responsive: true,
    scale: {
        y: [
            
            {
            borderColor: 'white',
            grid: {
                display: false,
                drawBorder: false
            }
            
            }
        ],
        x: [
            {
            type: 'time',
            distribution: 'linear',
            gridLines: {
                display: false
            }
            }
        ]
    }
}