import { PlayArrow, Save } from "@mui/icons-material";
import { Card, CardActions, CardContent, CardMedia, CircularProgress, IconButton, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";

function SongList() {
    const loading = false;
    
    const song = {
        title: 'Starry Eyed',
        artist: 'Jane & The Boy',
        thumbnail: 'https://via.placeholder.com/500'
    }
    
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 50
            }}>
                <CircularProgress />
            </div> 
        )
    }
    
    return (
        <>
            {Array.from({ length: 10 }, () => song).map((song, index) => (
                <Song key={index} song={song} />
            ))}
        </>
    )    
}

const useStyles = makeStyles()(theme => ({
    container: {
        margin: theme.spacing(1)
    },
    songInfoContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    songInfo: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    thumbnail: {
        objectFit: 'cover',
        height: 140,
        width: 140
    }
}))

function Song({ song }) {
    const { thumbnail, title, artist } = song;
    const { classes } = useStyles();

    return (
        <Card className={classes.container}>
            <div className={classes.songInfoContainer}>
                <CardMedia image={ thumbnail } className={classes.thumbnail}/>
                <div className={classes.songInfo}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component='h2'>
                            { title }
                        </Typography>
                        <Typography variant="body1" component='p' color='textSecondary'>
                            { artist }
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton size='small' color='primary'>
                            <PlayArrow />
                        </IconButton>
                        <IconButton size='small' color='secondary'>
                            <Save />
                        </IconButton>
                    </CardActions>
                </div>
            </div>
        </Card>
    )
}

export default SongList;