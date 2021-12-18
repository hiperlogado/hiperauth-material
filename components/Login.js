import { useState } from 'react';
import { makeStyles } from "@material-ui/styles";
import { useAuth } from '../hooks/useAuth';
import { Button, TextField } from '@material-ui/core';
import { useNav } from '../hooks/useNav';

const useStyles = makeStyles((theme) => ({
    section: {
        margin: '1.5rem',
    },
    title: {
        fontSize: '1.3rem',
        color: '#555',
        fontWeight: '700'
    },
    inputs: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '14.8rem',
        gap: '1rem'
    },
    input: {
        width: '100%',
        margin: '0.5rem',
    },
    button: {
        color: 'inherit',
        fontSize: '0.8rem',
        backgroundColor: 'rgba(0,0,0,0.1)',
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.2)',
            color: 'inherit'
        }
    },
    response: {
        margin: '1rem',
        color: '#f00',
    },
    textField: {
        margin: '0.4rem 0',
        width: "100%",
        borderRadius: '0.4rem',               
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#555"
        }
    },
    '@media (max-width: 600px)': {        
      container: {
        height: 'auto'
    }
  }
}))

const Home = () => {

    const { signInWithGoogle, loginUser } = useAuth();
    const classes = useStyles();     
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();    
    const [response,setResponse] = useState([]);
    const { setSection } = useNav();

    const responses = {
        'all_fields':'Preencha todos os campos.',
        'login_error':'Usuário e/ou senha incorreto(s).'                
    }

    const sendData = async (e) => {

        e.preventDefault()

        if(!email || !password) return setResponse([responses.all_fields,'e']);
        
        const access = await loginUser(email,password)        

        if(access=='auth/wrong-password' || access=='auth/user-not-found' || access=='auth/invalid-email' || !isEmail(email)) return setResponse([responses.login_error,'e']);
        
    }

    const isEmail = (e) => {
        var filter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return String(e).search (filter) != -1;
    }

    return <div className={classes.section}>
            <form onSubmit={sendData} action="#">
                <div className={classes.inputs}>
                    <div className={classes.title}>Acessar</div>
                    <Button onClick={signInWithGoogle} variant="outlined" className={classes.button}>Entrar com Google</Button>
                    <div>--------- Ou ---------</div>                    
                    <div>Utilize <strong>email</strong> e <strong>senha</strong>:</div>
                    <div >                        
                        <TextField type="text" variant="outlined"  onChange={e => setEmail(e.target.value)} name="user" className={classes.textField} placeholder='Email' />
                        <TextField type="password" variant="outlined"  onChange={e => setPassword(e.target.value)} name="password" className={classes.textField} placeholder='Senha' />
                        <Button type="submit" variant="outlined" className={classes.button}>Entrar</Button>
                    </div>
                    <div className={classes.response}>
                        {response[0]}
                    </div>
                </div>
            </form>        
    </div>

}

export default Home;