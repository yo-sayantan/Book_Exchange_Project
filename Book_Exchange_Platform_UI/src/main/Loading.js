import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material';

const useStyles = makeStyles(() => ({
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: useTheme().palette.background.default,
  },
  loadingText: {
    color: '#fff', // Set the text color to white
  },
}));

const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.loading}>
      <CircularProgress />
      <p className={classes.loadingText}>Loading...</p>
    </div >
  );
};

export default Loading;
