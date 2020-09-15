import React, {useState, useEffect} from 'react';

export default function DateList(props){

    const CountryData = () => (
        Object.entries(props.dates).map(([key, value], i) => ( // key = dates, value = a3alpha codes
            <div>
                {!value[props.countryCode] && <div>
                        <div><b>No data for this date</b></div>
                        <br></br>
                    </div>}
                {value[props.countryCode] && <div>
                        <div><b>{value[props.countryCode].date_value}</b></div>
                        <div>Confirmed: {value[props.countryCode].confirmed.toLocaleString()}</div>
                        <div>Deaths: {value[props.countryCode].deaths.toLocaleString()}</div><br></br>
                    </div>}
            </div>
        ))
    )

    return(
        <div>
            <CountryData />
        </div>
    )
}
