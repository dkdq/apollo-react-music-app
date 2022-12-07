// import { useQuery } from "@apollo/client";
import { useMutation, useSubscription } from "@apollo/client";
import { Pause, PlayArrow, Save } from "@mui/icons-material";
import { Card, CardActions, CardContent, CardMedia, CircularProgress, IconButton, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
// import { GET_SONGS } from '../graphql/queries';
import { GET_SONGS } from '../graphql/subscription';
import { useContext, useEffect, useState } from "react";
import { SongContext } from "../App";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../graphql/mutation";

function SongList() {
    // const { data, loading, error } = useQuery(GET_SONGS);
    const { data, loading, error } = useSubscription(GET_SONGS);

    // const loading = false;
    // const song = {
    //     title: 'Starry Eyed',
    //     artist: 'Jane & The Boy',
    //     thumbnail: 'https://via.placeholder.com/500'
    // }
    
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

    if (error) return <p>Error : {error.message}</p>;
    
    return (
        <>
            {/* {Array.from({ length: 10 }, () => song).map((song, index) => (
                <Song key={index} song={song} />
            ))} */}
            {data.songs.map(song => (
                <Song key={song.id} song={song} />
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
    const { state, dispatch } = useContext(SongContext);
    const [currentSongPlaying, setCurrentSongPlaying] = useState(false);
    const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
        onCompleted: data => {
            localStorage.setItem('queue', JSON.stringify(data.addOrRemoveFromQueue))
        }
    });

    useEffect(() => {
        const isSongPlaying = state.isPlaying && song.id === state.song.id;
        setCurrentSongPlaying(isSongPlaying)
    },[song.id, state.song.id, state.isPlaying])

    function handleTogglePlay() {
        dispatch({ type: 'SET_SONG', payload: { song } })
        dispatch(state.isPlaying ? { type: 'PAUSE_SONG' } : { type: 'PLAY_SONG' })
    }

    function handleAddOrRemoveFromQueue() {
        addOrRemoveFromQueue({
            variables: { input: { ...song, __typename: 'Song' } }
        })
    }

    return (
        <Card className={classes.container}>
            <div className={classes.songInfoContainer}>
                <CardMedia image={thumbnail} className={classes.thumbnail}/>
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
                        <IconButton size='small' color='primary' onClick={handleTogglePlay}>
                            {currentSongPlaying ? <Pause /> : <PlayArrow />}
                        </IconButton>
                        <IconButton size='small' color='secondary' onClick={handleAddOrRemoveFromQueue}>
                            <Save />
                        </IconButton>
                    </CardActions>
                </div>
            </div>
        </Card>
    )
}

export default SongList;