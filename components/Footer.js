import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    footer: {        
        flex: 1,
        padding: '1rem 0',
        borderTop: '1px solid #eaeaea',
        textAlign: 'center',
        width: '100%',
    },
}))

const Footer = () => {

    const classes = useStyles(); 
    return <footer className={classes.footer}>
        Powered by&nbsp;<strong>hiperlogado</strong>
    </footer>

}

export default Footer;