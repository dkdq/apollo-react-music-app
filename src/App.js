import Header from './components/Header';
import AddSong from './components/AddSong';
import SongPlayer from './components/SongPlayer';
import SongList from './components/SongList';
import { Grid, Hidden, useMediaQuery } from '@mui/material';

function App() {
    const greaterThanSm = useMediaQuery(theme => theme.breakpoints.up('sm'));
    const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));
    
    return (
        <>
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
        </> 
    )
}

export default App;