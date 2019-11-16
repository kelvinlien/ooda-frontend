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

  const handleDateChange = date => {
      if (props.type === 'to')
      {
          if (props.fromDate == '')
          {
              alert("Vui lòng chọn ngày bắt đầu trước.");
          }
          else if (date < props.fromDate)
          {
              alert("Vui lòng chọn lại ngày.");
          }
          else
          {
            setSelectedDate(date);
          }
      }
      else
      {
        setSelectedDate(date);
      }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
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


