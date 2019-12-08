import React, { useState } from "react";
import { DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"; 
import axios from "axios"

const StaticDatePicker = (props) => {
  const [date, changeDate] = useState(new Date());

  const dateCleaner = (date) => {
    var dateString = (date.getMonth() + 1).toString() + "/";
    dateString += (date.getDate()).toString() + "/";
    dateString += (date.getFullYear().toString());
    return dateString;
  }

  const disableDate = (day)=>{
    var allDates = props.sessions.map(sess => dateCleaner(new Date(JSON.parse("\"" + sess.date + "\""))));
    return allDates.indexOf(dateCleaner(day))<0  
  }
  
  const setDay = (newDate) => {
    props.dateUpdate(newDate);
    changeDate(newDate);
    
    axios.get('/sessions')
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
        onChange={setDay}
        disablePast
        disableToolbar
        shouldDisableDate = {disableDate}
      />
    </MuiPickersUtilsProvider>
  );
};

export default StaticDatePicker;


