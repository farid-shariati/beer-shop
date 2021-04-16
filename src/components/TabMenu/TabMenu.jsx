import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const TabMenu = ({setWithPizza, setWithSteak, setSodas}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Paper className={classes.root}>
      <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
        <Tab label="Beer with pizza" onClick={setWithPizza}/>
        <Tab label="Beer with steak" onClick={setWithSteak}/>
        <Tab label="Beer" onClick={setSodas}/>
      </Tabs>
    </Paper>
  );
};

export default TabMenu;
