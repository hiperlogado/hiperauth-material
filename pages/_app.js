import '../styles/globals.css'
import { AuthProvider } from '../contexts/AuthContexts';
import { NavProvider } from '../contexts/NavContexts';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../src/theme';

const MyApp = ({ Component, pageProps }) => {
  return <AuthProvider>
      <NavProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        </ThemeProvider>
      </NavProvider>
    </AuthProvider> 
}

export default MyApp
