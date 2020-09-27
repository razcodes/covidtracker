import React, { useEffect, useState } from 'react';

export default function DateList(props){
    const [countryData, setCountryData] = useState();
    const [newInfected, setNewInfected] = useState();

    useEffect(() => {
        createCountryDataObject();
    },[])

    const createCountryDataObject = () => {
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

    const calcDailyConfirmed = (data) => {        

        // Creating an array made of confirmed infected
        const confirmedArray = [];
        data.map((day, i) => {
            if(day !== undefined && data[i+1] !== undefined){
                confirmedArray.push(day.data.confirmed)
                return;
            }

            confirmedArray.push(null)
            return;

        })
        console.log("confirmedArray: ", confirmedArray)

        // Creating an array based on the confirmed one with daily infected
        const newArr = [null];
        confirmedArray.map((num, i)=>{
            if(num!==null){
                let daily = confirmedArray[i+1]-num;
                newArr[i]=daily;
            }
            else{
                newArr[i]=null;
            }
        })
        console.log("newArr: ", newArr)

        const newConfirmed = data.map((day, i) => {
            if(day !== undefined && data[i+1] !== undefined){
                return ({
                    id: day.id,
                    date_value: day.date_value,
                    data: {
                        confirmed: day.data.confirmed,
                        deaths: day.data.deaths,
                        daily: newArr[i-1]
                    }
                })
            }
        })
        setCountryData(newConfirmed);
    }

    const CountryDataHTML = () => (
        Object.entries(countryData).map(([key, value], i)=>(
            <div className='date-box'>
                <div key={i}>{!value && 
                    <div className="date-text">
                        <div><b>No data for this date</b></div>
                    </div>}
                    {value && <div className="date-text">
                            {value.date_value && <div><b>{formatDate(value.date_value)}</b></div>}
                            {value.data.confirmed && <div>Confirmed: {value.data.confirmed.toLocaleString()}</div>}
                            {value.data.deaths && <div>Deaths: {value.data.deaths.toLocaleString()}</div>}
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
            <div>
                <div className='datelist'>
                    {countryData && <CountryDataHTML />}
                </div>
            </div>
    )   
}
