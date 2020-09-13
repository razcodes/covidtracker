import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as R from 'ramda';
//import {Bar, Line, Pie} from 'chart'

export default function CovidTracker(){
    const [dateList, setDateList] = useState([]);
    const [startDate, setStartDate] = useState('2020-09-04');
    const [endDate, setEndDate] = useState('2020-09-09');
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('ABW');
    const [countryImage, setCountryImage] = useState('');
    const [countryName, setCountryName] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        axios.get(`https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/2020-09-04/2020-09-04`)
        .then((res) => {
            setCountries(res.data.data['2020-09-04'])
        })
    },[])

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true'
        }
    }

    const countryPicked = () => {
        axios.get(`https://cors-anywhere.herokuapp.com/http://countryapi.gear.host/v1/Country/getCountries?pAlpha3Code=${country}`, config)
        .then((countryRes) => {
            console.log("Name: ",countryRes.data.Response[0].Name)
            console.log("Flag: ",countryRes.data.Response[0].Flag)
            setCountryName(countryRes.data.Response[0].Name);
            setCountryImage(countryRes.data.Response[0].Flag);
        })
    }

    const submit = (startDate, endDate) => {
        countryPicked();
        setCountryImage('');
        setCountryName('');
        console.log("startDate: "+startDate);
        console.log("endDate: "+endDate);
        axios.get(`https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/${startDate}/${endDate}`)
        .then((res) => { 
            setDateList(res.data.data)
        })
        setIsLoading(false);
    }

    return (
        <div>
            <p>Pick starting date</p>
            <input type="date" min="2020-04-01" max={Date.now()} onChange={event => setStartDate(event.target.value)}></input>
            <p>Pick ending date</p>
            <input type="date" min="2020-04-01" max={Date.now()} onChange={event => setEndDate(event.target.value)}></input>

            <p>Pick Country</p>
            <select name="countries" id="countries" value={country} onChange={(event) => {setCountry(event.target.value); setIsLoading(true);}}>
                {Object.keys(countries).map(key => (
                    <option value={key}>{key}</option>
                    ))}
            </select>

            <br></br>
            <br></br>
            <button onClick={event => submit(startDate, endDate)}>SUBMIT</button>
            <br></br>
            <br></br>
            <List dateList={dateList} country={country} countryImage={countryImage} countryName={countryName} isLoading={isLoading}/>
        </div>
    )
}

export function List(props){
    return(
        !props.isLoading && props.country && <div>
            <h3>{props.countryName}</h3>
            <img src={props.countryImage} width="200px"></img>
            {props.dateList.length !== 0 && Object.entries(props.dateList).map(([key,value]) => {
                const { confirmed, date_value, deaths } = value[props.country]
                return (
                    <div>
                        <div>Date: {date_value}</div>
                        <div>Confirmed: {confirmed.toLocaleString()}</div>
                        <div>Deaths: {deaths.toLocaleString()}</div>
                        <br></br>
                    </div>
                )
            })}
        </div>
    )
}

// const card = (date) => {
//     const { confirmed, date_value, deaths } = date.ISR;
//             return (
//                 <div>
//                     <div>Date: {date_value}</div>
//                     <div>Confirmed: {confirmed.toLocaleString()}</div>
//                     <div>Deaths: {deaths.toLocaleString()}</div>
//                     <br></br>
//                 </div>
//             )
// }
// return(
//         R.map(card, props.dateListmap)
// )