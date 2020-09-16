import React from 'react'
import { Line } from 'react-chartjs-2';

function LineChart() {

    const data = {
        labels: ['January','February','March','April','May',],
        datasets: [
        {
            label: 'Sunday',
            data: [1,2,5,2,1]
        },
        {
            label: 'Monday',
            data: [3,6,9,1,2] 
        }
    ],
    }

    return (
        <div>
            <Line data={data}/>
        </div>
    )
}

export default LineChart
