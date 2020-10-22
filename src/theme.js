import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff5900",
    },
    secondary: {
      main: "#ff0000",
    },
},
typography:{
    button: {
      textTransform: "none",
      fontSize:"18px"
    }  
},
});

export default theme;
