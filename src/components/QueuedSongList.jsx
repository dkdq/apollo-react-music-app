import { Delete } from "@mui/icons-material";
import { Avatar, IconButton, Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from "tss-react/mui";

function QueuedSongList() {
    const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));
    
    const song = {
        title: 'Starry Eyed',
        artist: 'Jane & The Boy',
        thumbnail: 'https://via.placeholder.com/500'
    }

    return greaterThanMd && (
        <div style={{ margin: '10px 0' }}>
            <Typography variant="button" color='textSecondary'>
                QUEUE(5)
            </Typography>
            {Array.from({ length: 5}, () => song).map((song, index) => (
                <QueuedSong key={index} song={song} />
            ))}
        </div> 
    )
}

const useStyles = makeStyles()({
    avatar: {
        height: 44,
        width: 44
    },
    text: {
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    },
    container: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridTemplateColumns: '50px auto 50px',
        gridGap: 12,
        alignItems: 'center',
        marginTop: 10
    },
    songInfoContainer: {
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    }
})

function QueuedSong({ song }) {
    const { classes } = useStyles();
    const { thumbnail, artist, title } = song;

    return (
        <div className={classes.container}>
            <Avatar src={thumbnail} alt='Song thumbnail' className={classes.avatar} />
            <div className={classes.songInfoContainer}>
                <Typography variant="subtitle2" className={classes.text}>
                    { title }
                </Typography>
                <Typography variant="body2" color='textSecondary' className={classes.text}>
                    { artist }
                </Typography>
            </div>
            <IconButton>
                <Delete color="error"/>
            </IconButton>
        </div>
    )
}

export default QueuedSongList;