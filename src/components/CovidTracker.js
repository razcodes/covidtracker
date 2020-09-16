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
    const [dateList, setDateList] = useState([]);
    const [startDate, setStartDate] = useState('2020-09-04');
    const [endDate, setEndDate] = useState('2020-09-09');
    const [A3CountryCodeList, setA3CountryCodeList] = useState([]);
    const [A3CountryCode, setA3CountryCode] = useState('');
    const [countryImage, setCountryImage] = useState('');
    const [countryName, setCountryName] = useState([]);
    const [isLoading, setIsLoading] = useState();
    const [dateRange, setDateRange] = useState([{
        startDate: new Date(),
        endDate: null,
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
        let A3CountryCode = event.target.value;
        setA3CountryCode(A3CountryCode);
        setIsLoading(true);
        axios.get(`https://cors-anywhere.herokuapp.com/http://countryapi.gear.host/v1/Country/getCountries?pAlpha3Code=${A3CountryCode}`, config)
        .then((countryRes) => {
            console.log("Name: ",countryRes.data.Response[0].Name)
            console.log("Flag: ",countryRes.data.Response[0].Flag)
            setCountryName(countryRes.data.Response[0].Name);
            setCountryImage(countryRes.data.Response[0].Flag);
            setIsLoading(false);
        })
    }

    const submit = () => {
        axios.get(`https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/${startDate}/${endDate}`)
        .then((res) => { 
            setDateList(res.data.data)
            console.log("DateList: ",res.data.data)
        })
    }

    const dateWasSet = (x) => {
        // setStartDate
        // setEndDate
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

    const change = (event) => {
        console.log(event.target.value)
    }
    
    return (
        <div>
            <h1>Covid Tracker</h1>

            <p>Pick Country</p>
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

            <br></br>
            <br></br>

            <DateRange
                editableDateInputs={true}
                onChange={item => {setDateRange([item.selection]); dateWasSet(item.selection)}}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
            />

            <br></br>
            <br></br>
            <Button variant="contained" color="primary" onClick={event => submit()}>SUBMIT</Button>
            <br></br>
            <br></br>
            {isLoading && <CircularProgress />}
            {!isLoading && <CountryCard dateList={dateList} A3CountryCode={A3CountryCode} countryImage={countryImage} countryName={countryName}/>}

        </div>
    )
}