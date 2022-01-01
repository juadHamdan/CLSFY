import * as React from "react";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';


const AppSwitch = ({leftSwitchText, rightSwitchText, onSwitch, switchOn, disableSwitch, TextClassificationColor, FeaturesClassificationColor}) => {
    return (
        <Container>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography sx={{color: TextClassificationColor}}>{leftSwitchText}</Typography>
            {disableSwitch} {switchOn === true}
            <MySwitch 
                disabled={disableSwitch}
                defaultChecked={disableSwitch && switchOn}
                sx={{ m: 1, textAlign: "center"}} 
                onClick={onSwitch}
              />
            <Typography sx={{color: FeaturesClassificationColor}}>{rightSwitchText}</Typography>
          </Stack>
        </Container>
      );
}

const MySwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  textAlign: "center",
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#80cbc4",
        opacity: 1,
        border: 0
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5
      }
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#000",
      border: "6px solid #fff"
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600]
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3
    }
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
    backgroundColor: "#363D3F"
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#ffcc80",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500
    })
  }
}));

export default AppSwitch;
