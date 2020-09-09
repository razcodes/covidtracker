import React, { Component, useState } from 'react';
import axios from 'axios';

export default function CovidTracker(){
    const [dateList, setDateList] = useState([]);
    const [startDate, setStartDate] = useState('2020-09-04');
    const [endDate, setEndDate] = useState('2020-09-09');


    const submit = (startDate, endDate) => {
        console.log("startDate: "+startDate);
        console.log("endDate: "+endDate);
        axios.get(`https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/${startDate}/${endDate}`)
        .then((res) => { 
            setDateList(res.data.data)})
    }

    return (
        <div>
            <p>Pick starting date</p>
            <input type="date" min="2020-04-01" max={Date.now()} onChange={event => setStartDate(event.target.value)}></input>
            <p>Pick ending date</p>
            <input type="date" min="2020-04-01" max={Date.now()} onChange={event => setEndDate(event.target.value)}></input>
            <br></br>
            <br></br>
            <button onClick={event => submit(startDate, endDate)}>SUBMIT</button>
            <br></br>
            <br></br>

    {dateList.length !== 0 && Object.entries(dateList).map(([key,value]) => {
        const { confirmed, date_value, deaths } = value.ISR;
        return (
            <div>
                <div>Date: {date_value}</div>
                <div>Confirmed: {confirmed}</div>
                <div>Deaths: {deaths}</div>
                <br></br>
            </div>
        )
        
        // Object.keys(date).map(country => {
        //     console.log(country)
        // })
    })}
        </div>
    )
}
