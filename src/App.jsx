import './App.css';
import { Stack, Button, Box } from '@mui/material';
import Login from './pages/Login';
import Home from './pages/Home';

function App({ spotifyApi }) {
	return (
		<Box className="App" > 
			<Home/>
		</Box>
	);
}

export default App;
