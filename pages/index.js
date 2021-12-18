import { useEffect, useState } from 'react';
import { useNav } from '../hooks/useNav';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Login from '../components/Login'; 
import Register from '../components/Register'; 
import Reset from '../components/Reset';
import { Backdrop, CircularProgress, MobileStepper, Button, Hidden } from '@material-ui/core';
import { makeStyles,useTheme } from '@material-ui/styles';
import { KeyboardArrowRight,KeyboardArrowLeft } from '@material-ui/icons';
import SwipeableViews from 'react-swipeable-views';
import { useAuth } from '../hooks/useAuth';

const AutoPlaySwipeableViews = SwipeableViews;

const useStyles = makeStyles((theme) => ({
    container: {      
      padding: '0 0.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      fontFamily: 'Roboto',
      minHeight: '100vh'
    },
    main: {      
        padding: '5rem 0',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '80rem',
        margin: 'auto',
        },    
    title: {
        margin: 0,
        lineHeight: 1.15,
        fontSize: '3rem',        
    },    
    card: {
        margin: '1rem',
        padding: '0rem',
        maxWidth: '18rem',
        textAlign: 'left',
        border: '1px solid #eaeaea',
        borderRadius: '10px',        
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexWrap: 'wrap',
        textAlign: 'center',
        gap: '1rem',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    '@media (max-width: 600px)': {        
        container: {
            height: 'auto'
        },
        main: {
            padding: '2rem 0'
        },
        title: {
            fontSize: '2rem'
        }
    },
}));

const Home = () => {
    
    const { section, setSection } = useNav();
    const classes = useStyles();
    const theme = useTheme();
    const { user, authLoad } = useAuth();
    const [activeStep, setActiveStep] = useState(0);

    const sections = {'login':0,'register':1,'reset':2}

    const handleNext = (active) => {
        setActiveStep((prev) => prev + 1);
        setSection(Object.keys(sections)[active + 1])
    };

    const handleBack = (active) => {
        setActiveStep((prev) => prev - 1);
        setSection(Object.keys(sections)[active - 1])
    };

    useEffect(()=>{
        const changeStep = () => {
            setActiveStep(sections[section])
        }
        activeStep != sections[section] && changeStep()
    },[section])
 
    return <div className={classes.container}>
            {authLoad && <Backdrop className={classes.backdrop}
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={authLoad}
            >
            <CircularProgress color="inherit" />
        </Backdrop>} 
        <Header />
        <main className={classes.main}><h1 className={classes.title}>
                hiperAuth
            </h1>
            <p>nextjs + firebase + strapi + material-ui</p>            
            {!user ? <div>                
                <AutoPlaySwipeableViews
                    index={sections[section]}
                    onChangeIndex={setSection}
                    enableMouseEvents
                    className={classes.card}
                    >                
                    {<Login key={1} />}
                    {<Register key={2} />}
                    {<Reset key={3} />}
                </AutoPlaySwipeableViews>
                <Hidden smUp implementation="css">
                    <MobileStepper
                        variant="dots"
                        steps={3}
                        position="static"
                        activeStep={activeStep}
                        className={classes.root}
                        nextButton={
                            <Button size="small" onClick={()=>handleNext(activeStep)} disabled={activeStep === 2}>
                            {activeStep==0 ? 'Cadastrar' : 'Redefinir'}
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={()=>handleBack(activeStep)} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            {activeStep==2 ? 'Cadastrar' : 'Entrar'}
                            </Button>
                        }
                    />
                </Hidden>
            </div> :
            <div>
                Olá, {user.name}
            </div>}
        </main>
        <Footer />
    </div>
}

export default Home;