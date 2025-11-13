import './App.css';
import { Stack, Button } from '@mui/material';

function App() {
	return (
		<div className="App">
			<h1>Techover Self Made - Spotify</h1>
			<Stack spacing={2} direction="row">
      			<Button variant="text">Text</Button>
      			<Button variant="contained">Contained</Button>
      			<Button variant="outlined">Outlined</Button>
    		</Stack>
		</div>
	);
}

export default App;
