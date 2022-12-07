import Header from './components/Header';
import AddSong from './components/AddSong';
import SongPlayer from './components/SongPlayer';
import SongList from './components/SongList';
// import { Grid, Hidden, useMediaQuery } from '@mui/material';
import { Grid, useMediaQuery } from '@mui/material';
import React, { useContext, useReducer } from 'react';
import songReducer from './reducer';

export const SongContext = React.createContext({
    song: {
        id: '634c1ca9-3558-49a4-a5ac-20e6c0c6c01f',
        title: 'Starry Eyed',
        artist: 'Jane & The Boy',
        thumbnail: 'http://img.youtube.com/vi/bJISoKSkdfs/0.jpg',
        url: 'https://www.youtube.com/watch?v=bJISoKSkdfs',
        duration: 186
    },
    isPlaying: false
})

function App() {
    const greaterThanSm = useMediaQuery(theme => theme.breakpoints.up('sm'));
    const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));
    const initialSongState = useContext(SongContext);
    const [state, dispatch] = useReducer(songReducer, initialSongState);
    
    return (
        <SongContext.Provider value={{ state, dispatch }}>
            {greaterThanSm && <Header />}
            {/* <Hidden only='xs'>
                <Header />
            </Hidden> */}
            <Grid container spacing={1}>
                <Grid item xs={12} md={7} style={{ paddingTop: greaterThanSm ? 80 : 10 }}>
                    <AddSong />
                    <SongList />
                </Grid> 
                <Grid item xs={12} md={5} style={
                    greaterThanMd ? 
                    { position: 'fixed', width: '100%', right: 5, top: 70 } :
                    { position: 'fixed', width: '100%', bottom: 0 }}
                >
                    <SongPlayer />
                </Grid>
            </Grid>
        </SongContext.Provider> 
    )
}

export default App;