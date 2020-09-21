import React, {useEffect} from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';


export default function SelectCountry(props) {
    
    const selectionOptions = props.A3CountryCodeList.map((value, i) => (<option key={i} value={value}>{value}</option>));

    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

    const classes = useStyles();

    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Country</InputLabel>

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

