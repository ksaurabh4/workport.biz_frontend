import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import Subheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import imgData from 'dan-api/images/imgData';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  img: {
    maxWidth: 'none'
  }
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
function TitlebarImageList(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <ImageList rowHeight={180} className={classes.gridList}>
        <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
          <Subheader component="div">December</Subheader>
        </ImageListItem>
        {imgData.map((tile, index) => (
          <ImageListItem key={index.toString()}>
            <img src={tile.img} className={classes.img} alt={tile.title} />
            <ImageListItemBar
              title={tile.title}
              subtitle={(
                <span>
                  by:&nbsp;
                  {tile.author}
                </span>
              )}
              actionIcon={(
                <IconButton className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              )}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

TitlebarImageList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarImageList);
