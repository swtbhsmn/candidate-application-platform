import React, { useState, useMemo, createContext, useEffect } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux'
import { configStore } from './redux/store'

import './App.css'
import Home from './pages/Home';

const ColorModeContext = createContext({ toggleColorMode: () => { } });

function App() {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [themeValue, setThemeValue] = useState(prefersDarkMode ? 'dark' : 'light')

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setThemeValue((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeValue === "dark" ? 'dark' : 'light'
        }
      }),
    [themeValue]
  );

  useEffect(() => {
    setThemeValue(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

  return (
    <>
      <Provider store={configStore}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <Home colorMode={colorMode} />
          </ThemeProvider>
        </ColorModeContext.Provider>
      </Provider>
    </>
  )
}
export default App
