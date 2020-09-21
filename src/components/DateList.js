import React from 'react';

export default function DateList(props){

    const formatDate = (input) => {
        const datePart = input.match(/\d+/g),
        year = datePart[0].substring(2), // get only two digits
        month = datePart[1], day = datePart[2];
      
        return day+'/'+month+'/'+year;
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
