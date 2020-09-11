import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as R from 'ramda';

export default function CovidTracker(){
    const [dateList, setDateList] = useState([]);
    const [startDate, setStartDate] = useState('2020-09-04');
    const [endDate, setEndDate] = useState('2020-09-09');
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('');
    const [countryImage, setCountryImage] = useState('');
    const [countryName, setCountryName] = useState([]);

        useEffect(() => {
            axios.get(`https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/${startDate}/${endDate}`)
            .then((res) => { 
                setCountries(res.data.data[startDate])
            })
        },[])

    const countryPicked = () => {
        axios.get(`https://cors-anywhere.herokuapp.com/http://countryapi.gear.host/v1/Country/getCountries?pAlpha3Code=${country}`)
        .then((countryRes) => {
            console.log("Name: ",countryRes.data.Response[0].Name)
            console.log("Flag: ",countryRes.data.Response[0].Flag)
            setCountryName(countryRes.data.Response[0].Name);
            setCountryImage(countryRes.data.Response[0].Flag);
        })
    }

    const submit = (startDate, endDate) => {
        countryPicked();
        console.log("startDate: "+startDate);
        console.log("endDate: "+endDate);
        axios.get(`https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/${startDate}/${endDate}`)
        .then((res) => { 
            console.log(res.data.data)
            setDateList(res.data.data)
            })

    }

    return (
        <div>
            <p>Pick starting date</p>
            <input type="date" min="2020-04-01" max={Date.now()} onChange={event => setStartDate(event.target.value)}></input>
            <p>Pick ending date</p>
            <input type="date" min="2020-04-01" max={Date.now()} onChange={event => setEndDate(event.target.value)}></input>

            <p>Pick Country</p>
            <select name="countries" id="countries" value={country} onChange={async(event) => {await setCountry(event.target.value); submit(startDate, endDate); }}>
                {Object.keys(countries).map(key => (
                    <option value={key}>{key}</option>
                    ))}
            </select>

            <br></br>
            <br></br>
            <button onClick={event => submit(startDate, endDate)}>SUBMIT</button>
            <br></br>
            <br></br>
            <List dateList={dateList} country={country} countryImage={countryImage} countryName={countryName}/>
        </div>
    )
}

export function List(props){
    return(
        <div>
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