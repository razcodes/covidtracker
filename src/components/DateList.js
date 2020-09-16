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
            <div key={i} className='date'>
                {!value[props.countryCode] && <div>
                        <div><b>No data for this date</b></div>
                        <br></br>
                    </div>}
                {value[props.countryCode] && <div>
                        <div><b>{formatDate(value[props.countryCode].date_value)}</b></div>
                        <div>Confirmed: {value[props.countryCode].confirmed.toLocaleString()}</div>
                        <div>Deaths: {value[props.countryCode].deaths.toLocaleString()}</div><br></br>
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
