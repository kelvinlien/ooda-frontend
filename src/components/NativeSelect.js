import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {MenuItem} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 220
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function NativeSelect(props) {
  const classes = useStyles();
  const inputLabel = React.useRef(null);
  const [state, setState] = React.useState({
    [props.id] : ''
  });
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = e =>
  {
    setState({
      [props.id]: e.target.value,
    });
    props.onChange(e);
  }




  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id={props.id + '-label'}>
        {props.label}
        </InputLabel>
        <Select
          labelId={props.id + '-label'}
          id={props.id}
          value={state[props.id]}
          onChange={handleChange}
          labelWidth={labelWidth}
          style = {{width: '220px'}}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {                
          props.options.map((option, index) =>(
              <MenuItem value = {option.value} key = {index}>{option.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}