import { AddBoxOutlined, Link } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { makeStyles } from 'tss-react/mui';
import ReactPlayer from 'react-player';
import YoutubePlayer from 'react-player/youtube';
import SoundCloudPlayer from 'react-player/soundcloud';
import { useMutation } from "@apollo/client";
import { ADD_SONG } from '../graphql/mutation';

const useStyles = makeStyles()(theme => ({
    container: {
        display: 'flex',
        alignItems: 'center'
    },
    urlInput: {
        margin: theme.spacing(1)
    },
    addSongButton: {
        margin: theme.spacing(1)
    },
    dialog: {
        textAlign: 'center'
    },
    thumbnail: {
        width: '90%'
    }
}))

const DEFAULT_SONG = {
    duration: 0,
    title: '',
    artist: '',
    thumbnail: ''
}

function AddSong() {
    const { classes } = useStyles();
    const [dialog, setDialog] = useState(false);
    const [url, setUrl] = useState('');
    const [playable, setPlayable] = useState(false);
    const [song, setSong] = useState(DEFAULT_SONG)
    const [addSong, { error }] = useMutation(ADD_SONG);

    useEffect(() => {
        const isPlayable = SoundCloudPlayer.canPlay(url) || YoutubePlayer.canPlay(url)
        setPlayable(isPlayable)
    }, [url])

    function handleCloseDialog() {
        setDialog(false)
    }

    async function handleEditSong({ player }) {
        const nestedPlayer = player.player.player;
        let songData;
        if (nestedPlayer.getVideoData) {
            songData = getYoutubeInfo(nestedPlayer)
        } else if (nestedPlayer.getCurrentSound) {
            songData = await getSoundCloudInfo(nestedPlayer)
        }
        setSong({ ...songData, url })
    }

    function getYoutubeInfo(player) {
        const duration = player.getDuration();
        const { title, video_id, author } = player.getVideoData();
        const thumbnail = `https://img.youtube.com/vi/${video_id}/0.jpg`;
        return {
            duration,
            title,
            artist: author,
            thumbnail
        }
    }

    function getSoundCloudInfo(player) {
        return new Promise(resolve => {
            player.getCurrentSound(songData => {
                if (songData) {
                    resolve({
                        duration: Number(songData.duration / 1000),
                        title: songData,
                        artist: songData.user.username,
                        thumbnail: songData.artwork_url.replace('-large', '-t500x500')
                    })
                }
            })
        })
    }

    function handleChangeSong(event) {
        const { name, value } = event.target;
        setSong(prevSong => ({
            ...prevSong,
            [name]: value
        }))
    }

    async function handleAddSong() {
        try {
            // addSong({ variables: { ...song } })
            const { thumbnail, title, artist, url, duration } = song;
            await addSong({
                variables: {
                    url: url.length > 0 ? url : null,
                    thumbnail: thumbnail.length > 0 ? thumbnail : null,
                    duration: duration > 0 ? duration : null,
                    title: title.length > 0 ? title : null,
                    artist: artist.length > 0 ? artist : null,
                }
            })
            handleCloseDialog()
            setSong(DEFAULT_SONG)
            setUrl('')
        } catch (error) {
            console.error('Error adding song', error)
        }
    }

    function handleError(field) {
        // return error && error.graphQLError[0].extensions.path.includes(field)
        return error?.graphQLErrors[0].extensions.path.includes(field)
    }

    const { thumbnail, title, artist } = song;
    return (
        <div className={classes.container}>
            <Dialog open={dialog} onClose={handleCloseDialog} className={classes.dialog}>
                <DialogTitle>Edit Song</DialogTitle>
                <DialogContent>
                    <img
                        src={thumbnail}
                        alt='Song Thumbnail'
                        className={classes.thumbnail}
                    />
                    <TextField
                        variant="standard"
                        margin='dense'
                        name='title'
                        label='Title'
                        fullWidth
                        value={title}
                        onChange={handleChangeSong}
                        error={handleError('title')}
                        helperText={handleError('title') && 'Fill out field'}
                    />
                    <TextField
                        variant="standard"
                        margin='dense'
                        name='artist'
                        label='Artist'
                        fullWidth
                        value={artist}
                        onChange={handleChangeSong}
                        error={handleError('artist')}
                        helperText={handleError('artist') && 'Fill out field'}
                    />
                    <TextField
                        variant="standard"
                        margin='dense'
                        name='thumbnail'
                        label='Thumbnail'
                        fullWidth
                        value={thumbnail}
                        onChange={handleChangeSong}
                        error={handleError('thumbnail')}
                        helperText={handleError('thumbnail') && 'Fill out field'}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseDialog}
                        color="secondary"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="outlined"
                        color='warning'
                        onClick={handleAddSong}
                    >
                        Add Song
                    </Button>
                </DialogActions>
            </Dialog>

            {/* INPUT */}
            <TextField
                variant="standard"
                type='url'
                placeholder='Add Youtube or Soundcloud URL'
                fullWidth
                margin='normal'
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <Link />
                        </InputAdornment>
                    )
                }}
                className={classes.urlInput}
                onChange={event => setUrl(event.target.value)}
                value={url}
            />
            <Button
                variant="contained"
                color='primary'
                endIcon={<AddBoxOutlined />}
                onClick={() => setDialog(true)}
                className={classes.addSongButton}
                disabled={!playable}
            >
                Add
            </Button>
            <ReactPlayer url={url} hidden onReady={handleEditSong} />
        </div>
    )
}

export default AddSong;