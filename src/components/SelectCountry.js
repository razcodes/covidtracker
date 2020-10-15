import React, { useEffect,useState } from 'react';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function SelectCountry(props) {
    const [countryNamesList, setCountryNamesList] = useState([]);

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
        .then((res) => {
            setCountryNamesList(res.data.map(country => {
                return {
                    name: country.name,
                    A3: country.alpha3Code
                }
            }))
        })
    },[])
    
    const selectionOptions = 
        Object.entries(countryNamesList)
            .map(([key, value], i) => (<option key={i} value={value.A3}>{value.name}</option>));

    const autocompleteStyle = {
        width: "300px",
        margin: "auto"
    }

    return (
        <div>
            <Autocomplete
            id="combo-box-demo"
            onChange={(event, value) => {
                if(value !== null)
                    props.countryPicked(value.A3)
            }}
            options={countryNamesList}
            getOptionLabel={(option) => option.name}
            style={autocompleteStyle}
            renderInput={(params) => <TextField {...params} label="Country" variant="outlined" />}
            />
        </div>
    )
}
