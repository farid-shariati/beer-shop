import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRecoilState } from 'recoil';
import { sortTypeState } from 'atoms';

const useStyles = makeStyles({
  root: {
    flex: 1,
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems:"center"
  },
  formControl: {
    marginLeft: "10px",
    minWidth: 130,
  },
  verticalLine: {
      height:"100%",
      width:"2px",
      backgroundColor:"red"
  }
});

const SortType = () => {
  const classes = useStyles();
  const [type, setType] = useRecoilState(sortTypeState);
  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel id="">Sort by</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={type} onChange={handleChange}>
          <MenuItem value={0}>Ascending name</MenuItem>
          <MenuItem value={1}>Descending name</MenuItem>
          <MenuItem value={2}>Ascending abv</MenuItem>
          <MenuItem value={3}>Descending abv</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SortType;
