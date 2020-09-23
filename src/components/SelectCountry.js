import React, { useEffect,useState } from 'react';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function SelectCountry(props) {
    const [countryNamesList, setCountryNamesList] = useState('');

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
    })
    
    const selectionOptions = 
        Object.entries(countryNamesList)
            .map(([key, value], i) => (<option key={i} value={value.A3}>{value.name}</option>));

    return (
        <div>
            <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">Select a Country</InputLabel>

                <Select
                native
                value={props.A3CountryCode}
                onChange={props.countryPicked}
                label="Country"
                inputProps={{
                    name: 'Country',
                    id: 'outlined-age-native-simple',
                }}
                >
                <option aria-label="None" value="" 
                />
                    {selectionOptions}
                </Select>

            </FormControl>
        </div>
    )
}

