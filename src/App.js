//react
import React, { useMemo, useState } from 'react';
import './App.css';
import { CssBaseline, } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import NavBar from 'components/navBar'
import ShowAlert from 'components/alert'
import ShowSpinner from 'components/spinner'
import Views from './views'

import useWebProfile from 'components/useWebProfile';

export default function App (){
  //hooks
  const [ webProfile, setWebProfile ] = useWebProfile('webProfile')
  const [ systemTheme, setSystemTheme ] = useState(webProfile?.theme || 'dark');
  const [ spinner, setSpinner ] = useState(false);
  const [ alert, setAlert ] = useState({})

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: systemTheme,
          rowMain: {bg: "#272727", text: '#fff'}

        },
      }),
    [systemTheme],
  );
  const opts = {
    systemTheme: systemTheme,
    setSystemTheme: setSystemTheme,
    webProfile: webProfile,
    setWebProfile: setWebProfile,
    spinner: spinner,
    setSpinner: setSpinner,
    setAlert: setAlert
  }
  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />
      <ShowAlert alert={alert}/>
      <ShowSpinner spinner={spinner}/>
      <NavBar  {...opts}/>
      <Views {...opts}/>
    </ThemeProvider>
  );
};
