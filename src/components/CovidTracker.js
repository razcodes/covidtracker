import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryCard from './CountryCard';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import DateBox from './DateBox.js';
import SelectCountry from './SelectCountry.js';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function CovidTracker(){
    const [countryResponse, setCountryReponse] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [dateList, setDateList] = useState([]);
    const [A3CountryCodeList, setA3CountryCodeList] = useState([]);
    const [A3CountryCode, setA3CountryCode] = useState('');
    const [countryImage, setCountryImage] = useState('');
    const [countryName, setCountryName] = useState([]);
    const [isLoading, setIsLoading] = useState();
    const [dateRange, setDateRange] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }]);
    
    useEffect(() => {
        axios.get(`https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/2020-09-04/2020-09-04`)
        .then((res) => {
            setA3CountryCodeList(res.data.countries)
        })
    },[])
    
    const formatDate = (date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true'
        }
    }

    const countryPicked = (event) => {
        setCountryName('');
        setCountryImage('');
        let A3CountryCode = event.target.value;
        setA3CountryCode(A3CountryCode);
        setIsLoading(true);
        axios.get(`https://cors-anywhere.herokuapp.com/https://restcountries.eu/rest/v2/alpha/${A3CountryCode}`, config)
        .then((countryRes) => {
            setCountryReponse(countryRes);
            setIsLoading(false);
        })
    }

    const submit = () => {
        setIsLoading(true);
        axios.get(`https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/${formatDate(startDate)}/${formatDate(endDate)}`)
        .then((res) => { 
            console.log("DateList: ",res.data.data);
            console.log("CountryResponse: ",countryResponse.data);
            setCountryName(countryResponse.data.name);
            setCountryImage(countryResponse.data.flag);
            setDateList(res.data.data);
            setIsLoading(false);
        })
    }

    const dateWasSet = (x) => {
        setStartDate(formatDate(x.startDate));
        console.log("startDate: ",x.startDate);
        setEndDate(formatDate(x.endDate));
        console.log("endDate: ",x.endDate);
    }
    
    return (
        <div className='container'>
            <h1 className='header'>Covid Tracker</h1>
            <DateBox setDateRange={setDateRange} dateWasSet={dateWasSet} dateRange={dateRange} />

            <p className="no-margin subheader">Select a Country</p>
            <SelectCountry 
                A3CountryCode={A3CountryCode}
                A3CountryCodeList={A3CountryCodeList}
                countryPicked={countryPicked}/>

            <Button disabled={isLoading || A3CountryCode=='' || startDate==undefined || endDate==undefined} 
                className='no-margin' 
                variant="contained" 
                color="primary" 
                onClick={event => submit()}>
                    SUBMIT
            </Button>

            {!isLoading && 
                <CountryCard 
                    dateList={dateList} 
                    A3CountryCode={A3CountryCode} 
                    countryImage={countryImage} 
                    countryName={countryName}
                />}

            {isLoading && 
                <div 
                    style={{'marginTop': '5px'}}>
                        <CircularProgress />
                </div>}
        </div>
    )
}