import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CountrySummary(props){
    const [summaryData, setSummaryData] = useState({});
    const [population, setPopulation] = useState();

    useEffect(() => {
        axios.get('https://covid-193.p.rapidapi.com/statistics', config)
        .then((res) => {
            let summaryObject;
            res.data.response.forEach((data, i) => {
                if(data.country === props.countryName){
                    setPopulation(data.population);
                    summaryObject = {
                        '1M_pop': data.cases["1M_pop"],
                        active: data.cases.active,
                        critical: data.cases.critical,
                        new: data.cases.new,
                        recovered: data.cases.recovered,
                        total: data.cases.total,
                        country: data.country,
                        day: data.day,
                        deaths_1M_pop: data.deaths["1M_pop"],
                        deaths_new: data.deaths.new,
                        deaths_total: data.deaths.total 
                    }
                }      
            })
            setSummaryData(summaryObject);
        })
    }, [])

    const config = {
        headers: {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key": "b992b12f01msh4a63d33927380a5p136b15jsn6bd1d0b031cd",
            "useQueryString": true,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': 'localhost:3000',
            'Access-Control-Allow-Credentials': 'true'
        }
    }

    const calcPercent = (confirmed) => {
        const str = '';
        return str+((confirmed/population)*100).toFixed(2)+"%";
    }
    
    const SummaryHTML = () => (
        Object.entries(summaryData).map(([key, value], i) => (
            <div key={i}>
                <div>{key}:{value}</div>
            </div>
        ))
    )

    return(
        <div>

            {population &&
            <div>
                Population: {population.toLocaleString()}
            </div>}

            {summaryData && <div>
                <SummaryHTML />
            </div>}

        </div>
    )
}



// useEffect(() => {
//     axios.get('https://covid-193.p.rapidapi.com/statistics', config)
//     .then((res) => {
//             res.data.response.forEach((data, i) => {
//                 if(data.country === props.countryName){
//                     console.log(data.cases)
//                     setPopulation(data.population)
//                     return;
//                 }
//         })  
//     })
// }, [props.countryName])