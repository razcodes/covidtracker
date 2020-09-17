import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryCard from './CountryCard';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function CovidTracker(){
    const [countryResponse, setCountryReponse] = useState();
    const [dateList, setDateList] = useState([]);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
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
        axios.get(`https://cors-anywhere.herokuapp.com/http://countryapi.gear.host/v1/Country/getCountries?pAlpha3Code=${A3CountryCode}`, config)
        .then((countryRes) => {
            setCountryReponse(countryRes);
            setIsLoading(false);
        })
    }

    const submit = () => {
        setIsLoading(true);
        axios.get(`https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/${startDate}/${endDate}`)
        .then((res) => { 
            console.log("DateList: ",res.data.data);
            console.log("CountryResponse: ",countryResponse);
            setCountryName(countryResponse.data.Response[0].Name);
            setCountryImage(countryResponse.data.Response[0].Flag);
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

    const selectionOptions = A3CountryCodeList.map((value, i) => (<option key={i} value={value}>{value}</option>));
    
    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));
    const classes = useStyles();
    
    return (
        <div>
            <h1 className='header'>Covid Tracker</h1>
            <p className="no-margin subheader">Select a range of dates</p>
            <DateRange
                editableDateInputs={true}
                onChange={item => {setDateRange([item.selection]); dateWasSet(item.selection)}}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
            />
            <div>
                <p className="no-margin subheader">Select a Country</p>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">Country</InputLabel>

                    <Select
                    native
                    value={A3CountryCode}
                    onChange={countryPicked}
                    label="Country"
                    inputProps={{
                        name: 'Country',
                        id: 'outlined-age-native-simple',
                    }}
                    >
                    <option aria-label="None" value="" />
                    {selectionOptions}
                    </Select>

                </FormControl>
            </div>
            <Button disabled={isLoading || A3CountryCode=='' || startDate==undefined || endDate==undefined} style={{margin:0}} variant="contained" color="primary" onClick={event => submit()}>SUBMIT</Button>
            {!isLoading && <CountryCard dateList={dateList} A3CountryCode={A3CountryCode} countryImage={countryImage} countryName={countryName}/>}
            {isLoading && <div style={{'margin-top': '5px'}}><CircularProgress /></div>}
        </div>
    )
}