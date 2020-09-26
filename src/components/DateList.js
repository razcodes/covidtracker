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
        const confirmedArray = [];

        data.map((day, i) => {})

        const newConfirmed = data.map((day, i) => {
            if(day === undefined){
                dailyArray.push(null)
                return;
            }

            if(day !== undefined && data[i+1] !== undefined){
                const newSick = data[i+1].data.confirmed ? data[i+1].data.confirmed-day.data.confirmed : data[i+1].data;
                dailyArray.push(newSick)
                return ({
                    id: day.id,
                    date_value: day.date_value,
                    data: {
                        confirmed: day.data.confirmed,
                        deaths: day.data.deaths,
                        daily: dailyArray[i]
                        //daily: data[i+1].data.confirmed !== undefined ? data[i+1].data.confirmed-day.data.confirmed : 0
                    }
                })
            }
        })
        setCountryData(newConfirmed);
        console.log("dailyArray: ", dailyArray);
    }
    // const calcDailyConfirmed = (data) => {
    //     const dailyArray = [null];

    //     const newConfirmed = data.map((day, i) => {
    //         if(day === undefined){
    //             dailyArray.push(null)
    //             return;
    //         }

    //         if(day !== undefined && data[i+1] !== undefined){
    //             const newSick = data[i+1].data.confirmed ? data[i+1].data.confirmed-day.data.confirmed : data[i+1].data;
    //             dailyArray.push(newSick)
    //             return ({
    //                 id: day.id,
    //                 date_value: day.date_value,
    //                 data: {
    //                     confirmed: day.data.confirmed,
    //                     deaths: day.data.deaths,
    //                     daily: dailyArray[i]
    //                     //daily: data[i+1].data.confirmed !== undefined ? data[i+1].data.confirmed-day.data.confirmed : 0
    //                 }
    //             })
    //         }
    //     })
    //     setCountryData(newConfirmed);
    //     console.log("dailyArray: ", dailyArray);
    // }

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


    // const CountryDataHTML = () => (
    //     Object.entries(props.dates).map(([key, value], i) => ( // key = dates, value = a3alpha codes
    //         <div key={i} className='date-box'>
    //             {!value[props.countryCode] && <div className="date-text">
    //                     <div><b>No data for this date</b></div>
    //                 </div>}
    //             {value[props.countryCode] && <div className="date-text">
    //                     {value[props.countryCode].date_value && <div><b>{formatDate(value[props.countryCode].date_value)}</b></div>}
    //                     {value[props.countryCode].confirmed && <div>Confirmed: {value[props.countryCode].confirmed.toLocaleString()}</div>}
    //                     {value[props.countryCode].deaths && <div>Deaths: {value[props.countryCode].deaths.toLocaleString()}</div>}
    //                 </div>}
    //         </div>
    //     ))
    // )

