import React, { useState } from "react";
import { DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"; 
import axios from "axios"

const StaticDatePicker = (props) => {
  const [date, changeDate] = useState(new Date());

  const setCount = (newDate) => {
    props.dateUpdate(newDate);
    changeDate(newDate);
    
    axios.get('http://localhost:5000/sessions')
    .then(function (response){
        props.updateSessions(response.data)
    })
    .catch(function (error){
        console.log(error)
    });
  };
  
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        autoOk
        orientation="landscape"
        variant="static"
        openTo="date"
        value={date}
        onChange={setCount}
        disablePast
        disableToolbar
      />
    </MuiPickersUtilsProvider>
  );
};

export default StaticDatePicker;
