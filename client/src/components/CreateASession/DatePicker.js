import React, { useState } from "react";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

function DatePicker(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDateTimePicker
            variant="inline"
            value={selectedDate}
            onChange={handleDateChange}
            onError={console.log} 
            disablePast
            format="MM/dd/yyyy hh:mm a"
            label="Required"
          />
    </MuiPickersUtilsProvider>
      );
    }
    
    export default DatePicker;