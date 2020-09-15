import React from 'react';
import DateList from './DateList';

export default function CountryCard(props){
    return(
        props.countryImage && 
        <div>
            <h3>{props.countryName}</h3>
            <img class="flag" src={props.countryImage} width="200px"></img>
            <br></br>
            <br></br>
            <DateList dates={props.dateList} countryCode={props.A3CountryCode}/>
        </div>
    )
}