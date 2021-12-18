import { useEffect, useState } from "react";
import { AppBar, Button, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import { useNav } from "../hooks/useNav";
import { useAuth } from "../hooks/useAuth";

const useStyles = makeStyles((theme) => ({
    appBar: {
        transition: "all 150ms ease 0s",
        backgroundColor: '#000',        
        borderRadius: 0,
        borderBottom: '#ddd solid 0.1rem',
        boxShadow: 'none',
    },
    bar: {
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'space-between',
        maxWidth: '80rem',
        width: '100%',
        margin: 'auto'
    },
    topBar: {
        backgroundColor: 'rgba(0,0,0,0)',
        color: '#000',
    },
    moveBar: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        color: '#fff', 
    },
    button: {
        color: 'inherit',
        fontSize: '0.8rem',
        borderRadius: 0,
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.2)',
            color: 'inherit'
        }
    }
}))

export default function Header() {

    const { user, signOutGoogle } = useAuth();
    const { setSection } = useNav();

    const classes = useStyles(); 
    const [bar,setBar] = useState('topBar');    
    const heightChangeBar = 50;
    const appBarClasses = classNames({
        [classes.appBar]: true,
        [classes[bar]]: true
    });

    const headerChange = () => {

        const windowsScrollTop = window.pageYOffset;
        if (windowsScrollTop > heightChangeBar) {
            setBar('moveBar');
        } else {
            setBar('topBar');
        }

    };

    useEffect(() => {        

        if (setBar) {
            window.addEventListener("scroll", headerChange);
        }

        return function cleanup() {
            if (setBar) {
                window.removeEventListener("scroll", headerChange);
            }
        };

    }); 

    return <>
        <Hidden xsDown implementation="css">
            <AppBar className={appBarClasses}>
                <div className={classes.bar}>
                <Button className={classes.button}>Início</Button>
                    {!user ? <div className={classes.links}>
                        <Button onClick={()=>setSection('login')} className={classes.button}>Entrar</Button>
                        <Button onClick={()=>setSection('register')} className={classes.button}>Cadastrar</Button>
                        <Button onClick={()=>setSection('reset')} className={classes.button}>Redefinir Senha</Button>
                    </div> :         
                    <Button onClick={()=>signOutGoogle()} className={classes.button}>Sair</Button>
                }
                </div>
            </AppBar>
        </Hidden>
    </>

}
