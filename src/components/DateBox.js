import React from 'react'
import { DateRange } from 'react-date-range';

export default function DateBox(props) {

    return (
        <div>
            <p className="no-margin subheader">Select a range of dates</p>
            <DateRange
                editableDateInputs={true}
                onChange={item => {props.setDateRange([item.selection]); props.dateWasSet(item.selection)}}
                moveRangeOnFirstSelection={false}
                ranges={props.dateRange}
            />
        </div>
    )

}

