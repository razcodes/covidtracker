import React from 'react';

export default function List(props){
    return(
        !props.isLoading && props.country && <div>
            <h3>{props.countryName}</h3>
            <img src={props.countryImage} width="200px"></img>
            {props.dateList.length !== 0 && Object.entries(props.dateList).map(([key,value]) => {
                const { confirmed, date_value, deaths } = value[props.country]
                return (
                    <div>
                        <div>Date: {date_value}</div>
                        <div>Confirmed: {confirmed.toLocaleString()}</div>
                        <div>Deaths: {deaths.toLocaleString()}</div>
                        <br></br>
                    </div>
                )
            })}
        </div>
    )
}