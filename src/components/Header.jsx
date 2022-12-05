import { HeadsetTwoTone } from "@mui/icons-material";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(theme => ({
    title: {
        marginLeft: theme.spacing(2)
    }
}))

function Header() {
    const { classes } = useStyles();

    return (
        <AppBar color='secondary' position='fixed'>
            <Toolbar>
                <HeadsetTwoTone />
                <Typography className={classes.title} variant="h6" component='h1'>
                    Apollo Music App
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;