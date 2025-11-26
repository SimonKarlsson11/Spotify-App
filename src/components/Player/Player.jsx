import { Box, Grid, Typography, Avatar } from '@mui/material';
import { use } from 'react';
import { useEffect, useState } from 'react';
import PlayerControls from '../PlayerControls/PlayerControls';
import PlayerVolume from '../PlayerVolume/PlayerVolume';
import PlayerOverlay from '../PlayerOverlay/PlayerOverlay';

const Player = ({ spotifyApi, token }) => {
	const [localPlayer, setLocalPlayer] = useState();
	const [is_paused, setIsPaused] = useState(false);
	const [current_track, setCurrentTrack] = useState();
	const [device, setDevice] = useState();
	const [duration, setDuration] = useState();
	const [progress, setProgress] = useState();
	const [active, setActive] = useState();
	const [playerOverlayIsOpen, setPlayerOverlayIsOpen] = useState(false);

	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://sdk.scdn.co/spotify-player.js';
		script.async = true;

		document.body.appendChild(script);

		window.onSpotifyWebPlaybackSDKReady = () => {
			const player = new window.Spotify.Player({
				name: 'Simon dev Player',
				getOAuthToken: (cb) => {
					cb(token);
				},
				volume: 0.5
			});

			player.addListener('ready', ({ device_id }) => {
				console.log('Ready with Device ID', device_id);
				setDevice(device_id);
				setLocalPlayer(player);
			});

			player.addListener('not_ready', ({ device_id }) => {
				console.log('Device ID has gone offline', device_id);
			});

			player.addListener('player_state_changed', (state) => {
  if (!state) {
    setActive(false);
    return;
  }

  const track = state.track_window?.current_track;
  if (!track) {
    setActive(true); // enheten lever men ingen låt än
    return;
  }

  const durationSec = track.duration_ms / 1000;
  const progressSec = state.position / 1000;

  setDuration(durationSec);
  setProgress(progressSec);
  setIsPaused(state.paused);
  setCurrentTrack(track);

				player.getCurrentState().then((state) => {
					!state ? setActive(false) : setActive(true);
				});
			});
			player.connect();
		};
	}, []);

	useEffect(() => {
		if (!localPlayer) return;
		async function connect() {
			await localPlayer.connect();
		}
		connect();
		return () => {
			localPlayer.disconnect();
		};
	}, [localPlayer]);

	useEffect(() => {
  if (!device) return;

  const transferPlayback = async () => {
    try {
      const res = await spotifyApi.getMyDevices();
      console.log('Devices:', res.body.devices);

      await spotifyApi.transferMyPlayback([device], { play: false });

      setActive(true); // markera att vår Web Player är aktiv
    } catch (e) {
      console.error('transferMyPlayback error', e);
    }
  };

  transferPlayback();
}, [device, spotifyApi]);



	return (
		<Box>
			<Grid
				onClick={() => setPlayerOverlayIsOpen((open) => !open)}
				container
				px={3}
				sx={{
					backgroundColor: 'Background.paper',
					height: 100,
					cursor: { xs: 'pointer', md: 'auto' },
					width: '100%',
					borderTop: '1px solid #292929'
				}}
			>
				<Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }} xs={12} md={4} item>
					<Avatar
						src={current_track?.album.images[0].url}
						alt={current_track?.album.name}
						variant="square"
						sx={{ width: 56, height: 56, marginRight: 2 }}
					/>
					<Box>
						<Typography sx={{ color: 'text.primary', fontSize: 14 }}>{current_track?.name}</Typography>
						<Typography sx={{ color: 'text.secondary', fontSize: 10 }}>
							{current_track?.artists[0].name}
						</Typography>
					</Box>
				</Grid>
				<Grid
					sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center' }}
					md={4}
					item
				>
					{active ? (
						<PlayerControls
							progress={progress}
							is_paused={is_paused}
							duration={duration}
							player={localPlayer}
						/>
					) : (
						<Box>Please transfer Playback</Box>
					)}
				</Grid>
				<Grid sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'flex-end' }} xs={12} md={4} item>
					<PlayerVolume player={localPlayer} />
				</Grid>
			</Grid>
			<PlayerOverlay
				playerOverlayIsOpen={playerOverlayIsOpen}
				closeOverlay={() => setPlayerOverlayIsOpen(false)}
				progress={progress}
				is_paused={is_paused}
				duration={duration}
				player={localPlayer}
				current_track={current_track}
				active={active}
			/>
		</Box>
	);
};

export default Player;
