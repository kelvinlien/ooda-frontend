import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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
//   const [labelWidth, setLabelWidth] = React.useState(0);
//   React.useEffect(() => {
//     setLabelWidth(inputLabel.current.offsetWidth);
//   }, []);
  function handleChange(e)
  {
    setState({
      ...state,
      [props.id]: e.target.value,
    });
  }



  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
        <Select
          native
          value={state[props.id]}
          onChange={e => handleChange(e)}
          inputProps={{
            name: props.id,
            id: props.id,
          }}
        >
          <option value = "" key = {0}></option>
                {                
                props.options.map((option, index) =>(
                    <option value = {option.value} key = {index}>{option.name}</option>
                ))}
        </Select>
      </FormControl>
    </div>
  )
}