import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import './AverageRating.scss';


export default function AverageRating(props) {
    let goodColor = 'rgb(161, 206, 144, 1)';
    let okayColor = 'rgb(1, 180, 228, 1)';
    let badColor =  'rgb(228, 1, 66, 1)';
    let color = props.rating > 80 ? goodColor: props.rating < 79 && props.rating > 60 ? okayColor: badColor;
   let data = {
       
        datasets: [{
            label: '# of Votes',
            data: [props.rating,100- props.rating],
            backgroundColor: [
                color,
  

            ],
            // borderColor: [
            //     'rgba(255, 99, 132, 1)',
            // ],
            borderWidth: 1
        }],
        
     
    };

    let options = {
        tooltips: {
             enabled: false
        },
     
        
    }
    return (
        
        <div className="chart">
             <Doughnut data={data} options={options} />
             <div className="chart-content">
                {props.rating}%
             </div>
        </div>
    )
}
