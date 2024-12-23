import {React, useState} from 'react';
import Grid2 from '@mui/material/Grid2';
import LinkButton from './link_button';
import { Home, Lock, LockOpen } from '@mui/icons-material';

const Navigation_bar = () => {
  // Determine the appropriate icon based on authentication status
  const [isAuthenticated] = useState(() => {
    const token = localStorage.getItem("access_token");
    return token !== null;
  });

  const adminIcon = isAuthenticated ? <LockOpen aria-label="Admin Panel"/> : <Lock aria-label="Admin Login"/>;

  return (
    <Grid2
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={0.5}
      wrap="nowrap"
      sx={{
        position: 'absolute',
        top: 5,
        left: '50%',
        transform: 'translateX(-50%)',
        borderRadius: '16px',
        boxShadow: 2,
        minWidth: '8%',
        maxHeight: 30,
      }}
    >
      <LinkButton
        href="/"
        icon={<Home aria-label="Home"/>}
        variant="text"
        iconsx={{
          minWidth: '20px',
          minHeight: '20px',
          fontSize: 'clamp(24px, 2vw, 32px)',
        }}
      />
      <LinkButton
        href="/admin"
        icon={adminIcon}
        variant="text"
        iconsx={{
          minWidth: '20px',
          minHeight: '20px',
          fontSize: 'clamp(24px, 2vw, 32px)',
        }}
      />
    </Grid2>
  );
};

export default Navigation_bar;
