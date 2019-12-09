import React, { useState } from "react";
import { DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"; 
import axios from "axios"

//Calendar component
const StaticDatePicker = (props) => {
  const [date, changeDate] = useState(new Date());
  const [counter, changeCounter] = useState(0)

  const dateCleaner = (date) => {
    var dateString = (date.getMonth() + 1).toString() + "/";
    dateString += (date.getDate()).toString() + "/";
    dateString += (date.getFullYear().toString());
    return dateString;
  }

  const disableDate = (day)=>{
    var classes = props.sessions
    .filter(reservation => {
      if(props.class === ""){
        return true
      }
      else{
        return reservation.class === props.class
      }
    })
    var Dates = classes.filter(sess=>{return new Date(JSON.parse("\"" + sess.date + "\"")) >= new Date()});
    return Dates.map(sess => dateCleaner(new Date(JSON.parse("\"" + sess.date + "\"")))).indexOf(dateCleaner(day))<0 
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
    if(counter > 0){
      props.updateFirst()
    }
    
    changeCounter(counter + 1);
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

