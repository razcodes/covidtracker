import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CountryCard from './CountryCard';

export default function CovidTracker(){
    const [dateList, setDateList] = useState([]);
    const [startDate, setStartDate] = useState('2020-09-04');
    const [endDate, setEndDate] = useState('2020-09-09');
    const [A3CountryCodeList, setA3CountryCodeList] = useState([]);
    const [A3CountryCode, setA3CountryCode] = useState('ITA');
    const [countryImage, setCountryImage] = useState('');
    const [countryName, setCountryName] = useState([]);

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true'
        }
    }

    useEffect(() => {
        axios.get(`https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/2020-09-04/2020-09-04`)
        .then((res) => {
            setA3CountryCodeList(res.data.countries)
        })
    },[])


    const countryPicked = (A3CountryCode) => {
        axios.get(`https://cors-anywhere.herokuapp.com/http://countryapi.gear.host/v1/Country/getCountries?pAlpha3Code=${A3CountryCode}`, config)
        .then((countryRes) => {
            console.log("Name: ",countryRes.data.Response[0].Name)
            console.log("Flag: ",countryRes.data.Response[0].Flag)
            setA3CountryCode(A3CountryCode);
            setCountryName(countryRes.data.Response[0].Name);
            setCountryImage(countryRes.data.Response[0].Flag);
        })
    }

    const submit = (startDate, endDate) => {
        axios.get(`https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/${startDate}/${endDate}`)
        .then((res) => { 
            setDateList(res.data.data)
        })
    }

    const options = A3CountryCodeList.map((value, i) => (<option value={value} key={i}>{value}</option>));

    return (
        <div>
            <h1>Covid Tracker</h1>
            <p>Pick starting date</p>
            <input type="date" min="2020-04-01" max={Date.now()} onChange={event => setStartDate(event.target.value)}></input>
            <p>Pick ending date</p>
            <input type="date" min="2020-04-01" max={Date.now()} onChange={event => setEndDate(event.target.value)}></input>

            <p>Pick Country</p>
            <select onChange={(event) => {countryPicked(event.target.value)}}>
                {options}
            </select>

            <br></br>
            <br></br>
            <Button variant="contained" color="primary" onClick={event => submit(startDate, endDate)}>SUBMIT</Button>
            <br></br>
            <br></br>
            <CountryCard dateList={dateList} A3CountryCode={A3CountryCode} countryImage={countryImage} countryName={countryName}/>
        </div>
    )
}