/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBox() {
  return (
    <Autocomplete
      id="reason"
      options={reasons}
      getOptionLabel={option => option.content}
      value = {option => option.value}
      style={{ width: 300 }}
      renderInput={params => (
        <TextField {...params} label="Lý do" variant="outlined" fullWidth />
      )}
    />
  );
}

const reasons = [       //demo version, should be taken from db
  { content: 'Bị bệnh', value: 'sick' },
  { content: 'Đám cưới', year: 'marriage' }
];
