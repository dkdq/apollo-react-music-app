import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';
import { Card, CardContent, CardMedia, IconButton, Slider, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import QueuedSongList from './QueuedSongList';
import { useContext, useEffect, useRef, useState } from 'react';
import { SongContext } from '../App';
import { useQuery } from '@apollo/client';
import { GET_QUEUED_SONGS } from '../graphql/queries';
import ReactPlayer from 'react-player';

const useStyles = makeStyles()(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0px 15px'
    },
    content: {
        flex: '1 0 auto',
    },
    thumbnail: {
        width: 150
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    playIcon: {
        height: 38,
        width: 38
    }
}))

function SongPlayer() {
    const { classes } = useStyles();
    const { state, dispatch } = useContext(SongContext);
    const { data } = useQuery(GET_QUEUED_SONGS);
    const [played, setPlayed] = useState(0);
    const [seeking, setSeeking] = useState(false);
    const reactPlayerRef = useRef();
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const [positionInQueue, setPositionInQueue] = useState(0);

    useEffect(() => {
        const songIndex = data.queue.findIndex(song => song.id === state.song.id)
        setPositionInQueue(songIndex)
    }, [data.queue, state.song.id])

    useEffect(() => {
        const nextSong = data.queue[positionInQueue + 1]
        if (played === 1 && nextSong) {
            setPlayed(0)
            dispatch({ type: 'SET_SONG', payload: { song: nextSong }})
        }
    }, [data.queue, played, dispatch, positionInQueue])

    function handleTogglePlay() {
        dispatch(state.isPlaying ? { type: 'PAUSE_SONG' } : { type: 'PLAY_SONG' })
    }

    function handleProgressChange(event, newValue) {
        setPlayed(newValue)
    }

    function handleSeekMouseDown() {
        setSeeking(true)
    }
    
    function handleSeekMouseUp() {
        setSeeking(false)
        reactPlayerRef.current.seekTo(played)
    }

    function formatDuration(seconds) {
        return new Date(seconds * 1000).toISOString().substring(19, 11)
    }

    function handlePlayPrevSong() {
        const prevSong = data.queue[positionInQueue - 1]
        if (prevSong) {
            dispatch({ type: 'SET_SONG', payload: { song: prevSong }})
        }
    }

    function handlePlayNextSong() {
        const nextSong = data.queue[positionInQueue + 1]
        if (nextSong) {
            dispatch({ type: 'SET_SONG', payload: { song: nextSong }})
        }
    }

    return (
        <>
            <Card variant='outlined' className={classes.container}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography variant="h5" component='h3'>
                            {state.song.title}
                        </Typography>
                        <Typography variant="subtitle1" component='p' color='textSecondary'>
                            {state.song.artist}
                        </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                        <IconButton onClick={handlePlayPrevSong}>
                            <SkipPrevious />
                        </IconButton>
                        <IconButton onClick={handleTogglePlay}>
                            {state.isPlaying ? (<Pause className={classes.playIcon} />) : (<PlayArrow className={classes.playIcon} />)}
                        </IconButton>
                        <IconButton onClick={handlePlayNextSong}>
                            <SkipNext />
                        </IconButton>
                        <Typography variant="subtitle1" component='p' color='textSecondary'>
                            {/* 00:01:30 */}
                            {formatDuration(playedSeconds)}
                        </Typography>
                    </div>
                    <Slider
                        type='range'
                        min={0}
                        max={1}
                        step={0.01}
                        value={played}
                        onChange={handleProgressChange}
                        onMouseDown={handleSeekMouseDown}
                        onMouseUp={handleSeekMouseUp}
                    />
                </div>
                <CardMedia image={state.song.thumbnail} className={classes.thumbnail} />
            </Card>
            <QueuedSongList queue={data.queue}/>
            <ReactPlayer
                url={state.song.url}
                playing={state.isPlaying}
                hidden
                onProgress={({ played, playedSeconds }) => {
                    if (!seeking) {
                        setPlayed(played)
                        setPlayedSeconds(playedSeconds)
                    }
                }}
                ref={reactPlayerRef}
            />
        </> 
    )
}

export default SongPlayer;