import { Stack, Typography, Slider, IconButton } from '@mui/material';
import { formatTime } from '../../utils/formatTime';
import { PlayArrow, Pause, SkipNext, SkipPrevious } from '@mui/icons-material';
import { useEffect, useState } from 'react';

const PlayerControls = ({ is_paused, progress, duration, player }) => {
  const [currentProgress, setCurrentProgress] = useState(progress || 0);
  const skipStyle = { width: 28, height: 28 };
  const playStyle = { width: 38, height: 38 };

  // uppdatera lokala progress när props ändras
  useEffect(() => {
    setCurrentProgress(progress || 0);
  }, [progress]);

  // ticka fram progress när vi spelar
  useEffect(() => {
    if (!player) return;

    const intervalId = setInterval(() => {
      if (!is_paused) {
        setCurrentProgress(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [is_paused, player]);

  const handlePrev = async () => {
    if (!player) return;
    try {
      setCurrentProgress(0);
      await player.previousTrack();
    } catch (e) {
      console.error('previousTrack error', e);
    }
  };

  const handleNext = async () => {
    if (!player) return;
    try {
      setCurrentProgress(0);
      await player.nextTrack();
    } catch (e) {
      console.error('nextTrack error', e);
    }
  };

  const handleTogglePlay = async () => {
    if (!player) return;
    try {
      await player.togglePlay();
    } catch (e) {
      console.error('togglePlay error', e);
    }
  };

  const handleSeekCommit = async (_, value) => {
    if (!player) return;
    try {
      await player.seek(value * 1000);
    } catch (e) {
      console.error('seek error', e);
    }
  };

  return (
    <Stack direction="column" spacing={2} justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
      <Stack spacing={1} direction="row" justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
        <IconButton size="small" sx={{ color: 'text.primary' }} onClick={handlePrev}>
          <SkipPrevious sx={skipStyle} />
        </IconButton>

        <IconButton size="small" sx={{ color: 'text.primary' }} onClick={handleTogglePlay}>
          {is_paused ? <PlayArrow sx={playStyle} /> : <Pause sx={playStyle} />}
        </IconButton>

        <IconButton size="small" sx={{ color: 'text.primary' }} onClick={handleNext}>
          <SkipNext sx={skipStyle} />
        </IconButton>
      </Stack>

      <Stack spacing={2} direction="row" justifyContent="center" alignItems="center" sx={{ width: '75%' }}>
        <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>
          {formatTime(currentProgress || 0)}
        </Typography>

        <Slider
          max={duration || 0}
          value={currentProgress || 0}
          min={0}
          size="medium"
          onChange={(_, value) => setCurrentProgress(value)}
          onChangeCommitted={handleSeekCommit}
        />

        <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>
          {formatTime(duration || 0)}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default PlayerControls;
