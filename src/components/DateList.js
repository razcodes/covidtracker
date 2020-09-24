import React, { useEffect } from 'react';

export default function DateList(props){

    useEffect(() => {
        calcDailyConfirmed();
    },[])

    const formatDate = (input) => {
        const datePart = input.match(/\d+/g),
        year = datePart[0].substring(2), // get only two digits
        month = datePart[1], day = datePart[2];
      
        return day+'/'+month+'/'+year;
    }

    const calcDailyConfirmed = () => {
        const currentCountry = {
            code: props.countryCode,
            days: Object.entries(props.dates).map(([key, value], i) => {
                return value[props.countryCode]
            })
        }
        const confirmed = currentCountry.days.map((a)=>{
            return {
                confirmed: a !== undefined ? a.confirmed : 0
            }
        })
        const newConfirmed = confirmed.map((num, i) => {
            return {
                confirmed: num.confirmed,
                daily: confirmed[i+1] !== undefined ? confirmed[i+1].confirmed-num.confirmed : 0
            }
        })
        newConfirmed.pop()
        console.log(newConfirmed)
    }

    const CountryData = () => (
        Object.entries(props.dates).map(([key, value], i) => ( // key = dates, value = a3alpha codes
            <div key={i} className='date-box'>
                {!value[props.countryCode] && <div className="date-text">
                        <div><b>No data for this date</b></div>
                    </div>}
                {value[props.countryCode] && <div className="date-text">
                        {value[props.countryCode].date_value && <div><b>{formatDate(value[props.countryCode].date_value)}</b></div>}
                        {value[props.countryCode].confirmed && <div>Confirmed: {value[props.countryCode].confirmed.toLocaleString()}</div>}
                        {value[props.countryCode].deaths && <div>Deaths: {value[props.countryCode].deaths.toLocaleString()}</div>}
                    </div>}
            </div>
        ))
    )

    return(
        <div className='datelist'>
            <CountryData />
        </div>
    )
    
}
