import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grow from '@material-ui/core/Grow';
import Fade from '@material-ui/core/Fade';
import Zoom from '@material-ui/core/Zoom';
import Grid from '@material-ui/core/Grid';

function MenuTransition() {
  const [anchor, setAnchor] = useState({
    anchorFade: null,
    anchorGrow: null,
    anchorZoom: null,
  });

  const handleClick = (event, type) => {
    setAnchor({
      ...anchor,
      [type]: event.currentTarget
    });
  };

  const handleClose = type => {
    setAnchor({
      ...anchor,
      [type]: null
    });
  };

  const {
    anchorFade,
    anchorGrow,
    anchorZoom
  } = anchor;

  return (
    <Grid container spacing={2}>
      <Grid item md={4}>
        <Button
          aria-owns={anchorFade ? 'fade-menu' : null}
          aria-haspopup="true"
          onClick={(e) => handleClick(e, 'anchorFade')}
        >
          Open with fade transition
        </Button>
        <Menu
          id="fade-menu"
          anchorEl={anchorFade}
          open={Boolean(anchorFade)}
          onClose={() => handleClose('anchorFade')}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={() => handleClose('anchorFade')}>Profile</MenuItem>
          <MenuItem onClick={() => handleClose('anchorFade')}>My account</MenuItem>
          <MenuItem onClick={() => handleClose('anchorFade')}>Logout</MenuItem>
        </Menu>
      </Grid>
      <Grid item md={4}>
        <Button
          aria-owns={anchorGrow ? 'grow-menu' : null}
          aria-haspopup="true"
          onClick={(e) => handleClick(e, 'anchorGrow')}
        >
          Open with grow transition
        </Button>
        <Menu
          id="grow-menu"
          anchorEl={anchorGrow}
          open={Boolean(anchorGrow)}
          onClose={() => handleClose('anchorGrow')}
          TransitionComponent={Grow}
        >
          <MenuItem onClick={() => handleClose('anchorGrow')}>Profile</MenuItem>
          <MenuItem onClick={() => handleClose('anchorGrow')}>My account</MenuItem>
          <MenuItem onClick={() => handleClose('anchorGrow')}>Logout</MenuItem>
        </Menu>
      </Grid>
      <Grid item md={4}>
        <div style={{ position: 'relative' }}>
          <Button
            aria-owns={anchorZoom ? 'zoom-menu' : null}
            aria-haspopup="true"
            onClick={(e) => handleClick(e, 'anchorZoom')}
          >
            Open with zoom transition
          </Button>
          <Menu
            id="zoom-menu"
            anchorEl={anchorZoom}
            open={Boolean(anchorZoom)}
            onClose={() => handleClose('anchorZoom')}
            TransitionComponent={Zoom}
          >
            <MenuItem onClick={() => handleClose('anchorZoom')}>Profile</MenuItem>
            <MenuItem onClick={() => handleClose('anchorZoom')}>My account</MenuItem>
            <MenuItem onClick={() => handleClose('anchorZoom')}>Logout</MenuItem>
          </Menu>
        </div>
      </Grid>
    </Grid>
  );
}

export default MenuTransition;
