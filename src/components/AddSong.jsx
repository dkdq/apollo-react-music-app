import { AddBoxOutlined, Link } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { makeStyles } from 'tss-react/mui';

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
})

)

function AddSong() {
    const { classes } = useStyles();
    const [dialog, setDialog] = useState(false);

    function handleCloseDialog() {
        setDialog(false)
    }

    return (
        <div className={classes.container}>
            <Dialog open={dialog} onClose={handleCloseDialog} className={classes.dialog}>
                <DialogTitle>Edit Song</DialogTitle>
                <DialogContent>
                    <img
                        src='https://via.placeholder.com/500'
                        alt='Song Thumbnail'
                        className={classes.thumbnail}
                    />
                    <TextField
                        variant="standard"
                        margin='dense'
                        name='title'
                        label='Title'
                        fullWidth
                    />
                    <TextField
                        variant="standard"
                        margin='dense'
                        name='artist'
                        label='Artist'
                        fullWidth
                    />
                    <TextField
                        variant="standard"
                        margin='dense'
                        name='thumbnail'
                        label='Thumbnail'
                        fullWidth
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
            />
            <Button
                variant="contained"
                color='primary'
                endIcon={<AddBoxOutlined />}
                onClick={() => setDialog(true)}
                className={classes.addSongButton}
            >
                Add
            </Button>
        </div>
    )
}

export default AddSong;