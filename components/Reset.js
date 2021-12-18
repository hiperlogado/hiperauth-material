import { useState } from 'react';
import { makeStyles } from "@material-ui/styles";
import { useAuth } from '../hooks/useAuth';
import { Button, TextField } from '@material-ui/core';
import { useNav } from '../hooks/useNav';

const useStyles = makeStyles((theme) => ({
    section: {
        margin: '1.5rem'
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

    const { resetPass } = useAuth();
    const classes = useStyles();     
    const [email,setEmail] = useState();  
    const [response,setResponse] = useState([]);
    const { setSection } = useNav();

    const responses = {
        'all_fields':'Preencha todos os campos.',
        'email_required':'Informe o email',
        'email_not_found':'Email não encontrado.',
        'email_sent':<>Email de redefinição de senha<br />enviado com sucesso.</>
    }

    const sendData = async (e) => {

        e.preventDefault()        
                
        if(!email) return setResponse([responses.email_required,'e']);
        
        const reset = await resetPass(email)
         
        if(reset=='auth/invalid-email' || reset=='invalid-continue-uri' || reset=='auth/user-not-found' || !isEmail(email)) return setResponse([responses.email_not_found,'e']);
        
        setTimeout(()=>setSection('login'),3000)
        return setResponse([responses.email_sent,'s']);
        
    }

    const isEmail = (e) => {
        var filter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return String(e).search (filter) != -1;
    }

    return <div className={classes.section}>
            <form onSubmit={sendData} action="#">
            <div className={classes.inputs}>
                <div >
                    <div className={classes.title}>Redefinir Senha</div>
                    <TextField type="text" variant="outlined"  onChange={e => setEmail(e.target.value)} name="user" className={classes.textField} placeholder='Email' />                    
                    <Button type="submit" variant="outlined" className={classes.button}>Entrar</Button>
                </div>
                <div className={classes.response} style={response[1]!='e' ? { color: '#0a0' } : {} }>
                    {response[0]}
                </div>
                </div>
            </form>        
    </div>

}

export default Home;