import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function DateList(props){
    const [countryData, setCountryData] = useState();

    useEffect(() => {
        const createCountryDataObject = () => {
            if(props.dates){
                const data = Object.entries(props.dates).map((a, i)=>{
                    if(a[1][props.countryCode]!==undefined){
                        return ({
                            id: i,
                            date_value: a[0],
                            data: {
                                confirmed: a[1][props.countryCode].confirmed,
                                deaths: a[1][props.countryCode].deaths
                            }
                        })
                    }
                })
                calcDailyConfirmed(data);
            }
        }
        createCountryDataObject();
    },[props.dates])

    const calcDailyConfirmed = (data) => {        

        // Creating an array made of confirmed infected
        const confirmedArray = [];
        data.forEach((day, i) => {
            if(day !== undefined){
                if(i === data.length-1 || (data[i+1] === undefined && i !== data.length-1)){
                    confirmedArray.push(day.data.confirmed)
                    return;
                }
                else if(data[i+1] !== undefined){
                    confirmedArray.push(day.data.confirmed)
                    return;
                }
            }
            confirmedArray.push(null)
            return;

        })
        //console.log("confirmedArray: ", confirmedArray)

        // Creating an array based on the confirmed one with daily infected
        const newArr = [null];
        confirmedArray.forEach((num, i)=>{
            if(confirmedArray.length > 1){
                if(i === confirmedArray.length-1){
                    let daily = confirmedArray[i]-confirmedArray[i-1];
                    newArr[i]=daily;
                }
                else if(num!==null){
                    let daily = confirmedArray[i+1]-num;
                    newArr[i]=daily;
                }
                else{
                    newArr[i]=null;
                }
            }
        })
        //console.log("newArr: ", newArr)

        const newConfirmed = data.map((day, i) => {
            if(i===data.length-1 && day){
                return ({
                    id: day.id,
                    date_value: day.date_value,
                    data: {
                        confirmed: day.data.confirmed,
                        deaths: day.data.deaths,
                        daily: newArr[i]
                    }
                })
            }
            if(day !== undefined){
                return ({
                    id: day.id,
                    date_value: day.date_value,
                    data: {
                        confirmed: day.data.confirmed,
                        deaths: day.data.deaths,
                        daily: newArr[i-1]>0 ? newArr[i-1]:null
                    }
                })
            }
        })
        setCountryData(newConfirmed);
        //console.log("New confirmed: ", newConfirmed)
    }

    const CountryDataHTML = () => (
        Object.entries(countryData).map(([key, value], i)=>(
            <div className='date-box' key={i}>
                <div>{!value &&
                    <div className="date-text">
                        <div><b>No data for this date</b></div>
                    </div>}
                    {value && <div className="date-text">
                            {value.date_value && <div><b>{formatDate(value.date_value)}</b></div>}
                            {value.data.confirmed && <div>Confirmed: {value.data.confirmed.toLocaleString()}</div>}
                            {value.data.deaths !== null && <div>Deaths: {value.data.deaths.toLocaleString()}</div>}
                            {value.data.daily && <div style={{ 'color': 'red' }}>Daily infected: {value.data.daily.toLocaleString()}</div>}
                        </div>}
                </div>
            </div>
        ))
    )

    const formatDate = (input) => {
        const datePart = input.match(/\d+/g),
        year = datePart[0].substring(2), // get only two digits
        month = datePart[1], day = datePart[2];
      
        return day+'/'+month+'/'+year;
    }
    
    return(
        <div className='datelist'>
            {!props.isLoadingDates && 
                countryData && <CountryDataHTML />}

            {props.isLoadingDates && 
            <div 
                style={{'marginTop': '5px'}}>
                    <CircularProgress />
            </div>}
        </div>
    )   
}

