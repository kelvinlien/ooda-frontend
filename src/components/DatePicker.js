import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { getThemeProps } from '@material-ui/styles';

export default function DatePickers(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const today = new Date();

  const handleDateChange = date => {
      if (props.type === 'to')
      {
          if (date < props.fromDate)
          {
              alert("Vui lòng chọn lại ngày.");
          }
          else
          {
            setSelectedDate(date);
            props.callBackFunc(props.id,date);
          }
      }
      else
      {
        if (date < today)
        {
          alert("Ngày bắt đầu không hợp lệ!");
        }
        else if (date > props.toDate)
        {
          alert("Vui lòng chọn lại ngày.");
        }
        else
        {
          setSelectedDate(date);
          props.callBackFunc(props.id,date);
        }
      }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          variant = "inline"
          margin="normal"
          id={props.id}
          label={props.label}
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}


